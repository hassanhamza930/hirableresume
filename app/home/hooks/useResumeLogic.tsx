'use client';

import { useState } from 'react';
import { useUserStore } from '@/app/store/userStore';
import { useAuth } from '@/app/hooks/useAuth';
import { SYSTEM_PROMPT } from '@/app/prompts';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

interface UseResumeLogicProps {
  userId?: string;
}

export default function useResumeLogic({ userId }: UseResumeLogicProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useUserStore();
  const { user } = useAuth();

  // Get the actual user ID (from props or from auth)
  const actualUserId = userId || user?.uid;

  /**
   * Creates a new resume based on the job description
   * @param jobDescription The job description to tailor the resume for
   * @returns The created resume object or null if creation failed
   */
  const createResume = async (jobDescription: string) => {
    if (!actualUserId) {
      toast.error('You must be logged in to create a resume');
      return null;
    }

    if (!userData?.resumeData) {
      toast.error('Please complete your profile first');
      return null;
    }

    setIsLoading(true);

    try {
      // First, generate a name for the resume based on the job description
      const resumeName = await generateResumeName(jobDescription);

      // Then, generate the resume content
      const resumeContent = await generateResumeContent(jobDescription, userData.resumeData);

      if (!resumeContent) {
        throw new Error('Failed to generate resume content');
      }

      // Create a new resume document in Firebase
      const db = getFirestore();
      const resumeData = {
        id: uuidv4(),
        name: resumeName,
        content: resumeContent,
        jobDescription,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ownerId: actualUserId,
        status: 'completed'
      };

      // Add the resume to the resumes collection
      await addDoc(collection(db, 'resumes'), resumeData);

      toast.success('Resume created successfully');
      return resumeData;
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generates a name for the resume based on the job description
   * @param jobDescription The job description
   * @returns A name for the resume in the format "JobTitle@CompanyName"
   */
  const generateResumeName = async (jobDescription: string): Promise<string> => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
          'HTTP-Referer': 'https://hirableresume.com',
          'X-Title': 'HirableResume'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4.1-nano',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that extracts the job title and company name from a job description. Return ONLY the result in the format "JobTitle@CompanyName" without any additional text or explanation.'
            },
            {
              role: 'user',
              content: jobDescription
            }
          ],
          max_tokens: 50
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate resume name');
      }

      let resumeName = data.choices[0]?.message?.content?.trim() || 'New Resume';

      // If the response doesn't contain an @ symbol, use a default format
      if (!resumeName.includes('@')) {
        resumeName = 'New Resume';
      }

      return resumeName;
    } catch (error) {
      console.error('Error generating resume name:', error);
      return 'New Resume';
    }
  };

  /**
   * Generates resume content based on the job description and user data
   * @param jobDescription The job description to tailor the resume for
   * @param userData The user's resume data
   * @returns The generated resume content in HTML format
   */
  const generateResumeContent = async (jobDescription: string, resumeData: string): Promise<string | null> => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
          'HTTP-Referer': 'https://hirableresume.com',
          'X-Title': 'HirableResume'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.7-sonnet',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: `Here is my resume information:\n\n${resumeData}\n\nHere is the job description I'm applying for:\n\n${jobDescription}\n\nPlease create a tailored resume for this job.`
            }
          ],
          max_tokens: 4000
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate resume content');
      }

      return data.choices[0]?.message?.content || null;
    } catch (error) {
      console.error('Error generating resume content:', error);
      return null;
    }
  };

  return {
    createResume,
    generateResumeName,
    isLoading
  };
}
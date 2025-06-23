'use client';

import { useState, useEffect, useCallback } from 'react'; // Added useEffect, useCallback
import { useUserStore } from '@/app/store/userStore';
import { useResumeStore } from '@/app/store/resumeStore';
import { useAuth } from '@/app/hooks/useAuth';
import { SYSTEM_PROMPT } from '@/app/prompts';
import { v4 as uuidv4 } from 'uuid';
import { getFirestore, collection, addDoc, serverTimestamp, updateDoc, query, where, limit, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';
import { deductCredits } from '@/app/utils/creditUtils';
import { useRouter } from 'next/navigation';
import { replace, parseReplacements } from '@/app/utils/diffUtils';

interface UseResumeLogicProps {
  userId?: string;
}

export default function useResumeLogic({ userId }: UseResumeLogicProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useUserStore();
  const { user } = useAuth();
  const { selectResume, updateResumeContent: updateStoreResumeContent, setUpdateFirebaseCallback } = useResumeStore(); // Get store actions
  const router = useRouter();

  // Get the actual user ID (from props or from auth)
  const actualUserId = userId || user?.uid;

  // --- Firebase Persistence Logic ---
  
  const persistResumeContent = useCallback(async (resumeId: string, content: string) => {
    console.log(`Persisting content for resume ${resumeId} to Firebase...`);
    const db = getFirestore();
    const resumesCollection = collection(db, 'resumes');
    const resumeQuery = query(resumesCollection, where('id', '==', resumeId), limit(1));
  
    try {
      const querySnapshot = await getDocs(resumeQuery);
      if (querySnapshot.empty) {
        throw new Error(`Resume document with id ${resumeId} not found in Firebase for persistence.`);
      }
      const resumeDocRef = querySnapshot.docs[0].ref;
      await updateDoc(resumeDocRef, {
        content: content,
        updatedAt: serverTimestamp()
      });
      console.log(`Successfully persisted content for resume ${resumeId}`);
    } catch (error) {
      console.error(`Error persisting content for resume ${resumeId}:`, error);
      toast.error('Failed to save changes. Please try again.');
      // Re-throw the error if you want calling functions (like undo/redo) to handle it
      throw error;
    }
  }, []); // Empty dependency array as it uses functions/vars defined outside or stable ones like getFirestore
  
  // --- Effect to set the Firebase update callback in the store ---
  useEffect(() => {
    setUpdateFirebaseCallback(persistResumeContent);
    // Cleanup function if needed, though likely not necessary here
    // return () => setUpdateFirebaseCallback(undefined);
  }, [persistResumeContent, setUpdateFirebaseCallback]);
  
  // --- Resume Creation/Update Logic ---
  
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

    // Check if user has enough credits
    if (userData.credits === undefined || userData.credits <= 0) {
      toast.error('You have run out of credits. Purchase more credits to continue.');
      router.push('/home/billing');
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

      // Deduct 1 credit from the user's account
      const creditDeducted = await deductCredits(actualUserId);

      if (!creditDeducted) {
        toast.error('Failed to deduct credits. Please try again.');
        return null;
      }

      // Create a new resume document in Firebase
      const db = getFirestore();
      const resumeId = uuidv4();
      const resumeData = {
        id: resumeId,
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

      // The Firestore document will be picked up by the onSnapshot listener in ResumeList
      // We don't need to manually add it to the store here, as it will be added by the listener
      // with the proper firebaseId

      // Select the newly created resume
      selectResume(resumeId);

      // Show success message after loading is complete
      setTimeout(() => {
        toast.success('Resume created successfully');
      }, 500);

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
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'https://hirableresume.com',
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
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'https://hirableresume.com',
          'X-Title': 'HirableResume'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4.1',
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

  /**
   * Updates an existing resume based on user request
   * @param resumeId The ID of the resume to update
   * @param userRequest The user's request for updating the resume
   * @returns A boolean indicating whether the update was successful
   */
  const updateResume = async (resumeId: string, userRequest: string): Promise<boolean> => {
    if (!actualUserId) {
      toast.error('You must be logged in to update a resume');
      return false;
    }

    // Check if user has enough credits
    if (userData?.credits === undefined || userData.credits <= 0) {
      toast.error('You have run out of credits. Purchase more credits to continue.');
      router.push('/home/billing');
      return false;
    }

    setIsLoading(true);

    try {
      // Find the resume in the store to get its current content and job description
      const resume = useResumeStore.getState().resumes.find(r => r.id === resumeId);

      if (!resume) {
        throw new Error('Resume not found in store');
      }

      // Generate updated content based on the user's request
      let updatedContent = resume.content;

      // If the user provided a request, use AI to update the content
      if (userRequest.trim()) {
        // Use the existing resume content and the user's request to generate new content
        const aiUpdatedContent = await generateUpdatedContent(resume.content, userRequest);
        if (aiUpdatedContent) {
          updatedContent = aiUpdatedContent;
        } else {
          throw new Error('Failed to generate updated resume content');
        }

        // Deduct 1 credit from the user's account
        const creditDeducted = await deductCredits(actualUserId);

        if (!creditDeducted) {
          toast.error('Failed to deduct credits. Please try again.');
          return false;
        }
      }

      // 1. Update the state and history in the Zustand store FIRST
      updateStoreResumeContent(resumeId, updatedContent);
      
      // 2. Persist the new content to Firebase
      await persistResumeContent(resumeId, updatedContent);
      
      // Old Firebase update logic removed (was lines 259-275)
      // const db = getFirestore();
      // const resumesCollection = collection(db, 'resumes');

      // Querying and updating logic is now inside persistResumeContent
      // const resumeQuery = query(resumesCollection, where('id', '==', resumeId), limit(1));
      // const querySnapshot = await getDocs(resumeQuery);
      // ... (rest of old update logic) ...

      // The onSnapshot listener should still pick up changes, but the store state
      // is already updated by updateStoreResumeContent. The listener will essentially
      // confirm the Firebase state matches the store state after persistence.

      // Show success message after loading is complete
      setTimeout(() => {
        toast.success('Resume updated successfully');
      }, 500);

      return true;
    } catch (error) {
      console.error('Error updating resume:', error);
      toast.error('Failed to update resume: ' + (error instanceof Error ? error.message : 'Unknown error'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generates updated resume content based on the user's request using a diff-based approach
   * @param currentContent The current HTML content of the resume
   * @param userRequest The user's request for updating the resume
   * @returns The updated resume content in HTML format
   */
  const generateUpdatedContent = async (currentContent: string, userRequest: string): Promise<string | null> => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'https://hirableresume.com',
          'X-Title': 'HirableResume'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-preview',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: `
              Data about the user's profile:
              ${userData?.resumeData}

              ------------------------
              Here is my current resume in HTML format:
              ${currentContent}

              --------------------------
              Please update it based on this request:
              ${userRequest}.

              -----------------------------
              IMPORTANT: Instead of providing the entire HTML, use the diff-based approach as described in the system instructions.
              Identify specific sections that need to be changed and provide them using <old></old> and <new></new> tags.
              Make sure the content inside <old> tags exactly matches the text in the original HTML.`
            }
          ],
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate updated resume content');
      }

      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('Empty response from AI');
      }

      try {
        // Parse the replacements from the AI response
        const replacements = parseReplacements(aiResponse);

        // Apply the replacements to the current content
        const updatedContent = replace(currentContent, replacements);

        return updatedContent;
      } catch (parseError) {
        console.error('Error parsing AI response for replacements:', parseError);

        // Fallback: If parsing fails, try to use the response as a full HTML replacement
        if (aiResponse.includes('<!DOCTYPE html>')) {
          console.log('Falling back to full HTML replacement');
          return aiResponse;
        }

        throw new Error('Failed to parse AI response and no valid fallback available');
      }
    } catch (error) {
      console.error('Error generating updated resume content:', error);
      return null;
    }
  };

  return {
    createResume,
    updateResume,
    generateResumeName,
    isLoading
  };
}
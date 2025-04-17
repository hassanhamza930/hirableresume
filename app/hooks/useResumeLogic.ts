'use client';

import { useState } from 'react';
import { useResumeStore } from '@/app/store/resumeStore';
import { toast } from 'sonner';
import { Resume } from '@/app/interfaces';

interface UseResumeLogicProps {
  userId: string;
}

export function useResumeLogic({ userId }: UseResumeLogicProps) {
  const [isGeneratingName, setIsGeneratingName] = useState(false);
  const [isGeneratingResume, setIsGeneratingResume] = useState(false);
  const [isUpdatingResume, setIsUpdatingResume] = useState(false);

  const { createResume, updateResume, resumes } = useResumeStore();

  // Function to generate a resume name using OpenRouter API
  const generateResumeName = async (jobDesc: string, companyInfo: string): Promise<string> => {
    setIsGeneratingName(true);
    try {
      // Combine job description and company info for better context
      const combinedInfo = `Job Description: ${jobDesc}\n\nCompany Information: ${companyInfo}`;

      // Prepare the prompt for the AI
      const prompt = `Based on the following job description and company information, extract the job title and company name. Format your response exactly as "jobtitle@companyname" (e.g., "Data Analyst@Google"). If the company name is not clearly mentioned, use the most likely company name or "Company" as a placeholder. Dont' reply with any other text, just this format: jobtitle@companyname \n\n${combinedInfo}`;

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // Replace with actual API key
          "HTTP-Referer": "https://hirableresume.com",
          "X-Title": "HirableResume",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/gpt-4.1-nano",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedName = data.choices[0].message.content.trim();

      // Validate the format (should be something like "jobtitle@companyname")
      if (generatedName.includes('@')) {
        return generatedName;
      }

      // Fallback if the format is not as expected
      return fallbackGenerateResumeName(jobDesc);
    } catch (error) {
      console.error('Error generating resume name with AI:', error);
      // Fallback to regex-based name generation
      return fallbackGenerateResumeName(jobDesc);
    } finally {
      setIsGeneratingName(false);
    }
  };

  // Fallback function using regex to extract job title
  const fallbackGenerateResumeName = (jobDesc: string): string => {
    // Try to extract a job title from the first 100 characters
    const firstLine = jobDesc.substring(0, 100).split('\n')[0];

    // Look for common job title patterns
    const titleMatch = firstLine.match(/(?:position|job|role|title|hiring)(?:\s+for)?\s*[:\-]?\s*([^,.:;\n]+)/i) ||
                      firstLine.match(/([^,.:;\n]+(?:engineer|developer|designer|manager|specialist|analyst|consultant|director|architect|lead|head|chief|officer|associate|assistant|coordinator|administrator|technician|supervisor|agent|representative|advisor|strategist|scientist|researcher|writer|editor|marketer|accountant|auditor|lawyer|paralegal|nurse|doctor|therapist|counselor|teacher|instructor|professor|tutor|coach|trainer|driver|operator|mechanic|technician|electrician|plumber|carpenter|chef|cook|server|cashier|clerk|receptionist|secretary|assistant|janitor|cleaner|guard|officer|analyst|specialist|consultant|coordinator|manager|director|president|ceo|cto|cfo|coo|vp|head|chief|lead|senior|junior|associate|assistant|intern|trainee|apprentice|fellow|contractor|freelancer|remote|virtual|part-time|full-time|temporary|permanent|seasonal|contract)[^,.:;\n]*)/i);

    if (titleMatch && titleMatch[1]) {
      // Clean up and capitalize the title
      const title = titleMatch[1].trim();
      return title.charAt(0).toUpperCase() + title.slice(1) + '@Company';
    }

    // If no specific title found, use a generic name with date
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `JobApplication@${date}`;
  };

  // Function to generate HTML resume content using OpenRouter API
  const generateResumeContent = async (jobDescription: string, companyInfo: string = ''): Promise<string> => {
    try {
      // Combine job description and company info for better context
      const combinedInfo = `Job Description: ${jobDescription}\n\nCompany Information: ${companyInfo}`;

      // Prepare the prompt for the AI
      const prompt = `Create a professional resume tailored specifically for the following job description and company information. Format the resume in clean, professional HTML that can be directly injected into a webpage. Include appropriate sections like summary, experience, skills, education, etc. Make the resume ATS-friendly and highlight relevant skills and experiences that match the job requirements.

The HTML should be styled with inline CSS for a clean, professional appearance with good typography and spacing.

IMPORTANT:
1. Do NOT include any <style> tags, <link> tags, or <script> tags in your response.
2. Use only inline styles on individual HTML elements.
3. Do NOT use any CSS classes or IDs for styling.
4. Do NOT include any markdown formatting, code blocks, or explanatory text in your response.
5. ONLY return the raw HTML code with no additional text or formatting.

Use a clean, modern design with appropriate spacing, font sizes, and colors. The resume should be ready to use without any additional formatting needed.\n\n${combinedInfo}`;

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // Replace with actual API key
          "HTTP-Referer": "https://hirableresume.com",
          "X-Title": "HirableResume",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/o4-mini",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content.trim();

      // Extract HTML content if it's wrapped in code blocks or has extra text
      let htmlContent = generatedContent;

      // Handle content wrapped in code blocks (```html ... ```)
      if (generatedContent.includes('```html') && generatedContent.includes('```')) {
        htmlContent = generatedContent.split('```html')[1].split('```')[0].trim();
      }
      // Handle content wrapped in just backticks without language specification
      else if (generatedContent.includes('```') && generatedContent.split('```').length >= 3) {
        htmlContent = generatedContent.split('```')[1].trim();
      }
      // Handle content that starts with <!DOCTYPE or <html
      else if (!generatedContent.trim().startsWith('<')) {
        // Find the first HTML-like tag
        const htmlStartMatch = generatedContent.match(/<\w+[^>]*>/i);
        if (htmlStartMatch && htmlStartMatch.index !== undefined) {
          htmlContent = generatedContent.substring(htmlStartMatch.index);
        }
      }

      return htmlContent;
    } catch (error) {
      console.error('Error generating resume content with AI:', error);
      throw error;
    }
  };

  // Function to create a new resume with generated content
  const createResumeWithContent = async (jobDescription: string, companyInfo: string = ''): Promise<string | null> => {
    setIsGeneratingName(true);
    setIsGeneratingResume(true);

    try {
      // Generate resume name
      const name = await generateResumeName(jobDescription, companyInfo);

      // Generate resume content
      const content = await generateResumeContent(jobDescription, companyInfo);

      // Create resume in Firebase
      const resumeData: Partial<Resume> = {
        name,
        jobDescription,
        companyInfo,
        status: 'completed', // Mark as completed since we're generating content
        content,
      };

      const resumeId = await createResume(resumeData, userId);

      if (resumeId) {
        toast.success(`Resume "${name}" created successfully`);
        return resumeId;
      }

      return null;
    } catch (error) {
      console.error('Error creating resume with content:', error);
      toast.error('Failed to create resume');
      return null;
    } finally {
      setIsGeneratingName(false);
      setIsGeneratingResume(false);
    }
  };

  // Function to update an existing resume with new content
  const updateResumeWithContent = async (
    resumeId: string,
    customizationInput: string,
    originalJobDescription: string,
    originalCompanyInfo: string = ''
  ): Promise<boolean> => {
    setIsUpdatingResume(true);

    try {
      // Get the current resume content
      const currentResume = resumes.find((resume: Resume) => resume.id === resumeId);
      if (!currentResume) {
        throw new Error('Resume not found');
      }

      // Prepare the prompt for the AI
      const prompt = `
        I have a resume that was created for the following job description:

        "${originalJobDescription}"

        ${originalCompanyInfo ? `Company information: "${originalCompanyInfo}"` : ''}

        Here is the current HTML content of the resume:

        ${currentResume.content}

        I need to update this resume based on the following customization request:

        "${customizationInput}"

        Please create an updated version of the resume in clean, professional HTML format that can be directly injected into a webpage. The HTML should be styled with inline CSS for a clean, professional appearance with good typography and spacing.

    
      `;

      // Call OpenRouter API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // Replace with actual API key
          "HTTP-Referer": "https://hirableresume.com",
          "X-Title": "HirableResume",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openai/o4-mini",
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content.trim();

      // Extract HTML content if it's wrapped in code blocks or has extra text
      let htmlContent = generatedContent;

      // Handle content wrapped in code blocks (```html ... ```)
      if (generatedContent.includes('```html') && generatedContent.includes('```')) {
        htmlContent = generatedContent.split('```html')[1].split('```')[0].trim();
      }
      // Handle content wrapped in just backticks without language specification
      else if (generatedContent.includes('```') && generatedContent.split('```').length >= 3) {
        htmlContent = generatedContent.split('```')[1].trim();
      }
      // Handle content that starts with <!DOCTYPE or <html
      else if (!generatedContent.trim().startsWith('<')) {
        // Find the first HTML-like tag
        const htmlStartMatch = generatedContent.match(/<\w+[^>]*>/i);
        if (htmlStartMatch && htmlStartMatch.index !== undefined) {
          htmlContent = generatedContent.substring(htmlStartMatch.index);
        }
      }

      // Update resume in Firebase
      const success = await updateResume(resumeId, {
        content: htmlContent,
        status: 'completed'
      });

      if (success) {
        toast.success('Resume updated successfully');
      }

      return success;
    } catch (error) {
      console.error('Error updating resume with content:', error);
      toast.error('Failed to update resume');
      return false;
    } finally {
      setIsUpdatingResume(false);
    }
  };

  return {
    isGeneratingName,
    isGeneratingResume,
    isUpdatingResume,
    createResumeWithContent,
    updateResumeWithContent,
    generateResumeName,
    generateResumeContent
  };
}

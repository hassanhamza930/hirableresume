'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/app/store/resumeStore';
import { toast } from 'sonner';

interface CreateResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function CreateResumeDialog({ open, onOpenChange, userId }: CreateResumeDialogProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatingName, setGeneratingName] = useState(false);

  const { createResume } = useResumeStore();

  // Function to generate a resume name using OpenRouter API
  const generateResumeName = async (jobDesc: string, companyInfo: string): Promise<string> => {
    setGeneratingName(true);
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
      setGeneratingName(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate resume name from job description and company info using AI
      const name = await generateResumeName(jobDescription, companyInfo || '');

      const resumeData = {
        name,
        jobDescription,
        companyInfo,
        status: 'draft' as const,
        content: '', // Will be populated later when the resume is customized
      };

      const resumeId = await createResume(resumeData, userId);

      if (resumeId) {
        // Reset form
        setJobDescription('');
        setCompanyInfo('');
        onOpenChange(false);
        toast.success(`Resume "${name}" created successfully`);
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border border-white/10 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-white">Create a New Resume</DialogTitle>
            <DialogDescription className="text-white/60">
              Enter the job description below to create a new resume. The resume will be automatically named in the format "jobtitle@companyname" (e.g., "Data Analyst@Google") based on the information you provide.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="jobDescription" className="text-white">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="h-[150px] max-h-[150px] overflow-y-auto bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="companyInfo" className="text-white">Company Information (Optional)</Label>
              <Textarea
                id="companyInfo"
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
                placeholder="Information about the company (helps with naming the resume as 'jobtitle@companyname')..."
                className="h-[80px] max-h-[80px] overflow-y-auto bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10 shadow-none"
              disabled={isSubmitting || generatingName}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 text-white hover:bg-orange-500 shadow-none"
              disabled={isSubmitting || generatingName}
            >
              {isSubmitting ? 'Creating...' : generatingName ? 'Generating Name...' : 'Create Resume'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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

import { toast } from 'sonner';
import { useResumeLogic } from '@/app/hooks/useResumeLogic';

interface CreateResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function CreateResumeDialog({ open, onOpenChange, userId }: CreateResumeDialogProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');

  const {
    createResumeWithContent,
    isGeneratingName,
    isGeneratingResume
  } = useResumeLogic({ userId });

  const isSubmitting = isGeneratingName || isGeneratingResume;



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    try {
      // Create resume with generated content
      const resumeId = await createResumeWithContent(jobDescription, companyInfo || '');

      if (resumeId) {
        // Reset form
        setJobDescription('');
        setCompanyInfo('');
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume');
    }
  };

  return (
    <Dialog open={open} onOpenChange={isSubmitting ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border border-white/10 text-white">
        {isSubmitting ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-6">
            <img src="/logo.png" className="w-16 h-16 rounded-full animate-pulse"/>
            <div className="text-center space-y-3">
              <h3 className="text-lg font-semibold text-white">
                {isGeneratingName ? 'Analyzing Job Description...' : 'Personalizing Your Resume...'}
              </h3>
              <p className="text-white/60 text-sm max-w-xs mx-auto">
                {isGeneratingName
                  ? 'We are extracting key information from the job description to create a tailored resume.'
                  : 'We are creating a personalized resume based on the job requirements. This may take a moment.'}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-white">Create a New Resume</DialogTitle>
              <DialogDescription className="text-white/60">
                Enter the job description below to create a new resume. We'll automatically generate a tailored resume for you based on the job description. The resume will be named in the format "jobtitle@companyname" (e.g., "Data Analyst@Google").
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
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-600 text-white hover:bg-orange-500 shadow-none"
              >
                Create Resume
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

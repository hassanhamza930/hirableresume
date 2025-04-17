'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FiSend } from 'react-icons/fi';
import { toast } from 'sonner';
import { useResumeStore } from '@/app/store/resumeStore';
import { useResumeLogic } from '@/app/hooks/useResumeLogic';

export default function CustomizationInput() {
  const [input, setInput] = React.useState('');
  const { resumes, selectedResumeId } = useResumeStore();

  // Find the selected resume
  const selectedResume = selectedResumeId ? resumes.find(resume => resume.id === selectedResumeId) : null;

  const { updateResumeWithContent, isUpdatingResume } = useResumeLogic({ userId: selectedResume?.ownerId || '' });

  const handleSubmit = async () => {
    if (!selectedResumeId) {
      toast.error('Please select a resume first');
      return;
    }

    if (!input.trim()) {
      toast.error('Please enter some text to customize your resume');
      return;
    }

    if (!selectedResume?.jobDescription) {
      toast.error('This resume does not have a job description to customize from');
      return;
    }

    try {
      // Update the resume with AI-generated content based on the customization input
      await updateResumeWithContent(
        selectedResumeId,
        input,
        selectedResume.jobDescription,
        selectedResume.companyInfo || ''
      );

      setInput('');
    } catch (error) {
      console.error('Error customizing resume:', error);
      toast.error('Failed to customize resume');
    }
  };

  return (
    <div className="h-full w-full backdrop-blur-xl p-2 rounded-xl">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-0.5">
          <h3 style={{ fontFamily: "Geist" }} className="text-xs font-semibold text-white/60">
            {selectedResume ? 'Customize This Resume' : 'Select a Resume to Customize'}
          </h3>
        </div>

        <div className="flex-1 relative h-[50px] mt-2">
          {isUpdatingResume ? (
            <div className="w-full h-full flex items-center justify-center bg-white/5 border border-orange-400/30 rounded-md">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
                <p className="text-white/80 text-xs p-4">Customizing your resume...</p>
              </div>
            </div>
          ) : (
            <>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={selectedResume
                  ? "E.g., 'Highlight my leadership skills' or paste additional job requirements..."
                  : "Select a resume from the sidebar first..."}
                className="w-full h-full border-none resize-none text-white placeholder:text-white/40 pr-[120px]"
                disabled={!selectedResume}
              />

              <Button
                onClick={handleSubmit}
                className="absolute bottom-0 right-0 bg-orange-600 text-white shadow-none hover:bg-orange-500 h-7 px-3 py-0 text-xs"
                disabled={!selectedResume}
              >
                <FiSend className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

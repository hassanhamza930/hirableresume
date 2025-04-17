'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FiSend } from 'react-icons/fi';
import { toast } from 'sonner';
import { useResumeStore } from '@/app/store/resumeStore';

export default function CustomizationInput() {
  const [input, setInput] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { resumes, selectedResumeId, updateResume } = useResumeStore();

  // Find the selected resume
  const selectedResume = selectedResumeId ? resumes.find(resume => resume.id === selectedResumeId) : null;

  const handleSubmit = async () => {
    if (!selectedResumeId) {
      toast.error('Please select a resume first');
      return;
    }

    if (!input.trim()) {
      toast.error('Please enter some text to customize your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would call an API to process the resume
      // For now, we'll just update the resume with a placeholder message
      const placeholderContent = `
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Your Name</h1>
          <p class="text-gray-600">Your Title</p>
          <div class="flex justify-center gap-4 mt-2 text-sm text-gray-500">
            <span>email@example.com</span>
            <span>•</span>
            <span>Phone Number</span>
            <span>•</span>
            <span>Location</span>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Summary</h2>
          <p class="text-gray-700 text-sm">
            This resume has been customized based on your input: "${input}"
          </p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Experience</h2>
          <div class="mb-3">
            <div class="flex justify-between">
              <h3 class="font-medium text-gray-800">Senior Position</h3>
              <span class="text-sm text-gray-600">2020 - Present</span>
            </div>
            <p class="text-gray-700 text-sm font-medium">Company Name</p>
            <ul class="list-disc list-inside text-sm text-gray-700 mt-1">
              <li>Customized achievement based on your input</li>
              <li>Another achievement relevant to the job</li>
              <li>Skills highlighted based on job requirements</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
          <div class="flex flex-wrap gap-2">
            ${['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'].map((skill) => (
              `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">${skill}</span>`
            )).join('')}
          </div>
        </div>
      `;

      await updateResume(selectedResumeId, {
        content: placeholderContent,
        status: 'completed'
      });

      toast.success('Resume customized successfully!');
      setInput('');
    } catch (error) {
      console.error('Error customizing resume:', error);
      toast.error('Failed to customize resume');
    } finally {
      setIsSubmitting(false);
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
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedResume
              ? "E.g., 'Highlight my leadership skills' or paste additional job requirements..."
              : "Select a resume from the sidebar first..."}
            className="w-full h-full border-none resize-none text-white placeholder:text-white/40 pr-[120px]"
            disabled={!selectedResume || isSubmitting}
          />

          <Button
            onClick={handleSubmit}
            className="absolute bottom-0 right-0 bg-orange-600 text-white shadow-none hover:bg-orange-500 h-7 px-3 py-0 text-xs"
            disabled={!selectedResume || isSubmitting}
          >
            <FiSend className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Processing...' : 'Customize'}
          </Button>
        </div>
      </div>
    </div>
  );
}

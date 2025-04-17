'use client';

import React from 'react';
import SpotlightCard from '@/components/SpotLightCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FiDownload } from 'react-icons/fi';
import { toast } from 'sonner';
import { useResumeStore } from '@/app/store/resumeStore';

export default function ResumePreview() {
  const { resumes, selectedResumeId } = useResumeStore();

  // Find the selected resume
  const selectedResume = selectedResumeId ? resumes.find(resume => resume.id === selectedResumeId) : null;

  return (
    <SpotlightCard
      className="h-full w-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-2 rounded-xl"
      spotlightColor="rgba(255, 255, 255, 0.1)"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 style={{ fontFamily: "Geist" }} className="text-base font-semibold text-white">
              {selectedResume ? selectedResume.name : 'Resume Preview'}
            </h2>
            <p style={{ fontFamily: "Geist Mono" }} className="text-xs text-white/60">
              {selectedResume
                ? `Last updated: ${selectedResume.updatedAt.toLocaleDateString()}`
                : 'Select a resume from the sidebar to view and edit'}
            </p>
          </div>

          {selectedResume && (
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 border-white/20 hover:bg-white/10 text-white"
                onClick={() => toast.info('Download feature coming soon!')}
              >
                <FiDownload size={14} />
              </Button>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1 bg-white/5 rounded-lg border border-white/10 p-2 overflow-y-auto">
          {!selectedResume ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-white/60 text-sm mb-2">No resume selected</p>
              <p className="text-white/40 text-xs">Select a resume from the sidebar or create a new one</p>
            </div>
          ) : selectedResume.content ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full max-w-[600px] mx-auto bg-white rounded-lg p-4 shadow-lg">
                {/* Render the resume content */}
                <div dangerouslySetInnerHTML={{ __html: selectedResume.content }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full max-w-[600px] mx-auto bg-white rounded-lg p-4 shadow-lg">
                {/* Placeholder resume content for new resumes */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Your Name</h1>
                  <p className="text-gray-600">Your Title</p>
                  <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
                    <span>email@example.com</span>
                    <span>•</span>
                    <span>Phone Number</span>
                    <span>•</span>
                    <span>Location</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Summary</h2>
                  <p className="text-gray-700 text-sm">
                    This resume will be customized based on the job description you provided.
                    Use the customization input below to tailor your resume for this specific job.
                  </p>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Experience</h2>
                  <p className="text-gray-700 text-sm italic">
                    Your experience will be highlighted here after customization.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
                  <p className="text-gray-700 text-sm italic">
                    Relevant skills for this job will be highlighted here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </SpotlightCard>
  );
}

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileType, CopyIcon } from 'lucide-react';
import SpotlightCard from '@/components/SpotLightCard';
import { Resume } from './types';
import LoadingOverlay from './LoadingOverlay';

interface ResumePreviewProps {
  resume: Resume;
  onCopyHTML: () => void;
  onDownload: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
  isMobile?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onCopyHTML,
  onDownload,
  isLoading = false,
  loadingMessage,
  isMobile = false
}) => {
  return (
    <div className="flex-1 flex flex-col p-6 pt-2 overflow-hidden">
      {/* Header with title and buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-md font-medium truncate max-w-[200px] md:max-w-none" style={{ fontFamily: "Geist" }}>
          {resume.name}
        </h2>
        <div className="flex gap-2">
          {!isMobile && (
            <Button
              onClick={() => {
                onCopyHTML();
              }}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white transition-all duration-200"
            >
              <CopyIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Copy HTML</span>
            </Button>
          )}
          <Button
            onClick={() => {
              onDownload();
            }}
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            <FileType className="h-4 w-4" />
            <span className={isMobile ? "hidden sm:inline" : ""}>Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Scrollable resume content container */}
      <div className="flex-1 min-h-0 overflow-hidden relative rounded-2xl">
        <SpotlightCard
          className="w-full h-full border border-white/10 bg-white backdrop-blur-xl"
          spotlightColor="rgba(255, 255, 255, 0.05)"
        >
          {isMobile ? (
            <div className="bg-white h-full overflow-auto">
              {/* Outer container for scrolling */}
              <div className="w-full py-4 flex justify-center">
                {/* This is a wrapper to handle the scaling */}
                <div style={{
                  transform: 'scale(0.5)',
                  transformOrigin: 'top center',
                  marginBottom: '50px'
                }}>
                  {/* Fixed width A4 container */}
                  <div
                    className="bg-white text-zinc-950 py-6 px-4 shadow-md"
                    style={{
                      // This is a standard A4 width
                      width: '595px',
                    }}
                  >
                    {/* The actual resume content */}
                    <div
                      className="resume-content"
                      dangerouslySetInnerHTML={{ __html: resume.content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-white text-zinc-950 p-10 h-full overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: resume.content }}
            />
          )}
        </SpotlightCard>

        {/* Loading overlay */}
        <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
      </div>
    </div>
  );
};

export default ResumePreview;

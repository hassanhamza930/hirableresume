'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DownloadIcon, CopyIcon } from 'lucide-react';
import SpotlightCard from '@/components/SpotLightCard';
import { Resume } from './types';

interface ResumePreviewProps {
  resume: Resume;
  onCopyHTML: () => void;
  onDownload: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onCopyHTML,
  onDownload
}) => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      {/* Header with title and buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-md font-medium" style={{ fontFamily: "Geist" }}>
          {resume.name}
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={(e) => {
              onCopyHTML();
            }}
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            <CopyIcon className="h-4 w-4" />
            <span>Copy HTML</span>
          </Button>
          <Button
            onClick={(e) => {
              onDownload();
            }}
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white transition-all duration-200"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      {/* Scrollable resume content container */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <SpotlightCard
          className="w-full h-full border border-white/10 bg-white backdrop-blur-xl"
          spotlightColor="rgba(255, 255, 255, 0.05)"
        >
          <div
            className="bg-white text-zinc-950 p-10 h-full overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: resume.content }}
          />
        </SpotlightCard>
      </div>
    </div>
  );
};

export default ResumePreview;

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
    <div className="flex-1 flex flex-col">
      {/* Fixed header with title and buttons */}
      <div className="p-6 pb-3 sticky top-0 bg-zinc-950/95 backdrop-blur-xl z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "Geist" }}>
            {resume.name}
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={onCopyHTML}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white"
            >
              <CopyIcon className="h-4 w-4" />
              <span>Copy HTML</span>
            </Button>
            <Button
              onClick={onDownload}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white"
            >
              <DownloadIcon className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable resume content */}
      <div className="px-6 pb-6 flex-1 overflow-y-auto">
        <SpotlightCard
          className="w-full border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-6 min-h-[400px] max-h-[calc(100vh-300px)] overflow-y-auto"
          spotlightColor="rgba(255, 255, 255, 0.05)"
        >
          <div
            className="text-white"
            dangerouslySetInnerHTML={{ __html: resume.content }}
          />
        </SpotlightCard>
      </div>
    </div>
  );
};

export default ResumePreview;

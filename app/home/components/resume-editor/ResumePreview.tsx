'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5); // Default scale for mobile
  const [desktopScale, setDesktopScale] = useState(1); // Default scale for desktop

  // Function to calculate and update scale based on container width
  const updateScale = () => {
    // Mobile scaling
    if (containerRef.current && isMobile) {
      const containerWidth = containerRef.current.clientWidth;
      // A4 width is 595px, calculate scale to fit container width with some padding
      const newScale = (containerWidth - 20) / 595; // 10px padding on each side
      setScale(newScale);
    }

    // Desktop scaling
    if (desktopContainerRef.current && !isMobile) {
      const containerWidth = desktopContainerRef.current.clientWidth;

      // A4 width is 595px
      const a4Width = 595;

      // Calculate scale to fit container width with some padding
      const widthScale = (containerWidth - 80) / a4Width; // 40px padding on each side

      // Use a scale that fits the width but cap at 1 to prevent too large scaling
      const newScale = Math.min(widthScale, 1);
      setDesktopScale(newScale);
    }
  };

  // Update scale on mount and when container size changes
  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isMobile]);
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
            <div className="bg-white h-full w-full overflow-auto" ref={containerRef}>
              {/* Outer container for scrolling */}
              <div className="w-full py-4 flex h-full justify-center">
                {/* This is a wrapper to handle the scaling */}
                <div style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
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
            <div className="bg-black h-full w-full overflow-auto" ref={desktopContainerRef}>
              {/* Outer container for scrolling - desktop version */}
              <div className="w-full flex flex-row justify-center items-start">
                {/* This is a wrapper to handle the scaling */}
                <div style={{
                  transform: `scale(${desktopScale})`,
                  transformOrigin: 'top center',
                  width:"100%"
                }}
                className='flex flex-row justfiy-center items-center'
                >
                  {/* Fixed width A4 container */}
                  <div
                    className="bg-zinc-950 text-zinc-950 shadow-xl w-full flex flex-row justify-center items-center"
                    style={{
                      // This is a standard A4 width and height
                      // minHeight: '842px',
                    }}
                  >
                    {/* The actual resume content */}
                    <div
                      className="resume-content  max-w-[900px] bg-white  py-6 px-6"
                      dangerouslySetInnerHTML={{ __html: resume.content }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </SpotlightCard>

        {/* Loading overlay */}
        <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
      </div>
    </div>
  );
};

export default ResumePreview;

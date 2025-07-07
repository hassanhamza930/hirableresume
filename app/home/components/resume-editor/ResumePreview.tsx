'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Download, CopyIcon, Undo, Redo } from 'lucide-react'; // Added Undo, Redo
import SpotlightCard from '@/components/SpotLightCard';
import { Resume } from './types';
import { useResumeStore } from '@/app/store/resumeStore'; // Added store import
import LoadingOverlay from './LoadingOverlay';

interface ResumePreviewProps {
  resume: Resume;
  onCopyHTML: () => void;
  onDownload: () => void;
  isLoading?: boolean;
  loadingMessage?: string;
  isMobile?: boolean;
  onElementSelect: (elementHtml: string) => void;
  selectedElements: string[];
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  onCopyHTML,
  onDownload,
  isLoading = false,
  loadingMessage,
  isMobile = false,
  onElementSelect,
  selectedElements,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5); // Default scale for mobile
  const [desktopScale, setDesktopScale] = useState(1); // Default scale for desktop

  // Get undo/redo functions and state from the store
  // Select actions (stable references)
  const undoContentChange = useResumeStore(state => state.undoContentChange);
  const redoContentChange = useResumeStore(state => state.redoContentChange);
  // Select state values that determine button disabled status
  const isUndoPossible = useResumeStore(state => state.canUndo());
  const isRedoPossible = useResumeStore(state => state.canRedo());

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

  useEffect(() => {
    const contentContainer = isMobile ? containerRef.current : desktopContainerRef.current;
    if (!contentContainer) return;

    const selectableSelector = 'p, li, h1, h2, h3, h4, h5, h6, div:not(:has(p, li, h1, h2, h3, h4, h5, h6, div))';

    // Helper to get the canonical HTML for an element, stripped of our dynamic classes
    const getCleanHtml = (el: HTMLElement) => {
        // Create a new element of the same type
        const tempEl = document.createElement(el.tagName);
        
        // Copy only the essential attributes and content
        tempEl.innerHTML = el.innerHTML;
        
        // Copy id if it exists
        if (el.id) tempEl.id = el.id;
        
        // Copy only original classes (not our dynamic ones)
        const dynamicClasses = ['bg-blue-500/20', 'bg-blue-500/50', 'rounded-sm'];
        el.classList.forEach(cls => {
            if (!dynamicClasses.includes(cls)) {
                tempEl.classList.add(cls);
            }
        });
        
        return tempEl.outerHTML;
    };

    // Debug: Log selected elements array for debugging
    console.log('Current selectedElements:', selectedElements);
    
    // 1. Update visual state of all elements based on selection
    const allSelectableElements = Array.from(contentContainer.querySelectorAll(selectableSelector)) as HTMLElement[];
    
    // First, remove all selection highlights to start fresh
    allSelectableElements.forEach(el => {
        el.classList.remove('bg-blue-500/50');
    });
    
    // Then apply highlights to selected elements
    allSelectableElements.forEach(el => {
        if (el.innerText.trim() === '') return;
        
        const cleanHtml = getCleanHtml(el);
        const isSelected = selectedElements.includes(cleanHtml);
        
        if (isSelected) {
            console.log('Highlighting element:', cleanHtml.substring(0, 50) + '...');
            el.classList.add('bg-blue-500/50');
            el.classList.remove('bg-blue-500/20', 'rounded-sm'); // Ensure hover style is removed
        }
    });

    // 2. Set up event delegation for hover and click
    const getSelectableTarget = (target: EventTarget | null): HTMLElement | null => {
        if (!(target instanceof HTMLElement)) return null;
        const el = target.closest(selectableSelector);
        const resumeContentDiv = contentContainer.querySelector('.resume-content');
        if (el instanceof HTMLElement && resumeContentDiv?.contains(el) && el.innerText.trim() !== '') {
            return el;
        }
        return null;
    };

    const handleMouseOver = (e: MouseEvent) => {
        const el = getSelectableTarget(e.target);
        if (el && !el.classList.contains('bg-blue-500/50')) { // Don't apply hover if selected
            el.classList.add('bg-blue-500/20', 'rounded-sm');
            el.style.cursor = 'pointer';
        }
    };

    const handleMouseOut = (e: MouseEvent) => {
        const el = getSelectableTarget(e.target);
        if (el) {
            el.classList.remove('bg-blue-500/20', 'rounded-sm');
            el.style.cursor = '';
        }
    };

    const handleClick = (e: MouseEvent) => {
        const el = getSelectableTarget(e.target);
        if (el) {
            e.preventDefault();
            e.stopPropagation();
            const cleanHtml = getCleanHtml(el);
            console.log('Selected element HTML:', cleanHtml); // Debug log
            onElementSelect(cleanHtml);
        }
    };

    contentContainer.addEventListener('mouseover', handleMouseOver);
    contentContainer.addEventListener('mouseout', handleMouseOut);
    contentContainer.addEventListener('click', handleClick);

    // Cleanup function
    return () => {
        contentContainer.removeEventListener('mouseover', handleMouseOver);
        contentContainer.removeEventListener('mouseout', handleMouseOut);
        contentContainer.removeEventListener('click', handleClick);
    };

}, [resume.content, selectedElements, onElementSelect, isMobile]);

  return (
    <>
      <style jsx global>{`
        [data-selected='true'], [data-selected='true'] * {
          color: white !important;
        }
      `}</style>
    <div className="flex-1 flex flex-col p-6 pt-2 overflow-hidden">
      {/* Header with title and buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-md font-medium truncate max-w-[200px] md:max-w-none" style={{ fontFamily: "Geist" }}>
          {resume.name}
        </h2>
        <div className="flex gap-2 items-center"> {/* Added items-center */}
          {/* Undo Button */}
          <Button
            onClick={undoContentChange}
            disabled={!isUndoPossible} // Use the selected state value
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Undo change"
          >
            <Undo className="h-4 w-4" />
            <span className="hidden sm:inline">Undo</span>
          </Button>

          {/* Redo Button */}
          <Button
            onClick={redoContentChange}
            disabled={!isRedoPossible} // Use the selected state value
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-white/20 bg-zinc-900/80 text-white hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Redo change"
          >
            <Redo className="h-4 w-4" />
            <span className="hidden sm:inline">Redo</span>
          </Button>

          {/* Separator (Optional) */}
          <div className="h-6 w-px bg-white/20 mx-1"></div>

          {/* Existing Buttons */}
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
            <Download className="h-4 w-4" />
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
    </>
  );
};

export default ResumePreview;

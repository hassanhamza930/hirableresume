'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResumeList from './ResumeList';
import ResumePreview from './ResumePreview';
import ResumeEditor from './ResumeEditBottomInput';
import CreateResumeModal from './CreateResumeModal';
import { toast } from 'sonner';
import useResumeLogic from '../../hooks/useResumeLogic';
import { useResumeStore } from '@/app/store/resumeStore';
import LoadingOverlay from './LoadingOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'motion/react';

interface ResumeEditorComponentProps {
  showMobileResumeList: boolean;
  setShowMobileResumeList: (show: boolean) => void;
}

const ResumeEditorComponent: React.FC<ResumeEditorComponentProps> = ({
  showMobileResumeList,
  setShowMobileResumeList
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreatingNewResume, setIsCreatingNewResume] = useState(false);
  const [showMobileResume, setShowMobileResume] = useState(false);
  const { createResume, updateResume, isLoading } = useResumeLogic();
  const { resumes, selectedResumeId, selectResume } = useResumeStore();
  const router = useRouter();
  const isMobile = useIsMobile();

  // Find the currently selected resume
  const selectedResume = resumes.find(resume => resume.id === selectedResumeId);

  // Handle opening the create resume modal
  const handleCreateResume = () => {
    setIsCreateModalOpen(true);
  };

  // Handle closing the create resume modal
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  // Handle creating a new resume with job description
  const handleCreateNewResume = async (jobDescription: string) => {
    // Set creating new resume state to true to show loading overlay
    setIsCreatingNewResume(true);

    try {
      // Create a new resume using the useResumeLogic hook
      const newResume = await createResume(jobDescription);

      if (!newResume) {
        toast.error('Failed to create resume');
      }
    } finally {
      // Reset creating state when done
      setIsCreatingNewResume(false);
    }
  };

  // Effect to handle mobile resume view
  useEffect(() => {
    if (isMobile && selectedResumeId) {
      setShowMobileResumeList(false);
    } else if (!selectedResumeId) {
      setShowMobileResumeList(true);
    }
  }, [isMobile, selectedResumeId, setShowMobileResumeList]);

  // Handle clearing selected resume
  const handleClearSelectedResume = () => {
    selectResume(null);
  };

  // Handle copying resume HTML
  const handleCopyHTML = () => {
    if (selectedResume) {
      navigator.clipboard.writeText(selectedResume.content)
        .then(() => {
          toast.success('Resume HTML copied to clipboard!');
        })
        .catch((error) => {
          console.error('Error copying to clipboard:', error);
          toast.error('Failed to copy HTML to clipboard');
        });
    }
  };

  // Handle downloading resume as PDF
  const handleDownload = () => {
    if (selectedResume && selectedResumeId) {
      try {
        // First navigate to the print route with just the resume ID
        router.push(`/print?id=${selectedResumeId}`);



      } catch (error) {
        console.error('Error preparing PDF download:', error);
        toast.error('Failed to prepare PDF download');
      }
    } else {
      toast.error('No resume selected');
    }
  };

  // Handle updating resume content
  const handleUpdateResume = async (userRequest: string) => {
    if (selectedResumeId) {
      const success = await updateResume(selectedResumeId, userRequest);

      if (!success) {
        toast.error('Failed to update resume');
      }
    } else {
      toast.error('No resume selected');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-[calc(100vh-64px)] mt-16 overflow-hidden">
        {/* Mobile View Logic */}
        {isMobile ? (
          <AnimatePresence mode="wait">
            {showMobileResumeList || !selectedResume ? (
              /* Mobile Resume List View */
              <motion.div
                key="mobile-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col"
              >
                <ResumeList
                  onCreateResume={handleCreateResume}
                />
              </motion.div>
            ) : (
              /* Mobile Resume Detail View */
              <motion.div
                key="mobile-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col"
              >
                {/* No back button here anymore - moved to navbar */}

                {/* Resume Preview */}
                <div className="flex-1 h-full flex flex-col overflow-hidden relative">
                  <ResumePreview
                    resume={selectedResume}
                    onCopyHTML={handleCopyHTML}
                    onDownload={handleDownload}
                    isLoading={isLoading}
                    loadingMessage={'Adding magic to your resume...'}
                    isMobile={true}
                  />

                  {/* Resume Editor */}
                  <ResumeEditor
                    onUpdateResume={handleUpdateResume}
                    isLoading={isLoading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          /* Desktop View */
          <>
            {/* Left Column - Resume List */}
            <ResumeList
              onCreateResume={handleCreateResume}
            />

            {/* Right Column - Resume Preview and Editor */}
            <div className="flex-1 h-full flex flex-col overflow-hidden relative">
              {selectedResume ? (
                <>
                  {/* Resume Preview */}
                  <ResumePreview
                    resume={selectedResume}
                    onCopyHTML={handleCopyHTML}
                    onDownload={handleDownload}
                    isLoading={isLoading}
                    loadingMessage={'Adding magic to your resume...'}
                  />

                  {/* Resume Editor */}
                  <ResumeEditor
                    onUpdateResume={handleUpdateResume}
                    isLoading={isLoading}
                  />
                </>
              ) : isCreatingNewResume ? (
                <div className="flex-1 flex flex-col p-6 overflow-hidden relative">
                  <div className="flex-1 min-h-0 overflow-hidden relative bg-zinc-900/50 rounded-lg border border-white/10">
                    <LoadingOverlay isVisible={true} message={'Creating your tailored resume...'} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-white/60">Select a resume or create a new one</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Create Resume Modal */}
      <CreateResumeModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onCreateResume={handleCreateNewResume}
        isLoading={isLoading}
      />
    </>
  );
};

export default ResumeEditorComponent;

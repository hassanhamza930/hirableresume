'use client';

import React, { useState } from 'react';
import ResumeList from './ResumeList';
import ResumePreview from './ResumePreview';
import ResumeEditor from './ResumeEditBottomInput';
import CreateResumeModal from './CreateResumeModal';
import { toast } from 'sonner';
import useResumeLogic from '../../hooks/useResumeLogic';
import { useResumeStore } from '@/app/store/resumeStore';

const ResumeEditorComponent: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { createResume, updateResume, isLoading } = useResumeLogic();
  const { resumes, selectedResumeId } = useResumeStore();

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
    // Create a new resume using the useResumeLogic hook
    toast.loading('Creating your tailored resume...', { id: 'create-resume' });

    const newResume = await createResume(jobDescription);

    if (newResume) {
      toast.success('Resume created successfully!', { id: 'create-resume' });
      // In a real implementation, we would select the newly created resume
      // setSelectedResumeId(newResume.id);
    } else {
      toast.error('Failed to create resume', { id: 'create-resume' });
    }
  };

  // No need for handleSelectResume as it's now handled in the ResumeList component

  // Handle copying resume HTML
  const handleCopyHTML = () => {
    if (selectedResume) {
      navigator.clipboard.writeText(selectedResume.content);
      alert('Resume HTML copied to clipboard!');
    }
  };

  // Handle downloading resume
  const handleDownload = () => {
    if (selectedResume) {
      const blob = new Blob([selectedResume.content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedResume.name.replace('@', '-')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Handle updating resume content
  const handleUpdateResume = async (content: string) => {
    if (selectedResumeId) {
      toast.loading('Updating resume...', { id: 'update-resume' });
      const success = await updateResume(selectedResumeId, content);

      if (success) {
        toast.success('Resume updated successfully!', { id: 'update-resume' });
      } else {
        toast.error('Failed to update resume', { id: 'update-resume' });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-[calc(100vh-64px)] mt-16 overflow-hidden">
        {/* Left Column - Resume List */}
        <ResumeList
          onCreateResume={handleCreateResume}
        />

        {/* Right Column - Resume Preview and Editor */}
        <div className="flex-1 h-full flex flex-col overflow-hidden">
          {selectedResume ? (
            <>
              {/* Resume Preview */}
              <ResumePreview
                resume={selectedResume}
                onCopyHTML={handleCopyHTML}
                onDownload={handleDownload}
              />

              {/* Resume Editor */}
              <ResumeEditor
                onUpdateResume={handleUpdateResume}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/60">Select a resume or create a new one</p>
            </div>
          )}
        </div>
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

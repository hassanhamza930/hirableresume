'use client';

import React, { useState } from 'react';
import ResumeList from './ResumeList';
import ResumePreview from './ResumePreview';
import ResumeEditor from './ResumeEditor';
import { PLACEHOLDER_RESUMES } from './types';

const ResumeEditorComponent: React.FC = () => {
  const [selectedResumeId, setSelectedResumeId] = useState<string>(PLACEHOLDER_RESUMES[0].id);
  
  // Find the currently selected resume
  const selectedResume = PLACEHOLDER_RESUMES.find(resume => resume.id === selectedResumeId);
  
  // Handle creating a new resume (placeholder)
  const handleCreateResume = () => {
    // This would open a modal in a real implementation
    alert('This would open a modal to create a new resume');
  };
  
  // Handle selecting a resume
  const handleSelectResume = (id: string) => {
    setSelectedResumeId(id);
  };
  
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
  const handleUpdateResume = (content: string) => {
    alert(`In a real implementation, this would update the resume with: ${content}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[calc(100vh-64px)] mt-16">
      {/* Left Column - Resume List */}
      <ResumeList 
        resumes={PLACEHOLDER_RESUMES}
        selectedResumeId={selectedResumeId}
        onSelectResume={handleSelectResume}
        onCreateResume={handleCreateResume}
      />
      
      {/* Right Column - Resume Preview and Editor */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col">
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
  );
};

export default ResumeEditorComponent;

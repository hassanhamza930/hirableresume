'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ResumeEditorProps {
  onUpdateResume: (content: string) => void;
  isLoading?: boolean;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ onUpdateResume, isLoading = false }) => {
  const [editContent, setEditContent] = useState<string>('');

  const handleSubmit = () => {
    if (editContent.trim()) {
      onUpdateResume(editContent);
      setEditContent('');
    }
  };

  // Handle key press events
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter is pressed without Shift, submit the form
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      // Only submit if not loading and there's content
      if (!isLoading && editContent.trim()) {
        handleSubmit();
      }
    }
    // If Shift+Enter is pressed, allow the default behavior (new line)
  };

  return (
    <div className="p-4 sm:p-6 py-3 sm:py-4 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl">
      <h3 className="text-white text-sm font-medium mb-2 hidden sm:block" style={{ fontFamily: "Geist" }}>
        Customize Your Resume
      </h3>
      <div className="relative">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your customization request here..."
          className="w-full h-16 sm:h-24 bg-zinc-900/90 border border-yellow-500/30 border-dashed rounded-md p-3 pb-12 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50 resize-none text-sm sm:text-base"
        />

        <div className="absolute bottom-3 sm:bottom-5 right-3">
          <Button
            onClick={handleSubmit}
            disabled={!editContent.trim() || isLoading}
            size="sm"
            className="flex items-center gap-1 text-black bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                <span className="text-xs sm:text-sm">Updating...</span>
              </>
            ) : (
              <span className="text-xs sm:text-sm">Update Resume</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;

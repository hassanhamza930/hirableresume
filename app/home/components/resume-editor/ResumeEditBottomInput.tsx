'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Send, X } from 'lucide-react';

interface ResumeEditorProps {
  onUpdateResume: (content: string) => void;
  isLoading?: boolean;
  selectedElements: string[];
  onClearSelection: () => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({
  onUpdateResume,
  isLoading = false,
  selectedElements = [],
  onClearSelection
}) => {
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
      {selectedElements.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-col gap-1 bg-blue-600/10 border border-blue-500/30 rounded-lg p-2 text-xs text-blue-300 w-full">
            <div className="flex justify-between items-center">
                <span className="font-semibold">{selectedElements.length} element{selectedElements.length !== 1 ? 's' : ''} selected</span>
                <button onClick={onClearSelection} className="ml-2 text-blue-300/70 hover:text-blue-300">
                  <X className="h-4 w-4" />
                </button>
            </div>
            <p className="font-mono text-white/70 max-h-24 overflow-y-auto" dangerouslySetInnerHTML={{ __html: `Preview: ${selectedElements[0]}` }} />
          </div>
        </div>
      )}
      <h3 className="text-white text-sm font-medium mb-2 hidden sm:block" style={{ fontFamily: "Geist" }}>
        Customize Your Resume
      </h3>
      <div className="relative">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your customization request here..."
          className="w-full h-24 bg-zinc-900/90 border border-yellow-500/30 border-dashed rounded-md p-3 pr-14 pb-12 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50 resize-none text-sm sm:text-base"
        />

        <div className="absolute bottom-5 right-3">
          <Button
            onClick={handleSubmit}
            disabled={!editContent.trim() || isLoading}
            size="icon"
            className="rounded-full w-9 h-9 text-black bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 shadow-none flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;

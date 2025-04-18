'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ResumeEditorProps {
  onUpdateResume: (content: string) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ onUpdateResume }) => {
  const [editContent, setEditContent] = useState<string>('');

  const handleSubmit = () => {
    if (editContent.trim()) {
      onUpdateResume(editContent);
      setEditContent('');
    }
  };

  return (
    <div className="p-6 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl sticky bottom-0 z-10">
      <h3 className="text-white text-sm font-medium mb-2" style={{ fontFamily: "Geist" }}>
        Customize Your Resume
      </h3>
      <div className="relative">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Enter your customization request here..."
          className="w-full h-24 bg-zinc-900/90 border border-orange-500/30 border-dashed rounded-md p-3 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/50 resize-none"
        />
        <div className="flex justify-end mt-2">
          <Button
            onClick={handleSubmit}
            disabled={!editContent.trim()}
            className="flex items-center gap-1 text-white"
          >
            Update Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;

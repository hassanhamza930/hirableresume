'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ResumeItem from './ResumeItem';
import { Resume } from './types';

interface ResumeListProps {
  resumes: Resume[];
  selectedResumeId: string;
  onSelectResume: (id: string) => void;
  onCreateResume: () => void;
}

const ResumeList: React.FC<ResumeListProps> = ({ 
  resumes, 
  selectedResumeId, 
  onSelectResume, 
  onCreateResume 
}) => {
  return (
    <div className="w-full md:w-[350px] h-full border-r border-white/10 overflow-y-auto">
      <div className="p-4 sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold" style={{ fontFamily: "Geist" }}>Your Resumes</h2>
          <Button 
            onClick={onCreateResume}
            className="flex items-center gap-1"
            size="sm"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New</span>
          </Button>
        </div>
        <Separator className="bg-white/10" />
      </div>
      
      <div className="p-4">
        {resumes.map((resume) => (
          <ResumeItem
            key={resume.id}
            resume={resume}
            isSelected={selectedResumeId === resume.id}
            onSelect={onSelectResume}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeList;

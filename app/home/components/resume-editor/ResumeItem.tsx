'use client';

import React from 'react';
import SpotlightCard from '@/components/SpotLightCard';
import { cn } from '@/lib/utils';
import { Resume, formatDate } from './types';

interface ResumeItemProps {
  resume: Resume;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ResumeItem: React.FC<ResumeItemProps> = ({ resume, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(resume.id)}
      className="cursor-pointer"
    >
      <div className={`flex flex-col border-2 hover:bg-yellow-400/10 ${isSelected == true ? "border-yellow-400/40" : "border-yellow-400/0"} border-dashed mb-3 p-3 transition-all duration-300 rounded-lg`}>
        <h3
          className={cn(
            "font-medium text-sm",
            isSelected ? "text-yellow-400" : "text-white"
          )}
          style={{ fontFamily: "Geist" }}
        >
          {resume.name}
        </h3>
        <span className={cn(
          "text-xs mt-1",
          isSelected ? "text-yellow-400/70" : "text-white/60"
        )}>
          {formatDate(resume.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ResumeItem;

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
      <SpotlightCard
        className={cn(
          "mb-3 p-3 transition-all duration-300 hover:border-white/30",
          isSelected ? "border-white/30" : "border-white/10"
        )}
        spotlightColor="rgba(255, 255, 255, 0.1)"
      >
        <div className="flex flex-col">
          <h3 className="text-white font-medium text-sm" style={{ fontFamily: "Geist" }}>
            {resume.name}
          </h3>
          <span className="text-white/60 text-xs mt-1">
            {formatDate(resume.createdAt)}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default ResumeItem;

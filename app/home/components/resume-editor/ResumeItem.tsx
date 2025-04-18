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
          "mb-3 p-3 transition-all duration-300",
          isSelected
            ? "border-orange-500/50 bg-zinc-900/80 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
            : "border-white/10 hover:border-white/30"
        )}
        spotlightColor={isSelected ? "rgba(249, 115, 22, 0.1)" : "rgba(255, 255, 255, 0.1)"}
      >
        <div className="flex flex-col">
          <h3
            className={cn(
              "font-medium text-sm",
              isSelected ? "text-orange-400" : "text-white"
            )}
            style={{ fontFamily: "Geist" }}
          >
            {resume.name}
          </h3>
          <span className={cn(
            "text-xs mt-1",
            isSelected ? "text-orange-400/70" : "text-white/60"
          )}>
            {formatDate(resume.createdAt)}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default ResumeItem;

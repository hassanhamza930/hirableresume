'use client';

import React from 'react';
import { motion } from 'motion/react';
import SpotlightCard from '@/components/SpotLightCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FiFileText, FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Placeholder data for resumes
const placeholderResumes = [
  { id: '1', name: 'Software Engineer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '2', name: 'Product Manager Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '3', name: 'Data Scientist Resume', createdAt: new Date(), updatedAt: new Date(), status: 'draft' },
  { id: '4', name: 'UX Designer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '5', name: 'Marketing Specialist Resume', createdAt: new Date(), updatedAt: new Date(), status: 'draft' },
  { id: '6', name: 'Frontend Developer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '7', name: 'Backend Developer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '8', name: 'Full Stack Developer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'draft' },
  { id: '9', name: 'DevOps Engineer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '10', name: 'Cloud Architect Resume', createdAt: new Date(), updatedAt: new Date(), status: 'draft' },
  { id: '11', name: 'Mobile Developer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '12', name: 'Game Developer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'draft' },
  { id: '13', name: 'QA Engineer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
  { id: '14', name: 'Technical Writer Resume', createdAt: new Date(), updatedAt: new Date(), status: 'draft' },
  { id: '15', name: 'Project Manager Resume', createdAt: new Date(), updatedAt: new Date(), status: 'completed' },
];

export default function ResumeList({ onSelectResume }: { onSelectResume?: (id: string) => void }) {
  return (
    <SpotlightCard
      className="h-full w-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-2 rounded-xl"
      spotlightColor="rgba(255, 255, 255, 0.1)"
    >
      <div className="flex flex-col h-full p-2">
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <h2 style={{ fontFamily: "Geist" }} className="text-base font-semibold text-white">Your Resumes</h2>
          </div>
          <Button
            className="w-full flex flex-row items-center justify-center gap-1 shadow-none"
            onClick={() => toast.info('Create new resume feature coming soon!')}
          >
            <FiPlus size={12} />
            <span>Create a new resume</span>
          </Button>
        </div>

        <Separator className="bg-white/10 my-2 w-full" />

        <ScrollArea className="flex-1 h-[calc(100%-70px)] overflow-auto w-full">
          <div className="space-y-3">
            {placeholderResumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSelectResume && onSelectResume(resume.id)}
              >
                <ResumeItem resume={resume} />
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </SpotlightCard>
  );
}

function ResumeItem({ resume }: { resume: typeof placeholderResumes[0] }) {
  return (
    <SpotlightCard
      className="p-2 border border-white/10 hover:border-white/20 bg-white/5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10"
      spotlightColor="rgba(255, 255, 255, 0.15)"
    >
      <div className="flex items-center gap-3">
        <div className="text-white/70">
          <FiFileText size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 style={{ fontFamily: "Geist" }} className="text-sm font-medium text-white truncate">
            {resume.name}
          </h3>
          <p style={{ fontFamily: "Geist Mono" }} className="text-xs text-white/60">
            Updated {resume.updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

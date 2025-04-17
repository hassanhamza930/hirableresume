'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import SpotlightCard from '@/components/SpotLightCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FiFileText, FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useResumeStore } from '@/app/store/resumeStore';
import { Resume } from '@/app/interfaces';
import CreateResumeDialog from './CreateResumeDialog';
import { useUserStore } from '@/app/store/userStore';
import { formatRelativeTime } from '@/app/utils/formatTime';

export default function ResumeList({ onSelectResume }: { onSelectResume?: (id: string) => void }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { resumes, isLoading, fetchResumes, setSelectedResumeId, selectedResumeId } = useResumeStore();
  const { userData } = useUserStore();

  // Sort resumes by updatedAt date in descending order (newest first)
  const sortedResumes = useMemo(() => {
    return [...resumes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [resumes]);

  // Set up the onSnapshot listener when the component mounts
  useEffect(() => {
    if (!userData?.uid) return;

    // Start listening to resumes collection
    const unsubscribe = fetchResumes(userData.uid);

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [userData?.uid, fetchResumes]);

  // Handle resume selection
  const handleSelectResume = (id: string) => {
    setSelectedResumeId(id);
    if (onSelectResume) onSelectResume(id);
  };

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
            onClick={() => setDialogOpen(true)}
          >
            <FiPlus size={12} />
            <span>Create a new resume</span>
          </Button>
        </div>

        <Separator className="bg-white/10 my-2 w-full" />

        <ScrollArea className="flex-1 h-[calc(100%-70px)] overflow-auto w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/60 text-sm">Loading your resumes...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-white/60 text-sm mb-2">You don't have any resumes yet</p>
              <p className="text-white/40 text-xs">Click the "Create a new resume" button to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleSelectResume(resume.id)}
                >
                  <ResumeItem resume={resume} isSelected={resume.id === selectedResumeId} />
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Create Resume Dialog */}
      {userData?.uid && (
        <CreateResumeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          userId={userData.uid}
        />
      )}
    </SpotlightCard>
  );
}

function ResumeItem({ resume, isSelected }: { resume: Resume; isSelected: boolean }) {
  // Format the updated time in a human-readable format
  const timeAgo = formatRelativeTime(resume.updatedAt);

  return (
    <SpotlightCard
      className={`p-2 border ${isSelected ? 'border-orange-400/70 bg-white/10' : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10'} rounded-lg cursor-pointer transition-all duration-200`}
      spotlightColor={isSelected ? "rgba(255, 165, 0, 0.2)" : "rgba(255, 255, 255, 0.15)"}
    >
      <div className="flex items-center gap-3">
        <div className={isSelected ? "text-orange-400" : "text-white/70"}>
          <FiFileText size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 style={{ fontFamily: "Geist" }} className={`text-sm font-medium ${isSelected ? 'text-orange-400' : 'text-white'} truncate`}>
            {resume.name}
          </h3>
          <p style={{ fontFamily: "Geist Mono" }} className="text-xs text-white/60">
            Updated {timeAgo}
          </p>
        </div>
      </div>
    </SpotlightCard>
  );
}

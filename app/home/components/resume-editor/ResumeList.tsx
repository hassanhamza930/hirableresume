'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ResumeItem from './ResumeItem';
import { Resume } from './types';
import { useResumeStore } from '@/app/store/resumeStore';
import { useAuth } from '@/app/hooks/useAuth';
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

interface ResumeListProps {
  onCreateResume: () => void;
}

const ResumeList: React.FC<ResumeListProps> = ({
  onCreateResume
}) => {
  const { user } = useAuth();
  const { resumes, selectedResumeId, selectResume, setResumes, setLoading } = useResumeStore();

  // Set up Firebase listener for resumes
  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);

    const db = getFirestore();
    const resumesRef = collection(db, 'resumes');
    const resumesQuery = query(
      resumesRef,
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(resumesQuery, (snapshot) => {
      const resumeList: Resume[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        resumeList.push({
          ...data,
          id: data.id || doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Resume);
      });

      setResumes(resumeList);
    }, (error) => {
      console.error('Error fetching resumes:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid, setResumes, setLoading]);

  // Handle selecting a resume
  const handleSelectResume = (id: string) => {
    selectResume(id);
  };
  return (
    <div className="w-full md:w-[350px] h-full border-r border-white/10 flex flex-col">
      {/* Header with title and Create New Resume button */}
      <div className="p-4 bg-zinc-950/90 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold" style={{ fontFamily: "Geist" }}>Your Resumes</h2>
        </div>

        {/* Full-width Create New Resume button */}
        <Button
          onClick={onCreateResume}
          className="w-full shadow-md"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="font-medium">Create New Resume</span>
        </Button>

        <Separator className="bg-white/10" />
      </div>

      {/* Resume list */}
      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        {resumes.map((resume) => (
          <ResumeItem
            key={resume.id}
            resume={resume}
            isSelected={selectedResumeId === resume.id}
            onSelect={handleSelectResume}
          />
        ))}
      </div>
    </div>
  );
};

export default ResumeList;

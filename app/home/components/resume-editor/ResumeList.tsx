'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
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
  const [searchQuery, setSearchQuery] = useState('');

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
        // Use the Firestore document ID as the unique identifier
        const firebaseId = doc.id;
        resumeList.push({
          ...data,
          // Use the Firestore document ID for the key, but keep the custom ID for internal references
          firebaseId,
          id: data.id, // Keep the original ID for references
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

  // Filter resumes based on search query
  const filteredResumes = resumes.filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

        {/* Search input */}
        <div className="relative mt-4 mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="h-4 w-4 text-white/50" />
          </div>
          <Input
            type="text"
            placeholder="Search resumes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 bg-zinc-900/50 border-white/40 hover:border-white/80 focus:ring-0 text-white placeholder:text-white/50 hover:outline-none focus:outline-none outline-none"
          />
        </div>

        <Separator className="bg-white/10" />
      </div>

      {/* Resume list */}
      <div className="p-4 pt-0 flex flex-col flex-1 overflow-y-auto">
        {resumes.length > 0 ? (
          filteredResumes.length > 0 ? (
            filteredResumes.map((resume) => (
              <ResumeItem
                key={resume.firebaseId || resume.id}
                resume={resume}
                isSelected={selectedResumeId === resume.id}
                onSelect={handleSelectResume}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-white/60 mb-4">No resumes match your search</p>
              <Button
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Clear Search
              </Button>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-white/60 mb-4">You don't have any resumes yet</p>
            <Button
              onClick={onCreateResume}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Your First Resume
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeList;

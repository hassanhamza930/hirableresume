'use client';

import { create } from 'zustand';
import { Resume } from '../interfaces';

interface ResumeStore {
  // State
  resumes: Resume[];
  selectedResumeId: string | null;
  isLoading: boolean;

  // Actions
  setResumes: (resumes: Resume[]) => void;
  addResume: (resume: Resume) => void;
  updateResume: (id: string, updates: Partial<Resume>) => void;
  selectResume: (id: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  // Initial state
  resumes: [],
  selectedResumeId: null,
  isLoading: true,

  // Actions
  setResumes: (resumes) => set({
    resumes,
    // If we have resumes and no resume is selected, select the first one
    selectedResumeId: !get().selectedResumeId && resumes.length > 0 ? resumes[0].id : get().selectedResumeId,
    isLoading: false
  }),

  addResume: (resume) => {
    set(state => ({
      resumes: [resume, ...state.resumes],
      // Select the newly added resume
      selectedResumeId: resume.id
    }));
  },

  updateResume: (id, updates) => {
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.id === id ? { ...resume, ...updates } : resume
      )
    }));
  },

  selectResume: (id) => set({ selectedResumeId: id }),
  setLoading: (isLoading) => set({ isLoading })
}));

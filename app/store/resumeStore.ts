'use client';

import { create } from 'zustand';
import { Resume } from '../interfaces';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, getFirestore, deleteDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface ResumeStore {
  // State
  resumes: Resume[];
  selectedResumeId: string | null;
  isLoading: boolean;
  
  // Actions
  setResumes: (resumes: Resume[]) => void;
  setSelectedResumeId: (id: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  
  // Firebase actions
  fetchResumes: (userId: string) => () => void; // Returns unsubscribe function
  createResume: (resumeData: Partial<Resume>, userId: string) => Promise<string | null>;
  updateResume: (id: string, data: Partial<Resume>) => Promise<boolean>;
  deleteResume: (id: string) => Promise<boolean>;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  // Initial state
  resumes: [],
  selectedResumeId: null,
  isLoading: true,
  
  // Actions
  setResumes: (resumes) => set({ resumes }),
  setSelectedResumeId: (id) => set({ selectedResumeId: id }),
  setLoading: (isLoading) => set({ isLoading }),
  
  // Firebase actions
  fetchResumes: (userId) => {
    set({ isLoading: true });
    
    const db = getFirestore();
    const resumesRef = collection(db, 'resumes');
    const resumesQuery = query(resumesRef, where('ownerId', '==', userId));
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(resumesQuery, 
      (snapshot) => {
        const resumeList: Resume[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          resumeList.push({
            id: doc.id,
            name: data.name,
            content: data.content,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            jobDescription: data.jobDescription || '',
            status: data.status || 'draft',
            ownerId: data.ownerId,
            companyInfo: data.companyInfo || ''
          });
        });
        
        set({ 
          resumes: resumeList,
          isLoading: false 
        });
      },
      (error) => {
        console.error('Error fetching resumes:', error);
        toast.error('Failed to load your resumes');
        set({ isLoading: false });
      }
    );
    
    return unsubscribe;
  },
  
  createResume: async (resumeData, userId) => {
    try {
      const db = getFirestore();
      const resumesRef = collection(db, 'resumes');
      
      const newResume = {
        ...resumeData,
        ownerId: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: resumeData.status || 'draft',
        content: resumeData.content || ''
      };
      
      const docRef = await addDoc(resumesRef, newResume);
      toast.success('Resume created successfully');
      return docRef.id;
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume');
      return null;
    }
  },
  
  updateResume: async (id, data) => {
    try {
      const db = getFirestore();
      const resumeRef = doc(db, 'resumes', id);
      
      await updateDoc(resumeRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      toast.success('Resume updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating resume:', error);
      toast.error('Failed to update resume');
      return false;
    }
  },
  
  deleteResume: async (id) => {
    try {
      const db = getFirestore();
      const resumeRef = doc(db, 'resumes', id);
      
      await deleteDoc(resumeRef);
      
      // If the deleted resume was selected, clear the selection
      const { selectedResumeId } = get();
      if (selectedResumeId === id) {
        set({ selectedResumeId: null });
      }
      
      toast.success('Resume deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
      return false;
    }
  }
}));

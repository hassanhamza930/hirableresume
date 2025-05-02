'use client';

import { create } from 'zustand';
import { Resume } from '../interfaces';

// Function to update Firebase - Placeholder, will be passed in later
// We define the type here for the store action
type UpdateFirebaseCallback = (resumeId: string, content: string) => Promise<void>;

interface ResumeHistory {
  contentHistory: string[];
  historyIndex: number; // Points to the current state in the contentHistory array
}

interface ResumeStore {
  // State
  resumes: Resume[];
  selectedResumeId: string | null;
  isLoading: boolean;
  resumeHistories: Record<string, ResumeHistory>; // Store history per resume ID
  updateFirebase?: UpdateFirebaseCallback; // Optional callback for persistence

  // Actions
  setResumes: (resumes: Resume[]) => void;
  addResume: (resume: Resume) => void;
  updateResume: (id: string, updates: Partial<Omit<Resume, 'content'>>) => void; // Exclude content
  updateResumeContent: (id: string, newContent: string) => void; // Specific action for content
  selectResume: (id: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setUpdateFirebaseCallback: (callback: UpdateFirebaseCallback) => void; // To set the callback
  undoContentChange: () => void;
  redoContentChange: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const MAX_HISTORY_LENGTH = 3;

export const useResumeStore = create<ResumeStore>((set, get) => ({
  // Initial state
  resumes: [],
  selectedResumeId: null,
  isLoading: true,
  resumeHistories: {},
  updateFirebase: undefined,

  // Actions
  setUpdateFirebaseCallback: (callback) => set({ updateFirebase: callback }),

  setResumes: (fetchedResumes) => {
    const currentHistories = get().resumeHistories;
    const updatedHistories: Record<string, ResumeHistory> = {};

    fetchedResumes.forEach(resume => {
      const existingHistory = currentHistories[resume.id];

      if (existingHistory) {
        // Resume already exists, preserve history but update current content if needed
        const currentContentInHistory = existingHistory.contentHistory[existingHistory.historyIndex];
        if (currentContentInHistory !== resume.content) {
          // Content from Firebase differs from the current state in history.
          // This usually happens after an external update or initial load.
          // We replace the current history state with the fetched content.
          // Note: This might discard redo states if an external change happens after an undo.
          // Consider if more complex merging is needed, but this handles the race condition.
          const newContentHistory = [...existingHistory.contentHistory];
          newContentHistory[existingHistory.historyIndex] = resume.content;
          updatedHistories[resume.id] = {
            ...existingHistory,
            contentHistory: newContentHistory,
          };
          console.log(`setResumes: Updated content for existing history ${resume.id}`);
        } else {
          // Content matches, keep existing history as is
          updatedHistories[resume.id] = existingHistory;
        }
      } else {
        // New resume fetched, initialize its history
        updatedHistories[resume.id] = {
          contentHistory: [resume.content],
          historyIndex: 0,
        };
         console.log(`setResumes: Initialized history for new resume ${resume.id}`);
      }
    });

    // Also handle resumes that might have been deleted remotely but are still in local state/history
    const finalHistories: Record<string, ResumeHistory> = {};
    fetchedResumes.forEach(resume => {
      if (updatedHistories[resume.id]) {
        finalHistories[resume.id] = updatedHistories[resume.id];
      }
    });


    set(state => ({
      resumes: fetchedResumes, // Update the main resumes list
      resumeHistories: finalHistories, // Update with potentially merged histories
      // Re-evaluate selectedResumeId: only change if current selection is gone or none was selected
      selectedResumeId: fetchedResumes.some(r => r.id === state.selectedResumeId)
                          ? state.selectedResumeId
                          : (fetchedResumes.length > 0 ? fetchedResumes[0].id : null),
      isLoading: false
    }));
  },

  addResume: (resume) => {
    const newHistory: ResumeHistory = {
      contentHistory: [resume.content],
      historyIndex: 0,
    };
    set(state => ({
      resumes: [resume, ...state.resumes],
      resumeHistories: { ...state.resumeHistories, [resume.id]: newHistory },
      selectedResumeId: resume.id
    }));
  },

  // Use this for non-content updates (e.g., title)
  updateResume: (id, updates) => {
    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.id === id ? { ...resume, ...updates } : resume
      )
    }));
  },

  // Use this specifically for content updates to manage history
  updateResumeContent: (id, newContent) => {
    const currentHistory = get().resumeHistories[id];
    if (!currentHistory) return; // Should not happen if initialized correctly

    const { contentHistory, historyIndex } = currentHistory;

    // If the new content is the same as the current state, do nothing
    if (contentHistory[historyIndex] === newContent) {
      return;
    }

    // If we are not at the end of history (e.g., after an undo),
    // truncate the future history before adding the new state.
    const historyUpToIndex = contentHistory.slice(0, historyIndex + 1);

    let newHistoryArray = [...historyUpToIndex, newContent];

    // Limit history length
    if (newHistoryArray.length > MAX_HISTORY_LENGTH) {
      newHistoryArray = newHistoryArray.slice(newHistoryArray.length - MAX_HISTORY_LENGTH);
    }

    const newHistoryIndex = newHistoryArray.length - 1;

    set(state => ({
      // Update the resume content in the main resumes array
      resumes: state.resumes.map(resume =>
        resume.id === id ? { ...resume, content: newContent } : resume
      ),
      // Update the history for this specific resume
      resumeHistories: {
        ...state.resumeHistories,
        [id]: {
          contentHistory: newHistoryArray,
          historyIndex: newHistoryIndex,
        }
      }
    }));
    // Note: Firebase update is handled separately by the hook observing content changes or via undo/redo actions
  },

  selectResume: (id) => set({ selectedResumeId: id }),

  setLoading: (isLoading) => set({ isLoading }),

  undoContentChange: async () => {
    const { selectedResumeId, resumeHistories, updateFirebase } = get();
    if (!selectedResumeId) return;

    const history = resumeHistories[selectedResumeId];
    if (!history || history.historyIndex <= 0) return; // Cannot undo if no history or at the beginning

    const newIndex = history.historyIndex - 1;
    const previousContent = history.contentHistory[newIndex];

    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.id === selectedResumeId ? { ...resume, content: previousContent } : resume
      ),
      resumeHistories: {
        ...state.resumeHistories,
        [selectedResumeId]: { ...history, historyIndex: newIndex }
      }
    }));

    // Persist the undone state to Firebase
    if (updateFirebase) {
      try {
        await updateFirebase(selectedResumeId, previousContent);
      } catch (error) {
        console.error("Failed to update Firebase on undo:", error);
        // Optionally revert state change or notify user
      }
    }
  },

  redoContentChange: async () => {
    const { selectedResumeId, resumeHistories, updateFirebase } = get();
    if (!selectedResumeId) return;

    const history = resumeHistories[selectedResumeId];
    if (!history || history.historyIndex >= history.contentHistory.length - 1) return; // Cannot redo if no history or at the end

    const newIndex = history.historyIndex + 1;
    const nextContent = history.contentHistory[newIndex];

    set(state => ({
      resumes: state.resumes.map(resume =>
        resume.id === selectedResumeId ? { ...resume, content: nextContent } : resume
      ),
      resumeHistories: {
        ...state.resumeHistories,
        [selectedResumeId]: { ...history, historyIndex: newIndex }
      }
    }));

     // Persist the redone state to Firebase
     if (updateFirebase) {
      try {
        await updateFirebase(selectedResumeId, nextContent);
      } catch (error) {
        console.error("Failed to update Firebase on redo:", error);
        // Optionally revert state change or notify user
      }
    }
  },

  canUndo: () => {
    const { selectedResumeId, resumeHistories } = get();
    if (!selectedResumeId) return false;
    const history = resumeHistories[selectedResumeId];
    return history ? history.historyIndex > 0 : false;
  },

  canRedo: () => {
    const { selectedResumeId, resumeHistories } = get();
    if (!selectedResumeId) return false;
    const history = resumeHistories[selectedResumeId];
    return history ? history.historyIndex < history.contentHistory.length - 1 : false;
  },

}));

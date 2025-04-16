'use client';

import { create } from 'zustand';
import { UserData } from '../interfaces';

interface UserStore {
  // User data state
  userData: Partial<UserData> | null;
  isLoading: boolean;
  
  // Actions
  setUserData: (data: Partial<UserData> | null) => void;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  // Initial state
  userData: null,
  isLoading: true,
  
  // Actions
  setUserData: (data) => set({ userData: data }),
  updateUserData: (data) => set((state) => ({
    userData: state.userData ? { ...state.userData, ...data } : data
  })),
  clearUserData: () => set({ userData: null }),
  setLoading: (isLoading) => set({ isLoading })
}));

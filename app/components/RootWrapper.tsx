'use client';

import React, { ReactNode, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Toaster } from 'sonner';
import { firebaseConfig } from '../config/firebase';

// Initialize Firebase outside of the component
let firebaseApp: FirebaseApp | undefined;

// Only initialize on the client side
if (typeof window !== 'undefined') {
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
  } else {
    firebaseApp = getApps()[0];
  }
}

interface RootWrapperProps {
  children: ReactNode;
}

export const RootWrapper = ({ children }: RootWrapperProps) => {
  // Ensure Firebase is initialized when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
      console.log('Firebase initialized in useEffect');
    }
  }, []);

return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
};
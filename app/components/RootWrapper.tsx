'use client';

import React, { ReactNode, useEffect } from 'react';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Toaster } from 'sonner';

const firebaseConfig = {
  apiKey: "AIzaSyDvcBIKyIsOY2mEptI1NNjoTqCVFRseXO4",
  authDomain: "chatapp-dda45.firebaseapp.com",
  databaseURL: "https://chatapp-dda45.firebaseio.com",
  projectId: "chatapp-dda45",
  storageBucket: "chatapp-dda45.firebasestorage.app",
  messagingSenderId: "912752217974",
  appId: "1:912752217974:web:33385b2084d62e7bf77457",
  measurementId: "G-3ZNFS8EW3H"
};

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
      <Toaster position="top-right" />
    </>
  );
};
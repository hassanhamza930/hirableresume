'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { useUserStore } from '../store/userStore';
import {motion} from "motion/react";

interface LoggedInWrapperProps {
  children: ReactNode;
}

export const LoggedInWrapper = ({ children }: LoggedInWrapperProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { setUserData, setLoading: setUserLoading } = useUserStore();

  useEffect(() => {
    // Check if user is authenticated using the localStorage approach
    if (!isAuthenticated()) {
      toast.error('Please sign in to access this page');
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router, isAuthenticated]);

  // Set up Firebase onSnapshot listener for real-time user data
  useEffect(() => {
    if (!user) return;

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    // Set up real-time listener
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        // Update the Zustand store with the latest user data
        setUserData(docSnap.data());
      } else {
        console.error('No user document found for authenticated user');
        setUserData(null);
      }
      setUserLoading(false);
    }, (error) => {
      console.error('Error listening to user document:', error);
      toast.error('Failed to load user data');
      setUserLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user, setUserData, setUserLoading]);

  if (loading) {
    return (
      <motion.div 
      initial
      className="flex items-center justify-center min-h-screen">
        <motion.img 
        animate={{
          scale:[1,1.2,1],
          rotate:[0,120,0]
        }}
        transition={{duration:2,ease:"backInOut",repeat:Infinity,repeatType:"reverse"}}
        src="/logo.png" className="h-28 w-28 md:h-42 md:w-42 object-contain object-center" />
      </motion.div>
    );
  }

  return <>{children}</>;
};
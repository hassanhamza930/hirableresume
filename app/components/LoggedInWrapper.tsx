'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
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

    // Set loading state to true when starting to fetch user data
    setUserLoading(true);

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    // Set up real-time listener
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        // Update the Zustand store with the latest user data
        const data = docSnap.data();
        setUserData(data);

        // Check if user is onboarded
        // Don't redirect if already on the profile page or if onboarded is true
        // Only redirect after data is fully loaded
        if (data.onboarded !== true && pathname !== '/home/profile') {
          // Add a small delay to ensure data is fully processed
          setTimeout(() => {
            router.push('/home/profile');
            toast.info('Please complete your profile to continue');
          }, 100);
        }
      } else {
        console.error('No user document found for authenticated user');
        setUserData(null);
      }
      // Mark loading as complete
      setUserLoading(false);
    }, (error) => {
      console.error('Error listening to user document:', error);
      toast.error('Failed to load user data');
      setUserLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user, setUserData, setUserLoading, router, pathname]);

  if (loading) {
    return (
      <motion.div
      initial
      className="flex items-center justify-center h-screen w-full">
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
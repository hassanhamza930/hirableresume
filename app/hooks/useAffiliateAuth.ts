'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase';
import { AffiliateData } from '../interfaces/affiliate';
import { getAffiliateById } from '../utils/affiliateUtils';

type AffiliateAuthResult = {
  success: boolean;
  error?: string;
  affiliate?: AffiliateData;
};

export function useAffiliateAuth() {
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Firebase if needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (getApps().length === 0) {
        initializeApp(firebaseConfig);
      }
    }
  }, []);

  // Check if affiliate is logged in on mount and set up real-time listener
  useEffect(() => {
    let unsubscribeListener: (() => void) | undefined;

    const checkAffiliateAuth = async () => {
      try {
        const affiliateId = localStorage.getItem('affiliateId');

        if (!affiliateId) {
          setAffiliate(null);
          setLoading(false);
          return;
        }

        // Set up real-time listener for affiliate data
        const db = getFirestore();
        const affiliateRef = doc(db, 'affiliates', affiliateId);

        // First check if the affiliate exists
        const affiliateSnap = await getDoc(affiliateRef);

        if (!affiliateSnap.exists()) {
          // Invalid affiliate ID in localStorage
          localStorage.removeItem('affiliateId');
          setAffiliate(null);
          setLoading(false);
          return;
        }

        // Update last login time
        await updateDoc(affiliateRef, {
          lastLogin: serverTimestamp()
        });

        // Set up real-time listener
        unsubscribeListener = onSnapshot(affiliateRef, (docSnap) => {
          if (docSnap.exists()) {
            setAffiliate({
              id: docSnap.id,
              ...docSnap.data()
            } as AffiliateData);
          } else {
            // Document was deleted
            localStorage.removeItem('affiliateId');
            setAffiliate(null);
          }
          setLoading(false);
        }, (error) => {
          console.error('Error in affiliate snapshot listener:', error);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error checking affiliate auth:', error);
        setLoading(false);
      }
    };

    // Call the function to set up authentication and listeners
    checkAffiliateAuth();

    // Return cleanup function
    return () => {
      if (unsubscribeListener) {
        unsubscribeListener();
      }
    };
  }, []);

  /**
   * Sign out the current affiliate
   * @returns Promise with success status
   */
  const signOut = async (): Promise<AffiliateAuthResult> => {
    try {
      localStorage.removeItem('affiliateId');
      setAffiliate(null);
      return { success: true };
    } catch (error) {
      console.error('Error signing out affiliate:', error);
      return { success: false, error: 'Failed to sign out' };
    }
  };

  /**
   * Check if an affiliate is authenticated
   * @returns Boolean indicating if authenticated
   */
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('affiliateId');
  };

  return {
    affiliate,
    loading,
    signOut,
    isAuthenticated
  };
}

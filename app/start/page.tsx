"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { getFirestore, doc, getDoc, updateDoc, increment, collection, query, where, getDocs } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/app/config/firebase';
import Image from 'next/image';
import { motion } from 'motion/react';

// Create a client component that uses the searchParams
function StartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase if needed
    if (typeof window !== 'undefined') {
      if (getApps().length === 0) {
        initializeApp(firebaseConfig);
      }
    }

    const handleReferral = async () => {
      try {
        const refid = searchParams.get('refid');

        if (refid) {
          // Store the referral code in localStorage
          localStorage.setItem('refid', refid);

          // Increment the views count for this affiliate
          await trackAffiliateView(refid);

          // Show a toast notification
        }
      } catch (error) {
        console.error('Error processing referral:', error);
      } finally {
        // Redirect to home page after a short delay
        setTimeout(() => {
          setIsLoading(false);
          router.push('/');
        }, 1500);
      }
    };

    handleReferral();
  }, [router, searchParams]);

  // Function to track affiliate view
  const trackAffiliateView = async (referralCode: string) => {
    try {
      const db = getFirestore();

      // Find the affiliate with this referral code
      const affiliatesRef = collection(db, 'affiliates');
      const affiliateQuery = query(affiliatesRef, where('referralCode', '==', referralCode));
      const affiliateSnapshot = await getDocs(affiliateQuery);

      if (!affiliateSnapshot.empty) {
        const affiliateDoc = affiliateSnapshot.docs[0];

        // Increment the views count
        await updateDoc(doc(db, 'affiliates', affiliateDoc.id), {
          'stats.views': increment(1)
        });
      }
    } catch (error) {
      console.error('Error tracking affiliate view:', error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-32 h-32 mb-8">
          <Image
            src="/logo.png"
            alt="HirableResume Logo"
            fill
            className="object-contain animate-pulse"
          />
        </div>

        <p className="text-white text-lg" style={{ fontFamily: "Geist Mono" }}>
          {isLoading ? 'Redirecting you...' : 'Welcome to HirableResume!'}
        </p>
      </motion.div>
    </div>
  );
}

// Export the main page component with Suspense boundary
export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-8">
            <Image
              src="/logo.png"
              alt="HirableResume Logo"
              fill
              className="object-contain animate-pulse"
            />
          </div>
          <p className="text-white text-lg" style={{ fontFamily: "Geist Mono" }}>
            Loading...
          </p>
        </div>
      </div>
    }>
      <StartPageContent />
    </Suspense>
  );
}

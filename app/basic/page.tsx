'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { addPlanCredits } from '../utils/planUtils';

export default function BasicPlanPage() {
  const router = useRouter();

  useEffect(() => {
    const handleBasicPlan = async () => {
      try {
        // Check if user is logged in by looking for UID in localStorage
        const uid = localStorage.getItem('uid');

        if (!uid) {
          // User is not logged in, redirect to home page
          toast.error('You need to be logged in to access this page');
          router.push('/');
          return;
        }

        // User is logged in, add basic plan credits (30)
        const success = await addPlanCredits(uid, 'basic');

        if (!success) {
          router.push('/home');
          return;
        }

        // Redirect to home page
        router.push('/home');
      } catch (error) {
        console.error('Error adding basic plan:', error);
        toast.error('Failed to add basic plan. Please try again.');
        router.push('/home');
      }
    };

    handleBasicPlan();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Hirable Resume Logo"
          className="w-32 h-32 animate-pulse"
          style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
        />
      </div>
    </div>
  );
}

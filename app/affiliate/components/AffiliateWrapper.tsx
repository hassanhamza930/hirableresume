'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAffiliateAuth } from '@/app/hooks/useAffiliateAuth';
import { toast } from 'sonner';

interface AffiliateWrapperProps {
  children: ReactNode;
}

export const AffiliateWrapper = ({ children }: AffiliateWrapperProps) => {
  const router = useRouter();
  const { loading, isAuthenticated } = useAffiliateAuth();

  useEffect(() => {
    // Check if affiliate is authenticated
    if (!loading && !isAuthenticated()) {
      toast.error('Please sign in to access the affiliate dashboard');
      router.push('/affiliate');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AffiliateWrapper;

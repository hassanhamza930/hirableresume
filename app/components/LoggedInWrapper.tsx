'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

interface LoggedInWrapperProps {
  children: ReactNode;
}

export const LoggedInWrapper = ({ children }: LoggedInWrapperProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated using the localStorage approach
    if (!isAuthenticated()) {
      toast.error('Please sign in to access this page');
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router, isAuthenticated]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return <>{children}</>;
};
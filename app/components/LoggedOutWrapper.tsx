'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface LoggedOutWrapperProps {
  children: ReactNode;
}

export const LoggedOutWrapper = ({ children }: LoggedOutWrapperProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated using the localStorage approach
    if (isAuthenticated()) {
      router.push('/home');
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

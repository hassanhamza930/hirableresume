"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/app/config/firebase';

export default function AffiliatePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize Firebase if not already initialized
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (getApps().length === 0) {
        initializeApp(firebaseConfig);
      }
    }
  }, []);

  // Check if already logged in
  useEffect(() => {
    const affiliateId = localStorage.getItem('affiliateId');
    if (affiliateId) {
      router.push('/affiliate/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const db = getFirestore();
      const affiliatesRef = collection(db, 'affiliates');
      const q = query(affiliatesRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        toast.error('No affiliate account found with this email');
        setIsLoading(false);
        return;
      }
      
      const affiliateDoc = querySnapshot.docs[0];
      const affiliateData = affiliateDoc.data();
      
      // In a real app, you would use proper authentication and password hashing
      // This is a simplified version for demonstration purposes
      if (affiliateData.password !== password) {
        toast.error('Invalid password');
        setIsLoading(false);
        return;
      }
      
      // Store affiliate ID in localStorage
      localStorage.setItem('affiliateId', affiliateDoc.id);
      
      // Update last login timestamp
      // This would typically be done in a server-side function
      
      toast.success('Login successful');
      router.push('/affiliate/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32 pb-36 bg-black">
      {/* Back to home link */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-white/70 hover:text-white transition-all duration-300"
        style={{ fontFamily: "Geist Mono" }}
      >
        ← Back to home
      </Link>

      {/* Title */}
      <h1
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-white text-shadow-blue-600"
      >
        Affiliate Portal
      </h1>

      {/* Subtitle */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
      >
        Sign in to access your affiliate dashboard and track your referrals.
      </p>

      {/* Login form */}
      <div className="mt-16 w-full max-w-md px-6 py-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl">
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full text-white outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-5"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            Don't have an affiliate account?{' '}
            <Link href="/affiliate/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

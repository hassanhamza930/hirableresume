"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/app/config/firebase';
import { AffiliateData } from '@/app/interfaces/affiliate';

export default function AffiliateSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const db = getFirestore();
      const affiliatesRef = collection(db, 'affiliates');
      
      // Check if email is already in use
      const emailQuery = query(affiliatesRef, where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);
      
      if (!emailSnapshot.empty) {
        toast.error('An account with this email already exists');
        setIsLoading(false);
        return;
      }
      
      // Create new affiliate document
      // In a real app, you would hash the password and use proper authentication
      const newAffiliate: Partial<AffiliateData> = {
        email,
        password, // In a real app, this would be hashed
        name: name || undefined,
        createdAt: serverTimestamp() as unknown as Date,
        stats: {
          views: 0,
          signups: 0,
          purchases: 0
        }
      };
      
      const docRef = await addDoc(affiliatesRef, newAffiliate);
      
      // Store affiliate ID in localStorage
      localStorage.setItem('affiliateId', docRef.id);
      
      toast.success('Account created successfully');
      router.push('/affiliate/dashboard');
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('An error occurred while creating your account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32 pb-36 bg-black">
      {/* Back to home link */}
      <Link
        href="/affiliate"
        className="absolute top-6 left-6 text-white/70 hover:text-white transition-all duration-300"
        style={{ fontFamily: "Geist Mono" }}
      >
        ← Back to login
      </Link>

      {/* Title */}
      <h1
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 text-white"
      >
        Become an Affiliate
      </h1>

      {/* Subtitle */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
      >
        Create an affiliate account to start earning by referring users to HirableResume.
      </p>

      {/* Signup form */}
      <div className="mt-16 w-full max-w-md px-6 py-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl">
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name (Optional)
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full text-white"
            />
          </div>

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
              className="w-full text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-5"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            Already have an account?{' '}
            <Link href="/affiliate" className="text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

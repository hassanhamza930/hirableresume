'use client';

import React, { useState, useRef } from 'react';
import { LoggedInWrapper } from '../../components/LoggedInWrapper';
import HomeNavbar from '../components/HomeNavbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../hooks/useAuth';
import { useUserStore } from '../../store/userStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import SpotlightCard from '@/components/SpotLightCard';
import { SaveIcon, UploadIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfilePage() {
  const { updateUserData } = useAuth();
  const { userData } = useUserStore();
  const router = useRouter();
  const [resumeData, setResumeData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing resume data when userData changes
  React.useEffect(() => {
    if (userData?.resumeData) {
      setResumeData(userData.resumeData);
    }
  }, [userData]);

  // Handle saving the resume data
  const handleSaveProfile = async () => {
    if (!resumeData.trim()) {
      toast.error('Please enter your resume information');
      return;
    }

    setIsLoading(true);
    try {
      // Update the user document in Firebase
      const success = await updateUserData({
        resumeData,
        onboarded: true
      });

      if (success) {
        toast.success('Profile saved successfully');
        router.push('/home');
      } else {
        toast.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    setIsUploading(true);
    toast.info('Uploading PDF for text extraction...');

    try {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', file);

      // Make an API call to the server-side endpoint
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to extract text from PDF');
      }

      // Parse the response as JSON
      const data = await response.json();

      // Make sure we have text data
      if (!data.text) {
        throw new Error('No text was extracted from the PDF');
      }

      // Set the raw text directly from the PDF without any modifications
      setResumeData(data.text);
      toast.success('Text extracted successfully from PDF');
    } catch (error: any) {
      console.error('Error extracting text from PDF:', error);
      toast.error(error.message || 'Failed to extract text from PDF');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <LoggedInWrapper>
      <HomeNavbar />

      <div className="w-full flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <h1
            style={{ fontFamily: "Special Gothic Expanded One" }}
            className="text-3xl md:text-4xl text-white mb-4 text-center"
          >
            Complete Your Profile
          </h1>

          <p
            style={{ fontFamily: "Geist Mono" }}
            className="text-sm md:text-md text-white/70 text-center mb-8"
          >
            We'll use this information to create personalized resumes tailored to each job description.
          </p>

          <SpotlightCard spotlightColor='rgb(255,255,255,0.05)' className="border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-5 md:p-6">
            <div className="">
              <h2
                style={{ fontFamily: "Geist" }}
                className="text-sm text-white mb-1 font-semibold"
              >
                Your Resume Information
              </h2>
              <p className="text-white/70 text-xs mb-4" style={{ fontFamily: "Geist Mono" }}>
                Enter your professional details in natural language format or upload your existing resume.
              </p>

              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <textarea
                    value={resumeData}
                    onChange={(e) => setResumeData(e.target.value)}
                    placeholder="Enter your resume information here, including your name, contact details, social links, work experience, education, skills, and any other relevant information. Try to add as much information as possible for better results..."
                    className="w-full h-96 text-sm bg-zinc-900/90 border border-yellow-500/30 border-dashed rounded-md p-4 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-500/50 resize-none"
                    disabled={isLoading || isUploading}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/70 backdrop-blur-sm rounded-md">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-3"></div>
                        <p className="text-white text-sm">Extracting text from PDF...</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="application/pdf"
                      className="hidden"
                    />
                    <Button
                      onClick={handleUploadClick}
                      variant="outline"
                      className="w-full sm:w-auto border-white/20 bg-zinc-900/80 hover:bg-zinc-800 hover:border-white/40 transition-all duration-200 flex items-center gap-2 text-white"
                      disabled={isLoading || isUploading}
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                          Extracting...
                        </>
                      ) : (
                        <>
                          <UploadIcon className="h-4 w-4" />
                          Upload Resume PDF
                        </>
                      )}
                    </Button>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="w-full sm:w-auto flex items-center gap-2 hover:opacity-90 shadow-none transition-all duration-200"
                    disabled={isLoading || isUploading || !resumeData.trim()}
                  >
                    <SaveIcon className="h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Profile'}
                  </Button>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </LoggedInWrapper>
  );
}

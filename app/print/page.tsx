'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import './print.css';

// Loading component for Suspense fallback
function PrintPageLoading() {
  return (
    <div className="loading-container">
      <div className="text-center">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-4 text-gray-700">Preparing your resume for printing...</p>
      </div>
    </div>
  );
}

// Main content component that uses the search params
function PrintPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [resumeContent, setResumeContent] = useState<string>('');
  const [resumeName, setResumeName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get the resume ID from URL params
    const resumeId = searchParams.get('id');

    if (!resumeId) {
      setError('No resume ID provided');
      setIsLoading(false);
      return;
    }

    // Fetch the resume content from Firebase
    const fetchResumeContent = async () => {
      try {
        const db = getFirestore();
        const resumesCollection = collection(db, 'resumes');

        // Query for the resume with the given ID
        const resumeQuery = query(
          resumesCollection,
          where('id', '==', resumeId),
          limit(1)
        );

        const querySnapshot = await getDocs(resumeQuery);

        if (querySnapshot.empty) {
          setError('Resume not found');
          setIsLoading(false);
          return;
        }

        // Get the resume data
        const resumeData = querySnapshot.docs[0].data();
        setResumeContent(resumeData.content || '');
        setResumeName(resumeData.name || 'Resume');
        setIsLoading(false);

        // Set a longer timeout to ensure the content is rendered and any toast notifications have disappeared
        setTimeout(() => {
          // Print the page
          window.print();

          // After printing, go back to the previous page
          setTimeout(() => {
            window.location.href='/home'
          }, 500);
        }, 2000); // 2 seconds should be enough for toasts to disappear
      } catch (error) {
        console.error('Error fetching resume:', error);
        setError('Failed to fetch resume content');
        setIsLoading(false);
      }
    };

    fetchResumeContent();
  }, [searchParams, router]);

  // Set document title for the print
  useEffect(() => {
    if (resumeName) {
      document.title = resumeName;
    }
  }, [resumeName]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p className="mt-4 text-gray-700">Preparing your resume for printing...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="text-center">
          <div className="error-icon mx-auto">❌</div>
          <p className="mt-4 text-red-600">{error}</p>
          <button
            onClick={() => router.push('/home')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="print-container">
      <div
        className="resume-content px-5"
        dangerouslySetInnerHTML={{ __html: resumeContent }}
      />
      <div className="no-print text-center mt-8 mb-4">
        <p className="text-gray-600 mb-2">If the print dialog doesn't open automatically, please use your browser's print function (Ctrl+P or Cmd+P).</p>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Print Now
        </button>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function PrintPage() {
  return (
    <Suspense fallback={<PrintPageLoading />}>
      <PrintPageContent />
    </Suspense>
  );
}

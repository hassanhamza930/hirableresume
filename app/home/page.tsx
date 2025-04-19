'use client';

import React, { useState, useCallback } from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import HomeNavbar from './components/HomeNavbar';
import ResumeEditorComponent from './components/resume-editor';

export default function HomePage() {
  const [showMobileResumeList, setShowMobileResumeList] = useState(true);

  const handleBackToResumeList = useCallback(() => {
    setShowMobileResumeList(true);
  }, []);

  return (
    <LoggedInWrapper>
      <div className="h-screen overflow-hidden">
        {/* Fixed navbar */}
        <HomeNavbar
          onBackToResumeList={handleBackToResumeList}
          showMobileResumeList={showMobileResumeList}
        />

        {/* Resume Editor Component */}
        <ResumeEditorComponent
          showMobileResumeList={showMobileResumeList}
          setShowMobileResumeList={setShowMobileResumeList}
        />
      </div>
    </LoggedInWrapper>
  );
}

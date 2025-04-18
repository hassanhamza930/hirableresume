'use client';

import React from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import HomeNavbar from './components/HomeNavbar';
import ResumeEditorComponent from './components/resume-editor';

export default function HomePage() {
  return (
    <LoggedInWrapper>
      <div className="h-screen overflow-hidden">
        {/* Fixed navbar */}
        <HomeNavbar />

        {/* Resume Editor Component */}
        <ResumeEditorComponent />
      </div>
    </LoggedInWrapper>
  );
}

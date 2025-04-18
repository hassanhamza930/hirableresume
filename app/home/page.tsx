'use client';

import React from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import HomeNavbar from './components/HomeNavbar';
import ResumeEditorComponent from './components/resume-editor';

export default function HomePage() {
  return (
    <LoggedInWrapper>
      {/* Fixed navbar */}
      <HomeNavbar />

      {/* Resume Editor Component */}
      <ResumeEditorComponent />
    </LoggedInWrapper>
  );
}

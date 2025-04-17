'use client';

import React from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import DashboardNavbar from './components/DashboardNavbar';
import ResumeList from './components/ResumeList';
import ResumeEditor from './components/ResumeEditor';
// We're not using the resizable components anymore
// import './components/custom-resizable.css';

export default function HomePage() {
  // This state will be used to track which resume is selected
  const [, setSelectedResumeId] = React.useState<string | null>(null);

  return (
    <LoggedInWrapper>
      {/* Fixed navbar */}
      <DashboardNavbar />

      {/* Main content - positioned below navbar */}
      <div className="flex flex-col w-full h-[calc(100vh-64px)] mt-14 pb-2 overflow-hidden">
        {/* Dashboard content */}
        <div className="flex flex-1 h-full w-full">
          {/* Left column: Resume list - fixed width with overflow handling */}
          <div className="w-[350px] flex-shrink-0 overflow-hidden">
            <ResumeList onSelectResume={setSelectedResumeId} />
          </div>

          {/* Right column: Resume editor */}
          <div className="flex-1">
            <ResumeEditor />
          </div>
        </div>
      </div>
    </LoggedInWrapper>
  );
}

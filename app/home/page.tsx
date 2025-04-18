'use client';

import React from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import DashboardNavbar from './components/DashboardNavbar';

export default function HomePage() {

  return (
    <LoggedInWrapper>
      {/* Fixed navbar */}
      <DashboardNavbar />

    </LoggedInWrapper>
  );
}

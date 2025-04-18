'use client';

import React from 'react';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import HomeNavbar from './components/HomeNavbar';

export default function HomePage() {

  return (
    <LoggedInWrapper>
      {/* Fixed navbar */}
      <HomeNavbar />

    </LoggedInWrapper>
  );
}

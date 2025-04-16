'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LoggedInWrapper } from '../components/LoggedInWrapper';
import BlurReveal from '@/components/BlurText';
import DashboardNavbar from './components/DashboardNavbar';

export default function HomePage() {
  return (
    <LoggedInWrapper>
      <div className="relative z-0 w-full min-h-screen flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32 pb-36">
        <DashboardNavbar />

        {/* Title */}
        <BlurReveal
          style={{ fontFamily: "Special Gothic Expanded One" }}
          className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600"
          text="Welcome to HirableResume"
        />

        {/* Subtitle */}
        <BlurReveal
          style={{ fontFamily: "Geist Mono" }}
          className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
          text="Your dashboard is coming soon. Stay tuned for updates!"
        />

        {/* Dashboard content will go here */}
        <div className="mt-10 w-full max-w-4xl p-6 md:p-8 rounded-xl backdrop-blur-xl backdrop-brightness-50 border border-white/20 border-dashed">
          <div className="text-center text-white">
            <p className="mb-4">This is your dashboard. More features will be added soon.</p>
            <Button onClick={() => toast.info('Feature coming soon!')}>
              Create New Resume
            </Button>
          </div>
        </div>
      </div>
    </LoggedInWrapper>
  );
}

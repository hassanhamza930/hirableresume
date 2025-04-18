'use client';

import React from 'react';
import { useUserStore } from '@/app/store/userStore';

const CreditDisplay: React.FC = () => {
  const { userData } = useUserStore();
  
  // Get user credits from the Zustand store
  const userCredits = userData?.credits ?? null;
  
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
      <span style={{ fontFamily: "Geist Mono" }} className="text-white text-sm font-medium">
        Current Credits: <span className="font-bold">{userCredits !== null ? userCredits : '...'}</span>
      </span>
    </div>
  );
};

export default CreditDisplay;

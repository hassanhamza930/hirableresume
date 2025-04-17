'use client';

import React from 'react';
import ResumePreview from './ResumePreview';
import CustomizationInput from './CustomizationInput';

export default function ResumeEditor() {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Top section: Resume preview - flexible height with overflow handling */}
      <div className="flex-grow overflow-auto min-h-0 max-h-[calc(100%-90px)] p-2">
        <ResumePreview />
      </div>

      {/* Bottom section: Customization input - fixed height */}
      <div className="flex-shrink-0 mt-2 p-2  mb-4 mx-6 border-orange-400/70 rounded-lg overflow-hidden border-dashed border-[1px] bg-white/5">
        <CustomizationInput />
      </div>
    </div>
  );
}

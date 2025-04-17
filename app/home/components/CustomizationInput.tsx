'use client';

import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SpotlightCard from '@/components/SpotLightCard';
import { FiSend } from 'react-icons/fi';
import { toast } from 'sonner';

export default function CustomizationInput() {
  const [input, setInput] = React.useState('');

  const handleSubmit = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to customize your resume');
      return;
    }

    toast.info('Resume customization feature coming soon!');
    // In the future, this would send the input to an API for processing
  };

  return (
    <div
      className="h-full w-full backdrop-blur-xl p-2 rounded-xl"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-0.5">
          <h3 style={{ fontFamily: "Geist" }} className="text-xs font-semibold text-white/60">
            Customize Your Resume
          </h3>
        </div>

        <div className="flex-1 relative h-[50px] mt-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., 'Highlight my leadership skills' or paste a job description here..."
            className="w-full h-full border-none resize-none text-white placeholder:text-white/40 pr-[120px]"
          />

          <Button
            onClick={handleSubmit}
            className="absolute bottom-0 right-0 bg-orange-600 text-white shadow-none hover:bg-orange-500 h-7 px-3 py-0 text-xs"
          >
            <FiSend className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
}

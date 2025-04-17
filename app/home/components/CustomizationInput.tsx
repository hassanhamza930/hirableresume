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
    <SpotlightCard
      className="h-full w-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-2 rounded-xl"
      spotlightColor="rgba(255, 255, 255, 0.1)"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-0.5">
          <h3 style={{ fontFamily: "Geist" }} className="text-xs font-medium text-white">
            Customize Your Resume
          </h3>
        </div>

        <div className="flex-1 relative h-[50px] mt-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., 'Highlight my leadership skills' or paste a job description here..."
            className="w-full h-full resize-none bg-white/5 border-dashed border-orange-400/70 text-white placeholder:text-white/40 pr-[120px] focus-visible:ring-orange-400/30"
          />

          <Button
            onClick={handleSubmit}
            className="absolute bottom-2 right-2 bg-orange-600 text-white shadow-none hover:bg-orange-500 h-7 px-3 py-0 text-xs"
          >
            <FiSend className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
}

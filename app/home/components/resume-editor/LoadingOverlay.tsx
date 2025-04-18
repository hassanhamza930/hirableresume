'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = 'Adding magic to your resume...'
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-black/90 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center"
    >
      <img
        style={{
          filter: "blur(150px)"
        }}
        src="gradient.gif" className='h-full w-full object-cover object-center absolute -z-20 opacity-20' />

      <div className="text-center max-w-md px-6 flex flex-col justify-center items-center">

        <img src="logo.png" className="h-36 w-36 animate-pulse text-yellow-400 mb-5" />

        <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "Geist" }}>
          {message}
        </h3>

        <p className="text-white/70 mb-6 text-sm">
          Hold on tight, we're adding the secret sauce to your resume. This usually takes about 15-20 seconds.
        </p>

        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 text-yellow-400 animate-spin" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;

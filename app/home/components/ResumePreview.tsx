'use client';

import React from 'react';
import SpotlightCard from '@/components/SpotLightCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FiDownload, FiEdit, FiShare2 } from 'react-icons/fi';
import { toast } from 'sonner';

export default function ResumePreview() {
  return (
    <SpotlightCard
      className="h-full w-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-2 rounded-xl"
      spotlightColor="rgba(255, 255, 255, 0.1)"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 style={{ fontFamily: "Geist" }} className="text-base font-semibold text-white">
              Resume Preview
            </h2>
            <p style={{ fontFamily: "Geist Mono" }} className="text-xs text-white/60">
              Select a resume from the sidebar to view and edit
            </p>
          </div>

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-white/20 hover:bg-white/10 text-white"
              onClick={() => toast.info('Download feature coming soon!')}
            >
              <FiDownload size={14} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-white/20 hover:bg-white/10 text-white"
              onClick={() => toast.info('Share feature coming soon!')}
            >
              <FiShare2 size={14} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-white/20 hover:bg-white/10 text-white"
              onClick={() => toast.info('Edit feature coming soon!')}
            >
              <FiEdit size={14} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 bg-white/5 rounded-lg border border-white/10 p-2 overflow-y-auto">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-[600px] mx-auto bg-white rounded-lg p-4 shadow-lg">
              {/* Placeholder resume content */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                <p className="text-gray-600">Software Engineer</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
                  <span>john.doe@example.com</span>
                  <span>•</span>
                  <span>(123) 456-7890</span>
                  <span>•</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Summary</h2>
                <p className="text-gray-700 text-sm">
                  Experienced software engineer with 5+ years of experience in full-stack development,
                  specializing in React, Node.js, and cloud technologies. Passionate about creating
                  scalable and user-friendly applications.
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Experience</h2>

                <div className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">Senior Software Engineer</h3>
                    <span className="text-sm text-gray-600">2020 - Present</span>
                  </div>
                  <p className="text-gray-700 text-sm font-medium">Tech Innovations Inc.</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                    <li>Led development of a React-based dashboard that improved user engagement by 40%</li>
                    <li>Implemented CI/CD pipelines that reduced deployment time by 60%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">Software Engineer</h3>
                    <span className="text-sm text-gray-600">2018 - 2020</span>
                  </div>
                  <p className="text-gray-700 text-sm font-medium">Digital Solutions LLC</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                    <li>Developed RESTful APIs using Node.js and Express</li>
                    <li>Optimized database queries that improved application performance by 30%</li>
                    <li>Collaborated with UX designers to implement responsive designs</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Docker', 'Git', 'CI/CD'].map((skill) => (
                    <span key={skill} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </SpotlightCard>
  );
}

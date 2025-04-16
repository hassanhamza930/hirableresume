"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import BlurReveal from "./BlurText";
import SpotlightCard from "./SpotLightCard";

interface FeatureStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  spotlightColor?: string;
}

interface KeyFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  spotlightColor?: string;
}

// Import icons
import { FaUpload, FaRobot, FaFileDownload } from "react-icons/fa";
import { MdOutlineAutoAwesome, MdOutlineCompareArrows, MdOutlineFileDownload, MdOutlineHistory } from "react-icons/md";
import { FaPaste } from "react-icons/fa6";

const featureSteps: FeatureStep[] = [
  {
    id: 1,
    title: "Upload Your Resume",
    description: "Start by uploading your existing resume or create a new one from scratch just by telling us more about yourself",
    icon: <FaUpload className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-emerald-500 to-blue-500",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 2,
    title: "Paste Job Description",
    description: "Our AI analyzes the job description and customizes your resume to highlight relevant skills and experience",
    icon: <FaPaste className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-blue-500 to-purple-500",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: 3,
    title: "Download & Apply",
    description: "Download your personalized resume in multiple formats and apply with confidence.",
    icon: <FaFileDownload className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-purple-500 to-pink-500",
    spotlightColor: "rgba(236, 72, 153, 0.15)",
  },
];

const keyFeatures: KeyFeature[] = [
  {
    id: 1,
    title: "ATS Optimization",
    description: "Our AI ensures your resume passes through Applicant Tracking Systems by using the right keywords and formatting.",
    icon: <MdOutlineAutoAwesome className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-blue-500 to-cyan-400",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    id: 2,
    title: "Skill Matching",
    description: "Automatically identify and highlight the skills that match the job description to show recruiters you're the perfect fit.",
    icon: <MdOutlineCompareArrows className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-purple-500 to-pink-500",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: 3,
    title: "Multiple Formats",
    description: "Download your resume in various formats including PDF, DOCX, and TXT to meet any application requirement.",
    icon: <MdOutlineFileDownload className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-amber-500 to-orange-500",
    spotlightColor: "rgba(251, 191, 36, 0.15)",
  },
  {
    id: 4,
    title: "Version History",
    description: "Keep track of all your customized resumes and easily access previous versions for similar job applications.",
    icon: <MdOutlineHistory className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-emerald-500 to-green-500",
    spotlightColor: "rgba(52, 211, 153, 0.15)",
  },
];

export default function Features() {
  return (
    <div className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] mt-24 md:mt-48">
      {/* HOW IT WORKS Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6"
      >
        <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
          HOW IT WORKS
        </span>
      </motion.div>


      {/* Section Title */}
      <BlurReveal
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-2xl sm:text-3xl md:text-4xl w-full max-w-[500px] px-4 text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600"
        text="A Hyper Personalized Resume For Every Job Application"
      />

      {/* Section Description */}
      <BlurReveal
        style={{ fontFamily: "Geist Mono" }}
        className="mb-8 md:mb-16 mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] px-4"
        text="Maximize your chances of getting noticed in ATS systems & ACTUALLY land job interviews in the next 30 days"
      />

      {/* Feature Steps */}
      <div className="w-full flex flex-wrap justify-center items-end gap-5">
        {featureSteps.map((step, index) => (
          <motion.div
            key={step.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: index * 0.2
            }}
            viewport={{ once: true }}
            className="w-full sm:w-[300px] md:w-96"
          >
            <HowItWorksCard step={step} />
          </motion.div>
        ))}
      </div>

      {/* Key Features Section */}
      <div className="mt-24 md:mt-48 w-full relative">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6 mx-auto w-fit"
        >
          <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
            KEY FEATURES
          </span>
        </motion.div>

        <BlurReveal
          style={{ fontFamily: "Special Gothic Expanded One" }}
          className="mb-5 text-2xl sm:text-3xl md:text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 px-4"
          text="AI is Your Unfair Advantage"
        />

        <BlurReveal
          style={{ fontFamily: "Geist Mono" }}
          className="mb-8 md:mb-16 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] mx-auto px-4"
          text="We supercharge your profile with best resume practices and make sure your resume is custom tailored for each specific job applications."
        />

        <div className="w-full flex flex-wrap justify-center items-center gap-5">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.2
              }}
              viewport={{ once: true }}
              className="w-full sm:w-[300px] md:w-96" // Responsive width
            >
              <KeyFeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                spotlightColor={feature.spotlightColor}
                delay={0} // No additional delay needed since the parent motion.div has delay
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowItWorksCard({ step }: { step: FeatureStep }) {
  return (
    <SpotlightCard
      className="h-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl px-6 py-5"
      spotlightColor={step.spotlightColor || "rgba(255, 255, 255, 0.1)"}
    >
      <div className="flex flex-col justify-start items-start h-full">
        {/* Icon Container */}
        <div className="mb-5 h-8 w-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {step.icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "Geist" }} className="text-white text-md md:text-lg font-semibold mb-2 text-start">
          {step.title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs md:text-sm text-start">
          {step.description}
        </p>
      </div>
    </SpotlightCard>
  );
}

function KeyFeatureCard({
  title,
  description,
  icon,
  spotlightColor
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  spotlightColor?: string;
  delay?: number; // Keep in interface but don't destructure
}) {
  return (
    <SpotlightCard
      className="h-full border border-white/10 bg-zinc-950/50 backdrop-blur-xl p-5"
      spotlightColor={spotlightColor || "rgba(255, 255, 255, 0.1)"}
    >
      <div className="flex flex-col justify-start items-start h-full">
        {/* Icon Container */}
        <div className="w-8 h-8 mb-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "Geist" }} className="text-white text-md md:text-lg font-semibold mb-2 text-start">
          {title}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs md:text-sm text-start">
          {description}
        </p>
      </div>
    </SpotlightCard>
  );
}

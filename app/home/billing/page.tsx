'use client';

import React from 'react';
import { motion } from "motion/react";
import BlurReveal from "@/components/BlurText";
import SpotlightCard from "@/components/SpotLightCard";
import { Button } from "@/components/ui/button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { LoggedInWrapper } from '../../components/LoggedInWrapper';
import DashboardNavbar from '../components/HomeNavbar';
import { useAuth } from '../../hooks/useAuth';
import { useUserStore } from '../../store/userStore';

interface PricingFeature {
  id: number;
  title: string;
  included: boolean;
}

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  icon: React.ReactNode;
  borderColor: string;
  spotlightColor?: string;
  popular?: boolean;
  ctaText: string;
  credits: number;
}

const pricingFeatures = {
  basic: [
    { id: 1, title: "30 Ultra Personalized Resumes", included: true },
    { id: 2, title: "Basic ATS Optimization", included: true },
    { id: 3, title: "PDF Export Format", included: true },
    { id: 4, title: "AI Cover Letters", included: false },
    { id: 5, title: "Advanced Skill Matching", included: false },
    { id: 6, title: "Multiple Export Formats", included: false },
    { id: 7, title: "Version History", included: false },
    { id: 8, title: "Priority Support", included: false },
  ],
  pro: [
    { id: 1, title: "150 Ultra Personalized Resumes", included: true },
    { id: 2, title: "Advanced ATS Optimization", included: true },
    { id: 3, title: "Multiple Export Formats", included: true },
    { id: 5, title: "Advanced Skill Matching", included: true },
    { id: 4, title: "AI Cover Letters", included: true },
    { id: 6, title: "Version History", included: true },
    { id: 7, title: "Priority Support", included: false },
    { id: 8, title: "Custom Branding", included: false },
  ],
};

const pricingPlans: PricingPlan[] = [
  {
    id: 2,
    name: "Pro",
    description: "For serious job seekers who want the best results",
    price: "$19.99",
    period: "monthly",
    features: pricingFeatures.pro,
    icon: <HiOutlineLightningBolt className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-purple-500 to-pink-500",
    spotlightColor: "rgba(168, 85, 247, 0.15)",
    popular: true,
    ctaText: "Get Started",
    credits: 150,
  },
  {
    id: 1,
    name: "Basic",
    description: "Perfect for job seekers just getting started",
    price: "$7.99",
    period: "monthly",
    features: pricingFeatures.basic,
    icon: <MdOutlineAutoAwesome className="h-6 w-6 md:h-8 md:w-8 text-white" />,
    borderColor: "from-blue-500 to-cyan-400",
    spotlightColor: "rgba(59, 130, 246, 0.15)",
    ctaText: "Get Started",
    credits: 30,
  },
];

export default function BillingPage() {
  const { userData } = useUserStore();

  // Get user credits from the Zustand store
  const userCredits = userData?.credits ?? null;

  return (
    <LoggedInWrapper>
      <div className="relative z-0 w-full min-h-screen flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32 pb-36">
        <DashboardNavbar />

        {/* Title */}
        <BlurReveal
          style={{ fontFamily: "Special Gothic Expanded One" }}
          className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600"
          text="Purchase Credits"
        />

        {/* Current Credits */}
        <motion.div
        variants={{
          hidden: {
            opacity: 0,
            filter: "blur(10px)",
            transform: "translateY(5%)",
          },
          visible: {
            opacity: 1,
            filter: "blur(0)",
            transform: "translateY(0)",
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay:  0.2
        }}
        className="mt-4 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2">
          <span style={{ fontFamily: "Geist Mono" }} className="text-white text-sm font-medium">
            Current Credits: <span className="font-bold">{userCredits !== null ? userCredits : '...'}</span>
          </span>
        </motion.div>

        {/* Section Description */}
        <BlurReveal
          style={{ fontFamily: "Geist Mono" }}
          className="mb-10 md:mb-16 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] px-4"
          text="Select a plan to add more credits to your account and continue creating personalized resumes."
        />

        {/* Pricing Cards */}
        <div className="w-full flex flex-wrap justify-center items-stretch gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: {
                  opacity: 0,
                  filter: "blur(10px)",
                  transform: "translateY(5%)",
                },
                visible: {
                  opacity: 1,
                  filter: "blur(0)",
                  transform: "translateY(0)",
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
              className="w-full sm:w-[300px] md:w-[320px]" // Responsive width
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ fontFamily: "Geist Mono" }}
          className="mt-8 text-xs text-white/60 text-center"
        >
          All plans come with a 14-day money-back guarantee. No questions asked.
        </motion.p>
      </div>
    </LoggedInWrapper>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <SpotlightCard
      className={`relative overflow-visible h-full border ${plan.popular ? 'border-purple-500/50' : 'border-white/10'} bg-zinc-950/50 backdrop-blur-xl p-5 relative z-10`}
      spotlightColor={plan.spotlightColor || "rgba(255, 255, 255, 0.1)"}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-white/80 via-white to-white/80 text-black text-xs py-1 px-3 rounded-full z-20">
          <span style={{ fontFamily: "Geist" }}>Most Popular</span>
        </div>
      )}

      <div className="flex flex-col justify-start items-start h-full">
        {/* Icon Container */}
        <div className="w-8 h-8 mb-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {plan.icon}
          </motion.div>
        </div>

        {/* Plan Name */}
        <h3 style={{ fontFamily: "Geist" }} className="text-white text-xl md:text-2xl font-semibold mb-1 text-start">
          {plan.name}
        </h3>

        {/* Plan Description */}
        <p style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs mb-4 text-start">
          {plan.description}
        </p>

        {/* Price */}
        <div className="flex items-end mb-2">
          <span style={{ fontFamily: "Geist" }} className="text-white text-3xl md:text-4xl font-bold">
            {plan.price}
          </span>
          <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs ml-1 mb-1">
            /{plan.period}
          </span>
        </div>

        {/* Credits */}
        <div className="mb-4 bg-white/10 px-3 py-1 rounded-md">
          <span style={{ fontFamily: "Geist Mono" }} className="text-white text-sm">
            <span className="font-bold">{plan.credits}</span> Credits
          </span>
        </div>

        {/* Features */}
        <div className="w-full mb-6 flex-grow">
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full text-md font-medium shadow-none hover:shadow-none hover:scale-105 py-5"
          onClick={() => alert(`Coming soon: Purchase ${plan.credits} credits for ${plan.price}`)}
        >
          {plan.ctaText}
        </Button>
      </div>
    </SpotlightCard>
  );
}

function FeatureItem({ feature }: { feature: PricingFeature }) {
  return (
    <li className="flex items-center gap-2">
      {feature.included ? (
        <FaCheck className="text-white flex-shrink-0" />
      ) : (
        <FaTimes className="text-gray-500 flex-shrink-0" />
      )}
      <span
        style={{ fontFamily: "Geist" }}
        className={`text-xs ${feature.included ? 'text-white/90' : 'text-white/40'}`}
      >
        {feature.title}
      </span>
    </li>
  );
}

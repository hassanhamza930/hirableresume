import { Button } from "../ui/button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { HiOutlineLightningBolt } from "react-icons/hi";
import ServerCard from "./ServerCard";

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

export default function ServerPricing() {
  return (
    <section className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] mt-24 md:mt-48" aria-labelledby="pricing-title">
      {/* Section Label */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1 mb-6 mx-auto w-fit">
        <span style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs font-medium">
          PRICING PLANS
        </span>
      </div>

      {/* Section Title */}
      <h2 id="pricing-title"
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-2xl sm:text-3xl md:text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 px-4 w-full md:w-[650px] text-white"
      >
        Spend $20 with us, Land your first Job Interview in the next 30 Days.
      </h2>

      {/* Section Description */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mb-10 md:mb-16 text-sm md:text-md font-normal text-center text-white w-full max-w-[550px] px-4"
      >
        Select the perfect plan for your job search needs and start landing interviews with confidence.
      </p>

      {/* Pricing Cards */}
      <div className="w-full flex flex-wrap justify-center items-stretch gap-6 md:gap-8">
        {pricingPlans.map((plan) => (
          <article key={plan.id} className="w-full sm:w-[300px] md:w-[320px]">
            <PricingCard plan={plan} />
          </article>
        ))}
      </div>

      {/* Money-back guarantee note */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mt-8 text-xs text-white/60 text-center"
      >
        All plans come with a 14-day money-back guarantee. No questions asked.
      </p>
    </section>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <ServerCard
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
        <figure className="w-8 h-8 mb-4 flex items-center justify-center" aria-hidden="true">
          {plan.icon}
        </figure>

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
        <section className="w-full mb-6 flex-grow" aria-label="Plan features">
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <FeatureItem key={feature.id} feature={feature} />
            ))}
          </ul>
        </section>

        {/* CTA Button */}
        <footer>
          <Button
            className="w-full text-md font-medium shadow-none hover:shadow-none hover:scale-105 py-5"
          >
            {plan.ctaText}
          </Button>
        </footer>
      </div>
    </ServerCard>
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

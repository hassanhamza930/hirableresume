'use client';

import Hero from "@/components/Hero";
import Navbar from "../../components/Navbar";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQs from "@/components/FAQs";
import { LoggedOutWrapper } from "../components/LoggedOutWrapper";

export default function LanderPage() {
  return (
    <LoggedOutWrapper>
      <div className="relative z-0 w-full flex flex-col justify-start items-center overflow-x-hidden pb-36">
        <Navbar />
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQs />

        {/* Schema.org JSON-LD for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "HirableResume",
              "url": "https://hirableresume.com/lander",
              "description": "Personalize your resume for each job description using AI to get your foot in the door and land more interviews."
            })
          }}
        />
      </div>
    </LoggedOutWrapper>
  );
}

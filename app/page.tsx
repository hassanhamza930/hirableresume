import ServerHero from "@/components/server/Hero";
import ServerTestimonials from "@/components/server/Testimonials";
import ServerFeatures from "@/components/server/Features";
import ServerPricing from "@/components/server/Pricing";
import ServerFAQs from "@/components/server/FAQs";
import ServerResources from "@/components/server/Resources";
import { LoggedOutWrapper } from "./components/LoggedOutWrapper";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HirableResume - AI-Powered Resume Builder",
  description: "Personalize your resume for each job description using AI to get your foot in the door and land more interviews.",
  alternates: {
    canonical: 'https://hirableresume.com',
  },
};

export default function Home() {
  return (
    <main className="relative z-0 w-full flex flex-col justify-start items-center overflow-x-hidden pb-36">
      <Navbar/>
      <ServerHero />
      <ServerFeatures />
      <ServerTestimonials />
      <ServerPricing />
      <ServerResources />
      <ServerFAQs />

      {/* Hidden client component for authentication check */}
      <div className="hidden">
        <LoggedOutWrapper>
          <div></div>
        </LoggedOutWrapper>
      </div>

      {/* Schema.org JSON-LD for Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "HirableResume",
            "url": "https://hirableresume.com",
            "description": "Personalize your resume for each job description using AI to get your foot in the door and land more interviews.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://hirableresume.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* Schema.org JSON-LD for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HirableResume",
            "url": "https://hirableresume.com",
            "logo": "https://hirableresume.com/logo.png",
            "sameAs": [
              "https://twitter.com/hirableresume",
              "https://www.linkedin.com/company/hirableresume",
              "https://www.facebook.com/hirableresume"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-123-4567",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            }
          })
        }}
      />

      {/* Schema.org JSON-LD for SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "HirableResume",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "7.99",
              "priceCurrency": "USD"
            },
            "operatingSystem": "Web",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1024"
            }
          })
        }}
      />
    </main>
  );
}

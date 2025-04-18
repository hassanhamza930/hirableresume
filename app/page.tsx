import ServerHero from "@/components/server/Hero";
import ServerTestimonials from "@/components/server/Testimonials";
import ServerFeatures from "@/components/server/Features";
import ServerPricing from "@/components/server/Pricing";
import ServerFAQs from "@/components/server/FAQs";
import ServerResources from "@/components/server/Resources";
import { LoggedOutWrapper } from "./components/LoggedOutWrapper";
import Navbar from "@/components/Navbar";

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
    </main>
  );
}

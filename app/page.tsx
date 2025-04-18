import ServerHero from "@/components/server/Hero";
import ServerNavbar from "@/components/server/Navbar";
import ServerTestimonials from "@/components/server/Testimonials";
import ServerFeatures from "@/components/server/Features";
import ServerPricing from "@/components/server/Pricing";
import ServerFAQs from "@/components/server/FAQs";
import { LoggedOutWrapper } from "./components/LoggedOutWrapper";

export default function Home() {
  return (
    <main className="relative z-0 w-full flex flex-col justify-start items-center overflow-x-hidden pb-36">
      <ServerNavbar />
      <ServerHero />
      <ServerFeatures />
      <ServerTestimonials />
      <ServerPricing />
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

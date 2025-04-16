import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQs from "@/components/FAQs";
import { LoggedOutWrapper } from "./components/LoggedOutWrapper";

export default function Home() {
  return (
    <LoggedOutWrapper>
    <div className="relative z-0 w-full flex flex-col justify-start items-center overflow-x-hidden pb-36">
      <Navbar />
      <Hero/>
      <Features />
      <Testimonials />
      <Pricing />
      <FAQs />
    </div>
    </LoggedOutWrapper>
  );
}

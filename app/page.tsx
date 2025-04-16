import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center overflow-x-hidden">
      <Navbar />
      <Hero/>
      <Features />
      <Testimonials />
      <Pricing />
    </div>
  );
}

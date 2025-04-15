import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center">
      <Navbar />
      <Hero/>
      <Features />
      <Testimonials />
    </div>
  );
}

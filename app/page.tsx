import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-start items-center">
      <Navbar />
      <Hero/>
      <Testimonials />
    </div>
  );
}

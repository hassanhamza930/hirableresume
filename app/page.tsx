import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col justify-start items-center">
      <Navbar />
      <Hero/>
    </div>
  );
}

import Link from "next/link";
import { Button } from "../ui/button";
import { FaHandPointer } from "react-icons/fa6";

export default function ServerHero() {
  return (
    <header className="w-full flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32">
      {/* Logo */}
      <figure>
        <img
          src="/logo.png"
          alt="HirableResume Logo"
          className="h-28 w-28 md:h-42 md:w-42 object-contain object-center rotate-[-12deg]"
        />
      </figure>

      {/* Title */}
      <h1
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 text-white"
      >
        Hack the job market in 2025 with AI
      </h1>

      {/* Subtitle */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
      >
        Make hyper-personalized resumes for each job description to beat ATS systems and get your foot in the door.
      </p>

      {/* CTA Button */}
      <div className="mt-10 relative flex justify-center items-center">
        <Button className="text-md md:text-lg font-semibold px-10 py-3 md:py-5" asChild>
          <Link href="/signin">Get a Free Resume</Link>
        </Button>

        <span className="absolute -right-5 -bottom-5" aria-hidden="true">
          <FaHandPointer className="text-yellow-400 h-6 w-6" />
        </span>
      </div>

      {/* Video section */}
      <section className="w-auto relative flex justify-center items-center overflow-hidden mt-24 p-0 md:p-16 rounded-2xl">
        <img src="chrome.gif" alt="Chrome browser interface" className="w-full h-full absolute z-0 object-cover object-center" />
        <div className="w-full h-full absolute z-10 object-cover object-center bg-zinc-800/50 backdrop-blur-2xl backdrop-brightness-[1.0] backdrop-contrast-[3.0] backdrop-saturate-200" aria-hidden="true" />

        <figure className="relative z-10 w-full md:w-auto md:h-[450px] rounded-xl overflow-hidden flex flex-col md:flex-row justify-center items-center bg-black">
          <video src="/hero.mp4" autoPlay loop muted className="h-full w-full object-cover rounded-none" aria-label="Demo video of resume creation"></video>
          <video src="/hero2.mp4" autoPlay loop muted className="h-full w-full object-cover rounded-xl" aria-label="Demo video of resume customization"></video>
        </figure>
      </section>
    </header>
  );
}

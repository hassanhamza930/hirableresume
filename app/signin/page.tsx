"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import BlurReveal from "@/components/BlurText";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoggedOutWrapper } from "../components/LoggedOutWrapper";

export default function SignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);

    try {
      const result = await signInWithGoogle();
      if (result.success) {
        toast.success("Welcome to HirableResume!");
        router.push("/home");
      } else {
        toast.error(result.error?.message || "Authentication failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <LoggedOutWrapper>
      <div className="w-full min-h-screen flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32 pb-36">
        {/* Back to home link */}
        <Link
          href="/"
          className="absolute top-6 left-6 text-white/70 hover:text-white transition-all duration-300"
          style={{ fontFamily: "Geist Mono" }}
        >
          ← Back to home
        </Link>

        {/* Title */}
        <BlurReveal
          style={{ fontFamily: "Special Gothic Expanded One" }}
          className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600"
          text="Let's Get You Hired"
        />

        {/* Subtitle */}
        <BlurReveal
          style={{ fontFamily: "Geist Mono" }}
          className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
          text="Access or create your account to manage your personalized resumes."
        />

        {/* Sign-in form container */}
        <motion.div
          variants={{
            hidden: { filter: "blur(10px)", transform: "translateY(5%)", opacity: 0 },
            visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 w-full md:w-96 px-10"
        >
          {/* Google sign-in button */}
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 text-md py-5"
            disabled={isSigningIn}
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </Button>
        </motion.div>
      </div>
    </LoggedOutWrapper>
  );
}

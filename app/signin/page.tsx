"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import BlurReveal from "@/components/BlurText";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    // Implement email sign-in logic here
    setIsSigningIn(false);
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    // Implement Google sign-in logic here
    setIsSigningIn(false);
  };

  return (
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
        text="Welcome Back"
      />

      {/* Subtitle */}
      <BlurReveal
        style={{ fontFamily: "Geist Mono" }}
        className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
        text="Access your account to create and manage your personalized resumes."
      />

      {/* Sign-in form container */}
      <motion.div
        variants={{
          hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
          visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-10 w-full max-w-md p-6 md:p-8 rounded-xl backdrop-blur-xl backdrop-brightness-50 border border-white/20 border-dashed"
      >
        {/* Email sign-in form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-white/80"
              style={{ fontFamily: "Geist Mono" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              style={{ fontFamily: "Geist" }}
            />
          </div>
          
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-white/80"
              style={{ fontFamily: "Geist Mono" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              style={{ fontFamily: "Geist" }}
            />
          </div>
          
          <div className="flex justify-end">
            <Link 
              href="/forgot-password" 
              className="text-xs text-white/60 hover:text-white/90 transition-all duration-300"
              style={{ fontFamily: "Geist Mono" }}
            >
              Forgot password?
            </Link>
          </div>
          
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 text-md py-5"
            disabled={isSigningIn}
          >
            <MdEmail className="h-5 w-5" />
            Sign in with Email
          </Button>
        </form>
        
        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20 border-dashed"></div>
          </div>
          <div className="relative flex justify-center">
            <span 
              className="px-2 bg-zinc-950 text-white/60 text-sm"
              style={{ fontFamily: "Geist Mono" }}
            >
              OR
            </span>
          </div>
        </div>
        
        {/* Google sign-in button */}
        <Button 
          onClick={handleGoogleSignIn} 
          className="w-full flex items-center justify-center gap-2 text-md py-5"
          disabled={isSigningIn}
        >
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </Button>
        
        {/* Sign up link */}
        <p 
          className="mt-6 text-center text-sm text-white/60"
          style={{ fontFamily: "Geist Mono" }}
        >
          Don't have an account?{" "}
          <Link 
            href="/signup" 
            className="text-white hover:underline transition-all duration-300"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

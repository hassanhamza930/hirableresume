"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import BlurReveal from "@/components/BlurText";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Implement password reset logic here
    
    // Simulate success for now
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center px-[5%] md:px-[10%] pt-24 md:pt-32">
      {/* Back to sign in link */}
      <Link 
        href="/signin" 
        className="absolute top-6 left-6 text-white/70 hover:text-white transition-all duration-300"
        style={{ fontFamily: "Geist Mono" }}
      >
        ← Back to sign in
      </Link>

      {/* Title */}
      <BlurReveal
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600"
        text="Reset your password"
      />

      {/* Subtitle */}
      <BlurReveal
        style={{ fontFamily: "Geist Mono" }}
        className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
        text="Enter your email address and we'll send you a link to reset your password."
      />

      {/* Form container */}
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
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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
            
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 text-md py-5"
              disabled={isSubmitting}
            >
              <MdEmail className="h-5 w-5" />
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 
              className="text-xl font-medium text-white"
              style={{ fontFamily: "Geist" }}
            >
              Check your email
            </h3>
            <p 
              className="text-white/70"
              style={{ fontFamily: "Geist Mono" }}
            >
              We've sent a password reset link to {email}
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="mt-4"
            >
              Send again
            </Button>
          </div>
        )}
        
        {/* Sign in link */}
        <p 
          className="mt-6 text-center text-sm text-white/60"
          style={{ fontFamily: "Geist Mono" }}
        >
          Remember your password?{" "}
          <Link 
            href="/signin" 
            className="text-white hover:underline transition-all duration-300"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import React from "react";

// Define variants that include both the blur reveal and spinning animation
const logoVariants = {
  hidden: {
    filter: "blur(10px)",
    transform: "translateY(20%)",
    opacity: 0,
    rotateZ: 0,
    scale: 1
  },
  visible: {
    filter: "blur(0)",
    transform: "translateY(0)",
    opacity: 1,
    rotateZ: [0, 5, 0, 5], // Spinning animation values
    scale: [1, 1.1, 1, 1.1], // Scaling animation values
    transition: {
      filter: { duration: 2, ease: [.25,.1,.25,1] },
      transform: { duration: 2, ease: [.25,.1,.25,1] },
      opacity: { duration: 2, ease: [.25,.1,.25,1] },
      rotateZ: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: 2 // Start spinning after blur reveal completes
      },
      scale: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay: 2 // Start scaling after blur reveal completes
      }
    }
  }
};

export default function BlurRevealLogo({ className, style }: { className?: string, style?: React.CSSProperties }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
    >
      <motion.img
        src="/logo.png"
        className={`h-52 w-52 object-contain object-center rotate-[-12deg] ${className || ""}`}
        style={style}
        variants={logoVariants}
      />
    </motion.div>
  );
}

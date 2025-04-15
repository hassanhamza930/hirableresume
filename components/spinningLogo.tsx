"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";

export default function SpinningLogo() {
   
    return (
        <motion.img
            src="/logo.png"
            className="h-52 w-52"
            initial={{ scale: 1,rotateZ:0 }}
            animate={{rotateZ:5}}
            whileHover={{ scale: 1.3, rotateZ:20 }}
            transition={{
                ease:"easeInOut",
                duration:2
            }}
        />
    );
}
"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { FaHandPointer } from "react-icons/fa6";
import BlurReveal from "./BlurText";
import BlurRevealLogo from "./BlurRevealLogo";

export default function Hero() {
    return (
        <div className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] pt-16 md:pt-24">

            <BlurRevealLogo />

            <BlurReveal
                style={{ fontFamily: "Special Gothic Expanded One" }}
                className="mt-5 w-full max-w-[550px] px-4 text-3xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600" text="Hack the job market in 2025 with AI" />


            <BlurReveal
                style={{ fontFamily: "Geist Mono" }}
                className="mt-5 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4" text="Make hyper-personalized resumes for each job description to beat ATS systems and get your foot in the door." />


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mt-10 relative flex justify-center items-center">
                <Button className="text-md md:text-lg font-semibold px-10 py-3 md:py-5">
                    Get a Free Resume
                </Button>

                <motion.div
                    initial={{
                        x: 20,
                        scale: 1
                    }}
                    animate={{
                        x: [50, 6, 50],
                        y: [30, 6, 30],
                        scale: [1, 1, 0.8, 1, 1]
                    }}
                    transition={{
                        duration: 2,
                        delayChildren: 0.5,
                        ease: "backInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute right-0 bottom-0">
                    <FaHandPointer className="text-yellow-400 h-6 w-6" />
                </motion.div>

            </motion.div>


            <motion.div
                variants={
                    {
                        hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
                        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
                    }
                }
                initial="hidden"
                whileInView={"visible"}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-full flex justify-center items-center overflow-hidden"
            >
                <div className=" mt-12 md:mt-24 w-[80%] md:w-auto md:h-96 rounded-xl overflow-hidden flex flex-col md:flex-row justify-center items-center bg-black">
                    <video src="/hero.mp4" autoPlay loop muted className="h-full w-full object-cover rounded-none"></video>
                    <video src="/hero2.mp4" autoPlay loop muted className="h-full w-full object-cover rounded-xl"></video>
                </div>
            </motion.div>


        </div >
    )
}
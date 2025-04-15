"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BlurReveal from "./BlurText";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <div className="w-full flex flex-col justify-start items-center px-[10%] mt-48">
      {/* Section Title */}
      <BlurReveal
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600"
        text="Our Users LOVE us 🫰"
      />

      {/* Section Description */}
      <BlurReveal
        style={{ fontFamily: "Geist Mono" }}
        className="mb-10 text-md font-normal text-center text-white w-[450px]"
        text="Used by 1200+ People to ACTUALLY get hired at S&P 500 companies."
      />

      {/* Testimonials Marquee */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full"
      >
        <Marquee
          gradient={true}
          gradientColor="#0A0A0B"
          speed={40}
          pauseOnHover={true}
          className="py-4 overflow-hidden"
        >
          <div className="flex gap-4 px-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Marquee>
      </motion.div>

      {/* Second row of testimonials going in the opposite direction */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        className="w-full mt-0"
      >
        <Marquee
          gradient={true}
          gradientColor="#0A0A0B"
          speed={40}
          pauseOnHover={true}
          direction="right"
          className="py-4 overflow-hidden"
        >
          <div className="flex gap-4 px-4">
            {[...testimonials].reverse().map((testimonial) => (
              <TestimonialCard key={`reverse-${testimonial.id}`} testimonial={testimonial} />
            ))}
          </div>
        </Marquee>
      </motion.div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="w-[350px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shadow-white/5 hover:shadow-white/10 transition-all duration-300">
      <CardHeader className="">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-white/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle style={{ fontFamily: "Geist" }} className="text-white text-lg">
              {testimonial.name}
            </CardTitle>
            <CardDescription style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs">
              {testimonial.role} at {testimonial.company}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p style={{ fontFamily: "Geist" }} className="text-white/80 text-sm">
          "{testimonial.content}"
        </p>
      </CardContent>
    </Card>
  );
}

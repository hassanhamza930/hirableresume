import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";

export default function ServerTestimonials() {
  return (
    <section className="w-full flex flex-col justify-start items-center px-[5%] sm:px-[10%] mt-24 md:mt-48" aria-labelledby="testimonials-title">
      {/* Section Title */}
      <h2 id="testimonials-title"
        style={{ fontFamily: "Special Gothic Expanded One" }}
        className="mb-2 text-2xl sm:text-3xl md:text-4xl text-center flex flex-wrap gap-x-2 justify-center items-center text-shadow-2xs text-shadow-blue-600 px-4 text-white"
      >
        Our Users LOVE us 🫰
      </h2>

      {/* Section Description */}
      <p
        style={{ fontFamily: "Geist Mono" }}
        className="mb-6 md:mb-10 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4"
      >
        Used by 1200+ People to ACTUALLY get hired at S&P 500 companies.
      </p>

      {/* Testimonials container */}
      <div className="w-full overflow-hidden">
        <ul className="flex gap-4 px-4 py-4 w-full flex-wrap md:flex-row justify-center items-center list-none">
          {testimonials.slice(0, 2).map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
          {[...testimonials].reverse().slice(0, 2).map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="w-full md:w-[350px] flex flex-none bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shadow-white/5 hover:shadow-white/10 transition-all duration-300">
      <CardHeader className="">
        <article className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-white/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <header>
            <CardTitle style={{ fontFamily: "Geist" }} className="text-white text-md md:text-lg">
              {testimonial.name}
            </CardTitle>
            <CardDescription style={{ fontFamily: "Geist Mono" }} className="text-white/70 text-xs">
              {testimonial.role} at {testimonial.company}
            </CardDescription>
          </header>
        </article>
      </CardHeader>
      <CardContent>
        <blockquote style={{ fontFamily: "Geist" }} className="text-white/80 text-xs md:text-sm">
          "{testimonial.content}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

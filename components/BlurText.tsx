"use client";
import {motion} from "motion/react";
import React from "react";

const transition = { duration: 2, ease: [.25,.1,.25,1] };
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
  visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

export default function BlurReveal({text,className,style}:{text:string,className?:string,style:Object}) {
    const words = text.split(" ");  
  
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.04 }}
      >
        <h1 style={style} className={`font-normal text-white ${className}`}>
          {words.map((word, index) => (
            <React.Fragment key={index}>
              <motion.span className="inline-block" transition={transition} variants={variants}>
                {word}
              </motion.span>
              {index < words.length - 1 && ' '}
            </React.Fragment>
          ))}
        </h1>
      </motion.div>
    )
  }
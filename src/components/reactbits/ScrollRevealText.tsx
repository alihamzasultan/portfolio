"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-[0.5em] mt-[0.2em] inline-block">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
}

export default function ScrollRevealText({ text }: { text: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.1"],
  });

  const words = text.split(" ");

  return (
    <p 
      ref={container} 
      className="flex flex-wrap justify-start text-left text-lg sm:text-xl md:text-2xl font-normal leading-relaxed tracking-wide max-w-6xl mx-auto"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        // make the transition slightly overlap for a smoother effect
        const end = start + 1.5 / words.length; 
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

"use client";

import ScrollRevealText from "./reactbits/ScrollRevealText";
import LightPillar from "./reactbits/LightPillar";

export default function AboutSection() {
  return (
    <section className="py-20 border-t border-white/5 relative bg-[#111111]" id="about">
      <div className="w-full max-w-6xl mx-auto relative z-10 px-6 sm:px-12 flex flex-col items-center">
        {/* Header Group */}
        <div className="relative py-10 w-full flex flex-col items-start">
          <ScrollRevealText text="Every great project begins with a compelling story. As a Full Stack Developer, I started my journey a few years ago, delving deep into the tech world. Since then, I've built everything from powerful back-end systems to user-friendly front-end experiences. My passion also extends to Data Science, where I’m currently expanding my knowledge and skills." />
        </div>
      </div>
    </section>
  );
}

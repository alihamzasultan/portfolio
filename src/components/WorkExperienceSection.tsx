"use client";

import React, { useRef, useState, useEffect } from "react";
import SplitText from "./reactbits/SplitText";
import Dither from "./reactbits/Dither";

const experiences = [
  {
    role: "AI Automation Engineer",
    company: "@ KodexoLabs",
    date: "Sep 2025 — Present",
    logoColor: "from-purple-500 to-indigo-500",
    logoText: "KL",
    logoUrl: "https://kodexolabs.com/img/logo-light.png"
  },
  {
    role: "Computer Science Lecturer",
    company: "@ Bahria College Karsaz",
    date: "Feb 2026 — Present",
    logoColor: "from-blue-500 to-cyan-500",
    logoText: "BCK",
    logoUrl: "https://bahriafoundation.com/wp-content/uploads/2024/10/logo.png"
  },
  {
    role: "AI Software Dev Engineer (On-Site)",
    company: "@ Authentik Track and Trace",
    location: "Karachi",
    date: "Jan 2024 — Dec 2025",
    logoColor: "from-emerald-500 to-teal-600",
    logoText: "AT",
    logoUrl: "https://www.authentiksolution.com/wp-content/uploads/2024/10/Layer_1.svg"
  },
  {
    role: "Freelance AI & Chatbot Developer",
    company: "@ Fiverr & Upwork",
    date: "2023 — Present",
    logoColor: "from-green-400 to-emerald-600",
    logoText: "F/U"
  }
];

export default function WorkExperienceSection() {
  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden" id="experience">
      <div className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-auto">
        <Dither
          waveColor={[128 / 255, 128 / 255, 128 / 255]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.5}
          colorNum={4}
          waveAmplitude={0.07}
          waveFrequency={0.5}
          waveSpeed={0.01}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Column - Sticky header */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit relative py-10">
          
          <SplitText tag="h2" textAlign="left" className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Experience
          </SplitText>
          
          <p className="text-gray-400 text-lg leading-relaxed">
            I have worked with some of the most innovative industry leaders to help build their top-notch products.
          </p>
        </div>

        {/* Right Column - List */}
        <div className="lg:w-2/3 flex flex-col">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 py-6 border-b border-white/5 hover:bg-white/5 transition-all duration-300 px-4 -mx-4 rounded-2xl cursor-pointer"
            >
              {/* Logo */}
              <div 
                className={`mt-1 flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden
                  ${exp.logoUrl ? 'w-24 h-12 rounded-lg bg-white' : `w-12 h-12 rounded-full bg-gradient-to-tr ${exp.logoColor} font-bold text-sm text-white`}
                `}
              >
                {exp.logoUrl ? (
                  <img src={exp.logoUrl} alt={`${exp.company} logo`} className="w-full h-full object-contain p-1.5" />
                ) : (
                  exp.logoText
                )}
              </div>
              
              {/* Content */}
              <div className="flex-grow flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
                <div className="flex-grow pr-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {exp.company} {exp.location && <span className="opacity-75">| {exp.location}</span>}
                  </p>
                </div>
                
                {/* Date */}
                <div className="text-gray-500 text-sm font-medium sm:text-right whitespace-nowrap pt-1 sm:pt-0">
                  {exp.date}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

"use client";

import ShinyText from "./reactbits/ShinyText";
import SpotlightCard from "./reactbits/SpotlightCard";

interface SkillItemProps {
  name: string;
  percent: number;
  image?: string;
  svgIcon?: React.ReactNode;
}

function SkillItem({ name, percent, image, svgIcon }: SkillItemProps) {
  const radius = 32;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <SpotlightCard className="flex flex-col items-center justify-center text-center p-6 bg-[#090915]/60 hover:border-blue-500/20 rounded-2xl transition-all duration-300 relative z-10 backdrop-blur-sm">
      {/* Circle Icon and Gauge */}
      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
        {/* Progress Circle SVG */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-neutral-800 fill-none"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-blue-500 fill-none transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Icon */}
        <div className="relative z-10 w-12 h-12 flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="w-10 h-10 object-contain" />
          ) : (
            svgIcon
          )}
        </div>

        {/* Floating Percent Text */}
        <span className="absolute bottom-1 bg-[#05050a] border border-white/5 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
          {percent}%
        </span>
      </div>

      {/* Skill Name */}
      <p className="text-sm font-bold text-gray-300 tracking-wide">{name}</p>
    </SpotlightCard>
  );
}

export default function SkillsSection() {
  const skills = [
    { name: "React Native", percent: 85, image: "/images/react.png" },
    { name: "Python", percent: 95, image: "/images/python.png" },
    { name: "HuggingFace", percent: 90, image: "/images/hf-logo.png" },
    { name: "Streamlit", percent: 90, image: "/images/st-logo.png" },
    { name: "HTML", percent: 90, image: "/images/html-5.png" },
    { name: "CSS", percent: 90, image: "/images/css.png" },
    { name: "Tailwind CSS", percent: 80, image: "/images/taiwind.png" },
    { name: "Javascript", percent: 90, image: "/images/javascript.png" },
    {
      name: "Next.js",
      percent: 85,
      svgIcon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" className="w-10 h-10">
          <mask id="next-mask">
            <circle cx="90" cy="90" fill="white" r="90"></circle>
          </mask>
          <g mask="url(#next-mask)">
            <circle cx="90" cy="90" fill="black" r="90"></circle>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next-paint0)"></path>
            <rect fill="url(#next-paint1)" height="72" width="12" x="115" y="54"></rect>
          </g>
          <defs>
            <linearGradient id="next-paint0" x1="109" x2="144.5" y1="116.5" y2="160.5">
              <stop stopColor="white"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient id="next-paint1" x1="121" x2="120.799" y1="54" y2="106.875">
              <stop stopColor="white"></stop>
              <stop offset="1" stopColor="white" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    { name: "Node.js", percent: 95, image: "/images/nodejs.png" },
    { name: "C#", percent: 70, image: "/images/csharp.png" },
    { name: "SQL / MySQL", percent: 80, image: "/images/sql.png" },
    { 
      name: "n8n", 
      percent: 85, 
      svgIcon: <div className="text-xl font-black text-red-500 flex items-center justify-center w-full h-full">n8n</div> 
    },
    { 
      name: "Zapier", 
      percent: 80, 
      svgIcon: <div className="text-xl font-black text-orange-500 flex items-center justify-center w-full h-full">_z</div> 
    },
    { 
      name: "Make.com", 
      percent: 85, 
      svgIcon: <div className="text-xl font-black text-purple-500 flex items-center justify-center w-full h-full">m</div> 
    },
    { 
      name: "Vapi", 
      percent: 75, 
      svgIcon: <div className="text-xl font-black text-blue-400 flex items-center justify-center w-full h-full">V</div> 
    },
  ];

  return (
    <section className="py-8 relative overflow-hidden" id="skills">
      {/* Skills Marquee - Full Width */}
      <div className="w-full relative overflow-hidden fade-x-edges pointer-events-auto">
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] gap-4">
          {[...skills, ...skills, ...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <div 
              key={index} 
              className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0a0a16]/80 backdrop-blur-sm border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 shadow-lg shadow-black/20"
            >
               <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  {skill.image ? (
                    <img src={skill.image} alt={skill.name} className="w-full h-full object-contain drop-shadow-md" />
                  ) : (
                    <div className="scale-75 origin-center">{skill.svgIcon}</div>
                  )}
               </div>
               <span className="text-gray-300 font-medium text-sm whitespace-nowrap group-hover:text-white transition-colors duration-300">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

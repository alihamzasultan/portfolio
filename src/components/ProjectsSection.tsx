"use client";
import React from "react";
import Image from "next/image";
import SplitText from "./reactbits/SplitText";
import ShinyText from "./reactbits/ShinyText";
import LightPillar from "./reactbits/LightPillar";

interface Project {
  title: string;
  github: string;
  link: string;
  tags: string[];
  image: string;
  year: string;
  bgColor: string;
  colSpan?: number;
}

const projects: Project[] = [
  {
    title: "AI Real Estate platform",
    github: "https://github.com/alihamzasultan/chatbot-sidebars",
    link: "https://linkhome.ai",
    tags: ["Development", "AI Integration"],
    image: "/images/linkhome.PNG",
    year: "2024",
    bgColor: "bg-[#fbcfe8]", // Pink
  },
  {
    title: "Real-Time Talking Avatar",
    github: "https://github.com/alihamzasultan/FRONTEND.git",
    link: "https://frontend-76xu.vercel.app/",
    tags: ["Development", "Design"],
    image: "/images/avatar.png",
    year: "2024",
    bgColor: "bg-[#bfdbfe]", // Blue
  },
  {
    title: "Admin Dashboard Automation",
    github: "https://github.com/alihamzasultan/chatbot-sidebars",
    link: "https://linkhome.ai",
    tags: ["Development", "Backend"],
    image: "/images/ice.png",
    year: "2023",
    bgColor: "bg-[#fef08a]", // Yellow
  },
  {
    title: "IT Consulting Website",
    github: "https://github.com/alihamzasultan/chatbot-sidebars",
    link: "https://morgana-nextjs.vercel.app/",
    tags: ["Development", "Design"],
    image: "/images/morgana.PNG",
    year: "2023",
    bgColor: "bg-[#93c5fd]", // Darker Blue
  },
  {
    title: "Python Data Analyst Assistant",
    github: "https://github.com/alihamzasultan/DATA-ANALYST-web?tab=readme-ov-file",
    link: "https://smartdataanalyst.streamlit.app/",
    tags: ["Data Science", "Python"],
    image: "/images/EDA.png",
    year: "2022",
    bgColor: "bg-[#fbcfe8]", // Pink
  },
  {
    title: "Python Chatbot",
    github: "https://github.com/alihamzasultan/ML-customChatbot-flask",
    link: "#",
    tags: ["Machine Learning", "Development"],
    image: "/images/chat.png",
    year: "2022",
    bgColor: "bg-[#bfdbfe]", // Blue
  },
];

function ProjectCard({ project }: { project: Project }) {
  // Extract hex color from "bg-[#xxxxxx]"
  const hexColor = project.bgColor.match(/bg-\[(#.*?)\]/)?.[1] || "#ffffff";

  return (
    <div className={`flex flex-col group cursor-pointer ${project.colSpan === 2 ? 'md:col-span-2' : ''}`}>
      <a href={project.link !== "#" ? project.link : project.github} target="_blank" rel="noreferrer" className="block relative w-full aspect-[4/3] rounded-[32px] overflow-hidden mb-6 flex items-center justify-center p-6 sm:p-10 transition-transform duration-500 bg-[#0a0a0f]">
        
        {/* LightPillar Background Layer */}
        <div className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.03]`}>
          <LightPillar
            topColor="#000000"
            bottomColor={hexColor}
            intensity={1.0}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={10.0}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
          />
        </div>
        
        {/* We also add a subtle gradient overlay to make the image pop if needed, or just keep it clean */}
        
        <img
          src={project.image}
          alt={project.title}
          className="relative z-10 w-full h-auto max-h-full object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-2 transition-transform duration-500"
        />
      </a>
      
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs sm:text-sm font-medium border border-white/5 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-gray-500 text-sm font-medium ml-4">
          {project.year}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-24 border-t border-white/5 relative z-10 bg-[#111111] overflow-hidden" id="portfolio">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header matching screenshot */}
        <div className="mb-16 relative py-10">
          <SplitText tag="h2" textAlign="left" className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Featured Projects
          </SplitText>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Here's a curated selection showcasing my expertise and the achieved results.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 gap-y-16">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>

        {/* View All Button */}

        
      </div>
    </section>
  );
}

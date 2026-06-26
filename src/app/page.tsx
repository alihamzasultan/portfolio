"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import TextMarquee from "../components/TextMarquee";
import WorkExperienceSection from "../components/WorkExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import AwardsSection from "../components/AwardsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col z-10">

      {/* Background Gradient/Overlay */}
      <div className="fixed inset-0 bg-gradient-to-tr from-[#05050c] via-[#090915]/95 to-[#0b0c16] z-[-3] pointer-events-none" />

      {/* Top Navbar Navigation */}
      <Navbar />

      {/* Main Full-Width Layout */}
      <div className="relative w-full flex flex-col min-h-screen">
        <div className="flex-grow w-full flex flex-col pb-20">
          <HeroSection />
          <SkillsSection />
          <AboutSection />
          <TextMarquee />
          <WorkExperienceSection />
          <AwardsSection />
          <ProjectsSection />
        </div>
      </div>
    </main>
  );
}

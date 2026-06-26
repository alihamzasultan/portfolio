"use client";

import TextType from "./reactbits/TextType";
import Shuffle from "./reactbits/Shuffle";
import Dither from "./reactbits/Dither";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden" id="home">
      {/* Background Dither */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden opacity-50">
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

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-auto">
        <Shuffle 
          text="Hi, I'm Ali Hamza" 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl" 
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
        />
        <div className="h-10 sm:h-12 flex items-center justify-center">
          <TextType 
            text={["React Native Developer", "AI Engineer", "Full Stack Developer", "Creative Coder"]}
            className="text-lg sm:text-2xl md:text-3xl text-gray-300 drop-shadow-md font-medium"
            typingSpeed={60}
            deletingSpeed={30}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-blue-400 font-bold"
          />
        </div>
      </div>

      {/* Scroll Down Chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <a 
          href="#about"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all animate-[bounce_2s_infinite] cursor-pointer"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

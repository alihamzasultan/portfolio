"use client";

export default function TextMarquee() {
  const items = [
    "Full Stack Development",
    "Graphics",
    "Animations",
    "Community",
    "Mentorship",
    "Web",
    "React Native",
    "AI Engineering",
    "Data Science",
    "Machine Learning"
  ];

  return (
    <div className="w-full bg-[#05050a]/80 backdrop-blur-md border-y border-white/5 py-5 overflow-hidden relative fade-x-edges">
      <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
        {/* Repeat enough times to fill a wide screen and allow seamless loop */}
        {[...items, ...items, ...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-gray-500 font-semibold text-lg md:text-xl uppercase tracking-widest px-8 hover:text-white transition-colors duration-300">
              {item}
            </span>
            <span className="text-gray-600 text-sm opacity-50">✧</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import SplitText from "./reactbits/SplitText";
import TiltedCard from "./reactbits/TiltedCard";
import LightPillar from "./reactbits/LightPillar";

const awards = [
  {
    title: "Prize Winner in Microsoft Copilot Agentic AI Hackathon",
    date: "2024",
    image: "/images/award-runner-up.jpg"
  }
];

export default function AwardsSection() {
  return (
    <section className="py-32 relative overflow-hidden" id="awards">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightPillar
          topColor="#000000"
          bottomColor="#5d5e60"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={10.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column - Text */}
        <div className="lg:w-1/2 flex flex-col items-start justify-center relative py-10">
          
          
          <SplitText tag="h2" textAlign="left" className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Awards &<br />Recognition
          </SplitText>
          
          <p className="text-gray-400 text-lg leading-relaxed">
            I have been recognized for my commitment to excellence and innovation in cutting-edge technologies, particularly in competitive hackathons and events.
          </p>
        </div>

        {/* Right Column - Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end w-full mt-12 lg:mt-0">
          <div className="relative w-full max-w-md aspect-square lg:h-[480px] lg:aspect-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group border border-white/10 bg-white/5 transition-all duration-700 hover:border-indigo-500/30">
            {/* Animated gradient background behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
            
            <div className="relative z-10 w-full h-full p-4 sm:p-6 flex items-center justify-center">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden shadow-2xl relative bg-black/40 border border-white/5">
                <TiltedCard
                  imageSrc={awards[0].image}
                  altText={awards[0].title}
                  captionText={`${awards[0].title} - ${awards[0].date}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.06}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

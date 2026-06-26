"use client";

import SplitText from "./reactbits/SplitText";

import ShinyText from "./reactbits/ShinyText";

export default function ResumeSection() {
  const timelineItems = [
    {
      date: "2021 - Present",
      title: "Bachelor Degree of Artificial Intelligence",
      subtitle: "Bahria University Karachi Campus (BUKC)",
      details: "CGPA : 3.35",
    },
    {
      date: "2019 - 2021",
      title: "FSC in Pre Engineering",
      subtitle: "Bahria College Karsaz (BCKz)",
      details: "Grade : A",
    },
    {
      date: "2010 - 2013",
      title: "SSC in General Science",
      subtitle: "Bahria Model College",
      details: "Grade : A",
    },
  ];

  return (
    <section className="py-20 border-t border-white/5" id="resume">
      <div className="w-full max-w-3xl">
        {/* Header Group */}
        <div className="mb-12 relative py-10">

        {/* Title */}
        <SplitText tag="h2" textAlign="left" className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
          Education & Experience
        </SplitText>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-white/10 ml-4 space-y-12">
          {timelineItems.map((item, idx) => (
            <div key={idx} className="relative pl-8 group cursor-pointer hover:bg-white/5 p-4 rounded-2xl transition-all duration-300">
              {/* Bullet Circle */}
              <div className="absolute left-[-9px] top-[22px] w-4 h-4 rounded-full bg-[#05050a] border border-white/20 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all duration-300" />

              {/* Content */}
              <div className="space-y-2">
                <span className="inline-block text-xs font-semibold tracking-wider text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                  {item.date}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm font-medium">{item.subtitle}</p>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Briefcase, 
  Layers, 
  FolderGit2, 
  Menu, 
  X
} from "lucide-react";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "resume", label: "Resume", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Layers },
    { id: "portfolio", label: "Projects", icon: FolderGit2 },
  ];

  const socialLinks = [
    { href: "https://wa.me/+923339362758", icon: "lab la-whatsapp", name: "WhatsApp" },
    { href: "https://www.linkedin.com/in/ali-hamza-sultan-1ba7ba267/", icon: "lab la-linkedin", name: "LinkedIn" },
    { href: "https://github.com/alihamzasultan", icon: "lab la-github", name: "GitHub" },
    { href: "https://www.instagram.com/alihamzasultaan", icon: "lab la-instagram", name: "Instagram" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-6 right-6 z-40 lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md cursor-pointer hover:border-blue-500 transition-all duration-300"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Responsive Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />
          
          <div className="relative ml-auto flex flex-col w-72 h-full bg-[#090910] border-l border-white/5 p-8 transition-transform duration-300">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mt-12 flex-grow">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-6">Menu</p>
              <ul className="space-y-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center gap-4 w-full py-2 text-left text-base font-medium transition-colors ${
                          activeSection === item.id ? "text-blue-400" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">Social</p>
              <div className="flex gap-4">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    <i className={`${link.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Floating Icon Menu */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6 p-4 rounded-full bg-black/40 border border-white/5 backdrop-blur-md glow-primary">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" 
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              <Icon size={18} />
              <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-[#090910] border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-md shadow-md pointer-events-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

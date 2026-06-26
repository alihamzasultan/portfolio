"use client";

import { useState, useEffect } from "react";
import PillNav from "./reactbits/PillNav";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#portfolio" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => document.getElementById(item.href.replace('#', '')));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PillNav
      logo={null}
      items={menuItems}
      activeHref={activeSection}
      ease="power2.easeOut"
      baseColor="#ffffff" // White for the container and hover states
      pillColor="#000000" // Pure black for the pills
      hoveredPillTextColor="#000000" // Black text on white hover circle
      pillTextColor="#a1a1aa" // Gray 400 for inactive text
    />
  );
}

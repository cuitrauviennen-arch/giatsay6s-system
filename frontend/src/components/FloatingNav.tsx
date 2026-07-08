"use client";

import { useEffect, useState } from "react";
import { Home, Settings, Leaf, MapPin } from "lucide-react";

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Trang chủ", icon: <Home size={20} /> },
    { id: "process", label: "Quy trình", icon: <Settings size={20} /> },
    { id: "services", label: "Dịch vụ", icon: <Leaf size={20} /> },
    { id: "contact", label: "Liên hệ", icon: <MapPin size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {navItems.map((item) => (
        <div key={item.id} className="relative group">
          <button
            onClick={() => scrollTo(item.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              activeSection === item.id
                ? "bg-primary text-white scale-110"
                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-primary"
            }`}
            aria-label={item.label}
          >
            {item.icon}
          </button>
          
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            {item.label}
            {/* Arrow pointing right */}
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { Headphones, Mail, MapPin } from "lucide-react";

interface ContactData {
  hotline?: string;
  email?: string;
  address?: string;
}

export default function ContactBar({ data }: { data?: ContactData }) {
  const hotline = data?.hotline || "0907.45.22.99";
  const email = data?.email || "mthitoquyen@gmail.com";
  const address = data?.address || "Hẻm 350 Nguyễn Văn Lượng, P.16, Gò Vấp";

  const items = [
    {
      label: "Phone",
      icon: <Headphones size={22} strokeWidth={2.5} />,
      title: "Hotline",
      text: hotline,
    },
    {
      label: "Mail",
      icon: <Mail size={22} strokeWidth={2.5} />,
      title: "Email",
      text: email,
    },
    {
      label: "Address",
      icon: <MapPin size={22} strokeWidth={2.5} />,
      title: "Địa chỉ",
      text: address,
    },
  ];

  return (
    <section className="w-full flex min-h-[100px] lg:h-[120px] bg-[#ffda44]">
      {/* 1. Left side infinite blue background */}
      <div className="hidden lg:block flex-1 bg-[#004b9b]" />

      {/* 2. Center Constrained Container */}
      <div className="w-full max-w-7xl flex relative">
        {/* Blue part inside the container to shift the starting point */}
        <div className="hidden lg:block w-[50px] lg:w-[150px] xl:w-[250px] bg-[#004b9b]" />

        {/* Yellow Content Area */}
        <div className="flex-1 bg-[#ffda44] flex flex-col md:flex-row items-center justify-evenly gap-8 py-8 lg:py-0 px-4 lg:px-8 z-10 lg:shadow-[-15px_0_20px_-15px_rgba(0,0,0,0.15)]">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 group cursor-pointer w-full md:w-auto justify-center"
            >
              {/* Rotated Vertical Label */}
              <div className="hidden lg:flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="text-[#004b9b] font-bold text-[10px] uppercase tracking-[0.3em] select-none"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {item.label}
                </span>
              </div>

              {/* Icon with elegant styling */}
              <div className="text-[#004b9b] flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#004b9b]/20 flex items-center justify-center group-hover:border-[#004b9b] group-hover:bg-[#004b9b] group-hover:text-[#ffda44] transition-all duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <span className="text-[#004b9b]/70 font-bold text-[11px] uppercase tracking-wider mb-0.5">
                  {item.title}
                </span>
                <span className="text-[#004b9b] font-bold text-sm lg:text-base whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Right side infinite yellow background */}
      <div className="hidden lg:block flex-1 bg-[#ffda44]" />
    </section>
  );
}

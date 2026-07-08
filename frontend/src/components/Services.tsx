"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy load lottie-react to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface ProcessStep {
  title: string;
  description: string;
  lottieUrl: string;
}

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Phân Loại Quần Áo",
    description:
      "Chúng tôi luôn phân loại quần áo như đồ màu, đồ trắng, chăn, mền, hay quần áo thông thường nhằm đảm bảo đồ giặt của bạn được giặt đúng cách nhất.",
    lottieUrl: "https://assets5.lottiefiles.com/packages/lf20_b7if8r.json",
  },
  {
    title: "Nước Giặt Chất Lượng",
    description:
      "Chúng tôi luôn sử dụng các loại nước giặt uy tín trên thị trường như OMO, Downy, hay Comfort nhằm đảm bảo chất lượng giặt tốt nhất. Chúng tôi sẽ chọn loại nước giặt thích hợp nhất đối với quần áo của bạn",
    lottieUrl:
      "https://assets5.lottiefiles.com/packages/lf20_owpv3ldk.json",
  },
  {
    title: "Chế Độ Giặt Phù Hợp",
    description:
      "Chúng tôi sử dụng chế độ giặt phù hợp với từng loại quần áo để đảm bảo đồ của bạn sạch nhất mà vẫn bền màu.",
    lottieUrl:
      "https://assets9.lottiefiles.com/packages/lf20_nkvngl3p.json",
  },
  {
    title: "Sấy Khô Chống Nhăn",
    description:
      "Sấy khô sau giặt giúp bạn tiết kiệm thời gian phơi đồ và giúp chống nhăn quần áo. Bạn không cần ủi vẫn có một bộ đồ thẳng tinh tươm",
    lottieUrl:
      "https://assets1.lottiefiles.com/temp/lf20_Mk7iKg.json",
  },
];

function LottieIcon({ url }: { url: string }) {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie load error:", err));
  }, [url]);

  if (!animationData) {
    return (
      <div className="w-20 h-20 bg-primary/10 rounded-full animate-pulse" />
    );
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 80, height: 80 }}
    />
  );
}

export default function Services({ data }: { data?: ProcessStep[] }) {
  const steps = data && data.length > 0 ? data : DEFAULT_PROCESS_STEPS;

  return (
    <section
      id="services"
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/process-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Slight white overlay for readability */}
      <div className="absolute inset-0 bg-white/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading - matching original site style */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.3em] text-primary/60 mb-3 font-medium"
          >
            Quy trình giặt sấy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-extrabold text-primary uppercase tracking-wide"
          >
            Quần áo của bạn được chăm sóc như thế nào?
          </motion.h2>
          <div className="h-1 w-24 bg-secondary mx-auto rounded-full mt-4" />
        </div>

        {/* 4-column grid matching original site */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Lottie icon with circular background */}
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                <LottieIcon url={step.lottieUrl} />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-primary mb-3 uppercase tracking-wide">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

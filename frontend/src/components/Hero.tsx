"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  data?: {
    title?: string;
    subTitle?: string;
    animatedWords?: string | string[];
    backgroundImage?: { url: string };
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  } | null;
}

export default function Hero({ data }: HeroProps) {
  let rawWords = data?.animatedWords || ["giặt nhanh", "sấy khô", "diệt khuẩn"];
  if (typeof rawWords === "string") {
    rawWords = rawWords.split(",").map(w => w.trim()).filter(w => w);
  }
  const animatedWords = (rawWords as string[]).length > 0 ? (rawWords as string[]) : ["giặt nhanh", "sấy khô", "diệt khuẩn"];
  
  const title = data?.title || "Dịch vụ giặt sấy lấy ngay quận Gò Vấp";
  const subTitle = data?.subTitle || "với các tiện ích - ";
  const bgImageUrl = data?.backgroundImage?.url ? `http://127.0.0.1:1338${data.backgroundImage.url}` : "https://giatsay6s.com/wp-content/uploads/2021/07/giat-xep.jpg";

  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % animatedWords.length);
    }, 2500); // Change word every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image from original site or CMS */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Blob */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-60 animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            <span className="block text-primary drop-shadow-sm mb-4">
              {title}
            </span>
            <span className="text-3xl md:text-5xl text-gray-700">{subTitle}</span>
            <span className="inline-block overflow-hidden h-[1.2em] align-bottom relative min-w-[200px] md:min-w-[280px]">
              <AnimatePresence>
                <motion.span
                  key={currentWord}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-secondary absolute top-0 left-0 whitespace-nowrap drop-shadow-md"
                  style={{ WebkitTextStroke: "1px #b39a00" }} // Thêm viền nhẹ để text vàng nổi bật trên nền sáng
                >
                  {animatedWords[currentWord]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 mt-8">
            Sử dụng nước giặt xả cao cấp, đảm bảo quần áo luôn sạch sẽ, thơm mát và an toàn cho sức khỏe.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={data?.primaryButtonLink || "tel:0907452299"}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {data?.primaryButtonText || "Hotline: 0907 45 22 99"}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={data?.secondaryButtonLink || "https://maps.app.goo.gl/z3EnHuSEejSjS28X8"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-bold text-lg shadow-md hover:bg-gray-50 transition-all"
            >
              {data?.secondaryButtonText || "Tìm Đường Đi"}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

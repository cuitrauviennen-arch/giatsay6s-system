"use client";

import { motion } from "framer-motion";

interface ServiceCard {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

const OUR_SERVICES: ServiceCard[] = [
  {
    title: "Giặt Sạch Xếp Gọn",
    description:
      "Dịch vụ giặt xả với chất lượng tốt nhất. Sau khi giặt sạch và sấy khô quần áo của của bạn sẽ được xếp gọn như vừa mới mua ở tiệm.",
    image: "/images/giat-xep.jpg",
    badge: "POPULAR",
  },
  {
    title: "Dịch Vụ Sấy Khô",
    description:
      "Dịch vụ sấy khô giúp diệt khuẩn và đảm bảo độ bền màu của quần áo.",
    image: "/images/dry-cleaning.jpg",
  },
  {
    title: "Dịch Vụ Ủi",
    description:
      "Dịch vụ ủi quần áo theo yêu cầu giúp quần áo bạn luôn thẳng và tinh tươm.",
    image: "/images/dich-vu-ui.jpg",
  },
];

import { getStrapiMedia } from "@/lib/api";

export default function OurServices({ data }: { data?: any[] }) {
  const services = data && data.length > 0 ? data : OUR_SERVICES;

  return (
    <section
      id="services"
      className="py-20"
      style={{
        background: "linear-gradient(180deg, #dce3ec 0%, #e8edf3 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - matching original "Dịch vụ của chúng tôi" with circle highlight */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary"
          >
            <span className="relative inline-block px-2">
              <span className="relative z-10">Dịch vụ</span>
              {/* Circle highlight SVG around "Dịch vụ" with drawing animation */}
              <svg
                className="absolute -inset-x-2 -inset-y-2 z-0 w-[calc(100%+1rem)] h-[calc(100%+1rem)]"
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"
                  stroke="#004AAD"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                />
              </svg>
            </span>{" "}
            <span className="text-gray-800 font-normal italic">
              của chúng tôi
            </span>
          </motion.h2>
        </div>

        {/* 3-column service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const imgUrl = service.image?.url 
              ? getStrapiMedia(service.image.url) 
              : service.image;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Image with badge */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={imgUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {service.badge && (
                    <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-md shadow-lg uppercase tracking-wider">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

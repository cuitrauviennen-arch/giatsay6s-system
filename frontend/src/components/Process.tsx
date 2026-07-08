"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Process() {
  const steps = [
    "Nhận quần áo và kiểm tra tình trạng",
    "Phân loại quần áo theo màu và chất liệu",
    "Tiến hành giặt với nước giặt/xả cao cấp",
    "Sấy khô hoặc phơi tùy theo loại vải",
    "Gấp gọn gàng và đóng gói cẩn thận",
    "Giao trả quần áo cho khách hàng",
  ];

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Quy Trình Giặt Sấy
          </motion.h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <div className="flex-shrink-0 text-secondary">
                  <CheckCircle2 size={28} />
                </div>
                <p className="text-gray-800 font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

interface ContactProps {
  data?: {
    address?: string;
    hotline?: string;
    mapEmbedUrl?: string;
    facebookUrl?: string;
  } | null;
}

export default function Contact({ data }: ContactProps) {
  const address = data?.address || "Hẻm 350 (340/23) Nguyễn Văn Lượng, Phường 16, Quận Gò Vấp, TP.HCM";
  
  // Format hotlines, assume comma separated string from DB
  const rawHotline = data?.hotline || "0907.45.22.99, 0816.366.716";
  const hotlines = rawHotline.split(",").map((h) => h.trim());
  
  const facebookUrl = data?.facebookUrl || "https://facebook.com/giatsay6s";
  
  // Clean facebook url for display
  const facebookDisplay = facebookUrl.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '');
  
  const mapEmbedUrl = data?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.321703657788!2d106.6695767!3d10.8395385!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295127661781%3A0x90c16179000ff36!2s6S%20Laundry%20Service!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Thông tin liên hệ */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Liên Hệ Với Chúng Tôi</h2>
              <div className="h-1 w-24 bg-primary rounded-full mb-8" />
              <p className="text-lg text-gray-600 mb-8">
                Giặt Sấy 6S luôn sẵn sàng phục vụ bạn với chất lượng tốt nhất. Hãy liên hệ ngay để trải nghiệm dịch vụ giặt sấy lấy liền chuyên nghiệp.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Địa chỉ</h4>
                  <p className="text-gray-600 mt-1">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Hotline</h4>
                  <p className="text-gray-600 mt-1">
                    {hotlines.map((h, index) => (
                      <span key={index}>
                        <a href={`tel:${h.replace(/\D/g, '')}`} className="hover:text-primary transition-colors">{h}</a>
                        {index < hotlines.length - 1 ? " - " : ""}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Giờ hoạt động</h4>
                  <p className="text-gray-600 mt-1">08:00 - 19:00 (Tất cả các ngày trong tuần)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1877F2]/10 rounded-full flex items-center justify-center text-[#1877F2] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Facebook</h4>
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#1877F2] mt-1 block transition-colors">
                    {facebookDisplay}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

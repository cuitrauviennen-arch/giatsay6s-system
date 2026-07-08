"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full" style={{ background: "#1a3a6b" }}>
      {/* Yellow top border */}
      <div className="w-full h-2" style={{ background: "#f5c518" }} />

      {/* Main Footer Body */}
      <div className="py-12 px-4 flex flex-col items-center text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden"
            >
              {/* Washing machine mascot using emoji/text fallback */}
              <span className="text-5xl">🫧</span>
            </div>
            <div>
              <p className="text-white font-extrabold text-xl tracking-wide">
                Giặt Sấy <span style={{ color: "#f5c518" }}>6S</span>
              </p>
              <p className="text-xs tracking-[0.2em] mt-0.5" style={{ color: "#a8c4e0" }}>
                GIẶT NHANH · SẤY KHÔ · DIỆT KHUẨN
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg text-sm leading-relaxed mb-8"
          style={{ color: "#b0c8e0" }}
        >
          Giặt sấy 6S luôn chăm sóc quần áo của bạn tốt nhất như giặt tại nhà.
          Hãy đến với chúng tôi để việc giặt giũ trở nên thú vị và nhẹ nhàng hơn!
        </motion.p>

        {/* Divider line */}
        <div className="w-16 h-px mb-8" style={{ background: "#f5c518" }} />

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <a
            href="tel:0816366176"
            className="flex items-center gap-3 group"
          >
            <Phone size={16} style={{ color: "#f5c518" }} />
            <span
              className="italic font-medium text-base transition-colors group-hover:text-white"
              style={{ color: "#f5c518" }}
            >
              0816-366176
            </span>
          </a>

          <a
            href="https://maps.app.goo.gl/z3EnHuSEejSjS28X8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <MapPin size={16} style={{ color: "#f5c518" }} />
            <span
              className="italic text-sm transition-colors group-hover:text-white"
              style={{ color: "#f5c518" }}
            >
              Hẻm 350 Nguyễn Văn Lượng, P.16, Q.Gò Vấp
            </span>
          </a>

          <div className="flex items-center gap-3">
            <Clock size={16} style={{ color: "#f5c518" }} />
            <span
              className="italic text-sm"
              style={{ color: "#f5c518" }}
            >
              08:00 - 19:00
            </span>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-6 mb-12"
        >
          <a
            href="https://www.facebook.com/giatsay6s/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://www.google.com/search?q=gi%E1%BA%B7t+s%E1%BA%A5y+6s"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity"
            aria-label="Google Business"
          >
            {/* Briefcase-clock style icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm7 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Contact CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-4 md:mx-12 lg:mx-24 xl:mx-40 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6"
        style={{ background: "#1e5bbf" }}
      >
        <div className="text-left">
          <p className="text-sm font-light tracking-wider" style={{ color: "#cde0ff" }}>
            Nếu Bạn Cần Chúng Tôi
          </p>
          <p className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white mt-1">
            Hãy liên hệ ngay nhé
          </p>
        </div>

        <a
          href="https://m.me/107621841054546?ref=WelcomeMessage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          style={{ background: "#f5c518", color: "#1a3a6b" }}
        >
          {/* Messenger icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.929 1.463 5.547 3.75 7.258V22l3.42-1.88c.914.254 1.882.39 2.883.39 5.522 0 9.947-4.145 9.947-9.267C22 6.145 17.523 2 12 2zm1.03 12.473l-2.53-2.706-4.942 2.706 5.44-5.775 2.59 2.706 4.882-2.706-5.44 5.775z"/>
          </svg>
          Messenger
        </a>
      </motion.div>

      {/* Copyright */}
      <div className="text-center pb-8">
        <p className="text-xs" style={{ color: "#7a99bb" }}>
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

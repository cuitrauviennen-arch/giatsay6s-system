import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Giặt Sấy 6S - Giặt sấy lấy liền quận Gò Vấp",
  description: "Giặt sấy lấy liền quận Gò Vấp - Sử dụng nước giặt xả cao cấp - Liên hệ 0907452299 hoặc 0816366176 ngay nhé!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${roboto.variable} antialiased font-sans relative bg-gray-50`}
      >
        <TopBar />
        <Header />
        <FloatingNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

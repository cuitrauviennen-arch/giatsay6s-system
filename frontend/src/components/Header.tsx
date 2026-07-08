import Link from "next/link";
import { getContactData } from "@/lib/api";

export default async function Header() {
  const contactData = await getContactData();
  const logoUrl = contactData?.logo?.url ? `http://127.0.0.1:1338${contactData.logo.url}` : null;

  return (
    <header className="sticky w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              {logoUrl ? (
                <img src={logoUrl} alt="Giặt Sấy 6S Logo" className="h-14 w-auto object-contain" />
              ) : (
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  6S
                </div>
              )}
              <span className="font-bold text-2xl text-primary tracking-tight">Giặt Sấy 6S</span>
            </Link>
          </div>

          {/* Desktop Menu - Removed because we use Floating Navigation */}
          
          {/* Call to Action Button */}
          <div className="flex items-center">
            <a
              href="tel:0907452299"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Gọi Ngay: 0907.45.22.99
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}

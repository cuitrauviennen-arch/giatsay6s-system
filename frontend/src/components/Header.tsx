import Link from "next/link";
import { getContactData, getStrapiMedia } from "@/lib/api";

export default async function Header() {
  const contactData = await getContactData();
  const logoUrl = getStrapiMedia(contactData?.logo?.url);

  return (
    <header className="sticky w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center min-w-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              {logoUrl ? (
                <img src={logoUrl} alt="Giặt Sấy 6S Logo" className="h-10 sm:h-14 w-auto object-contain flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex flex-shrink-0 items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                  6S
                </div>
              )}
              <span className="font-bold text-lg sm:text-xl md:text-2xl text-primary tracking-tight truncate">
                Giặt Sấy 6S
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Removed because we use Floating Navigation */}
          
          {/* Call to Action Button */}
          <div className="flex items-center flex-shrink-0">
            <a
              href="tel:0907452299"
              className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 sm:px-6 sm:py-2 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden md:inline">Gọi Ngay: </span>0907.45.22.99
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

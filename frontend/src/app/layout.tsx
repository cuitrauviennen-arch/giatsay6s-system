import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import { getContactData, getSeoData, getStrapiMedia } from "@/lib/api";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "700"],
});

// Default SEO values (fallback khi chưa cấu hình trong Strapi)
const DEFAULT_SEO = {
  title: "Giặt Sấy 6S - Giặt sấy lấy liền quận Gò Vấp",
  description: "Giặt sấy lấy liền quận Gò Vấp - Sử dụng nước giặt xả cao cấp - Liên hệ 0907452299 hoặc 0816366176 ngay nhé!",
};

export async function generateMetadata(): Promise<Metadata> {
  const [seoData, contactData] = await Promise.all([
    getSeoData(),
    getContactData(),
  ]);

  const logoUrl = getStrapiMedia(contactData?.logo?.url);

  const title = seoData?.metaTitle || DEFAULT_SEO.title;
  const description = seoData?.metaDescription || DEFAULT_SEO.description;
  const ogTitle = seoData?.ogTitle || title;
  const ogDescription = seoData?.ogDescription || description;
  const ogImageUrl = getStrapiMedia(seoData?.ogImage?.url);
  const canonicalUrl = seoData?.canonicalUrl || undefined;
  const keywords = seoData?.metaKeywords
    ? seoData.metaKeywords.split(",").map((k: string) => k.trim())
    : ["giặt sấy gò vấp", "giặt ủi quận gò vấp", "giặt sấy lấy liền", "giặt sấy 6s"];

  return {
    title,
    description,
    keywords,
    ...(canonicalUrl && {
      alternates: { canonical: canonicalUrl },
    }),
    ...(seoData?.googleVerification && {
      verification: { google: seoData.googleVerification },
    }),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      locale: "vi_VN",
      siteName: "Giặt Sấy 6S",
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }],
      }),
      ...(canonicalUrl && { url: canonicalUrl }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...(logoUrl && {
      icons: {
        icon: logoUrl,
        shortcut: logoUrl,
        apple: logoUrl,
      },
    }),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contactData, seoData] = await Promise.all([
    getContactData(),
    getSeoData(),
  ]);
  const logoUrl = getStrapiMedia(contactData?.logo?.url);

  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data from Strapi */}
        {seoData?.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seoData.structuredData),
            }}
          />
        )}
      </head>
      <body
        className={`${roboto.variable} antialiased font-sans relative bg-gray-50`}
      >
        {seoData?.googleTagManagerId && (
          <GoogleTagManager gtmId={seoData.googleTagManagerId} />
        )}
        <TopBar />
        <Header />
        <FloatingNav />
        <main>{children}</main>
        <Footer logoUrl={logoUrl} />
      </body>
    </html>
  );
}


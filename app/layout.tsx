import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { companyInfo } from "@/lib/services";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${companyInfo.domain}`),
  title: {
    default: `${companyInfo.name} - 废旧物资回收 | 废铜废铝废铁回收`,
    template: `%s | ${companyInfo.name}`,
  },
  description: companyInfo.description,
  keywords: companyInfo.keywords.split(","),
  authors: [{ name: companyInfo.name }],
  creator: companyInfo.name,
  publisher: companyInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: `https://${companyInfo.domain}`,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `https://${companyInfo.domain}`,
    title: `${companyInfo.name} - 废旧物资回收`,
    description: companyInfo.description,
    siteName: companyInfo.name,
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: companyInfo.name,
              description: companyInfo.description,
              telephone: companyInfo.phone,
              url: `https://${companyInfo.domain}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: companyInfo.address,
                addressCountry: "CN",
              },
              areaServed: "烟台及周边地区",
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "مكتب المحامي نواف بن أحمد المالكي — للمحاماة والاستشارات القانونية",
  description:
    "مكتب محاماة سعودي متخصص في التمثيل القضائي، الاستشارات القانونية، وصياغة العقود وفق الأنظمة السعودية.",
  metadataBase: new URL("https://law-2030.com"),
  openGraph: {
    title: "مكتب المحامي نواف بن أحمد المالكي",
    description:
      "خدمات قانونية متكاملة للأفراد والشركات وفق الأنظمة السعودية.",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;900&family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600;700&family=El+Messiri:wght@500;600;700&display=swap"
          rel="stylesheet"
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

import "./globals.css";

export const metadata = {
  title: "مكتب المحامي نواف بن أحمد المالكي — للمحاماة والاستشارات القانونية",
  description:
    "مكتب محاماة سعودي متخصص في التمثيل القضائي، الاستشارات القانونية، وصياغة العقود وفق الأنظمة السعودية.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#0A1428",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;900&family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600;700&family=El+Messiri:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Tajawal" }}>{children}</body>
    </html>
  );
}

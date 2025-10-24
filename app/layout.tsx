
import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["arabic", "latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "استبيان تصميم الشعار | Logo Design Survey",
  description: "استبيان احترافي لجمع متطلبات تصميم الشعارات من العملاء",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        {children}
      </body>
    </html>
  );
}

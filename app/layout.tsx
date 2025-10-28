
import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["arabic", "latin"],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Loay Designs | تصميم شعارات وهوية بصرية احترافية",
  description:
    "Loay Designs — استوديو تصميم متخصص في الشعارات والهويات البصرية الفاخرة. نبتكر تصاميم بسيطة وأنيقة تعكس هوية علامتك التجارية بروح عصرية وإبداعية.",
  icons: {
    icon: "/logo3.png", // logo dosyanın yolu
  },
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

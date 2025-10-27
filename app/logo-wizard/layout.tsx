import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "استبيان تصميم الشعار | Logo Design Survey",
  description: "استبيان احترافي لجمع متطلبات تصميم الشعارات من العملاء",
  icons: {
    icon: "/newlogo2.png",
  },
};

export default function LogoWizardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { Cairo, Amiri, Fragment_Mono } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-display",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-serif",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "الأستاذة عفاف الجمل | Ustadha Afef Djmal",
  description:
    "مُقرئة تونسية بإجازة في القراءات العشر وسند متصل إلى النبي ﷺ. تنشر نور القرآن بالرحمة والمحبة عبر سلسلة متواترة لا تنقطع.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${amiri.variable} ${fragmentMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

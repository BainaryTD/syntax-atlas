import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoThai = Noto_Sans_Thai({ variable: "--font-noto-thai", subsets: ["thai", "latin"] });
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Syntax Atlas | แผนที่ syntax สำหรับนักพัฒนาไทย",
  description: "ค้นหาและเปรียบเทียบ syntax ของ Python, JavaScript, TypeScript, Go, Rust และ Java ในที่เดียว",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${geist.variable} ${geistMono.variable} ${notoThai.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

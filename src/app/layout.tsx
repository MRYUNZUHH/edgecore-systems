import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400","500","600","700"] });
export const metadata: Metadata = { title: "EdgeCore | Premium Casino", description: "World-class gaming experience" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="antialiased"><AppShell>{children}</AppShell></body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400","500","600","700"], display: "swap" });

export const metadata: Metadata = {
  title: "EdgeCore | Premium Online Casino",
  description: "Experience world-class gaming. Play slots, table games, crash games, and sports betting.",
  keywords: "online casino, slots, blackjack, roulette, crash, sports betting",
  openGraph: { title: "EdgeCore Casino", description: "Premium online casino experience", type: "website" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="antialiased"><AppShell>{children}</AppShell></body>
    </html>
  );
}
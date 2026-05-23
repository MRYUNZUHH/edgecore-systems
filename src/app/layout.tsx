import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Online Casino",
  description: "Play slots, crash games, live casino, and predictions. 10,000 demo credits free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#080b12] text-white font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 pb-20 lg:pb-4 max-w-7xl mx-auto w-full">{children}</main>
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
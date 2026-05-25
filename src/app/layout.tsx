import type { Metadata } from "next";
import "./globals.css";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import CasinoBackground from "@/components/casino/CasinoBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Casino",
  description: "Premium online casino experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BackgroundCanvas />
        <CasinoBackground />
        <div style={{ position: "relative", zIndex: 1 }} className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
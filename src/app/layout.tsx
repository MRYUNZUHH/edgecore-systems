import type { Metadata } from "next";
import "./globals.css";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Casino",
  description: "Premium online casino experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BackgroundCanvas />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
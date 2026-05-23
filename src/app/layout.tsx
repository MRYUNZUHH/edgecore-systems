import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Online Casino",
  description: "Play slots, crash games, live casino and sports predictions. 10,000 demo credits free.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased"><AppShell>{children}</AppShell></body>
    </html>
  );
}
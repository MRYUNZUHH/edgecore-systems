import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Casino",
  description: "Premium online casino experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#080b12] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
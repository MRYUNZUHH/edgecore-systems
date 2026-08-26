// src/app/layout.tsx
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import Header from "@/components/layout/Header";
import AuthProvider from "@/components/providers/AuthProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "EdgeCore Systems",
  description: "Premium online casino experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rajdhani.variable}>
      <body className="bg-[#080b12] text-white font-rajdhani pb-20">
        <AuthProvider>
          <Header />
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}

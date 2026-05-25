import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "EdgeCore Casino", description: "Premium casino experience" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-[#0a0a0f] text-white antialiased">{children}</body></html>;
}
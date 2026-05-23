import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Casino",
  description: "Premium online casino experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#080b12] text-white font-sans antialiased">
        <div className="min-h-screen">
          <header className="border-b border-[#ffffff0f] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</div>
              <span className="font-bold text-[#f5c842] text-lg">EDGECORE</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="/auth/login" className="text-[#f5c842] font-bold hover:underline">Login</a>
              <a href="/casino" className="text-white/70 hover:text-white">Casino</a>
              <a href="/wallet" className="text-white/70 hover:text-white">Wallet</a>
            </div>
          </header>
          <main className="p-4">{children}</main>
          <footer className="border-t border-[#ffffff0f] p-4 text-center text-xs text-[#5a6a85]">
            © 2026 EdgeCore. Demo platform. 18+ only. Play responsibly.
          </footer>
        </div>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EdgeCore | Premium Casino",
  description: "Premium online casino experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 no-underline">
              <span className="w-7 h-7 bg-yellow-500 rounded flex items-center justify-center text-black font-bold text-xs">◆</span>
              <span className="font-bold text-yellow-500 text-base">EDGECORE</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <a href="/casino" className="text-gray-400 hover:text-white no-underline">Casino</a>
              <a href="/live-casino" className="text-gray-400 hover:text-white no-underline">Live</a>
              <a href="/predictions" className="text-gray-400 hover:text-white no-underline">Predictions</a>
              <a href="/wallet" className="text-gray-400 hover:text-white no-underline">Wallet</a>
              <a href="/auth/login" className="bg-yellow-500 text-black font-bold px-4 py-1.5 rounded text-sm no-underline">Login</a>
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto w-full p-4">
          {children}
        </main>
        <footer className="border-t border-gray-800 py-4 px-4 text-center text-xs text-gray-600">
          © 2026 EdgeCore. Demo platform. 18+ only. Play responsibly.
        </footer>
      </body>
    </html>
  );
}
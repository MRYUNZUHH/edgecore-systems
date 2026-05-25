"use client";
import Link from "next/link";
import { useBalance } from "@/lib/useBalance";
import Logo from "@/components/Logo";
export default function Nav() {
  const { balance, username, isLoggedIn, logout } = useBalance();
  return (
    <header className="border-b border-white/5 bg-[#0a0a0f]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white no-underline">Home</Link>
            <Link href="/casino" className="text-gray-400 hover:text-white no-underline">Casino</Link>
            <Link href="/live-casino" className="text-gray-400 hover:text-white no-underline">Live</Link>
            <Link href="/predictions" className="text-gray-400 hover:text-white no-underline">Predictions</Link>
            <Link href="/vip" className="text-gray-400 hover:text-white no-underline">VIP</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-[#00ff88] font-bold text-sm">${balance.toFixed(2)}</span>
              <span className="text-gray-400 text-sm">{username}</span>
              <button onClick={logout} className="text-xs text-red-400 hover:text-red-300">Logout</button>
            </>
          ) : (
            <Link href="/auth/login" className="bg-[#f0b429] text-black font-bold px-4 py-1.5 rounded text-sm no-underline">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
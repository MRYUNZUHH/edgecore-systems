"use client";
import Link from "next/link";
import { useStore } from "@/store/game-store";

export default function Header() {
  const { isLoggedIn, user, logout, getBalance } = useStore();
  const balance = getBalance();

  return (
    <header className="border-b border-[#ffffff0f] bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold text-sm">◆</div>
            <span className="font-bold text-[#f5c842] text-lg hidden sm:block">EDGECORE</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 text-sm">
            <Link href="/" className="text-white/70 hover:text-white">Home</Link>
            <Link href="/casino" className="text-white/70 hover:text-white">Casino</Link>
            <Link href="/live-casino" className="text-white/70 hover:text-white">Live</Link>
            <Link href="/predictions" className="text-white/70 hover:text-white">Predictions</Link>
            <Link href="/virtual" className="text-white/70 hover:text-white">Virtual</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-[#22c55e] font-bold">${balance.toFixed(2)}</span>
              <Link href="/wallet" className="text-xs bg-[#f5c842]/10 text-[#f5c842] px-3 py-1 rounded-full">+ Deposit</Link>
              <span className="text-sm text-white/70 hidden md:block">{user?.username}</span>
              <button onClick={logout} className="text-xs text-[#ef4444] hover:underline">Logout</button>
            </>
          ) : (
            <Link href="/auth/login" className="bg-[#f5c842] text-black font-bold px-4 py-2 rounded-lg text-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
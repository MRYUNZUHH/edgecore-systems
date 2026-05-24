"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('edgecore-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.isLoggedIn) setLoggedIn(true);
      }
    } catch {}
  }, []);

  return (
    <header className="border-b border-[#ffffff0f] bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold text-sm">◆</div>
          <span className="font-bold text-[#f5c842] text-lg">EDGECORE</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/casino" className="text-white/70 hover:text-white text-sm">Casino</Link>
          <Link href="/live-casino" className="text-white/70 hover:text-white text-sm hidden sm:block">Live</Link>
          <Link href="/predictions" className="text-white/70 hover:text-white text-sm hidden sm:block">Predictions</Link>
          {loggedIn ? (
            <>
              <Link href="/wallet" className="text-[#22c55e] text-sm font-bold">$10,000</Link>
              <button onClick={() => { localStorage.removeItem('edgecore-store'); setLoggedIn(false); }} className="text-xs text-[#ef4444]">Logout</button>
            </>
          ) : (
            <Link href="/auth/login" className="bg-[#f5c842] text-black font-bold px-4 py-2 rounded-lg text-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
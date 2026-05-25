"use client";
import { useState } from "react";
import { useBalance } from "@/lib/useBalance";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { balance, username, isLoggedIn, logout, mounted } = useBalance();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="border-b border-[#ffffff0f] bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo size="sm" />
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white no-underline transition">Home</Link>
            <Link href="/casino" className="text-gray-400 hover:text-white no-underline transition">Casino</Link>
            <Link href="/live-casino" className="text-gray-400 hover:text-white no-underline transition">Live</Link>
            <Link href="/predictions" className="text-gray-400 hover:text-white no-underline transition">Predictions</Link>
            <Link href="/vip" className="text-gray-400 hover:text-white no-underline transition">VIP</Link>
            <Link href="/wallet" className="text-gray-400 hover:text-white no-underline transition">Wallet</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {mounted && isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 bg-[#0f1520] border border-[#ffffff0f] rounded-full px-3 py-1.5">
                <span className="text-[#00ff88] font-heading font-bold text-sm">${balance.toFixed(2)}</span>
              </div>
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full bg-[#1a2235] border border-[#ffffff0f] flex items-center justify-center text-lg hover:border-[#f0b429] transition">
                  {username?.slice(0,2).toUpperCase()}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f1520] border border-[#ffffff0f] rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-[#ffffff0f]">
                      <p className="text-white text-sm font-bold">{username}</p>
                      <p className="text-gray-500 text-xs">Demo Account</p>
                    </div>
                    <Link href="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 no-underline">👤 Profile</Link>
                    <Link href="/wallet" onClick={() => setShowDropdown(false)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 no-underline">💰 Wallet</Link>
                    <button onClick={() => { logout(); setShowDropdown(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10">🚪 Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : mounted ? (
            <>
              <Link href="/auth/login" className="bg-[#f0b429] text-black font-bold px-5 py-2 rounded-lg text-sm no-underline">Sign In</Link>
              <Link href="/auth/signup" className="border border-[#f0b429]/30 text-[#f0b429] font-bold px-5 py-2 rounded-lg text-sm no-underline hidden sm:block">Register</Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
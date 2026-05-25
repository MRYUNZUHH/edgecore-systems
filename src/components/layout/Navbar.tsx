"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  const { user, isLoggedIn, switchMode, getBalance, resetDemo, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const balance = getBalance();
  const mode = user?.accountMode || "demo";

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo size="sm" />
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            <Link href="/" className="text-muted hover:text-white no-underline transition">Home</Link>
            <Link href="/casino" className="text-muted hover:text-white no-underline transition">Casino</Link>
            <Link href="/live-casino" className="text-muted hover:text-white no-underline transition">Live</Link>
            <Link href="/predictions" className="text-muted hover:text-white no-underline transition">Predictions</Link>
            <Link href="/vip" className="text-muted hover:text-white no-underline transition">VIP</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Demo/Real Toggle */}
              <div className="hidden sm:flex bg-[var(--card)] border border-[var(--border)] rounded-full p-0.5 gap-0.5">
                <button onClick={() => switchMode("demo")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${mode==="demo"?"bg-blue-500 text-white":"text-muted hover:text-white"}`}>
                  🎮 DEMO
                </button>
                <button onClick={() => switchMode("real")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${mode==="real"?"bg-gold text-black":"text-muted hover:text-white"}`}>
                  💰 REAL
                </button>
              </div>

              {/* Balance */}
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 border ${mode==="demo"?"bg-blue-500/10 border-blue-500/30":"bg-gold/10 border-gold/30"}`}>
                <span className={`text-sm font-heading font-bold ${mode==="demo"?"text-blue-400":"text-gold"}`}>${balance.toLocaleString()}</span>
                {mode==="demo" && (
                  <button onClick={resetDemo} className="text-[10px] text-blue-400 hover:text-blue-300" title="Reset demo balance">↻</button>
                )}
              </div>

              {/* Avatar + Dropdown */}
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full bg-[var(--bg3)] border border-[var(--border)] flex items-center justify-center text-xl hover:border-gold transition">
                  {user?.avatar}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-[var(--border)]">
                      <p className="text-white text-sm font-bold">{user?.username}</p>
                      <p className="text-muted text-xs">{user?.email || "No email"}</p>
                    </div>
                    <Link href="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 no-underline transition">👤 My Profile</Link>
                    <Link href="/wallet" onClick={() => setShowDropdown(false)} className="block px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 no-underline transition">💰 Wallet</Link>
                    <button onClick={() => { logout(); setShowDropdown(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition">🚪 Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-gold text-sm px-5 py-2 no-underline">Sign In</Link>
              <Link href="/auth/signup" className="border border-[var(--gold)]/30 text-gold font-bold px-5 py-2 rounded-lg text-sm no-underline hover:bg-[var(--gold)]/10 transition hidden sm:block">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
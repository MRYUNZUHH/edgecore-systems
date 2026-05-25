"use client";
import { useAuth } from "@/hooks/useAuth";
import Logo from '@/components/Logo';
import Link from "next/link";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 no-underline shrink-0">
            <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center text-black font-bold text-base">â—†</div>
            
          </Link>
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
              <div className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-full px-3 py-1.5">
                <span className="font-number text-gold font-bold">${(user?.balance ?? 0).toLocaleString()}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm">{user?.username?.slice(0,2).toUpperCase()}</div>
              <button onClick={logout} className="text-xs text-red-400 hover:text-red-300 transition">Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-gold text-sm px-5 py-2 no-underline">Sign In</Link>
              <Link href="/auth/signup" className="border border-[var(--gold)]/30 text-gold font-bold px-5 py-2 rounded-lg text-sm no-underline hover:bg-[var(--gold)]/10 transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
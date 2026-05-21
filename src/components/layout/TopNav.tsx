"use client";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game-store";
import Link from "next/link";
import { Bell, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNav() {
  const { user, balance, logout } = useGameStore();
  const [jackpot, setJackpot] = useState(34200);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setJackpot(prev => prev + Math.floor(Math.random() * 100)), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-navy-950/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 z-30">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
          <span className="text-gray-400">Online:</span>
          <span className="text-white font-semibold">2,458</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span className="text-gray-400">Jackpot:</span>
          <span className="text-gold-400 font-bold">${jackpot.toLocaleString()}</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <AnimatePresence>
          {showSearch && (
            <motion.input initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
              placeholder="Search games..." className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400" />
          )}
        </AnimatePresence>
        <button onClick={() => setShowSearch(!showSearch)} className="p-2 text-gray-400 hover:text-white transition">
          {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>

        {/* Balance */}
        <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-full px-4 py-1.5 border border-white/10">
          <span className="text-xs text-gray-400">Balance</span>
          <span className="text-neon-400 font-bold">${balance.toLocaleString()}</span>
        </div>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* User */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">◆</div>
            <span className="hidden md:inline text-sm text-white">{user.username}</span>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-white transition">Logout</button>
          </div>
        ) : (
          <Link href="/auth/login" className="btn-primary text-sm px-4 py-1.5">Login</Link>
        )}
      </div>
    </header>
  );
}
"use client";
import { useStore } from "@/store/game-store";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function TopNav() {
  const { user, wallet, logout } = useStore();
  const [jackpot, setJackpot] = useState(34200);
  const balance = wallet?.cashBalance ?? 0;

  useEffect(() => {
    const interval = setInterval(() => setJackpot(prev => prev + Math.floor(Math.random() * 50)), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-navy-950/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 z-30">
      <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-sm">
        <span className="text-gray-400">Balance</span>
        <span className="text-neon-400 font-bold">${balance.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-gray-400 hover:text-white"><Bell className="w-5 h-5" /></button>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">{user.username}</span>
            <button onClick={logout} className="text-xs text-gray-400 hover:text-white">Logout</button>
          </div>
        ) : (
          <Link href="/auth/login" className="btn-primary text-sm px-4 py-1.5">Login</Link>
        )}
      </div>
    </header>
  );
}
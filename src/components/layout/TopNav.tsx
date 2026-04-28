"use client";
import { useGameStore } from "@/store/game-store";
import Link from "next/link";
import { Menu, Bell } from "lucide-react";

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, balance, logout } = useGameStore();

  return (
    <header className="h-16 bg-navy-950/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 z-30">
      <button onClick={onMenuClick} className="lg:hidden p-2 text-white/70 hover:text-white">
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-sm">
          <span className="text-white/60">Balance</span>
          <span className="text-neon-400 font-bold">${balance.toLocaleString()}</span>
        </div>
        <button className="p-2 text-white/70 hover:text-white"><Bell className="w-5 h-5" /></button>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">{user.username}</span>
            <button onClick={logout} className="p-2 text-white/70 hover:text-white">Logout</button>
          </div>
        ) : (
          <Link href="/auth/login" className="btn-primary px-3 py-1 text-sm">Login</Link>
        )}
      </div>
    </header>
  );
}
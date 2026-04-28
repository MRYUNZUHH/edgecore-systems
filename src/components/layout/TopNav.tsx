"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, Bell, LogOut } from "lucide-react";
import { useGameStore } from "@/store/game-store";

export default function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const { data: session } = useSession();
  const balance = useGameStore(s => s.balance);

  return (
    <header className="h-16 bg-navy-950/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 z-30">
      <button onClick={onMenuClick} className="lg:hidden p-2 text-white/70 hover:text-white">
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-4 ml-auto">
        <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-sm">
          <span className="text-white/60">Demo Balance</span>
          <span className="text-neon-400 font-bold">${balance.toLocaleString()}</span>
        </div>
        <button className="p-2 text-white/70 hover:text-white"><Bell className="w-5 h-5" /></button>
        {session?.user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70 hidden sm:inline">{session.user.name}</span>
            <button onClick={() => signOut()} className="p-2 text-white/70 hover:text-white"><LogOut className="w-5 h-5" /></button>
          </div>
        ) : (
          <Link href="/auth/login" className="text-sm btn-primary px-3 py-1">Login</Link>
        )}
      </div>
    </header>
  );
}

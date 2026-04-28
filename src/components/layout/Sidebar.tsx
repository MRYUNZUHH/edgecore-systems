"use client";
import { useGameStore } from "@/store/game-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Trophy, Gift, Wallet } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/casino", label: "Casino", icon: Gamepad2 },
  { href: "/sportsbook", label: "Sportsbook", icon: Trophy },
  { href: "/vip", label: "VIP", icon: Gift },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];

export default function Sidebar() {
  const { user } = useGameStore();
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-r border-white/10 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-lg flex items-center justify-center font-bold text-black text-lg">◆</div>
        <span className="text-xl font-heading font-bold gold-text">EDGECORE</span>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${pathname === item.href ? 'bg-white/10 text-gold-400' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-white/10 text-xs text-white/40">
        {user ? `Logged in as ${user.username}` : "Not logged in"}
      </div>
    </aside>
  );
}
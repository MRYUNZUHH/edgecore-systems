"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Tv, Trophy, Gift, Shield, Wallet, BarChart3, Heart, Users } from "lucide-react";
import { useGameStore } from "@/store/game-store";

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/casino", label: "Casino", icon: Gamepad2 },
  { href: "/live-casino", label: "Live Casino", icon: Tv },
  { href: "/sportsbook", label: "Sportsbook", icon: Trophy },
  { href: "/virtual", label: "Virtual", icon: Users },
];

const secondaryLinks = [
  { href: "/vip", label: "VIP Club", icon: Shield },
  { href: "/promotions", label: "Promotions", icon: Gift },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];

const utilityLinks = [
  { href: "/responsible-gaming", label: "Responsible Play", icon: Heart },
  { href: "/admin", label: "Admin Panel", icon: BarChart3, adminOnly: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useGameStore();
  const isAdmin = user?.role === "admin";

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-r border-white/10">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-bold text-lg shadow-gold">◆</div>
          <h1 className="text-xl font-heading font-bold gold-text tracking-wide">EDGECORE</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 hide-scrollbar">
        <div className="text-xs text-gray-500 uppercase tracking-widest px-3 py-2 font-semibold">Main Menu</div>
        {mainLinks.map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-white/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className="w-5 h-5" /> {item.label}
            </Link>
          );
        })}

        <div className="text-xs text-gray-500 uppercase tracking-widest px-3 py-2 mt-4 font-semibold">Account</div>
        {secondaryLinks.map(item => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-white/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className="w-5 h-5" /> {item.label}
            </Link>
          );
        })}

        <div className="text-xs text-gray-500 uppercase tracking-widest px-3 py-2 mt-4 font-semibold">Utilities</div>
        {utilityLinks.map(item => {
          if (item.adminOnly && !isAdmin) return null;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-white/10 text-gold-400 border-l-2 border-gold-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Icon className="w-5 h-5" /> {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 text-center text-xs text-gray-600">
        {user ? <span>Welcome, <span className="text-gold-400">{user.username}</span></span> : "Not logged in"}
      </div>
    </aside>
  );
}
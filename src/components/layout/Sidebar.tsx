"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Tv, TrendingUp, Gift, Shield, Wallet, BarChart3, Heart, Users, Sparkles } from "lucide-react";
import { useStore } from "@/store/game-store";

const mainLinks = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/casino", label: "Casino", icon: Gamepad2 },
  { href: "/live-casino", label: "Live Casino", icon: Tv },
  { href: "/predictions", label: "Predictions", icon: TrendingUp },
  { href: "/virtual", label: "Virtual", icon: Users },
];

const secondaryLinks = [
  { href: "/vip", label: "VIP Club", icon: Shield },
  { href: "/promotions", label: "Promotions", icon: Gift },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];

const utilityLinks = [
  { href: "/responsible-gaming", label: "Responsible Play", icon: Heart },
  { href: "/admin", label: "Admin", icon: BarChart3, adminOnly: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useStore();
  const isAdmin = user?.role === "admin";
  const username = user?.username || "Guest";

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-black/80 backdrop-blur-xl border-r border-purple-500/20">
      <div className="p-5 border-b border-purple-500/20">
        <div className="flex items-center gap-3">
          <div className="live-ring w-10 h-10 rounded-xl flex items-center justify-center">
            <span className="text-lg relative z-10">◆</span>
          </div>
          <h1 className="text-xl font-heading font-bold gold-text tracking-wide">EDGECORE</h1>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 hide-scrollbar">
        <div className="text-xs text-purple-300/50 uppercase tracking-widest px-3 py-2 font-semibold">Platform</div>
        {mainLinks.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
            <item.icon className="w-5 h-5" /> {item.label}
          </Link>
        ))}
        <div className="text-xs text-purple-300/50 uppercase tracking-widest px-3 py-2 mt-4 font-semibold">Account</div>
        {secondaryLinks.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
            <item.icon className="w-5 h-5" /> {item.label}
          </Link>
        ))}
        <div className="text-xs text-purple-300/50 uppercase tracking-widest px-3 py-2 mt-4 font-semibold">More</div>
        {utilityLinks.map(item => {
          if (item.adminOnly && !isAdmin) return null;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${pathname === item.href ? 'bg-purple-500/10 text-purple-300 border-l-2 border-purple-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-purple-500/20 text-center text-xs text-white/30">
        {user ? <span>Welcome, <span className="text-purple-300">{username}</span></span> : "Not logged in"}
      </div>
    </aside>
  );
}
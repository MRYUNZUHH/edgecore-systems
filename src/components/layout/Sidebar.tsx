"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/game-store";
import { Home, Gamepad2, Tv, TrendingUp, Users, Shield, Gift, Wallet, Heart, MessageCircle } from "lucide-react";

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/casino", label: "Casino", icon: Gamepad2 },
  { href: "/live-casino", label: "Live Casino", icon: Tv, live: true },
  { href: "/predictions", label: "Predictions", icon: TrendingUp },
  { href: "/virtual", label: "Virtual Sports", icon: Users },
];
const accountLinks = [
  { href: "/vip", label: "VIP Club", icon: Shield },
  { href: "/promotions", label: "Promotions", icon: Gift, badge: "NEW" },
  { href: "/wallet", label: "Wallet", icon: Wallet },
];
const moreLinks = [
  { href: "/responsible-gaming", label: "Responsible Play", icon: Heart },
  { href: "/help", label: "Support", icon: MessageCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, getBalanceDollars } = useStore();
  const router = useRouter();
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-[#080b12] border-r border-[#ffffff0f] h-screen fixed left-0 top-0 z-40">
      <div className="p-4 border-b border-[#ffffff0f]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold text-sm">◆</div>
          <span className="font-display text-lg text-[#f5c842] font-black tracking-wide">EDGECORE</span>
        </div>
      </div>
      
      {user && (
        <div className="p-4 border-b border-[#ffffff0f]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#161e2e] flex items-center justify-center text-sm font-bold">{user.username.slice(0,2).toUpperCase()}</div>
            <div>
              <p className="text-sm text-white">{user.username}</p>
              <p className="text-xs text-[#f5c842]">VIP {user.vipLevel}</p>
            </div>
          </div>
          <p className="font-display text-sm text-[#22c55e]">${getBalanceDollars().toFixed(2)}</p>
          <button onClick={() => router.push('/wallet')} className="mt-2 w-full py-1.5 bg-[#f5c842] text-black font-bold rounded text-xs">+ DEPOSIT</button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 hide-scrollbar">
        <p className="text-[10px] text-[#5a6a85] uppercase tracking-widest px-2 py-2 font-bold">Play</p>
        {mainLinks.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive(item.href) ? 'bg-[#f5c842]/10 text-[#f5c842] border-l-2 border-[#f5c842]' : 'text-[#5a6a85] hover:text-white hover:bg-white/5'}`}>
            <item.icon className="w-4 h-4" /> {item.label}
            {item.live && <span className="badge-live ml-auto">LIVE</span>}
          </Link>
        ))}
        <p className="text-[10px] text-[#5a6a85] uppercase tracking-widest px-2 py-2 mt-3 font-bold">Account</p>
        {accountLinks.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive(item.href) ? 'bg-[#f5c842]/10 text-[#f5c842] border-l-2 border-[#f5c842]' : 'text-[#5a6a85] hover:text-white hover:bg-white/5'}`}>
            <item.icon className="w-4 h-4" /> {item.label}
            {item.badge && <span className="ml-auto text-[10px] bg-[#8b5cf6] text-white px-1.5 py-0.5 rounded font-bold">{item.badge}</span>}
          </Link>
        ))}
        <p className="text-[10px] text-[#5a6a85] uppercase tracking-widest px-2 py-2 mt-3 font-bold">More</p>
        {moreLinks.map(item => (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive(item.href) ? 'bg-[#f5c842]/10 text-[#f5c842] border-l-2 border-[#f5c842]' : 'text-[#5a6a85] hover:text-white hover:bg-white/5'}`}>
            <item.icon className="w-4 h-4" /> {item.label}
          </Link>
        ))}
      </nav>

      {!user && (
        <div className="p-3 border-t border-[#ffffff0f]">
          <button onClick={() => router.push('/auth/login')} className="w-full py-2 bg-[#f5c842] text-black font-bold rounded-lg text-sm">LOGIN</button>
        </div>
      )}
    </aside>
  );
}
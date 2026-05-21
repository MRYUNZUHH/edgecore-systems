"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Tv, Wallet } from "lucide-react";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/casino", icon: Gamepad2, label: "Casino" },
  { href: "/live-casino", icon: Tv, label: "Live" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-navy-950/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around h-16 z-30">
      {links.map(link => {
        const Icon = link.icon;
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href}
            className={`flex flex-col items-center text-xs gap-1 transition ${active ? "text-gold-400" : "text-gray-500"}`}>
            <Icon className="w-5 h-5" /> {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
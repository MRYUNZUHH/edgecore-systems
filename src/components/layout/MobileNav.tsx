"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Wallet, User } from "lucide-react";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/casino", icon: Gamepad2, label: "Casino" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-navy-950/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around h-16 z-30">
      {links.map(link => {
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href}
            className={`flex flex-col items-center text-xs ${pathname === link.href ? "text-gold-400" : "text-white/60"}`}>
            <Icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

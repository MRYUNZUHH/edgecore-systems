"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, TrendingUp, Tv, User } from "lucide-react";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/casino", icon: Gamepad2, label: "Casino" },
  { href: "/predictions", icon: TrendingUp, label: "Predict" },
  { href: "/live-casino", icon: Tv, label: "Live" },
  { href: "/auth/login", icon: User, label: "Account" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[#080b12] border-t border-[#ffffff0f] flex items-center justify-around h-16 z-30">
      {links.map(link => (
        <Link key={link.href} href={link.href}
          className={`flex flex-col items-center text-[10px] gap-0.5 ${pathname === link.href ? 'text-[#f5c842]' : 'text-[#5a6a85]'}`}>
          <link.icon className="w-5 h-5" /> {link.label}
        </Link>
      ))}
    </nav>
  );
}
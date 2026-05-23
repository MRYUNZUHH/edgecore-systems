"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/casino", label: "Casino", emoji: "🎮" },
  { href: "/predictions", label: "Predict", emoji: "📊" },
  { href: "/live-casino", label: "Live", emoji: "🔴" },
  { href: "/wallet", label: "Wallet", emoji: "💰" },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[#080b12] border-t border-[#ffffff0f] flex items-center justify-around h-16 z-30">
      {links.map(link => (
        <Link key={link.href} href={link.href}
          className={`flex flex-col items-center text-[10px] gap-0.5 ${pathname === link.href ? 'text-[#f5c842]' : 'text-[#5a6a85]'}`}>
          <span className="text-lg">{link.emoji}</span> {link.label}
        </Link>
      ))}
    </nav>
  );
}
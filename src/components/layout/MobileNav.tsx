"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
const links = [
  {h:"/",l:"Home",e:"🏠"},{h:"/casino",l:"Casino",e:"🎮"},{h:"/live-casino",l:"Live",e:"🔴"},
  {h:"/predictions",l:"Predict",e:"📊"},{h:"/wallet",l:"Wallet",e:"💰"},
];
export default function MobileNav() {
  const p = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[var(--bg)] border-t border-[var(--border)] flex items-center justify-around h-16 z-50">
      {links.map(l=><Link key={l.h} href={l.h} className={`flex flex-col items-center text-[10px] gap-0.5 no-underline ${p===l.h?'text-gold':'text-muted'}`}><span className="text-lg">{l.e}</span>{l.l}</Link>)}
    </nav>
  );
}
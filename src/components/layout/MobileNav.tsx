"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  {h:"/",l:"Home",e:"🏠"},{h:"/casino",l:"Casino",e:"🎮"},{h:"/live-casino",l:"Live",e:"🔴"},
  {h:"/predictions",l:"Predict",e:"📊"},{h:"/wallet",l:"Wallet",e:"💰"},
];
export default function MobileNav() {
  const p = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[#080b12] border-t border-[#ffffff0f] flex items-center justify-around h-16 z-50">
      {links.map(l=><Link key={l.h} href={l.h} className={`flex flex-col items-center text-[10px] gap-0.5 no-underline ${p===l.h?'text-[#f0b429]':'text-gray-500'}`}><span className="text-lg">{l.e}</span>{l.l}</Link>)}
    </nav>
  );
}
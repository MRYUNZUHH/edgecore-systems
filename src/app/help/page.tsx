import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";
export default function HelpPage() {
  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">🆘 Help Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {t:"Getting Started",d:"Learn how to create an account and start playing",l:"/auth/login"},
          {t:"Demo vs Real Mode",d:"Understand the difference between demo and real accounts",l:"/faq"},
          {t:"How to Play",d:"Rules and strategies for all casino games",l:"/casino"},
          {t:"Deposits & Withdrawals",d:"Payment methods and transaction guide",l:"/wallet"},
          {t:"VIP Program",d:"Earn rewards and climb the VIP tiers",l:"/vip"},
          {t:"Responsible Gaming",d:"Tools and resources for safe play",l:"/responsible-gaming"},
          {t:"Privacy Policy",d:"How we handle your data",l:"/privacy"},
          {t:"Contact Us",d:"Get in touch with our support team",l:"/contact"},
        ].map(item => (
          <Link key={item.t} href={item.l} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-5 no-underline hover:border-[#f0b429]/50 transition">
            <h3 className="text-white font-bold text-lg mb-1">{item.t}</h3>
            <p className="text-gray-400 text-sm">{item.d}</p>
          </Link>
        ))}
      </div>
      <MobileNav />
    </div>
  );
}
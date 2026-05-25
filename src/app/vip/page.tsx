"use client";
import { useBalance } from "@/lib/useBalance";
import MobileNav from "@/components/layout/MobileNav";

const tiers = [
  {n:"Bronze",min:0,e:"🥉",cb:2},
  {n:"Silver",min:10000,e:"🥈",cb:5},
  {n:"Gold",min:50000,e:"🥇",cb:8},
  {n:"Platinum",min:200000,e:"💎",cb:12},
  {n:"Diamond",min:1000000,e:"👑",cb:20},
];

export default function Page() {
  const { totalWagered } = useBalance();
  const current = tiers.filter(t => totalWagered >= t.min).length - 1;
  const tier = tiers[Math.max(0, current)];
  const next = tiers[Math.min(4, current + 1)];
  const progress = next ? Math.min(100, ((totalWagered - tier.min) / (next.min - tier.min)) * 100) : 100;

  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429]">👑 VIP Club</h1>
      
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 text-center">
        <p className="text-6xl">{tier.e}</p>
        <h2 className="text-2xl font-heading font-bold text-white mt-3">{tier.n} Tier</h2>
        <p className="text-gray-400">${totalWagered.toFixed(2)} wagered</p>
        <div className="w-full bg-gray-800 rounded-full h-3 mt-4">
          <div className="bg-[#f0b429] h-3 rounded-full" style={{ width: progress + "%" }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          ${totalWagered.toFixed(0)} / {next ? next.min.toLocaleString() : "∞"} to {next ? next.n : "MAX"}
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {tiers.map((t, i) => (
          <div
            key={t.n}
            className={
              "text-center p-3 rounded-xl border " +
              (i <= current
                ? "bg-[#f0b429]/10 border-[#f0b429]/40"
                : "bg-[#0f1520] border-[#ffffff0f]")
            }
          >
            <span className="text-2xl">{t.e}</span>
            <p className="text-xs text-white font-bold mt-1">{t.n}</p>
            <p className="text-[10px] text-gray-500">{t.cb}% CB</p>
          </div>
        ))}
      </div>
      <MobileNav />
    </div>
  );
}
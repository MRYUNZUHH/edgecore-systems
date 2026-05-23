"use client";
import { useStore } from "@/store/game-store";

const tiers = [
  { name:"Bronze", min:0, emoji:"🥉" },
  { name:"Silver", min:1000, emoji:"🥈" },
  { name:"Gold", min:10000, emoji:"🥇" },
  { name:"Platinum", min:100000, emoji:"💎" },
  { name:"Diamond", min:1000000, emoji:"👑" },
];

export default function VIPPage() {
  const { user } = useStore();
  const wagered = user?.totalWagered ?? 0;
  const current = tiers.findIndex(t => wagered >= t.min);
  const tier = current >= 0 ? tiers[Math.min(current, 4)] : tiers[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">👑 VIP Club</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-6 text-center">
        <p className="text-6xl">{tier.emoji}</p>
        <h2 className="text-2xl font-bold text-white mt-3">{tier.name} Tier</h2>
        <p className="text-[#5a6a85]">Total wagered: ${wagered.toFixed(2)}</p>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {tiers.map((t, i) => (
          <div key={t.name} className={`text-center p-4 rounded-xl border ${i <= current ? 'bg-white/10 border-[#f5c842]/40' : 'bg-white/5 border-white/5'}`}>
            <span className="text-2xl">{t.emoji}</span>
            <p className="text-xs text-white font-bold mt-1">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
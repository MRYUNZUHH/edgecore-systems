"use client";
import { useStore } from "@/store/game-store";

const tiers = [
  { name: "Bronze", min: 0, emoji: "🥉", color: "from-amber-700 to-amber-600" },
  { name: "Silver", min: 100000, emoji: "🥈", color: "from-gray-400 to-gray-300" },
  { name: "Gold", min: 500000, emoji: "🥇", color: "from-yellow-500 to-yellow-400" },
  { name: "Platinum", min: 2000000, emoji: "💎", color: "from-purple-500 to-purple-400" },
  { name: "Diamond", min: 10000000, emoji: "👑", color: "from-blue-500 to-cyan-400" },
];

export default function VIPPage() {
  const { user } = useStore();
  const wagered = user?.totalWageredCents ?? 0;
  const currentTier = user?.vipLevel ?? 0;
  const nextTier = tiers[Math.min(currentTier + 1, 4)];

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">👑 VIP Club</h1>
      <div className={`bg-gradient-to-r ${tiers[currentTier].color} rounded-2xl p-6`}>
        <p className="text-6xl mb-2">{tiers[currentTier].emoji}</p>
        <h2 className="text-2xl font-heading font-black text-white">{tiers[currentTier].name} Member</h2>
        <p className="text-white/70 mt-1">Total wagered: ${(wagered / 100).toLocaleString()}</p>
      </div>
      {currentTier < 4 && (
        <div className="card p-6">
          <p className="text-sm text-[#5a6a85] mb-2">Progress to {nextTier.name}</p>
          <div className="w-full h-3 bg-[#ffffff0f] rounded-full overflow-hidden">
            <div className="h-full bg-[#f5c842] rounded-full" style={{ width: `${Math.min(100, (wagered / nextTier.min) * 100)}%` }} />
          </div>
          <p className="text-xs text-[#5a6a85] mt-2">${(wagered / 100).toLocaleString()} / ${(nextTier.min / 100).toLocaleString()}</p>
        </div>
      )}
      <div className="grid grid-cols-5 gap-3">
        {tiers.map((tier, i) => (
          <div key={tier.name} className={`text-center p-4 rounded-xl ${i <= currentTier ? 'bg-white/10 border-[#f5c842]/40' : 'bg-white/5 border-white/5'} border`}>
            <span className="text-2xl">{tier.emoji}</span>
            <p className="text-xs text-white font-bold mt-1">{tier.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
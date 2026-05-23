"use client";
import { useStore } from "@/store/game-store";

const tiers = [
  { name: "Bronze", min: 0, color: "from-amber-700 to-amber-600", emoji: "🥉" },
  { name: "Silver", min: 10000, color: "from-gray-400 to-gray-300", emoji: "🥈" },
  { name: "Gold", min: 50000, color: "from-yellow-500 to-yellow-400", emoji: "🥇" },
  { name: "Platinum", min: 200000, color: "from-purple-500 to-purple-400", emoji: "💎" },
  { name: "Diamond", min: 1000000, color: "from-blue-500 to-cyan-400", emoji: "👑" },
];

export default function VIPPage() {
  const { user, balance } = useStore();
  const currentTier = user?.vipLevel || 0;
  const nextTier = tiers[Math.min(currentTier + 1, 4)];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold gold-text">👑 VIP Club</h1>
      
      {/* Current Tier */}
      <div className={`bg-gradient-to-r ${tiers[currentTier].color} rounded-2xl p-6`}>
        <p className="text-6xl mb-2">{tiers[currentTier].emoji}</p>
        <h2 className="text-2xl font-black text-white">{tiers[currentTier].name} Member</h2>
        <p className="text-white/70 mt-1">Total wagered: ${balance.toLocaleString()}</p>
      </div>

      {/* Progress */}
      {currentTier < 4 && (
        <div className="bg-[#0D0F1A] border border-[#E6B84F]/20 rounded-2xl p-6">
          <p className="text-sm text-white/60 mb-2">Progress to {nextTier.name}</p>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#E6B84F] rounded-full" style={{ width: `${Math.min(100, (balance / nextTier.min) * 100)}%` }} />
          </div>
          <p className="text-xs text-white/40 mt-2">${balance.toLocaleString()} / ${nextTier.min.toLocaleString()}</p>
        </div>
      )}

      {/* All Tiers */}
      <div className="grid grid-cols-5 gap-3">
        {tiers.map((tier, i) => (
          <div key={tier.name} className={`text-center p-4 rounded-xl ${i <= currentTier ? 'bg-white/10 border-[#E6B84F]/40' : 'bg-white/5 border-white/5'} border`}>
            <span className="text-2xl">{tier.emoji}</span>
            <p className="text-xs text-white font-bold mt-1">{tier.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
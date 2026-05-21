"use client";
import { useGameStore } from "@/store/game-store";

export default function VIPPage() {
  const { user } = useGameStore();
  const vipLevel = user?.vipLevel ?? 0;
  const tierNames = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">👑 VIP Club</h1>
      <div className="glass-panel p-8 space-y-4">
        <p className="text-white/70">Current Tier: <span className="text-gold-400 font-bold">{tierNames[vipLevel] || "Bronze"}</span></p>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div className="bg-gold-400 h-3 rounded-full" style={{ width: `${((vipLevel + 1) / 5) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-400">Play more to unlock exclusive rewards, cashback, and rakeback.</p>
      </div>
    </div>
  );
}
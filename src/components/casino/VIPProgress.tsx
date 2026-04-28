"use client";
import { useGameStore } from "@/store/game-store";

export default function VIPProgress() {
  const balance = useGameStore(s => s.balance);
  const progress = Math.min(100, (balance / 50000) * 100);

  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-sm text-white/60 mb-1">VIP Progress</h3>
      <div className="w-full bg-white/10 rounded-full h-2 mt-2">
        <div className="bg-gold-400 h-2 rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs text-white/50 mt-1">${balance.toLocaleString()} / $50,000 for next tier</p>
    </div>
  );
}

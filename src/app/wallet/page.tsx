"use client";
import { useGameStore } from "@/store/game-store";
export default function WalletPage() {
  const { balance, bonusBalance, wageringRequirement } = useGameStore();
  return (
    <div className="text-white p-6 space-y-4">
      <h1 className="text-3xl font-bold gold-text">Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4"><p className="text-sm text-white/60">Cash Balance</p><p className="text-2xl font-bold text-neon-400">${balance.toLocaleString()}</p></div>
        <div className="glass-card p-4"><p className="text-sm text-white/60">Bonus Balance</p><p className="text-2xl font-bold text-yellow-400">${bonusBalance.toLocaleString()}</p></div>
      </div>
      <div className="glass-card p-4"><p className="text-sm text-white/60">Wagering Requirement</p><p className="text-lg">${wageringRequirement.toLocaleString()}</p></div>
    </div>
  );
}

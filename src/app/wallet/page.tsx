"use client";
import { useGameStore } from "@/store/game-store";

export default function WalletPage() {
  const { wallet, betHistory } = useGameStore();
  const cashBalance = wallet?.cashBalance ?? 0;
  const bonusBalance = wallet?.bonusBalance ?? 0;
  const wageringRequirement = wallet?.wageringRequirement ?? 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">💰 Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5"><p className="text-sm text-gray-400">Cash Balance</p><p className="text-2xl font-bold text-neon-400">${cashBalance.toLocaleString()}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-gray-400">Bonus Balance</p><p className="text-2xl font-bold text-yellow-400">${bonusBalance.toLocaleString()}</p></div>
        <div className="glass-card p-5"><p className="text-sm text-gray-400">Wagering Left</p><p className="text-2xl font-bold text-white">${wageringRequirement.toLocaleString()}</p></div>
      </div>
      {betHistory.length > 0 && (
        <div className="glass-panel p-4">
          <h3 className="text-lg font-bold text-white mb-3">Recent Bets</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto hide-scrollbar">
            {betHistory.slice(0, 10).map((bet, i) => (
              <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5">
                <span className="text-gray-400">{bet.gameId || bet.game}</span>
                <span className="text-white">${bet.amount}</span>
                <span className={bet.outcome === "win" ? "text-neon-400" : "text-rose-500"}>{bet.profit >= 0 ? '+' : ''}${bet.profit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import dynamic from 'next/dynamic';
import { useStore } from '@/store/game-store';
const OperatorProfitChart = dynamic(() => import('./OperatorProfitChart'), { ssr: false, loading: () => <div className="h-64 flex items-center justify-center text-sm text-gray-400">Loading chart...</div> });

export function OperatorDashboard() {
  const { betHistory, balance } = useStore();
  const totalProfit = balance.totalWagered - balance.totalPayout;
  const profitData = betHistory.slice().reverse().reduce((acc: any[], bet, i) => {
    acc.push({ bet: i + 1, profit: (acc[i-1]?.profit || 0) + bet.profit });
    return acc;
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">📊 System Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4"><p className="text-xs text-gray-400">House Profit</p><p className="text-2xl font-bold neon-text">+${totalProfit.toFixed(2)}</p></div>
        <div className="glass-card rounded-xl p-4"><p className="text-xs text-gray-400">Edge</p><p className="text-2xl font-bold">94%</p></div>
        <div className="glass-card rounded-xl p-4"><p className="text-xs text-gray-400">Total Bets</p><p className="text-2xl font-bold text-white">{balance.totalBets}</p></div>
      </div>
      <OperatorProfitChart data={profitData.slice(-50)} />
    </div>
  );
}

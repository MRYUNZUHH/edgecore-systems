"use client";
'use client';
import { useGameStore } from '@/store/game-store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function OperatorDashboard() {
  const { betHistory, balance } = useGameStore();
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
      <div className="glass-panel rounded-2xl p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={profitData.slice(-50)}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="bet" stroke="#666" /><YAxis stroke="#666" /><Tooltip contentStyle={{backgroundColor:'#0a0a15',border:'1px solid #d4af37', borderRadius:'8px'}} /><Line type="monotone" dataKey="profit" stroke="#00ff88" strokeWidth={2} /></LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

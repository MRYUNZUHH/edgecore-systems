'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export function RouletteGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning || betAmount > balance.demoBalance) return;
    setSpinning(true);
    setTimeout(() => {
      const win = Math.random() < 0.06;
      const num = win ? Math.floor(Math.random() * 18) : 18 + Math.floor(Math.random() * 19);
      setResult(num); placeBet('roulette', betAmount, { number: num, win }); setSpinning(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">🎡 Roulette</h2>
        <div className="flex justify-center mb-6">
          <motion.div animate={spinning ? { rotate: 360 } : {}} transition={{ duration: 2 }} className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {result !== null ? result : '?'}
          </motion.div>
        </div>
        <div className="flex gap-2 justify-center mb-6">
          {[10,50,100,500].map(amt => (
            <button key={amt} onClick={() => setBetAmount(amt)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${betAmount===amt ? 'btn-gold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>${amt}</button>
          ))}
        </div>
        <button onClick={spin} disabled={spinning} className="btn-primary w-full py-4 text-lg disabled:opacity-50">Spin</button>
      </div>
    </div>
  );
}

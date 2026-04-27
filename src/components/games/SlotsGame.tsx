'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

const sym = ['🍒','🍋','🔔','💎','7️⃣'];
export function SlotsGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [reels, setReels] = useState([0,1,2]);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning || betAmount > balance.demoBalance) return;
    setSpinning(true);
    const interval = setInterval(() => setReels([Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5)]), 100);
    setTimeout(() => {
      clearInterval(interval);
      const win = Math.random() < 0.06;
      const final = win ? [0,0,0] : [Math.floor(Math.random()*5),Math.floor(Math.random()*5),Math.floor(Math.random()*5)];
      setReels(final); placeBet('slots', betAmount, { reels: final, win }); setSpinning(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">🎰 Slots</h2>
        <div className="flex justify-center gap-3 mb-6">
          {reels.map((s,i) => (
            <motion.div key={i} className="w-20 h-20 glass-card rounded-xl flex items-center justify-center text-4xl">{sym[s]}</motion.div>
          ))}
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

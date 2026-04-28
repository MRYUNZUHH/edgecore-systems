'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export function DiceGame() {
  const { placeBet, balance } = useGameStore();
  const [bet, setBet] = useState(100);
  const [target, setTarget] = useState(50);
  const [result, setResult] = useState<number|null>(null);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling || bet > balance.demoBalance) return;
    setRolling(true); setResult(null);
    setTimeout(() => {
      const win = Math.random() < 0.06;
      const num = Math.floor(Math.random()*100);
      setResult(num);
      placeBet('dice', bet);
      setRolling(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-pink-500/10 to-purple-500/10">
        <h2 className="text-4xl font-black gold-text mb-8 text-center">🎲 Dice</h2>
        <div className="flex justify-center mb-8">
          <motion.div animate={rolling ? { rotate: 360 } : {}} className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center text-6xl">
            {result !== null ? result : '🎲'}
          </motion.div>
        </div>
        <input type="range" min="1" max="99" value={target} onChange={e=>setTarget(+e.target.value)} className="w-full accent-gold-400" />
        <div className="flex justify-between text-sm mb-4"><span>1</span><span className="text-gold-400">{target}</span><span>99</span></div>
        <div className="flex gap-2 mb-6">
          {[10,50,100,500].map(a=><button key={a} onClick={()=>setBet(a)} className={`px-4 py-2 rounded-xl ${bet===a?'btn-gold':'bg-white/10 text-white'}`}>${a}</button>)}
        </div>
        <button onClick={roll} className="btn-primary w-full py-4">Roll</button>
      </div>
    </div>
  );
}

"use client";
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

const diceFaces: Record<number, string> = {
  1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅'
};

export function DiceGame() {
  const { placeBet, balance } = useStore();
  const [bet, setBet] = useState(100);
  const [target, setTarget] = useState(50);
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const roll = () => {
    if (rolling || bet > balance.demoBalance) return;
    setRolling(true);
    setResult(null);
    const rollInterval = setInterval(() => {
      setResult(Math.ceil(Math.random() * 6));
    }, 80);
    setTimeout(() => {
      clearInterval(rollInterval);
      const final = Math.ceil(Math.random() * 6);
      setResult(final);
      placeBet('dice', bet);
      setRolling(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black gold-text">🎲 Dice</h2>
          <button onClick={() => setShowRules(true)} className="text-sm text-white/60 hover:text-white">How to Play</button>
        </div>

        <div className="flex justify-center mb-8">
          <motion.div
            animate={rolling ? { rotateX: 360, rotateY: 360 } : {}}
            transition={{ duration: 1.5 }}
            className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center text-7xl shadow-lg"
          >
            {result ? diceFaces[result] : '🎲'}
          </motion.div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-white/60">Target (roll under)</label>
          <div className="flex items-center gap-4">
            <input type="range" min="1" max="6" value={target} onChange={e => setTarget(+e.target.value)} className="w-full accent-gold-400" />
            <span className="text-gold-400 font-bold">{target}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[10,50,100,500].map(amt => (
            <button key={amt} onClick={() => setBet(amt)} className={`px-4 py-2 rounded-xl ${bet===amt ? 'btn-gold' : 'bg-white/10 text-white'}`}>${amt}</button>
          ))}
        </div>
        <button onClick={roll} disabled={rolling} className="btn-primary w-full py-4">Roll Dice</button>
      </div>
      <RuleModal isOpen={showRules} onClose={() => setShowRules(false)} title="Dice Rules">
        <p>Roll a 6-sided die. If the result is less than your chosen target, you win! The lower the target, the higher the risk and reward.</p>
      </RuleModal>
    </div>
  );
}

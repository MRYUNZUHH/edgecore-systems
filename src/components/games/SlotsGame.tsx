"use client";
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

const symbols = ['🍒','🍋','🔔','💎','7️⃣'];

export function SlotsGame() {
  const { placeBet, balance } = useStore();
  const [bet, setBet] = useState(100);
  const [reels, setReels] = useState([0,1,2]);
  const [spinning, setSpinning] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const spin = () => {
    if (spinning || bet > balance.demoBalance) return;
    setSpinning(true);
    const interval = setInterval(() => {
      setReels([Math.floor(Math.random()*5), Math.floor(Math.random()*5), Math.floor(Math.random()*5)]);
    }, 80);
    setTimeout(() => {
      clearInterval(interval);
      setReels([Math.floor(Math.random()*5), Math.floor(Math.random()*5), Math.floor(Math.random()*5)]);
      placeBet('slots', bet);
      setSpinning(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-pink-500/10 to-yellow-500/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black gold-text">🎰 Slots</h2>
          <button onClick={() => setShowRules(true)} className="text-sm text-white/60 hover:text-white">How to Play</button>
        </div>
        <div className="flex gap-3 justify-center mb-8">
          {reels.map((s, i) => (
            <motion.div
              key={i}
              animate={spinning ? { rotateY: 360 } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-20 h-20 glass-card flex items-center justify-center text-4xl"
            >
              {symbols[s]}
            </motion.div>
          ))}
        </div>
        <div className="flex gap-2 justify-center mb-6">
          {[10,50,100,500].map(amt=>(
            <button key={amt} onClick={()=>setBet(amt)} className={`px-4 py-2 rounded-xl ${bet===amt?'btn-gold':'bg-white/10 text-white'}`}>${amt}</button>
          ))}
        </div>
        <button onClick={spin} disabled={spinning} className="btn-primary w-full py-4">Spin</button>
      </div>
      <RuleModal isOpen={showRules} onClose={()=>setShowRules(false)} title="Slots Rules">
        <p>Match three symbols to win! The house edge ensures most spins lose, but big wins are possible.</p>
      </RuleModal>
    </div>
  );
}

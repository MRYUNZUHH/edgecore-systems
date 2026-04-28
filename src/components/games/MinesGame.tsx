'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

export function MinesGame() {
  const { placeBet, balance } = useGameStore();
  const [bet, setBet] = useState(100);
  const [mines, setMines] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const start = () => {
    setMines(Array.from({length:25},(_,i)=>i).sort(()=>Math.random()-0.5).slice(0,3));
    setRevealed([]);
    setGameOver(false);
  };

  const click = (idx: number) => {
    if (gameOver || revealed.includes(idx) || mines.length===0) return;
    const rev = [...revealed, idx];
    setRevealed(rev);
    if (mines.includes(idx)) {
      setGameOver(true);
      placeBet('mines', bet);
    } else if (rev.length === 22) {
      setGameOver(true);
      placeBet('mines', bet);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-gray-500/10 to-red-500/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black gold-text">💣 Mines</h2>
          <button onClick={()=>setShowRules(true)} className="text-sm text-white/60 hover:text-white">How to Play</button>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array.from({length:25}).map((_,i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={()=>click(i)}
              disabled={gameOver || mines.length===0}
              className={`w-12 h-12 rounded-lg font-bold text-lg ${revealed.includes(i) ? (mines.includes(i) ? 'bg-red-500' : 'bg-green-400') : 'glass-card'}`}
            >
              {revealed.includes(i) ? (mines.includes(i) ? '💣' : '💎') : '?'}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-2 justify-center mb-6">
          {[10,50,100,500].map(a=><button key={a} onClick={()=>setBet(a)} className={`px-4 py-2 rounded-xl ${bet===a?'btn-gold':'bg-white/10 text-white'}`}>${a}</button>)}
        </div>
        <button onClick={start} className="btn-primary w-full py-3">New Game</button>
      </div>
      <RuleModal isOpen={showRules} onClose={()=>setShowRules(false)} title="Mines Rules">
        <p>Reveal tiles, avoiding the hidden mines. The more you reveal, the higher your potential reward. Hit a mine and you lose.</p>
      </RuleModal>
    </div>
  );
}

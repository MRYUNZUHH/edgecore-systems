'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export function DiceGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [target, setTarget] = useState(50);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [lastWin, setLastWin] = useState(false);

  const roll = () => {
    if (isRolling || betAmount > balance.demoBalance) return;
    setIsRolling(true);
    setRollResult(null);
    
    const interval = setInterval(() => {
      setRollResult(Math.floor(Math.random() * 100));
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const result = Math.floor(Math.random() * 100);
      setRollResult(result);
      const win = result < target;
      setLastWin(win);
      placeBet('dice', betAmount);
      setIsRolling(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8 animate-glow-pulse">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">🎲 Dice</h2>
        
        <div className="flex justify-center mb-8">
          <motion.div
            animate={isRolling ? { rotate: 360 } : {}}
            transition={{ duration: 1.5 }}
            className="w-32 h-32 glass-card rounded-2xl flex items-center justify-center"
          >
            <span className="text-5xl">
              {rollResult !== null ? (lastWin ? '🎉' : '💀') : '🎲'}
            </span>
          </motion.div>
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">
            Roll Under
          </label>
          <input
            type="range"
            min="1"
            max="99"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full accent-gold-400"
          />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">1</span>
            <span className="text-gold-400 font-bold">{target}</span>
            <span className="text-gray-500">99</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Bet</label>
          <div className="flex gap-2">
            {[10, 50, 100, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setBetAmount(amt)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  betAmount === amt ? 'btn-gold' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={roll}
          disabled={isRolling || betAmount > balance.demoBalance}
          className="btn-primary w-full py-4 text-lg disabled:opacity-50"
        >
          {isRolling ? 'Rolling...' : `Roll Dice ($${betAmount})`}
        </button>

        {rollResult !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center mt-4 text-lg font-bold ${lastWin ? 'text-green-400' : 'text-red-400'}`}
          >
            {lastWin ? 'You won!' : 'You lost!'}
          </motion.p>
        )}
      </div>
    </div>
  );
}

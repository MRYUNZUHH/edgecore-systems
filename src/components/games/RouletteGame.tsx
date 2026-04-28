'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

const numbers = [
  '0','32','15','19','4','21','2','25','17','34','6','27','13','36','11','30','8','23','10','5','24','16','33','1','20','14','31','9','22','18','29','7','28','12','35','3','26'
];

export function RouletteGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const spin = () => {
    if (spinning || betAmount > balance.demoBalance) return;
    setSpinning(true);
    setResult(null);
    const winningIndex = Math.floor(Math.random() * 37);
    const deg = 360 * 5 + (winningIndex * (360/37)); // multiple rotations + offset
    document.documentElement.style.setProperty('--wheel-rotate', `${deg}deg`);
    setTimeout(() => {
      setResult(numbers[winningIndex]);
      placeBet('roulette', betAmount);
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-red-500/10 to-yellow-500/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black gold-text">🎡 Roulette</h2>
          <button onClick={() => setShowRules(true)} className="text-sm text-white/60 hover:text-white">How to Play</button>
        </div>

        <div className="relative flex justify-center mb-8">
          <div className="relative w-64 h-64">
            {/* Wheel background */}
            <div className="absolute inset-0 rounded-full border-8 border-yellow-600" style={{ background: 'radial-gradient(circle, #1a1a2e 60%, #2d2d44 100%)' }} />
            {/* Spinning wheel container */}
            <motion.div
              animate={spinning ? { rotate: 360 * 5 } : { rotate: 0 }}
              transition={spinning ? { duration: 3, ease: 'easeOut' } : {}}
              className="absolute inset-0 rounded-full overflow-hidden"
            >
              {numbers.map((num, i) => (
                <div key={i} className="absolute w-8 h-8 flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    transform: `rotate(${i * (360/37)}deg) translateY(-80px)`,
                    transformOrigin: 'center 80px',
                  }}
                >
                  {num}
                </div>
              ))}
            </motion.div>
            {/* Center pointer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full z-10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-t-yellow-400 border-l-transparent border-r-transparent" />
            </div>
          </div>
        </div>

        {result && <p className="text-center text-2xl font-bold text-white mb-4">Result: {result}</p>}

        <div className="flex gap-2 justify-center mb-6">
          {[10,50,100,500].map(amt => (
            <button key={amt} onClick={() => setBetAmount(amt)} className={`px-4 py-2 rounded-xl ${betAmount===amt ? 'btn-gold' : 'bg-white/10 text-white'}`}>${amt}</button>
          ))}
        </div>
        <button onClick={spin} disabled={spinning} className="btn-primary w-full py-4 text-lg">Spin</button>
      </div>
      <RuleModal isOpen={showRules} onClose={() => setShowRules(false)} title="Roulette Rules">
        <p>Bet on a number (0-36). The wheel spins and the ball lands on a random slot. If your number matches, you win! The house edge is 94%.</p>
      </RuleModal>
    </div>
  );
}

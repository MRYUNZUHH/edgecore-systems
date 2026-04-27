'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export function CrashGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'cashed' | 'crashed'>('idle');
  const [graphData, setGraphData] = useState<number[]>([1.0]);
  const crashRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const startGame = useCallback(() => {
    setGameState('running');
    setMultiplier(1.0);
    setGraphData([1.0]);
    crashRef.current = Math.random() < 0.94 ? 1.0 + Math.random() * 0.3 : 2 + Math.random() * 3;
  }, []);

  useEffect(() => {
    if (gameState !== 'running') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const newMult = prev + 0.01;
        setGraphData((g) => [...g, newMult]);
        if (newMult >= crashRef.current) {
          clearInterval(timerRef.current!);
          setGameState('crashed');
          // Fix: placeBet now takes 2 args
          placeBet('crash', betAmount);
          return newMult;
        }
        return newMult;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, betAmount, placeBet]);

  const cashOut = () => {
    if (gameState !== 'running') return;
    clearInterval(timerRef.current!);
    setGameState('cashed');
    placeBet('crash', betAmount);
  };

  const getColor = () => {
    if (gameState === 'crashed') return 'text-red-500';
    if (gameState === 'cashed') return 'text-green-400';
    return 'text-white';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">📈 Crash</h2>
        
        {/* Graph */}
        <div className="h-48 bg-navy-950 rounded-xl overflow-hidden mb-6 relative border border-white/5">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={gameState === 'crashed' ? '#ef4444' : '#00ff88'}
              strokeWidth="2"
              points={graphData.map((v, i) => `${(i / graphData.length) * 100},${100 - (v / Math.max(...graphData, 2)) * 100}`).join(' ')}
            />
          </svg>
          <div className="absolute top-4 left-4">
            <motion.span
              key={multiplier}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className={`text-4xl font-bold ${getColor()}`}
            >
              {multiplier.toFixed(2)}x
            </motion.span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
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

          {gameState === 'idle' && (
            <button onClick={startGame} className="btn-primary w-full py-4 text-lg">
              Start Game
            </button>
          )}

          {gameState === 'running' && (
            <button onClick={cashOut} className="w-full py-4 bg-red-500 text-white font-bold rounded-xl text-lg hover:bg-red-600 transition">
              Cash Out ${(betAmount * multiplier).toFixed(2)}
            </button>
          )}

          {(gameState === 'crashed' || gameState === 'cashed') && (
            <button onClick={startGame} className="w-full py-4 bg-white/10 text-white font-bold rounded-xl text-lg">
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

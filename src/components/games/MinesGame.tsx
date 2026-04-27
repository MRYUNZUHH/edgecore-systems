'use client';
import { useState } from 'react';
import { useGameStore } from '@/store/game-store';

export function MinesGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [mines, setMines] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const start = () => {
    setMines(Array.from({length:25},(_,i)=>i).sort(()=>Math.random()-0.5).slice(0,3));
    setRevealed([]); setGameOver(false);
  };

  const flip = (idx: number) => {
    if (gameOver || revealed.includes(idx) || mines.length===0) return;
    if (mines.includes(idx)) { setRevealed([...revealed,idx]); setGameOver(true); placeBet('mines',betAmount,{lost:true}); }
    else { const r = [...revealed,idx]; setRevealed(r); if (r.length===22) { setGameOver(true); placeBet('mines',betAmount,{win:true}); } }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">💣 Mines</h2>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array.from({length:25}).map((_,i) => (
            <button key={i} onClick={() => flip(i)} disabled={gameOver||mines.length===0}
              className={`w-12 h-12 rounded-lg text-xs font-bold transition ${revealed.includes(i) ? (mines.includes(i) ? 'bg-lose' : 'bg-neon-400 text-navy-950') : 'glass-card hover:border-gold-400/50'}`}>
              {revealed.includes(i) ? (mines.includes(i) ? '💣' : '💎') : '?'}
            </button>
          ))}
        </div>
        <div className="flex gap-2 justify-center mb-6">
          {[10,50,100,500].map(amt => (
            <button key={amt} onClick={() => setBetAmount(amt)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${betAmount===amt ? 'btn-gold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>${amt}</button>
          ))}
        </div>
        <button onClick={start} className="btn-primary w-full py-3 text-lg">New Game</button>
      </div>
    </div>
  );
}

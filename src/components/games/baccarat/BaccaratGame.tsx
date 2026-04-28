'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export function BaccaratGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [betOn, setBetOn] = useState<'player' | 'banker' | 'tie'>('player');
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [bankerCards, setBankerCards] = useState<number[]>([]);
  const [result, setResult] = useState('');
  const [showCards, setShowCards] = useState(false);

  const deal = () => {
    if (betAmount > balance.demoBalance) return;
    const p = [Math.floor(Math.random()*9)+1, Math.floor(Math.random()*9)+1];
    const b = [Math.floor(Math.random()*9)+1, Math.floor(Math.random()*9)+1];
    setPlayerCards(p);
    setBankerCards(b);
    const playerTotal = (p[0]+p[1])%10;
    const bankerTotal = (b[0]+b[1])%10;
    let winner = '';
    if (playerTotal > bankerTotal) winner = 'player';
    else if (bankerTotal > playerTotal) winner = 'banker';
    else winner = 'tie';
    setResult(winner);
    setShowCards(true);
    placeBet('baccarat', betAmount);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">🎴 Baccarat</h2>
        <div className="flex justify-center gap-12 mb-8">
          <div className="text-center">
            <h3 className="text-white mb-2">Player</h3>
            <div className="flex gap-2 justify-center">
              {showCards ? playerCards.map((c,i)=><div key={i} className="w-16 h-24 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-black">{c}</div>) : <div className="w-16 h-24 bg-gray-700 rounded-lg" />}
            </div>
            <p className="text-gray-400 mt-1">Total: {showCards ? (playerCards[0]+playerCards[1])%10 : '?'}</p>
          </div>
          <div className="text-center">
            <h3 className="text-white mb-2">Banker</h3>
            <div className="flex gap-2 justify-center">
              {showCards ? bankerCards.map((c,i)=><div key={i} className="w-16 h-24 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-black">{c}</div>) : <div className="w-16 h-24 bg-gray-700 rounded-lg" />}
            </div>
            <p className="text-gray-400 mt-1">Total: {showCards ? (bankerCards[0]+bankerCards[1])%10 : '?'}</p>
          </div>
        </div>
        {result && <p className="text-center text-xl font-bold text-yellow-400 mb-4">Winner: {result.toUpperCase()}</p>}
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {['player','banker','tie'].map(opt => (
              <button key={opt} onClick={() => setBetOn(opt as any)} className={`px-6 py-2 rounded-lg font-bold capitalize ${betOn===opt ? 'btn-gold' : 'bg-white/5 text-gray-400'}`}>{opt}</button>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            {[10,50,100,500].map(amt => (
              <button key={amt} onClick={() => setBetAmount(amt)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${betAmount===amt ? 'btn-gold' : 'bg-white/5 text-gray-400'}`}>${amt}</button>
            ))}
          </div>
          <button onClick={deal} className="btn-primary w-full py-4 text-lg">Deal</button>
          {showCards && <button onClick={() => setShowCards(false)} className="w-full py-2 text-gray-400 text-sm">New Round</button>}
        </div>
      </div>
    </div>
  );
}

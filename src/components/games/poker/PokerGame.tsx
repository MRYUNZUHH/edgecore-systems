"use client";
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/game-store';

const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const suits = ['♠','♥','♦','♣'];

export function PokerGame() {
  const { placeBet, balance } = useStore();
  const [betAmount, setBetAmount] = useState(100);
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [aiHand, setAiHand] = useState<string[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [phase, setPhase] = useState<'preflop' | 'flop' | 'turn' | 'river' | 'showdown'>('preflop');
  const [message, setMessage] = useState('');

  const deal = () => {
    const deck = suits.flatMap(s => ranks.map(r => r+s)).sort(() => Math.random()-0.5);
    setPlayerHand([deck.pop()!, deck.pop()!]);
    setAiHand([deck.pop()!, deck.pop()!]);
    setCommunityCards([]);
    setPhase('preflop');
    placeBet('poker', betAmount);
  };

  const nextPhase = () => {
    const deck = suits.flatMap(s => ranks.map(r => r+s)).sort(() => Math.random()-0.5);
    if (phase === 'preflop') {
      setCommunityCards([deck.pop()!, deck.pop()!, deck.pop()!]);
      setPhase('flop');
    } else if (phase === 'flop') {
      setCommunityCards(prev => [...prev, deck.pop()!]);
      setPhase('turn');
    } else if (phase === 'turn') {
      setCommunityCards(prev => [...prev, deck.pop()!]);
      setPhase('river');
    } else if (phase === 'river') {
      setPhase('showdown');
      // Simulated outcome
      const win = Math.random() < 0.06; // house edge
      setMessage(win ? 'You win!' : 'AI wins.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">🃏 Poker</h2>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <h3 className="text-white mb-2">AI Hand</h3>
            <div className="flex gap-2">
              {aiHand.map((c,i) => <div key={i} className="w-14 h-20 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-black">{phase==='showdown' ? c : '?'}</div>)}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mb-6">
          {communityCards.map((c,i) => (
            <motion.div key={i} initial={{ scale:0 }} animate={{ scale:1 }} className="w-14 h-20 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-black">{c}</motion.div>
          ))}
          {Array.from({ length: 5 - communityCards.length }).map((_,i) => (
            <div key={i} className="w-14 h-20 bg-gray-700 rounded-lg" />
          ))}
        </div>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <h3 className="text-white mb-2">Your Hand</h3>
            <div className="flex gap-2">
              {playerHand.map((c,i) => <div key={i} className="w-14 h-20 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-black">{c}</div>)}
            </div>
          </div>
        </div>
        {message && <p className="text-center text-xl font-bold text-yellow-400 mb-4">{message}</p>}
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {[10,50,100,500].map(amt => (
              <button key={amt} onClick={() => setBetAmount(amt)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${betAmount===amt ? 'btn-gold' : 'bg-white/5 text-gray-400'}`}>${amt}</button>
            ))}
          </div>
          {phase === 'showdown' ? (
            <button onClick={deal} className="btn-primary w-full py-3">New Hand</button>
          ) : (
            <button onClick={phase==='preflop' ? deal : nextPhase} className="btn-primary w-full py-4 text-lg">
              {phase==='preflop' ? 'Deal' : 'Next Phase'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

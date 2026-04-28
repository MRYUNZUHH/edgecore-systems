'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

interface Card {
  suit: string;
  value: string;
  numericValue: number;
}

function createDeck(): Card[] {
  return suits.flatMap(suit =>
    values.map(value => ({
      suit,
      value,
      numericValue: value === 'A' ? 11 : ['J','Q','K'].includes(value) ? 10 : parseInt(value)
    }))
  ).sort(() => Math.random() - 0.5);
}

function handValue(hand: Card[]): number {
  let total = hand.reduce((sum, card) => sum + card.numericValue, 0);
  let aces = hand.filter(c => c.value === 'A').length;
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

export function BlackjackGame() {
  const { placeBet, balance } = useGameStore();
  const [betAmount, setBetAmount] = useState(100);
  const [deck, setDeck] = useState<Card[]>(createDeck());
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<'bet' | 'playing' | 'stand' | 'over'>('bet');
  const [message, setMessage] = useState('');

  const deal = () => {
    if (betAmount > balance.demoBalance) return;
    const newDeck = createDeck();
    setDeck(newDeck);
    setPlayerHand([newDeck.pop()!, newDeck.pop()!]);
    setDealerHand([newDeck.pop()!, newDeck.pop()!]);
    setGameState('playing');
    placeBet('blackjack', betAmount);
  };

  const hit = () => {
    const newDeck = [...deck];
    const newPlayer = [...playerHand, newDeck.pop()!];
    setPlayerHand(newPlayer);
    setDeck(newDeck);
    if (handValue(newPlayer) > 21) {
      setGameState('over');
      setMessage('Bust! Dealer wins.');
    }
  };

  const stand = () => {
    let dealer = [...dealerHand];
    let currentDeck = [...deck];
    while (handValue(dealer) < 17) {
      dealer.push(currentDeck.pop()!);
    }
    setDealerHand(dealer);
    setDeck(currentDeck);
    const playerVal = handValue(playerHand);
    const dealerVal = handValue(dealer);
    if (dealerVal > 21 || playerVal > dealerVal) {
      setMessage('You win!');
    } else if (playerVal === dealerVal) {
      setMessage('Push (tie).');
    } else {
      setMessage('Dealer wins.');
    }
    setGameState('over');
  };

  const renderCard = (card: Card, hidden = false) => (
    <div className={`w-16 h-24 rounded-xl border-2 flex flex-col items-center justify-center text-xl font-bold shadow-lg ${hidden ? 'bg-gradient-to-br from-blue-900 to-blue-700 border-blue-400' : 'bg-white text-black border-gray-300'}`}>
      {hidden ? '?' : <><div>{card.value}</div><div className="text-2xl">{card.suit}</div></>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-panel rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold gold-text mb-8 text-center">🃏 Blackjack</h2>
        
        <div className="mb-6 flex justify-center gap-4">
          <div className="text-center">
            <h3 className="text-white mb-2">Dealer ({gameState !== 'bet' ? handValue(dealerHand) : '?'})</h3>
            <div className="flex gap-2">
              {dealerHand.map((card, i) => (
                <motion.div key={i} initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}>
                  {renderCard(card, i === 1 && gameState === 'playing')}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <div className="text-center">
            <h3 className="text-white mb-2">Player ({handValue(playerHand)})</h3>
            <div className="flex gap-2">
              {playerHand.map((card, i) => (
                <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
                  {renderCard(card)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {message && <p className="text-center text-xl font-bold text-yellow-400 mb-4">{message}</p>}

        <div className="space-y-4">
          {gameState === 'bet' && (
            <>
              <div className="flex gap-2 justify-center">
                {[10,50,100,500].map(amt => (
                  <button key={amt} onClick={() => setBetAmount(amt)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${betAmount===amt ? 'btn-gold' : 'bg-white/5 text-gray-400'}`}>${amt}</button>
                ))}
              </div>
              <button onClick={deal} className="btn-primary w-full py-4 text-lg">Deal</button>
            </>
          )}
          {gameState === 'playing' && (
            <div className="flex gap-4 justify-center">
              <button onClick={hit} className="btn-primary px-8 py-3">Hit</button>
              <button onClick={stand} className="btn-gold px-8 py-3">Stand</button>
            </div>
          )}
          {gameState === 'over' && (
            <button onClick={() => { setGameState('bet'); setDealerHand([]); setPlayerHand([]); setMessage(''); }} className="btn-primary w-full py-3">Play Again</button>
          )}
        </div>
      </div>
    </div>
  );
}

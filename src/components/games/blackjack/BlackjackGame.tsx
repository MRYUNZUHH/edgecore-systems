"use client";
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

const suits = ['♠','♥','♦','♣'];
const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function createDeck() {
  return suits.flatMap(s => values.map(v => ({ suit: s, value: v, numeric: v==='A'?11:['J','Q','K'].includes(v)?10:parseInt(v)})))
    .sort(() => Math.random() - 0.5);
}

function handValue(hand: any[]) {
  let total = hand.reduce((s,c) => s + c.numeric, 0);
  let aces = hand.filter(c => c.value==='A').length;
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

export function BlackjackGame() {
  const { placeBet, balance } = useGameStore();
  const [bet, setBet] = useState(100);
  const [deck, setDeck] = useState(createDeck());
  const [player, setPlayer] = useState<any[]>([]);
  const [dealer, setDealer] = useState<any[]>([]);
  const [phase, setPhase] = useState<'bet'|'play'|'dealer'|'end'>('bet');
  const [msg, setMsg] = useState('');
  const [showRules, setShowRules] = useState(false);

  const deal = () => {
    if (bet > balance.demoBalance) return;
    const d = createDeck();
    setDeck(d);
    setPlayer([d.pop()!, d.pop()!]);
    setDealer([d.pop()!, d.pop()!]);
    setPhase('play');
    placeBet('blackjack', bet);
  };

  const hit = () => {
    const newPlayer = [...player, deck.pop()!];
    setPlayer(newPlayer);
    if (handValue(newPlayer) > 21) {
      setMsg('Bust!');
      setPhase('end');
    }
  };

  const stand = () => {
    let dealerHand = [...dealer];
    let currentDeck = [...deck];
    while (handValue(dealerHand) < 17) {
      dealerHand.push(currentDeck.pop()!);
    }
    setDealer(dealerHand);
    const pVal = handValue(player);
    const dVal = handValue(dealerHand);
    if (dVal > 21 || pVal > dVal) setMsg('You win!');
    else if (pVal === dVal) setMsg('Push');
    else setMsg('Dealer wins');
    setPhase('end');
  };

  const Card = ({ card, hidden }: {card?:any, hidden?:boolean}) => (
    <div className={`w-14 h-20 rounded-xl border-2 flex flex-col items-center justify-center text-lg font-bold ${hidden ? 'bg-blue-800 border-blue-400' : 'bg-white text-black'}`}>
      {hidden ? '?' : <><span>{card?.value}</span><span className="text-2xl">{card?.suit}</span></>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="glass-panel p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-black gold-text">🃏 Blackjack</h2>
          <button onClick={()=>setShowRules(true)} className="text-sm text-white/60 hover:text-white">How to Play</button>
        </div>
        <div className="flex justify-center gap-8 mb-6">
          <div>
            <h3 className="text-white mb-2">Dealer ({phase!=='bet' ? handValue(dealer) : '?'})</h3>
            <div className="flex gap-2">
              {dealer.map((c,i) => <Card key={i} card={c} hidden={i===1 && phase==='play'} />)}
            </div>
          </div>
          <div>
            <h3 className="text-white mb-2">You ({handValue(player)})</h3>
            <div className="flex gap-2">
              {player.map((c,i) => <Card key={i} card={c} />)}
            </div>
          </div>
        </div>
        {msg && <p className="text-center text-xl font-bold text-yellow-400 mb-4">{msg}</p>}
        <div className="space-y-4">
          {phase==='bet' && (
            <>
              <div className="flex gap-2 justify-center">
                {[10,50,100,500].map(a=><button key={a} onClick={()=>setBet(a)} className={`px-4 py-2 rounded-xl ${bet===a?'btn-gold':'bg-white/10 text-white'}`}>${a}</button>)}
              </div>
              <button onClick={deal} className="btn-primary w-full py-4">Deal</button>
            </>
          )}
          {phase==='play' && (
            <div className="flex gap-4">
              <button onClick={hit} className="btn-primary flex-1">Hit</button>
              <button onClick={stand} className="btn-gold flex-1">Stand</button>
            </div>
          )}
          {phase==='end' && <button onClick={()=>{setPhase('bet');setPlayer([]);setDealer([]);setMsg('')}} className="btn-primary w-full">Play Again</button>}
        </div>
      </div>
      <RuleModal isOpen={showRules} onClose={()=>setShowRules(false)} title="Blackjack Rules">
        <p>Get closer to 21 than the dealer without going over. Face cards are 10, Aces are 1 or 11. Dealer stands on 17.</p>
      </RuleModal>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const events = [
  { id:1, home:'Real Madrid', away:'Barcelona', odds:{home:2.10, draw:3.50, away:3.20} },
  { id:2, home:'Lakers', away:'Celtics', odds:{home:1.80, away:2.00} },
  { id:3, home:'Nadal', away:'Djokovic', odds:{home:2.50, away:1.55} },
];

export default function SportsbookPage() {
  const [bets, setBets] = useState<any[]>([]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-black gold-text mb-8">🏆 Sportsbook</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(e => (
          <div key={e.id} className="glass-panel p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <h3 className="text-2xl font-bold text-white mb-4">{e.home} vs {e.away}</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(e.odds).map(([outcome, odds]) => (
                <button key={outcome} onClick={()=>setBets([...bets, {id:Date.now(), event:e.home+' vs '+e.away, outcome, odds}])}
                  className="bg-white/10 hover:bg-gold-400 hover:text-black text-white rounded-xl p-3 font-bold transition">
                  {outcome} @ {odds}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 glass-panel p-4">
        <h3 className="text-xl font-bold text-white mb-2">Betslip</h3>
        {bets.map(b => <div key={b.id} className="flex justify-between text-sm py-1"><span>{b.event} - {b.outcome}</span><span className="text-gold-400">@{b.odds}</span></div>)}
      </div>
    </div>
  );
}

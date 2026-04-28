'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const events = [
  { id: 1, home: 'Real Madrid', away: 'Barcelona', odds: { home: 2.10, draw: 3.50, away: 3.20 } },
  { id: 2, home: 'Lakers', away: 'Celtics', odds: { home: 1.80, away: 2.00 } },
  { id: 3, home: 'Nadal', away: 'Djokovic', odds: { home: 2.50, away: 1.55 } },
];

export default function SportsbookPage() {
  const [bets, setBets] = useState<any[]>([]);

  const placeSportsBet = (eventId: number, outcome: string, odds: number) => {
    const newBet = { id: Date.now(), eventId, outcome, odds, stake: 100 };
    setBets([...bets, newBet]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-heading font-bold gold-text mb-8">🏆 Sportsbook</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">{event.home} vs {event.away}</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(event.odds).map(([outcome, odds]) => (
                <button
                  key={outcome}
                  onClick={() => placeSportsBet(event.id, outcome, odds as number)}
                  className="bg-white/5 hover:bg-gold-400 hover:text-black text-white rounded-xl p-3 transition font-semibold"
                >
                  {outcome.toUpperCase()}: {odds}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Your Betslip</h3>
        <div className="glass-panel rounded-2xl p-4">
          {bets.length === 0 && <p className="text-gray-400">No bets placed yet.</p>}
          {bets.map(bet => (
            <div key={bet.id} className="flex justify-between py-2 text-sm">
              <span className="text-white">{events.find(e=>e.id===bet.eventId)?.home} vs {events.find(e=>e.id===bet.eventId)?.away} - {bet.outcome}</span>
              <span className="text-gold-400">@{bet.odds}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

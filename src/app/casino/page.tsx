"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import { useRouter } from "next/navigation";

const GAMES = [
  { id:'aviator', name:'Aviator', category:'crash', volatility:'high', rtp:97.0, emoji:'✈️' },
  { id:'crash', name:'Crash', category:'crash', volatility:'high', rtp:97.0, emoji:'📈' },
  { id:'mines', name:'Mines', category:'crash', volatility:'medium', rtp:95.0, emoji:'💣' },
  { id:'blackjack-pro', name:'Blackjack Pro', category:'table', volatility:'low', rtp:99.5, emoji:'🃏' },
  { id:'roulette', name:'Roulette', category:'table', volatility:'medium', rtp:97.3, emoji:'🎡' },
  { id:'starburst', name:'Starburst', category:'slots', volatility:'low', rtp:96.1, emoji:'⭐' },
  { id:'baccarat', name:'Baccarat', category:'table', volatility:'low', rtp:98.9, emoji:'🎴' },
  { id:'plinko', name:'Plinko', category:'crash', volatility:'low', rtp:96.5, emoji:'🟡' },
];

export default function CasinoPage() {
  const { isLoggedIn, getBalance } = useStore();
  const router = useRouter();
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = GAMES.filter(g => {
    if (activeCat !== 'all' && g.category !== activeCat) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handlePlay = (gameId: string) => {
    if (!isLoggedIn) { router.push('/auth/login'); return; }
    if (getBalance() <= 0) { router.push('/wallet'); return; }
    // Place a demo bet
    const { useStore: store } = require('@/store/game-store');
    store.getState().placeBet(gameId, 10);
    alert(`Playing ${gameId}! $10 bet placed. Check Wallet for results.`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">🎮 Casino Lobby</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4 space-y-3">
        <input placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-2" />
        <div className="flex gap-2 overflow-x-auto">
          {['all','slots','table','crash','live'].map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${activeCat===c?'bg-[#f5c842] text-black':'bg-white/5 text-white/70'}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(game => (
          <div key={game.id} onClick={() => handlePlay(game.id)}
            className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-5 cursor-pointer hover:border-[#f5c842]/30 transition">
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h3 className="text-white font-bold">{game.name}</h3>
            <div className="flex justify-between text-[10px] text-[#5a6a85] mt-2">
              <span>RTP {game.rtp}%</span>
              <span className="capitalize">{game.volatility}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
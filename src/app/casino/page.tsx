"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const { isLoggedIn, getBalanceDollars } = useStore();
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
    router.push(`/casino?play=${gameId}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">🎮 Casino Lobby</h1>
      <div className="card p-4 space-y-3">
        <input placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)} className="input" />
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {['all','slots','table','crash','live'].map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${activeCat===c?'bg-[#f5c842] text-black':'bg-white/5 text-white/70'}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(game => (
          <motion.div key={game.id} whileHover={{ scale:1.03 }}
            onClick={() => handlePlay(game.id)}
            className="card p-5 cursor-pointer">
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h3 className="text-white font-bold">{game.name}</h3>
            <div className="flex justify-between text-[10px] text-[#5a6a85] mt-2">
              <span>RTP {game.rtp}%</span>
              <span className="capitalize">{game.volatility}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
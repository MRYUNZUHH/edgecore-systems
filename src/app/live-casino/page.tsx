"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const liveTables = [
  { id: 1, game: "Blackjack", dealer: "Sophia", players: 142, min: 10, max: 5000, img: "🃏", color: "from-blue-600 to-indigo-600" },
  { id: 2, game: "Roulette", dealer: "Marco", players: 237, min: 5, max: 3000, img: "🎡", color: "from-red-600 to-orange-600" },
  { id: 3, game: "Baccarat", dealer: "Ling", players: 89, min: 25, max: 10000, img: "🎴", color: "from-purple-600 to-pink-600" },
  { id: 4, game: "Poker", dealer: "Alex", players: 176, min: 50, max: 25000, img: "♠️", color: "from-green-600 to-emerald-600" },
  { id: 5, game: "Dragon Tiger", dealer: "Mei", players: 64, min: 10, max: 5000, img: "🐉", color: "from-yellow-600 to-amber-600" },
  { id: 6, game: "Sic Bo", dealer: "Chen", players: 43, min: 5, max: 2000, img: "🎯", color: "from-pink-600 to-rose-600" },
];

export default function LiveCasinoPage() {
  const [activePlayers, setActivePlayers] = useState(0);
  const [recentWins, setRecentWins] = useState<string[]>([]);

  useEffect(() => {
    setActivePlayers(liveTables.reduce((s, t) => s + t.players, 0));
    const wins = ["Sophia's Table +$4,200", "Marco's Roulette +$12,800", "Alex's Poker +$8,500", "Ling's Baccarat +$3,900"];
    setRecentWins(wins);
    const interval = setInterval(() => {
      setRecentWins(w => [wins[Math.floor(Math.random()*wins.length)], ...w].slice(0,4));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold gold-text">🔴 Live Casino</h1>
          <p className="text-white/50 text-sm mt-1">{activePlayers} players at live tables right now</p>
        </div>
        <div className="flex items-center gap-2 cyber-glass rounded-full px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-white/70">24/7 Live Dealers</span>
        </div>
      </div>

      {/* Live wins ticker */}
      <div className="cyber-glass rounded-2xl p-4 overflow-hidden">
        <div className="flex items-center gap-4 animate-marquee">
          {recentWins.map((win, i) => (
            <span key={i} className="text-neon-400 font-bold text-sm whitespace-nowrap">{win}</span>
          ))}
        </div>
      </div>

      {/* Live tables grid — asymmetrical cinematic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {liveTables.map((table, i) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(168,85,247,0.2)" }}
            className="card-cinema p-6 cursor-pointer group"
          >
            {/* Live indicator */}
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-1.5 text-xs text-red-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
              </span>
              <span className="text-xs text-white/40">{table.players} playing</span>
            </div>

            {/* Game image area */}
            <div className={`w-full h-40 rounded-xl bg-gradient-to-br ${table.color} flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform`}>
              {table.img}
            </div>

            {/* Table info */}
            <h3 className="text-white font-bold text-xl mb-1">{table.game}</h3>
            <p className="text-white/40 text-sm mb-3">Dealer: {table.dealer}</p>

            {/* Betting range */}
            <div className="flex items-center justify-between text-xs text-white/30">
              <span>${table.min} - ${table.max}</span>
              <button className="btn-neon text-xs px-4 py-1.5">Join Table</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
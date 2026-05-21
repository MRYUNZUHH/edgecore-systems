"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const names = ["CryptoKing", "LuckySpin", "DiamondHands", "NeonNinja", "JackpotJack", "AceHigh", "SlotSiren", "CrashQueen"];

export default function RightPanel() {
  const [bets, setBets] = useState<any[]>([]);

  useEffect(() => {
    const gen = () => ({
      player: names[Math.floor(Math.random() * names.length)],
      game: ["Dice", "Crash", "Roulette", "Plinko", "Blackjack", "Aviator"][Math.floor(Math.random() * 6)],
      amount: Math.floor(Math.random() * 500) + 10,
      win: Math.random() > 0.8,
      multiplier: (Math.random() * 5 + 1).toFixed(2),
    });
    setBets(Array.from({ length: 6 }, gen));
    const interval = setInterval(() => setBets(prev => [gen(), ...prev].slice(0, 10)), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden xl:flex flex-col w-72 bg-navy-950 border-l border-white/10">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-400" />
          </span>
          Live Wins
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 hide-scrollbar">
        {bets.map((bet, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between py-2 text-xs border-b border-white/5 last:border-0">
            <span className="text-gray-400">{bet.player}</span>
            <span className="text-white/80">{bet.game}</span>
            <span className={bet.win ? "text-neon-400 font-semibold" : "text-rose-500"}>
              {bet.win ? `+$${(bet.amount * bet.multiplier).toFixed(0)}` : `-$${bet.amount}`}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-500 text-center">Real-time activity feed</div>
      </div>
    </aside>
  );
}
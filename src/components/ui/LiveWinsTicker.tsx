"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const names = ["JD", "MK", "AL", "CR", "NP", "SW", "BT", "KM"];

export default function LiveWinsTicker() {
  const [wins, setWins] = useState<{ id: number; player: string; game: string; amount: string }[]>([]);

  useEffect(() => {
    const generate = () => ({
      id: Date.now(),
      player: names[Math.floor(Math.random() * names.length)],
      game: ["Gates of Olympus", "Aviator", "Blackjack", "Roulette", "Crash"][Math.floor(Math.random() * 5)],
      amount: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.floor(Math.random() * 5000) + 100),
    });
    
    setWins(Array.from({ length: 5 }, generate));
    const interval = setInterval(() => setWins(prev => [generate(), ...prev].slice(0, 10)), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0D0F1A] border border-[#E6B84F]/20 rounded-xl p-4">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Live Wins
      </h3>
      <div className="space-y-1 max-h-48 overflow-y-auto hide-scrollbar">
        <AnimatePresence>
          {wins.map((win) => (
            <motion.div key={win.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between py-1.5 text-xs">
              <span className="w-8 h-8 rounded-full bg-[#E6B84F]/20 text-[#E6B84F] flex items-center justify-center font-bold">{win.player}</span>
              <span className="text-white/70">{win.game}</span>
              <span className="text-green-400 font-bold">{win.amount}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
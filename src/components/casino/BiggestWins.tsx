"use client";
import { useBiggestWins } from "@/hooks/useLiveData";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function BiggestWins() {
  const wins = useBiggestWins();
  return (
    <div className="glass-panel p-4">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-gold-400" />
        Biggest Wins Today
      </h3>
      <div className="space-y-2">
        {wins.map((win, i) => (
          <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
            className="flex items-center justify-between py-1.5 text-xs border-b border-white/5 last:border-0">
            <span className="text-gray-400">{win.player}</span>
            <span className="text-white/70">{win.game}</span>
            <span className="text-gold-400 font-bold">${win.amount.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
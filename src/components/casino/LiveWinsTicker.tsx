"use client";
import { useLiveFeed } from "@/hooks/useLiveData";
import { motion } from "framer-motion";

export default function LiveWinsTicker() {
  const feed = useLiveFeed();
  return (
    <div className="bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-purple-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-400" />
        </span>
        Live Wins
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto hide-scrollbar">
        {feed.map((item, i) => (
          <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.05 }}
            className="flex items-center justify-between py-1.5 text-xs border-b border-white/5 last:border-0">
            <span className="text-gray-400">{item.player}</span>
            <span className="text-white/80">{item.game}</span>
            <span className={item.win ? "text-neon-400 font-semibold" : "text-rose-500"}>
              {item.win ? `+$${(item.amount*item.multiplier).toFixed(0)}` : `-$${item.amount}`}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
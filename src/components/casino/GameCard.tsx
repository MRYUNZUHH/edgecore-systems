"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function GameCard({ game }: { game: any }) {
  return (
    <motion.div whileHover={{ scale:1.03, boxShadow:"0 0 30px rgba(212,175,55,0.4)" }} whileTap={{ scale:0.97 }}
      className="glass-card rounded-xl p-4 cursor-pointer relative overflow-hidden group">
      <div className="text-5xl mb-2">🎮</div>
      <h3 className="text-white font-bold text-lg">{game.title}</h3>
      <div className="flex justify-between text-xs mt-2 text-white/60">
        <span>RTP: {game.rtp}%</span>
        <span className="capitalize">{game.volatility}</span>
      </div>
      <Link href={`/casino/${game.id}`} className="absolute inset-0 opacity-0" />
    </motion.div>
  );
}
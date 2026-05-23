"use client";
import { motion } from "framer-motion";

const tables = [
  { id:1, game:"Blackjack", dealer:"Sophia", players:142, min:10, max:5000, emoji:"🃏" },
  { id:2, game:"Roulette", dealer:"Marco", players:237, min:5, max:3000, emoji:"🎡" },
  { id:3, game:"Baccarat", dealer:"Ling", players:89, min:25, max:10000, emoji:"🎴" },
  { id:4, game:"Poker", dealer:"Alex", players:176, min:50, max:25000, emoji:"♠️" },
  { id:5, game:"Dragon Tiger", dealer:"Mei", players:64, min:10, max:5000, emoji:"🐉" },
];

export default function LiveCasinoPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">🔴 Live Casino</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map(table => (
          <motion.div key={table.id} whileHover={{ scale:1.03 }} className="card p-6 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-live">LIVE</span>
              <span className="text-xs text-[#5a6a85]">{table.players} playing</span>
            </div>
            <div className="text-5xl mb-3">{table.emoji}</div>
            <h3 className="text-white font-heading font-bold text-xl">{table.game}</h3>
            <p className="text-[#5a6a85] text-sm">Dealer: {table.dealer}</p>
            <p className="text-[#5a6a85] text-xs mt-2">${table.min} - ${table.max}</p>
            <button className="mt-3 w-full py-2 bg-[#f5c842] text-black font-bold rounded-lg text-sm">Join Table</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
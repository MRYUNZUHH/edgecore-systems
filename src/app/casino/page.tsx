"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["All Games", "Slots", "Table Games", "Crash Games", "Live Casino", "New"];
const games = [
  { title: "Starburst", category: "Slots", rtp: 96.1, volatility: "Low", image: "⭐" },
  { title: "Book of Dead", category: "Slots", rtp: 94.2, volatility: "High", image: "📖" },
  { title: "Blackjack", category: "Table Games", rtp: 99.5, volatility: "Low", image: "🃏" },
  { title: "European Roulette", category: "Table Games", rtp: 97.3, volatility: "Medium", image: "🎡" },
  { title: "Aviator", category: "Crash Games", rtp: 97.0, volatility: "High", image: "✈️" },
  { title: "Crash", category: "Crash Games", rtp: 97.0, volatility: "High", image: "📈" },
  { title: "Mines", category: "Crash Games", rtp: 95.0, volatility: "Medium", image: "💣" },
  { title: "Plinko", category: "Crash Games", rtp: 96.5, volatility: "Low", image: "🟡" },
  { title: "Live Blackjack", category: "Live Casino", rtp: 99.4, volatility: "Low", image: "🎥" },
  { title: "Live Roulette", category: "Live Casino", rtp: 97.3, volatility: "Medium", image: "🎥" },
  { title: "Dragon Tiger", category: "Table Games", rtp: 96.9, volatility: "Medium", image: "🐉" },
  { title: "Baccarat", category: "Table Games", rtp: 98.9, volatility: "Low", image: "🎴" },
];

export default function CasinoPage() {
  const [activeTab, setActiveTab] = useState("All Games");
  const [search, setSearch] = useState("");

  const filtered = games.filter(g => {
    if (activeTab !== "All Games" && g.category !== activeTab) return false;
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">Casino</h1>
      
      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeTab === tab ? "btn-gold" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
              {tab}
            </button>
          ))}
        </div>
        <input placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 w-full sm:w-64" />
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map(game => (
          <motion.div key={game.title} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="glass-card rounded-2xl p-4 cursor-pointer group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{game.image}</div>
            <h3 className="text-white font-bold text-sm mb-1">{game.title}</h3>
            <div className="flex justify-between text-xs text-gray-400">
              <span>RTP {game.rtp}%</span>
              <span>{game.volatility}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
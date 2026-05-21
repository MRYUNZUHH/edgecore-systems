"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["All","Slots","Table Games","Crash Games","Live Casino","New"];
const volatilities = ["All","Low","Medium","High"];
const rtpRanges = ["All","95%+","96%+","97%+","98%+"];

const allGames = [
  { title:"Starburst", cat:"Slots", rtp:96.1, vol:"Low", img:"⭐", hot:true },
  { title:"Book of Dead", cat:"Slots", rtp:94.2, vol:"High", img:"📖" },
  { title:"Blackjack Pro", cat:"Table Games", rtp:99.5, vol:"Low", img:"🃏", new:true },
  { title:"European Roulette", cat:"Table Games", rtp:97.3, vol:"Medium", img:"🎡" },
  { title:"Aviator", cat:"Crash Games", rtp:97.0, vol:"High", img:"✈️", hot:true },
  { title:"Crash", cat:"Crash Games", rtp:97.0, vol:"High", img:"📈", hot:true },
  { title:"Mines", cat:"Crash Games", rtp:95.0, vol:"Medium", img:"💣" },
  { title:"Plinko", cat:"Crash Games", rtp:96.5, vol:"Low", img:"🟡" },
  { title:"Live Blackjack", cat:"Live Casino", rtp:99.4, vol:"Low", img:"🎥" },
  { title:"Live Roulette", cat:"Live Casino", rtp:97.3, vol:"Medium", img:"🎥", new:true },
  { title:"Dragon Tiger", cat:"Table Games", rtp:96.9, vol:"Medium", img:"🐉" },
  { title:"Baccarat", cat:"Table Games", rtp:98.9, vol:"Low", img:"🎴" },
];

export default function CasinoPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [activeVol, setActiveVol] = useState("All");
  const [activeRTP, setActiveRTP] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allGames.filter(g => {
    if (activeCat !== "All" && g.cat !== activeCat) return false;
    if (activeVol !== "All" && g.vol !== activeVol) return false;
    if (activeRTP === "95%+" && g.rtp < 95) return false;
    if (activeRTP === "96%+" && g.rtp < 96) return false;
    if (activeRTP === "97%+" && g.rtp < 97) return false;
    if (activeRTP === "98%+" && g.rtp < 98) return false;
    if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">🎮 Casino Lobby</h1>

      {/* Filters */}
      <div className="glass-panel p-4 space-y-4">
        {/* Search */}
        <input placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400" />

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${activeCat===cat?"btn-gold":"bg-white/5 text-gray-400 hover:bg-white/10"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Volatility + RTP filters */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Volatility:</span>
            {volatilities.map(v => (
              <button key={v} onClick={() => setActiveVol(v)}
                className={`px-3 py-1 rounded-full transition ${activeVol===v?"bg-neon-400/20 text-neon-400":"text-gray-500 hover:text-white"}`}>{v}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">RTP:</span>
            {rtpRanges.map(r => (
              <button key={r} onClick={() => setActiveRTP(r)}
                className={`px-3 py-1 rounded-full transition ${activeRTP===r?"bg-neon-400/20 text-neon-400":"text-gray-500 hover:text-white"}`}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filtered.map(game => (
          <motion.div key={game.title} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
            className="glass-card rounded-2xl p-4 cursor-pointer group relative">
            {game.hot && <span className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>}
            {game.new && <span className="absolute top-2 right-2 bg-neon-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{game.img}</div>
            <h3 className="text-white font-bold text-sm mb-1">{game.title}</h3>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>RTP {game.rtp}%</span>
              <span>{game.vol}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
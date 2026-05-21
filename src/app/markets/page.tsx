"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, BarChart3, Clock } from "lucide-react";
import Link from "next/link";

const categories = ["All", "sports", "crypto", "politics", "entertainment", "tech", "finance"];

export default function MarketsPage() {
  const [markets, setMarkets] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState("All");
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalTraders, setTotalTraders] = useState(0);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const url = activeCat === "All" 
          ? "/api/predictions/markets" 
          : `/api/predictions/markets?category=${activeCat}`;
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        setMarkets(Array.isArray(data) ? data : []);
        setTotalVolume(data.reduce((s: number, m: any) => s + m.volume, 0));
        setTotalTraders(data.reduce((s: number, m: any) => s + m.traders, 0));
      } catch (err) {
        console.error("Failed to fetch markets:", err);
      }
    };
    
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 3000);
    return () => clearInterval(interval);
  }, [activeCat]);

  const formatVolume = (v: number) => v > 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold gold-text">Prediction Markets</h1>
          <p className="text-gray-400 text-sm mt-1">Trade on real-world event outcomes</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-400">Volume</p>
            <p className="text-white font-bold">{formatVolume(totalVolume)}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Traders</p>
            <p className="text-white font-bold">{totalTraders.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition capitalize ${activeCat === cat ? "btn-gold" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {markets.map((market: any) => (
            <motion.div key={market.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass-card p-5 rounded-2xl space-y-4 cursor-pointer hover:border-gold-400/50 transition">
              {/* Category badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full capitalize">{market.category}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.ceil((market.expiry - Date.now()) / 86400000)}d left
                </span>
              </div>

              {/* Question */}
              <h3 className="text-white font-bold text-lg leading-tight">{market.question}</h3>

              {/* Price bars */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neon-400 font-bold">YES {market.yesPrice}¢</span>
                  <span className="text-rose-400 font-bold">{market.noPrice}¢ NO</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neon-400 to-green-500 rounded-full"
                    animate={{ width: `${market.yesPrice}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  Vol {formatVolume(market.volume)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {market.traders.toLocaleString()} traders
                </span>
              </div>

              {/* Trade buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 bg-neon-400/10 text-neon-400 rounded-lg font-bold text-sm hover:bg-neon-400/20 transition">
                  Buy YES {market.yesPrice}¢
                </button>
                <button className="py-2 bg-rose-400/10 text-rose-400 rounded-lg font-bold text-sm hover:bg-rose-400/20 transition">
                  Buy NO {market.noPrice}¢
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
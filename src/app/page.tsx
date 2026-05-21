"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp, Users, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  const { isLoggedIn } = useGameStore();
  const router = useRouter();
  const [trendingMarkets, setTrendingMarkets] = useState<any[]>([]);
  
  useEffect(() => {
    if (!isLoggedIn) { router.push("/auth/login"); return; }
    
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/predictions/trending", { cache: "no-store" });
        const data = await res.json();
        setTrendingMarkets(data.slice(0, 4));
      } catch {}
    };
    fetchTrending();
    const interval = setInterval(fetchTrending, 5000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-8 lg:p-12 shadow-2xl">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            <span className="gold-text">EdgeCore</span> Predictions
          </h1>
          <p className="text-white/80 mt-4 text-lg">Trade on the outcome of real-world events. Sports, crypto, politics, and more.</p>
          <Link href="/markets" className="inline-flex items-center gap-2 mt-6 btn-primary text-lg px-8 py-3">
            Explore Markets <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 text-[180px] opacity-10">📊</div>
      </motion.div>

      {/* Trending Markets */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-gold-400" />
          Trending Markets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingMarkets.map((market: any) => (
            <motion.div key={market.id} whileHover={{ scale:1.02 }}
              className="glass-card p-4 rounded-2xl space-y-3 cursor-pointer">
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full capitalize">{market.category}</span>
              <h3 className="text-white font-bold text-sm">{market.question}</h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neon-400 font-bold">YES {market.yesPrice}¢</span>
                <span className="text-gray-400">Vol ${(market.volume/1000).toFixed(0)}K</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link href="/casino" className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 hover:scale-105 transition">
          <h3 className="text-white font-bold">🎰 Casino</h3>
          <p className="text-white/60 text-xs mt-1">Slots & Table Games</p>
        </Link>
        <Link href="/markets" className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-4 hover:scale-105 transition">
          <h3 className="text-white font-bold">📊 Markets</h3>
          <p className="text-white/60 text-xs mt-1">Prediction Trading</p>
        </Link>
        <Link href="/live-casino" className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-4 hover:scale-105 transition">
          <h3 className="text-white font-bold">🎥 Live Casino</h3>
          <p className="text-white/60 text-xs mt-1">Real Dealers</p>
        </Link>
        <Link href="/virtual" className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-4 hover:scale-105 transition">
          <h3 className="text-white font-bold">🐎 Virtuals</h3>
          <p className="text-white/60 text-xs mt-1">Virtual Racing</p>
        </Link>
      </div>
    </div>
  );
}
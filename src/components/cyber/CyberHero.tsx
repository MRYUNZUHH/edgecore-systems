"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import CountUp from "react-countup";

const floatingAssets = [
  { emoji: "💎", size: "text-6xl", delay: 0 },
  { emoji: "👑", size: "text-5xl", delay: 1 },
  { emoji: "🎰", size: "text-7xl", delay: 2 },
  { emoji: "💰", size: "text-4xl", delay: 0.5 },
  { emoji: "🚀", size: "text-5xl", delay: 1.5 },
  { emoji: "⭐", size: "text-6xl", delay: 3 },
  { emoji: "🃏", size: "text-4xl", delay: 2.5 },
  { emoji: "🎲", size: "text-5xl", delay: 0.8 },
];

export default function CyberHero() {
  const [jackpot, setJackpot] = useState(427500);
  const [players, setPlayers] = useState(3847);
  const [recentWins, setRecentWins] = useState<string[]>([]);

  useEffect(() => {
    const jp = setInterval(() => setJackpot(p => p + Math.floor(Math.random() * 200)), 1500);
    const pl = setInterval(() => setPlayers(p => p + Math.floor(Math.random() * 5 - 2)), 3000);
    const wins = ["CryptoKing +$2,450", "NeonNinja +$8,900", "DiamondHands +$15,200", "LuckySpin +$3,100"];
    const rw = setInterval(() => setRecentWins(w => [wins[Math.floor(Math.random()*wins.length)], ...w].slice(0,5)), 4000);
    setRecentWins(wins);
    return () => { clearInterval(jp); clearInterval(pl); clearInterval(rw); };
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Deep cosmic background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(0,255,136,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.06),transparent_30%)]" />
      
      {/* Floating casino assets — asymmetric, chaotic */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingAssets.map((asset, i) => (
          <motion.div
            key={i}
            className={`absolute ${asset.size} opacity-30`}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -60, 20, -40, 0],
              x: [0, 30, -20, 10, 0],
              rotate: [0, 15, -10, 5, 0],
              scale: [1, 1.3, 0.9, 1.1, 1],
              opacity: [0.2, 0.4, 0.15, 0.35, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: asset.delay,
              ease: "easeInOut",
            }}
          >
            {asset.emoji}
          </motion.div>
        ))}
      </div>

      {/* Light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-purple-500/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-neon-400/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Main content — asymmetrical layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left: Main headline */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300 mb-6">
                ⚡ LIVE JACKPOT: $<CountUp end={jackpot} duration={2} separator="," />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-none"
            >
              <span className="gold-text">EDGECORE</span>
              <br />
              <span className="text-white/90">CASINO</span>
              <br />
              <span className="purple-text text-3xl md:text-4xl">UNIVERSE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-white/50 max-w-md"
            >
              Enter a futuristic gambling dimension. Live dealers. Prediction markets. Instant wins.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/casino" className="btn-neon text-lg">
                🎰 Enter Casino
              </Link>
              <Link href="/predictions" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition">
                📊 Predictions
              </Link>
              <Link href="/live-casino" className="px-8 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-bold rounded-xl hover:bg-red-500/20 transition animate-pulse-neon">
                🔴 Live Casino
              </Link>
            </motion.div>
          </div>

          {/* Right: Live activity feed — tall, narrow, asymmetrical */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="cyber-glass rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-400" />
                </span>
                <h3 className="text-sm font-bold text-white">Live Activity</h3>
              </div>
              
              <div className="space-y-2">
                {recentWins.map((win, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm"
                  >
                    <span className="text-white/60">{win.split(' ')[0]}</span>
                    <span className="text-neon-400 font-bold">{win.split(' ')[1]}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-white/30 pt-2">
                <span><CountUp end={players} duration={2} /> players online</span>
                <span>$2.4M won today</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
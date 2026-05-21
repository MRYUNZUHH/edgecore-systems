"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import CountUp from "react-countup";
import Link from "next/link";

const floatingIcons = ["🎰","🎲","💰","💎","👑","🪙","♠️","♦️","🎯","🚀"];

export default function CinematicHero() {
  const [jackpot, setJackpot] = useState(34200);
  const [activePlayers, setActivePlayers] = useState(2458);

  useEffect(() => {
    const jpInterval = setInterval(() => setJackpot(prev => prev + Math.floor(Math.random() * 50)), 2000);
    const apInterval = setInterval(() => setActivePlayers(prev => prev + Math.floor(Math.random() * 3 - 1)), 5000);
    return () => { clearInterval(jpInterval); clearInterval(apInterval); };
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-purple-950 via-indigo-950 to-navy-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gold-400/10 via-transparent to-transparent" />
      </div>

      {/* Floating casino icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gray-300">Trusted by 50,000+ Players</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
            <Sparkles className="w-4 h-4 text-neon-400" />
            <span className="text-xs text-gray-300">$10M+ Demo Wins Today</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6"
        >
          <span className="gold-text">EdgeCore</span>
          <br />
          <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Premium Casino
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Experience world-class gaming with cinematic visuals, live action, and premium rewards.
        </motion.p>

        {/* Jackpot ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel inline-flex items-center gap-4 px-6 py-3 mb-8"
        >
          <span className="text-sm text-gray-400">🔥 Live Jackpot</span>
          <span className="text-2xl font-black gold-text">
            $<CountUp end={jackpot} duration={2} separator="," />
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/casino"
            className="btn-primary text-lg px-8 py-4 font-bold rounded-2xl flex items-center justify-center gap-2 group">
            Play Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/promotions"
            className="btn-outline text-lg px-8 py-4 font-bold rounded-2xl flex items-center justify-center gap-2">
            View Promotions
          </Link>
        </motion.div>

        {/* Live stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
            <CountUp end={activePlayers} duration={3} /> Players Online
          </div>
          <div>|</div>
          <div>24/7 Support</div>
          <div>|</div>
          <div>Instant Demo Credits</div>
        </motion.div>
      </div>
    </div>
  );
}
"use client";
import { useStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CountUp from "react-countup";

const games = [
  { id:'aviator', name:'Aviator', emoji:'✈️', color:'from-purple-900 to-fuchsia-900', players:12847, hot:true },
  { id:'crash', name:'Crash', emoji:'📈', color:'from-green-900 to-emerald-900', players:8942 },
  { id:'mines', name:'Mines', emoji:'💣', color:'from-amber-900 to-orange-900', players:4521 },
  { id:'blackjack-pro', name:'Blackjack', emoji:'🃏', color:'from-blue-900 to-indigo-900', players:6234 },
  { id:'roulette', name:'Roulette', emoji:'🎡', color:'from-red-900 to-rose-900', players:7890 },
  { id:'starburst', name:'Starburst', emoji:'⭐', color:'from-cyan-900 to-teal-900', players:10234 },
]

export default function Home() {
  const { isLoggedIn, user } = useStore()
  const router = useRouter()
  const [jackpot, setJackpot] = useState(800000 + Math.random() * 700000)
  const [players, setPlayers] = useState(47231)

  useEffect(() => {
    if (!isLoggedIn) { router.push('/auth/login'); return }
    const jp = setInterval(() => setJackpot(p => p + Math.random() * 0.35 + 0.02), 180)
    const pl = setInterval(() => setPlayers(p => p + Math.floor(Math.random() * 3 - 1)), 5000)
    return () => { clearInterval(jp); clearInterval(pl) }
  }, [isLoggedIn])

  if (!isLoggedIn) return null

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a0a3e] to-[#0a0a1a] p-8 lg:p-12 border border-[#ffffff0f]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f5c842]/10 border border-[#f5c842]/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f5c842] animate-pulse" />
              <span className="text-sm text-[#f5c842]">LIVE JACKPOT</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-black text-white leading-tight mb-2">THE EDGE IS</h1>
            <h1 className="text-5xl lg:text-6xl font-heading font-black text-[#f5c842] leading-tight mb-6">YOURS TO TAKE.</h1>
            <p className="text-[#5a6a85] text-lg mb-2">Join {players.toLocaleString()}+ players winning big.</p>
            <p className="font-display text-4xl text-white mb-8">$<CountUp end={jackpot} duration={2} decimals={2} separator="," /></p>
            <div className="flex gap-3">
              <Link href="/casino" className="btn-primary text-lg px-8 py-4">🎮 PLAY NOW</Link>
              <Link href="/wallet" className="px-8 py-4 border border-[#f5c842]/30 text-[#f5c842] font-heading font-bold rounded-lg hover:bg-[#f5c842]/10 transition">💰 DEPOSIT</Link>
            </div>
          </div>
          <div className="text-[200px] opacity-10 select-none">🎰</div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-6 overflow-x-auto hide-scrollbar text-sm text-[#5a6a85]">
        <span>🟢 {players.toLocaleString()} Online</span>
        <span>💰 $2,841,009 Paid Today</span>
        <span>🏆 12,847 Winners Today</span>
        <span>⚡ 0.3s Avg Cashout</span>
      </div>

      {/* Featured Games */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-white mb-4">Featured Games</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {games.map(game => (
            <motion.div key={game.id} whileHover={{ scale:1.03, boxShadow:'0 0 30px rgba(245,200,66,0.2)' }}
              onClick={() => router.push(`/casino?play=${game.id}`)}
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-5 cursor-pointer relative overflow-hidden`}>
              {game.hot && <span className="absolute top-2 right-2 bg-[#ef4444] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>}
              <div className="text-4xl mb-3">{game.emoji}</div>
              <h3 className="font-heading text-white font-bold text-lg">{game.name}</h3>
              <p className="text-white/50 text-xs mt-1">{game.players.toLocaleString()} playing</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
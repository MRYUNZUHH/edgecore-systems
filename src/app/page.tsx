"use client";
import { useStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CountUp from "react-countup";

const games = [
  { id:'aviator', name:'Aviator', emoji:'✈️', color:'from-purple-900 to-fuchsia-900', players:12847 },
  { id:'crash', name:'Crash', emoji:'📈', color:'from-green-900 to-emerald-900', players:8942 },
  { id:'mines', name:'Mines', emoji:'💣', color:'from-amber-900 to-orange-900', players:4521 },
  { id:'blackjack-pro', name:'Blackjack', emoji:'🃏', color:'from-blue-900 to-indigo-900', players:6234 },
  { id:'roulette', name:'Roulette', emoji:'🎡', color:'from-red-900 to-rose-900', players:7890 },
  { id:'starburst', name:'Starburst', emoji:'⭐', color:'from-cyan-900 to-teal-900', players:10234 },
];

export default function Home() {
  const { isLoggedIn, user } = useStore();
  const router = useRouter();
  const [jackpot, setJackpot] = useState(800000);
  const [players, setPlayers] = useState(47231);

  useEffect(() => {
    if (!isLoggedIn) { router.push('/auth/login'); return; }
    const jp = setInterval(() => setJackpot(p => p + Math.random() * 0.5), 200);
    const pl = setInterval(() => setPlayers(p => p + Math.floor(Math.random() * 3 - 1)), 5000);
    return () => { clearInterval(jp); clearInterval(pl); };
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="space-y-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a0a3e] to-[#0a0a1a] p-8 lg:p-12 border border-[#ffffff0f]">
        <div className="relative z-10">
          <h1 className="text-5xl lg:text-6xl font-heading font-black text-white mb-2">Welcome back{user?.username ? `, ${user.username}` : ''}</h1>
          <p className="font-display text-4xl text-[#f5c842] mb-6">$<CountUp end={jackpot} duration={2} decimals={2} separator="," /></p>
          <div className="flex gap-3">
            <Link href="/casino" className="btn-primary text-lg px-8 py-4">🎮 PLAY NOW</Link>
            <Link href="/wallet" className="px-8 py-4 border border-[#f5c842]/30 text-[#f5c842] font-heading font-bold rounded-lg">💰 DEPOSIT</Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {games.map(game => (
          <motion.div key={game.id} whileHover={{ scale:1.03 }}
            onClick={() => router.push(`/casino?play=${game.id}`)}
            className={`bg-gradient-to-br ${game.color} rounded-2xl p-5 cursor-pointer`}>
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h3 className="font-heading text-white font-bold text-lg">{game.name}</h3>
            <p className="text-white/50 text-xs mt-1">{game.players.toLocaleString()} playing</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
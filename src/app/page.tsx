"use client";
import { useStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const featuredGames = [
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
  const [jackpot, setJackpot] = useState(850000);

  useEffect(() => {
    const jp = setInterval(() => setJackpot(p => p + Math.random() * 0.5), 200);
    return () => clearInterval(jp);
  }, []);

  return (
    <div className="space-y-8 py-4">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a0a3e] to-[#0a0a1a] p-8 lg:p-12 border border-[#ffffff0f]">
        <div className="relative z-10 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            {isLoggedIn ? `Welcome back, ${user?.username}` : 'Welcome to EdgeCore'}
          </h1>
          <p className="text-2xl font-bold text-[#f5c842] mb-6">Live Jackpot: ${jackpot.toLocaleString('en-US', {maximumFractionDigits:2})}</p>
          <div className="flex gap-3 justify-center lg:justify-start">
            {isLoggedIn ? (
              <Link href="/casino" className="px-8 py-3 bg-[#f5c842] text-black font-bold rounded-lg text-lg">🎮 Play Now</Link>
            ) : (
              <Link href="/auth/login" className="px-8 py-3 bg-[#f5c842] text-black font-bold rounded-lg text-lg">🔐 Login to Play</Link>
            )}
            <Link href="/casino" className="px-8 py-3 border border-[#f5c842]/30 text-[#f5c842] font-bold rounded-lg text-lg">Browse Games</Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 overflow-x-auto text-sm text-[#5a6a85]">
        <span>🟢 47,231 Online</span>
        <span>💰 $2.8M Paid Today</span>
        <span>🏆 12,847 Winners</span>
        <span>⚡ Instant Payouts</span>
      </div>

      {/* Featured Games */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Games</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredGames.map(game => (
            <Link key={game.id} href="/casino"
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-5 text-center hover:scale-105 transition-transform`}>
              <div className="text-4xl mb-3">{game.emoji}</div>
              <h3 className="text-white font-bold">{game.name}</h3>
              <p className="text-white/50 text-xs mt-1">{game.players.toLocaleString()} playing</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
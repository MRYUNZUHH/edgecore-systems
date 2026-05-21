"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Tv, Trophy, Users } from "lucide-react";

const categories = [
  { title: "🎰 Slots", href: "/casino?cat=slots", icon: Gamepad2, color: "from-purple-600 to-pink-600", count: 245 },
  { title: "🃏 Table Games", href: "/casino?cat=table", icon: Gamepad2, color: "from-blue-600 to-cyan-600", count: 38 },
  { title: "⚡ Crash Games", href: "/casino?cat=crash", icon: Gamepad2, color: "from-orange-600 to-red-600", count: 12 },
  { title: "🎥 Live Casino", href: "/live-casino", icon: Tv, color: "from-green-600 to-emerald-600", count: 24 },
  { title: "🏆 Sportsbook", href: "/sportsbook", icon: Trophy, color: "from-yellow-600 to-amber-600", count: 150 },
  { title: "🐎 Virtuals", href: "/virtual", icon: Users, color: "from-indigo-600 to-violet-600", count: 18 },
];

const featuredGames = [
  { title: "Aviator", provider: "EdgeCore", players: 2341, image: "✈️", color: "from-red-600 to-orange-600" },
  { title: "Starburst", provider: "EdgeCore", players: 1892, image: "⭐", color: "from-purple-600 to-pink-600" },
  { title: "Blackjack Pro", provider: "EdgeCore", players: 1567, image: "🃏", color: "from-blue-600 to-indigo-600" },
  { title: "Roulette Live", provider: "EdgeCore", players: 2103, image: "🎡", color: "from-green-600 to-teal-600" },
];

export default function Home() {
  const { isLoggedIn } = useGameStore();
  const router = useRouter();
  if (!isLoggedIn) { router.push("/auth/login"); return null; }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-pink-800 to-orange-600 p-8 lg:p-12 shadow-2xl">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">Welcome to <span className="gold-text">EdgeCore</span></h1>
          <p className="text-white/80 mt-4 text-lg">Experience premium online gaming. Play slots, table games, crash games, and more.</p>
          <div className="flex gap-3 mt-6">
            <Link href="/casino" className="btn-primary text-lg">Play Now</Link>
            <Link href="/promotions" className="btn-outline text-lg">View Promos</Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 text-[200px] opacity-10">🎰</div>
      </motion.div>

      {/* Category Cards */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 transition-all hover:scale-105 hover:shadow-lg`}>
              <cat.icon className="w-8 h-8 text-white mb-2" />
              <h3 className="text-white font-bold text-sm">{cat.title}</h3>
              <p className="text-white/60 text-xs mt-1">{cat.count} games</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Games */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-white mb-4">🔥 Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredGames.map(game => (
            <motion.div key={game.title} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-5 cursor-pointer shadow-lg relative overflow-hidden group`}>
              <div className="text-5xl mb-3">{game.image}</div>
              <h3 className="text-white font-bold text-lg">{game.title}</h3>
              <p className="text-white/60 text-xs">{game.provider} • {game.players} players</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/40 transition" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Jackpot Banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">💰 Progressive Jackpot</h3>
          <p className="text-3xl font-black gold-text">$34,200.00</p>
        </div>
        <button className="btn-gold text-lg">Play Now</button>
      </motion.div>
    </div>
  );
}
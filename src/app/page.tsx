"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import CinematicHero from "@/components/premium/CinematicHero";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { title: "🎰 Slots", href: "/casino?cat=slots", color: "from-purple-600 to-pink-600", count: 245 },
  { title: "🃏 Table Games", href: "/casino?cat=table", color: "from-blue-600 to-cyan-600", count: 38 },
  { title: "⚡ Crash Games", href: "/casino?cat=crash", color: "from-orange-600 to-red-600", count: 12 },
  { title: "🎥 Live Casino", href: "/live-casino", color: "from-green-600 to-emerald-600", count: 24 },
  { title: "🏆 Sportsbook", href: "/sportsbook", color: "from-yellow-600 to-amber-600", count: 150 },
  { title: "🐎 Virtuals", href: "/virtual", color: "from-indigo-600 to-violet-600", count: 18 },
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
    <div className="space-y-8">
      {/* Cinematic Hero */}
      <CinematicHero />

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-heading font-bold text-white mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 transition-all hover:scale-105 hover:shadow-lg`}>
              <h3 className="text-white font-bold text-sm">{cat.title}</h3>
              <p className="text-white/60 text-xs mt-1">{cat.count} games</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Games */}
      <div className="max-w-7xl mx-auto px-4">
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

      {/* Spacer for mobile nav */}
      <div className="h-4" />
    </div>
  );
}
"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import CinematicHero from "@/components/premium/CinematicHero";
import LiveWinsTicker from "@/components/casino/LiveWinsTicker";
import BiggestWins from "@/components/casino/BiggestWins";
import UrgencyBanner from "@/components/casino/UrgencyBanner";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { title: "🎰 Slots", href: "/casino?cat=slots", color: "from-purple-600 to-pink-600", count: 245 },
  { title: "🃏 Table", href: "/casino?cat=table", color: "from-blue-600 to-cyan-600", count: 38 },
  { title: "⚡ Crash", href: "/casino?cat=crash", color: "from-orange-600 to-red-600", count: 12 },
  { title: "🎥 Live", href: "/live-casino", color: "from-green-600 to-emerald-600", count: 24 },
  { title: "🏆 Sports", href: "/sportsbook", color: "from-yellow-600 to-amber-600", count: 150 },
  { title: "🐎 Virtual", href: "/virtual", color: "from-indigo-600 to-violet-600", count: 18 },
];

export default function Home() {
  const { isLoggedIn } = useGameStore();
  const router = useRouter();
  if (!isLoggedIn) { router.push("/auth/login"); return null; }

  return (
    <div className="space-y-6">
      <CinematicHero />
      
      {/* Urgency & Social Proof */}
      <div className="max-w-7xl mx-auto px-4">
        <UrgencyBanner />
      </div>

      {/* Live Wins + Biggest Wins side by side */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LiveWinsTicker />
        <BiggestWins />
      </div>

      {/* Categories */}
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

      <div className="h-4" />
    </div>
  );
}
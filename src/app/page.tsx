"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import CyberHero from "@/components/cyber/CyberHero";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const categories = [
  { title: "🎰 Slots", href: "/casino?cat=slots", color: "from-purple-600 to-pink-600" },
  { title: "🃏 Tables", href: "/casino?cat=table", color: "from-blue-600 to-cyan-600" },
  { title: "⚡ Crash", href: "/casino?cat=crash", color: "from-orange-600 to-red-600" },
  { title: "🔴 Live", href: "/live-casino", color: "from-red-600 to-rose-600" },
  { title: "📊 Predict", href: "/predictions", color: "from-green-600 to-emerald-600" },
  { title: "🐎 Virtual", href: "/virtual", color: "from-indigo-600 to-violet-600" },
];

export default function Home() {
  const { isLoggedIn } = useGameStore();
  const router = useRouter();
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoggedIn) { router.push("/auth/login"); return; }
    fetch("/api/predictions/trending", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setTrending(d.slice(0, 3)))
      .catch(() => {});
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="space-y-10">
      {/* Cinematic Hero */}
      <CyberHero />

      {/* Category grid — asymmetrical */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={cat.href}
                className={`block bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-center hover:scale-105 transition-transform`}>
                <span className="text-2xl block mb-1">{cat.title.split(' ')[0]}</span>
                <span className="text-white font-bold text-xs">{cat.title.split(' ').slice(1).join(' ')}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending predictions */}
      {trending.length > 0 && (
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-white mb-4">🔥 Trending Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.map((m: any) => (
              <div key={m.id} className="card-cinema p-5">
                <span className="text-xs text-white/40 capitalize">{m.category}</span>
                <h3 className="text-white font-bold mt-2">{m.question}</h3>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-neon-400 font-bold text-sm">YES {m.yesPrice}¢</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-400 rounded-full" style={{ width: `${m.yesPrice}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
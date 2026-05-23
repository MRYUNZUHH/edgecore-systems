"use client";
import { useStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { title: "🎰 Slots", href: "/casino?cat=slots", color: "from-purple-600 to-pink-600" },
  { title: "🃏 Tables", href: "/casino?cat=table", color: "from-blue-600 to-cyan-600" },
  { title: "⚡ Crash", href: "/casino?cat=crash", color: "from-orange-600 to-red-600" },
  { title: "🔴 Live", href: "/live-casino", color: "from-red-600 to-rose-600" },
  { title: "📊 Predict", href: "/predictions", color: "from-green-600 to-emerald-600" },
  { title: "🐎 Virtual", href: "/virtual", color: "from-indigo-600 to-violet-600" },
];

export default function Home() {
  const { isLoggedIn, user, balance } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-8 lg:p-12 shadow-2xl">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            Welcome back, <span className="gold-text">{user?.name}</span>
          </h1>
          <p className="text-white/80 mt-4 text-lg">Balance: <span className="text-[#E6B84F] font-bold">${balance.toLocaleString()}</span></p>
          <Link href="/casino" className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-[#E6B84F] text-black font-bold rounded-xl text-lg">
            🎮 Play Now
          </Link>
        </div>
        <div className="absolute top-0 right-0 text-[180px] opacity-10">🎰</div>
      </motion.div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Browse by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => (
            <Link key={cat.href} href={cat.href}
              className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-center hover:scale-105 transition-transform`}>
              <span className="text-2xl block mb-1">{cat.title.split(' ')[0]}</span>
              <span className="text-white font-bold text-xs">{cat.title.split(' ').slice(1).join(' ')}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
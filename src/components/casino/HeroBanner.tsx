"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function HeroBanner() {
  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-pink-800 to-orange-600 p-8 lg:p-12 shadow-2xl">
      <div className="relative z-10 max-w-lg">
        <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">Premium Casino Experience</h1>
        <p className="text-white/80 mt-4 text-lg">Play your favorite games with zero risk.</p>
        <Link href="/casino" className="inline-block mt-6 btn-primary px-6 py-3 text-lg font-bold">Explore Games</Link>
      </div>
      <div className="absolute top-0 right-0 text-[180px] opacity-20">🎰</div>
    </motion.div>
  );
}
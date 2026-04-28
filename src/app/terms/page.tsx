'use client';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 p-6">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="max-w-4xl mx-auto glass-panel p-8">
        <h1 className="text-4xl font-black gold-text mb-6">📜 Terms of Service</h1>
        <p className="text-white/80 mb-4">This platform is a simulation for educational purposes only. All funds are virtual and have no real-world value. The games are designed to demonstrate probabilistic systems and behavioral mechanics. By using this platform you acknowledge that you are participating in a simulation. The house maintains a mathematical advantage to illustrate long-term profitability of casino games.</p>
        <p className="text-white/80">Last updated: 2026-04-28</p>
      </motion.div>
    </div>
  );
}

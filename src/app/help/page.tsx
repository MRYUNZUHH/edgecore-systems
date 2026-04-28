'use client';
import { motion } from 'framer-motion';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 p-6">
      <div className="max-w-4xl mx-auto glass-panel p-8">
        <h1 className="text-4xl font-black gold-text mb-6">❓ Help Center</h1>
        <div className="space-y-4 text-white/80">
          <div><h3 className="text-xl font-bold text-white">Getting Started</h3><p>Select a game from the sidebar, place your bets, and enjoy! All balances are demo credits.</p></div>
          <div><h3 className="text-xl font-bold text-white">How to Play</h3><p>Each game has a "How to Play" button. Click it before starting for rules and tips.</p></div>
          <div><h3 className="text-xl font-bold text-white">VIP Club</h3><p>Earn VIP tiers by playing regularly. Higher tiers unlock exclusive avatars and bonuses.</p></div>
          <div><h3 className="text-xl font-bold text-white">Support</h3><p>This is a simulation; there is no real customer support. Have fun!</p></div>
        </div>
      </div>
    </div>
  );
}

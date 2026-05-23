"use client";
'use client';
import { motion } from 'framer-motion';
import { useStore } from '@/store/game-store';

export default function TopBar() {
  const { balance, user, sidebarCollapsed } = useStore();

  return (
    <header
      style={{ left: sidebarCollapsed ? 72 : 280 }}
      className="fixed top-0 right-0 h-16 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-slate-950/90 backdrop-blur-xl border-b border-white/10 z-30 flex items-center justify-between px-6 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <motion.span animate={{ scale: [1,1.2,1] }} transition={{ duration:2, repeat:Infinity }} className="text-2xl">{user?.avatar}</motion.span>
        <span className="text-white font-bold">
          {user?.username} 
        </span>
        {user && (
          <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/30">
            VIP {['🥉','🥈','🥇','💎','👑'][user.vipTier]}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          animate={{ opacity: [0.7,1,0.7] }}
          transition={{ duration:2, repeat:Infinity }}
          className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-xs"
        >
          <span className="text-gold-400">💰</span>
          <span className="text-white">Jackpot: $34,200</span>
        </motion.div>
        <div className="bg-white/5 rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white font-bold">${balance.demoBalance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
}

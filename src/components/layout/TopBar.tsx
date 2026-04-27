'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export default function TopBar() {
  const { balance, user, sidebarCollapsed } = useGameStore();

  return (
    <header
      style={{ left: sidebarCollapsed ? 72 : 260 }}
      className="fixed top-0 right-0 h-16 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 backdrop-blur-xl border-b border-white/10 z-30 flex items-center justify-between px-6 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl">{user?.avatar || '😎'}</span>
        <span className="text-white font-bold">
          Hey {user?.username || 'Player'}! Ready to play?
        </span>
        {user && (
          <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-400/30">
            VIP {['🥉','🥈','🥇','💎','👑'][user.vipTier]}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-white/5 rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white font-bold">${balance.demoBalance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

export default function TopBar() {
  const { balance, userProfile, sidebarCollapsed, username } = useGameStore();

  return (
    <header style={{ left: sidebarCollapsed ? 72 : 260 }} className="fixed top-0 right-0 h-16 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 backdrop-blur-xl border-b border-white/10 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <span className="text-2xl">{userProfile.avatar}</span>
        <span className="text-white font-bold">Hey {username}! Ready to play?</span>
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

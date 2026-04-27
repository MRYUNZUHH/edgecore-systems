'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game-store';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { DiceGame } from '@/components/games/DiceGame';
import { CrashGame } from '@/components/games/CrashGame';
import { RouletteGame } from '@/components/games/RouletteGame';
import { SlotsGame } from '@/components/games/SlotsGame';
import { MinesGame } from '@/components/games/MinesGame';
import { GameLobby } from '@/components/casino/GameLobby';
import { ProfilePage } from '@/components/casino/ProfilePage';
import { OperatorDashboard } from '@/components/analytics/OperatorDashboard';

export default function Home() {
  const { isLoggedIn, currentGame, currentView, showOperatorView, sidebarCollapsed } = useGameStore();
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push('/auth/login'); }, [isLoggedIn]);
  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-navy-950 text-white relative">
      <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-30 pointer-events-none" />
      <TopBar />
      <Sidebar />
      <main className="pt-16 transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}>
        <AnimatePresence mode="wait">
          {showOperatorView ? (
            <motion.div key="op" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><OperatorDashboard /></motion.div>
          ) : currentView === 'profile' ? (
            <motion.div key="prof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProfilePage /></motion.div>
          ) : currentGame ? (
            <motion.div key="game" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {currentGame==='dice'&&<DiceGame/>}{currentGame==='crash'&&<CrashGame/>}{currentGame==='roulette'&&<RouletteGame/>}{currentGame==='slots'&&<SlotsGame/>}{currentGame==='mines'&&<MinesGame/>}
            </motion.div>
          ) : (
            <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><GameLobby /></motion.div>
          )}
        </AnimatePresence>
      </main>
      <div className="fixed bottom-2 right-2 z-50 opacity-5 hover:opacity-50 transition-opacity">
        <a href="/terms" className="text-[10px] text-gray-600">Terms</a>
      </div>
    </div>
  );
}

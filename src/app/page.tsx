'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/game-store';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { DiceGame } from '@/components/games/DiceGame';
import { CrashGame } from '@/components/games/CrashGame';
import { RouletteGame } from '@/components/games/RouletteGame';
import { SlotsGame } from '@/components/games/SlotsGame';
import { MinesGame } from '@/components/games/MinesGame';
import { BlackjackGame } from '@/components/games/blackjack/BlackjackGame';
import { BaccaratGame } from '@/components/games/baccarat/BaccaratGame';
import { PokerGame } from '@/components/games/poker/PokerGame';
import { GameLobby } from '@/components/casino/GameLobby';
import { ProfilePage } from '@/components/casino/ProfilePage';
import { OperatorDashboard } from '@/components/analytics/OperatorDashboard';
import type { Engine } from 'tsparticles-engine';

export default function Home() {
  const { isLoggedIn, currentGame, currentView, showOperatorView, sidebarCollapsed } = useGameStore();
  const router = useRouter();

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    if (!isLoggedIn) router.push('/auth/login');
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  const renderGame = () => {
    switch (currentGame) {
      case 'dice': return <DiceGame />;
      case 'crash': return <CrashGame />;
      case 'roulette': return <RouletteGame />;
      case 'slots': return <SlotsGame />;
      case 'mines': return <MinesGame />;
      case 'blackjack': return <BlackjackGame />;
      case 'baccarat': return <BaccaratGame />;
      case 'poker': return <PokerGame />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 30 },
            color: { value: ['#fbbf24', '#ec4899', '#a855f7', '#22c55e'] },
            shape: { type: 'circle' },
            opacity: { value: 0.3 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
          interactivity: { events: { onHover: { enable: true, mode: 'repulse' } } },
        }}
      />
      <TopBar />
      <Sidebar />
      <main className="relative z-10 pt-16 transition-all duration-300" style={{ marginLeft: sidebarCollapsed ? 72 : 280 }}>
        <AnimatePresence mode="wait">
          {showOperatorView ? (
            <motion.div key="op" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}><OperatorDashboard /></motion.div>
          ) : currentView === 'profile' ? (
            <motion.div key="prof" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}><ProfilePage /></motion.div>
          ) : currentGame ? (
            <motion.div key="game" initial={{ opacity:0, scale:0.98 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}>
              {renderGame()}
            </motion.div>
          ) : (
            <motion.div key="lobby" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}><GameLobby /></motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

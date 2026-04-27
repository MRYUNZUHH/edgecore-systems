'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

const gamesByCategory = {
  Popular: [
    { id: 'dice', name: 'Dice', icon: '🎲', emoji: '🎲', color: 'from-pink-500 to-orange-500' },
    { id: 'crash', name: 'Crash', icon: '📈', emoji: '🚀', color: 'from-blue-500 to-cyan-500' },
  ],
  Classic: [
    { id: 'roulette', name: 'Roulette', icon: '🎡', emoji: '🎰', color: 'from-red-500 to-yellow-500' },
    { id: 'slots', name: 'Slots', icon: '🎰', emoji: '🍒', color: 'from-purple-500 to-pink-500' },
  ],
  New: [
    { id: 'mines', name: 'Mines', icon: '💣', emoji: '💣', color: 'from-gray-500 to-red-500' },
  ],
};

export function GameLobby() {
  const { setCurrentGame } = useGameStore();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        className="relative rounded-3xl p-10 mb-12 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-5xl font-black text-white mb-4">Let the Games Begin!</h2>
          <p className="text-xl text-white/80">Pick your character, choose your game, and hit it big!</p>
          <button onClick={() => setCurrentGame('crash')} className="mt-6 px-8 py-3 bg-white text-purple-900 font-bold rounded-full text-lg hover:scale-105 transition">
            🚀 Play Crash
          </button>
        </div>
        <div className="absolute top-0 right-0 text-[200px] opacity-20">🎮</div>
      </motion.div>

      {/* Categories */}
      {Object.entries(gamesByCategory).map(([category, games]) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            {category === 'Popular' && '🔥'} {category === 'Classic' && '🎰'} {category === 'New' && '✨'} {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map(game => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentGame(game.id as any)}
                className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl transition`}
              >
                <div className="text-4xl mb-2">{game.emoji}</div>
                <h4 className="text-white font-bold text-xl">{game.name}</h4>
                <p className="text-white/60 text-sm">Play Now</p>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-20">{game.emoji}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

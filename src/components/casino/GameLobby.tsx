'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import CountUp from 'react-countup';

const fakeNames = [
  'CryptoKing', 'LuckyDice', 'SpinMaster', 'AceHigh', 'BetBlaze', 
  'RoyalFlush', 'DiamondHands', 'LuckyCharm', 'JackpotJill', 'CardShark',
  'NeonNinja', 'BigWinBen', 'SlotSiren', 'CrashQueen', 'MineSweeperMoe',
  'BingoBoss', 'RouletteRider', 'DiceDynamo', 'PokerPro99', 'BaccaratBetty'
];

const featuredGames = [
  { id: 'crash', name: 'Crash', emoji: '🚀', color: 'from-purple-600 to-pink-600', badge: 'HOT' },
  { id: 'dice', name: 'Dice', emoji: '🎲', color: 'from-emerald-600 to-teal-600', badge: 'NEW' },
  { id: 'slots', name: 'Slots', emoji: '🍒', color: 'from-yellow-600 to-red-600', badge: 'POPULAR' },
];

const otherGames = [
  { id: 'roulette', name: 'Roulette', emoji: '🎡' },
  { id: 'blackjack', name: 'Blackjack', emoji: '🃏' },
  { id: 'baccarat', name: 'Baccarat', emoji: '🎴' },
  { id: 'poker', name: 'Poker', emoji: '♥️' },
  { id: 'mines', name: 'Mines', emoji: '💣' },
];

export function GameLobby() {
  const { setCurrentGame, user } = useGameStore();
  const [jackpots, setJackpots] = useState([12500, 34200, 8900]);
  const [liveBets, setLiveBets] = useState<any[]>([]);

  useEffect(() => {
    // Simulate live bets with random names and amounts
    const generateBet = () => ({
      player: fakeNames[Math.floor(Math.random() * fakeNames.length)],
      game: ['Dice', 'Crash', 'Slots', 'Roulette', 'Mines', 'Blackjack'][Math.floor(Math.random() * 6)],
      amount: Math.floor(Math.random() * 500) + 10,
      win: Math.random() < 0.06, // house still wins most
      multiplier: Math.random() < 0.06 ? (Math.random() * 5 + 1).toFixed(2) : 0,
    });

    setLiveBets(Array.from({ length: 5 }, generateBet));
    const interval = setInterval(() => {
      setLiveBets(prev => [generateBet(), ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Section with floating coins */}
      <motion.div
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        className="relative rounded-3xl p-10 bg-gradient-to-br from-black via-purple-950 to-indigo-900 overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Animated floating coins */}
        <div className="absolute inset-0 pointer-events-none">
          {['🪙','💎','💰','🌟','🎰'].map((e,i) => (
            <motion.span
              key={i}
              className="absolute text-4xl opacity-20"
              style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%` }}
              animate={{ y: [0, -20, 0], rotate: [0, 360] }}
              transition={{ duration: 4+i, repeat: Infinity }}
            >{e}</motion.span>
          ))}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-3">
              Welcome back, <span className="gold-text">{user?.username}</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6">Your next big win is just a spin away.</p>
            <button
              onClick={() => setCurrentGame('crash')}
              className="btn-gold px-10 py-4 text-lg font-black rounded-full shadow-gold hover:scale-105 transition transform"
            >
              🚀 PLAY NOW
            </button>
          </div>

          {/* Jackpots Ticker */}
          <div className="mt-8 lg:mt-0 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="text-center text-sm text-gray-400 mb-3">🔥 LIVE JACKPOTS</div>
            <div className="space-y-3">
              {jackpots.map((value, i) => (
                <div key={i} className="flex items-center gap-2 text-lg">
                  <span className="text-yellow-400">⭐</span>
                  <CountUp end={value} duration={3} separator="," prefix="$" className="font-bold text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Games (large cards) */}
      <div>
        <h3 className="text-3xl font-heading font-bold text-white mb-6 flex items-center gap-2">🔥 Trending Now</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGames.map(game => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentGame(game.id)}
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 cursor-pointer relative overflow-hidden shadow-xl border border-white/20`}
            >
              <span className="absolute top-2 right-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">{game.badge}</span>
              <div className="text-6xl mb-4 drop-shadow-lg">{game.emoji}</div>
              <h4 className="text-white font-bold text-2xl mb-2">{game.name}</h4>
              <div className="flex justify-between items-end">
                <span className="text-white/70 text-sm">Play Now</span>
                <div className="flex -space-x-2">
                  {['👤','👤','👤'].map((u,i)=> <span key={i} className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-xs">🔥</span>)}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* More Games Grid */}
      <div>
        <h3 className="text-2xl font-heading font-bold text-white mb-4 flex items-center gap-2">🎮 All Games</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherGames.map(game => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentGame(game.id)}
              className="glass-card rounded-2xl p-4 cursor-pointer flex flex-col items-center gap-2 hover:border-gold-400/50 transition"
            >
              <span className="text-4xl">{game.emoji}</span>
              <span className="text-white font-bold">{game.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Bets Ticker */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl font-heading font-bold text-white">📡 Live Bets</h3>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-400" />
          </span>
        </div>
        <div className="glass-panel rounded-2xl p-4 overflow-hidden">
          {liveBets.map((bet, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:20 }}
              animate={{ opacity:1, x:0 }}
              transition={{ delay: i*0.05 }}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-sm"
            >
              <span className="text-gray-400 font-mono">{bet.player}</span>
              <span className="text-white font-medium">{bet.game}</span>
              <span className="text-white">${bet.amount}</span>
              <span className={`font-bold ${bet.win ? 'text-green-400' : 'text-red-400'}`}>
                {bet.win ? `+$${(bet.amount * bet.multiplier).toFixed(0)}` : `-$${bet.amount}`}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

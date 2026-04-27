'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

const characterEmojis = ['😎','🤑','🤠','👾','🦊','🐼','🐨','🦄','😈','👽','🤖','🎃','👑','💀','🐸'];

export function ProfilePage() {
  const { user, balance, betHistory, setAvatar } = useGameStore();
  const [selectedEmoji, setSelectedEmoji] = useState(user?.avatar || '😎');

  if (!user) return null;

  const totalWon = betHistory.filter(b => b.isWin).reduce((acc, b) => acc + b.payout, 0);
  const totalLost = betHistory.filter(b => !b.isWin).reduce((acc, b) => acc + b.betAmount, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Character Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-3xl p-8 border border-purple-500/20"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="text-6xl animate-float">{selectedEmoji}</div>
          <h1 className="text-3xl font-bold text-white">{user.username}</h1>
          <p className="text-purple-300">VIP {['🥉','🥈','🥇','💎','👑'][user.vipTier]}</p>
          
          {/* Avatar Selector */}
          <div className="mt-4">
            <h3 className="text-center text-gray-400 mb-3">Choose your character</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-xs">
              {characterEmojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => { setSelectedEmoji(emoji); setAvatar(emoji); }}
                  className={`text-3xl p-2 rounded-xl transition-all ${
                    selectedEmoji === emoji 
                      ? 'bg-purple-500/30 ring-2 ring-purple-400 scale-110' 
                      : 'hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Pick your avatar!</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '💰 Balance', value: `$${balance.demoBalance.toLocaleString()}`, color: 'text-green-400' },
          { label: '🎯 Total Bets', value: balance.totalBets, color: 'text-white' },
          { label: '✅ Wins', value: balance.totalWins, color: 'text-green-400' },
          { label: '❌ Losses', value: balance.totalLosses, color: 'text-red-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-4"
          >
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Game History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">🎮 Games Played</p>
          <p className="text-lg font-bold text-white">
            {[...new Set(betHistory.map(b => b.gameType))].join(', ') || 'None yet'}
          </p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">🏆 Achievements</p>
          <p className="text-lg font-bold text-yellow-400">
            {user.achievements.length > 0 ? user.achievements.join(', ') : 'Start playing!'}
          </p>
        </div>
      </div>

      {/* Recent Bets */}
      {betHistory.length > 0 && (
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">📋 Recent Bets</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto hide-scrollbar">
            {betHistory.slice(0, 10).map((bet, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 text-sm">
                <span className="text-gray-400 capitalize">{bet.gameType}</span>
                <span className="text-white">${bet.betAmount}</span>
                <span className={bet.isWin ? 'text-green-400' : 'text-red-400'}>
                  {bet.isWin ? '+' : ''}{bet.profit}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(bet.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

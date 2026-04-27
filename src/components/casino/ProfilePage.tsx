'use client';
import { useState } from 'react';
import { useGameStore } from '@/store/game-store';

const characterEmojis = ['😎','🤑','🤠','👾','🦊','🐼','🐨','🦄','😈','👽','🤖','🎃','👑','💀','🐸'];

export function ProfilePage() {
  const { username, balance, userProfile, betHistory, setAvatar } = useGameStore();
  const [selectedEmoji, setSelectedEmoji] = useState(userProfile.avatar);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Character Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-3xl p-8 border border-purple-500/20">
        <div className="flex flex-col items-center gap-6">
          <div className="text-6xl animate-float">{selectedEmoji}</div>
          <h1 className="text-3xl font-bold text-white">{username}</h1>
          <p className="text-purple-300">VIP {['🥉','🥈','🥇','💎','👑'][userProfile.vipTier]}</p>
          
          {/* Avatar Selector */}
          <div className="mt-4">
            <h3 className="text-center text-gray-400 mb-3">Choose your character</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-xs">
              {characterEmojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => { setSelectedEmoji(emoji); setAvatar(emoji); }}
                  className={`text-3xl p-2 rounded-xl transition-all ${selectedEmoji === emoji ? 'bg-purple-500/30 ring-2 ring-purple-400' : 'hover:bg-white/10'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Pick your avatar!</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* ... (same as before but with emoji icons) ... */}
      </div>
    </div>
  );
}

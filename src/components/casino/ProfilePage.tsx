"use client";
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/game-store';

const emojis = ['😎','🤑','🤠','👾','🦊','🐼','🐨','🦄','😈','👽'];

export function ProfilePage() {
  const { user, balance, betHistory, setAvatar } = useStore();
  const [selected, setSelected] = useState(user?.avatar || '😎');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="glass-panel p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
        <div className="flex flex-col items-center gap-6">
          <motion.div animate={{ rotate: [0,10,-10,0] }} transition={{ repeat:Infinity, duration:4 }} className="text-7xl">{selected}</motion.div>
          <h1 className="text-4xl font-black gold-text">{user?.username}</h1>
          <div className="flex gap-3 flex-wrap justify-center">
            {emojis.map(e => (
              <button key={e} onClick={() => { setSelected(e); setAvatar(e); }} className={`text-3xl p-2 rounded-xl ${selected===e ? 'bg-gold-400/30' : 'bg-white/5'}`}>{e}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {label:'Balance', value:`$${balance.demoBalance.toLocaleString()}`, color:'text-green-400'},
          {label:'Bets', value:balance.totalBets},
          {label:'Wins', value:balance.totalWins},
          {label:'Losses', value:balance.totalLosses}
        ].map((s,i)=> <div key={i} className="glass-card p-4"><p className="text-sm text-white/60">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>)}
      </div>
    </div>
  );
}

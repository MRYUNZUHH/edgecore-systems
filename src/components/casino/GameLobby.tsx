"use client";
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { RuleModal } from '@/components/ui/RuleModal';

const fakeNames = ['CryptoKing','LuckyDice','SpinMaster','AceHigh','BetBlaze','DiamondHands','LuckyCharm','JackpotJill','CardShark'];
const allGames = [
  { id:'crash', name:'Crash', emoji:'🚀', color:'from-purple-600 to-pink-600' },
  { id:'dice', name:'Dice', emoji:'🎲', color:'from-emerald-600 to-teal-600' },
  { id:'slots', name:'Slots', emoji:'🍒', color:'from-yellow-600 to-red-600' },
  { id:'roulette', name:'Roulette', emoji:'🎡', color:'from-red-600 to-yellow-600' },
  { id:'blackjack', name:'Blackjack', emoji:'🃏', color:'from-blue-600 to-purple-600' },
  { id:'baccarat', name:'Baccarat', emoji:'🎴', color:'from-indigo-600 to-blue-600' },
  { id:'poker', name:'Poker', emoji:'♥️', color:'from-pink-600 to-orange-600' },
  { id:'mines', name:'Mines', emoji:'💣', color:'from-gray-600 to-red-600' },
];

export function GameLobby() {
  const { setCurrentGame, user } = useGameStore();
  const [bets, setBets] = useState<any[]>([]);
  const [showRulesGame, setShowRulesGame] = useState<string | null>(null);

  useEffect(() => {
    const gen = () => Array.from({length:5}, () => ({
      player: fakeNames[Math.floor(Math.random()*fakeNames.length)],
      game: ['Dice','Crash','Slots'][Math.floor(Math.random()*3)],
      amount: Math.floor(Math.random()*500)+10,
      win: Math.random()<0.06,
      multiplier: (Math.random()*3+1).toFixed(2),
    }));
    setBets(gen());
    const interval = setInterval(() => {
      setBets(prev => [gen()[0], ...prev.slice(0,4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="rounded-3xl p-10 bg-gradient-to-br from-purple-900 via-pink-700 to-orange-600 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center">
          <div>
            <h2 className="text-5xl font-black text-white">Welcome, {user?.username}!</h2>
            <p className="text-white/80 mt-2">Your next big win is a click away.</p>
            <button onClick={()=>setCurrentGame('crash')} className="btn-gold px-8 py-3 mt-4 font-black rounded-full">🚀 Play Crash</button>
          </div>
          <div className="mt-6 lg:mt-0 bg-white/10 backdrop-blur-xl rounded-2xl p-4">
            <div className="text-sm text-white/70">Live Jackpot</div>
            <div className="text-3xl font-black gold-text">$34,200</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 text-[200px] opacity-10">🎰</div>
      </motion.div>

      <div>
        <h3 className="text-3xl font-black text-white mb-6">🎮 All Games</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allGames.map(game => (
            <motion.div
              key={game.id}
              whileHover={{ scale:1.03, y:-5 }}
              whileTap={{ scale:0.95 }}
              className={`bg-gradient-to-br ${game.color} rounded-2xl p-5 cursor-pointer relative overflow-hidden shadow-xl`}
              onClick={() => setCurrentGame(game.id)}
            >
              <div className="text-4xl mb-2">{game.emoji}</div>
              <h4 className="text-white font-bold text-lg">{game.name}</h4>
              <button
                onClick={(e) => { e.stopPropagation(); setShowRulesGame(game.id); }}
                className="mt-2 text-xs bg-white/20 text-white px-2 py-1 rounded-full"
              >How to Play</button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live bets */}
      <div>
        <h3 className="text-2xl font-black text-white mb-4">📡 Live Bets</h3>
        <div className="glass-panel p-4">
          {bets.map((b,i) => (
            <div key={i} className="flex justify-between text-sm py-1">
              <span className="text-white/70">{b.player}</span>
              <span>{b.game}</span>
              <span className={b.win?'text-green-400':'text-red-400'}>{b.win ? '+$'+ (b.amount*b.multiplier) : '-$'+b.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {showRulesGame && (
        <RuleModal isOpen={true} onClose={()=>setShowRulesGame(null)} title={`${showRulesGame} Rules`}>
          <p>Each game has its own rules. Click "How to Play" inside the game for details. Have fun!</p>
        </RuleModal>
      )}
    </div>
  );
}

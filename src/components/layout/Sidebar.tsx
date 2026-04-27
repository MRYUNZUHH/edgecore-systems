'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';

const gameItems = [
  { id: 'lobby', label: '🏠 Lobby', action: 'lobby' },
  { id: 'dice', label: '🎲 Dice', action: 'dice', category: 'Popular' },
  { id: 'crash', label: '📈 Crash', action: 'crash', category: 'Popular' },
  { id: 'roulette', label: '🎡 Roulette', action: 'roulette', category: 'Classic' },
  { id: 'slots', label: '🎰 Slots', action: 'slots', category: 'Classic' },
  { id: 'mines', label: '💣 Mines', action: 'mines', category: 'New' },
];

export default function Sidebar() {
  const { currentGame, setCurrentGame, setCurrentView, balance, userProfile, sidebarCollapsed, toggleSidebar, logout, username } = useGameStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-r border-white/10 z-40 flex flex-col"
    >
      {/* Avatar & Identity (collapsed: just avatar) */}
      <div className="p-4 border-b border-white/10 flex flex-col items-center gap-3">
        <div className="text-3xl animate-float">{userProfile.avatar}</div>
        {!sidebarCollapsed && (
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">{username}</h1>
            <span className="text-xs text-yellow-400">VIP {['🥉','🥈','🥇','💎','👑'][userProfile.vipTier]}</span>
          </div>
        )}
      </div>

      {/* Balance */}
      {!sidebarCollapsed && (
        <div className="p-4 border-b border-white/10">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-xs text-gray-400">Balance</div>
            <div className="text-xl font-bold text-green-400">${balance.demoBalance.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Navigation – grouped by category */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 hide-scrollbar">
        {['Popular', 'Classic', 'New'].map(cat => (
          <div key={cat}>
            <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 font-bold">{cat}</div>
            {gameItems.filter(g => g.category === cat).map(g => (
              <motion.button
                key={g.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => { if (g.action === 'lobby') { setCurrentGame(null); setCurrentView('lobby'); } else setCurrentGame(g.action as any); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${currentGame === g.id ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:bg-white/5'}`}
              >
                {g.icon} {!sidebarCollapsed && g.label}
              </motion.button>
            ))}
          </div>
        ))}
        <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 mt-4 font-bold">Account</div>
        <button onClick={() => setCurrentView('profile')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg">👤 Profile</button>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg">🚪 Logout</button>
      </nav>

      <button onClick={toggleSidebar} className="absolute -right-3 top-8 w-6 h-6 bg-purple-500 rounded-full text-white">◀</button>
    </motion.aside>
  );
}

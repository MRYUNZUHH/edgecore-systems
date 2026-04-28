'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { useRouter } from 'next/navigation';

const gameItems = [
  { id: 'lobby', label: '🏠 Lobby', action: 'lobby', category: 'Navigation' },
  { id: 'dice', label: '🎲 Dice', action: 'dice', category: 'Popular' },
  { id: 'crash', label: '📈 Crash', action: 'crash', category: 'Popular' },
  { id: 'roulette', label: '🎡 Roulette', action: 'roulette', category: 'Classic' },
  { id: 'slots', label: '🎰 Slots', action: 'slots', category: 'Classic' },
  { id: 'mines', label: '💣 Mines', action: 'mines', category: 'New' },
  { id: 'blackjack', label: '🃏 Blackjack', action: 'blackjack', category: 'Card Games' },
  { id: 'baccarat', label: '🎴 Baccarat', action: 'baccarat', category: 'Card Games' },
  { id: 'poker', label: '🃏 Poker', action: 'poker', category: 'Card Games' },
  { id: 'sportsbook', label: '🏆 Sportsbook', action: 'sportsbook', category: 'Sports' },
];

export default function Sidebar() {
  const { currentGame, setCurrentGame, setCurrentView, balance, user, sidebarCollapsed, toggleSidebar, logout } = useGameStore();
  const router = useRouter();

  const isActive = (id: string) => {
    if (id === 'lobby' && !currentGame) return true;
    return currentGame === id;
  };

  const handleClick = (action: string) => {
    if (action === 'sportsbook') {
      router.push('/sportsbook');
    } else if (action === 'lobby') {
      setCurrentGame(null);
      setCurrentView('lobby');
    } else {
      setCurrentGame(action);
    }
  };

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 280 }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-r border-white/10 z-40 flex flex-col transition-all duration-300"
    >
      {/* Avatar & Identity */}
      <div className="p-4 border-b border-white/10 flex flex-col items-center gap-3">
        <div className="text-3xl animate-float">{user?.avatar || '😎'}</div>
        {!sidebarCollapsed && (
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">{user?.username}</h1>
            <span className="text-xs text-yellow-400">VIP {['🥉','🥈','🥇','💎','👑'][user?.vipTier || 0]}</span>
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 hide-scrollbar">
        {['Navigation', 'Popular', 'Classic', 'New', 'Card Games', 'Sports'].map(cat => (
          <div key={cat}>
            <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 font-bold">{cat}</div>
            {gameItems.filter(g => g.category === cat).map(g => (
              <motion.button
                key={g.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleClick(g.action)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive(g.id)
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{g.label.split(' ')[0]}</span>
                {!sidebarCollapsed && <span className="text-sm">{g.label.split(' ').slice(1).join(' ')}</span>}
              </motion.button>
            ))}
          </div>
        ))}
        <div className="text-xs text-gray-500 uppercase tracking-wider px-3 py-2 mt-4 font-bold">Account</div>
        <button onClick={() => setCurrentView('profile')} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          👤 {!sidebarCollapsed && 'Profile'}
        </button>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          🚪 {!sidebarCollapsed && 'Logout'}
        </button>
      </nav>

      <button 
        onClick={toggleSidebar} 
        className="absolute -right-3 top-8 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs z-50 shadow-lg"
      >
        {sidebarCollapsed ? '▶' : '◀'}
      </button>
    </motion.aside>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/game-store';
import { useRouter } from 'next/navigation';

const items = [
  { id:'lobby', label:'🏠 Lobby', cat:'Navigation' },
  { id:'dice', label:'🎲 Dice', cat:'Popular' },
  { id:'crash', label:'📈 Crash', cat:'Popular' },
  { id:'roulette', label:'🎡 Roulette', cat:'Classic' },
  { id:'slots', label:'🎰 Slots', cat:'Classic' },
  { id:'mines', label:'💣 Mines', cat:'New' },
  { id:'blackjack', label:'🃏 Blackjack', cat:'Card' },
  { id:'baccarat', label:'🎴 Baccarat', cat:'Card' },
  { id:'poker', label:'♥️ Poker', cat:'Card' },
  { id:'sportsbook', label:'🏆 Sports', cat:'Sports' },
];

export default function Sidebar() {
  const { currentGame, setCurrentGame, setCurrentView, balance, user, sidebarCollapsed, toggleSidebar, logout } = useGameStore();
  const router = useRouter();

  const handle = (id: string) => {
    if (id === 'sportsbook') router.push('/sportsbook');
    else if (id === 'lobby') { setCurrentGame(null); setCurrentView('lobby'); }
    else setCurrentGame(id);
  };

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 280 }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-purple-900/90 via-pink-900/90 to-orange-900/90 backdrop-blur-xl border-r border-white/20 z-40 flex flex-col"
    >
      <div className="p-4 border-b border-white/20 flex items-center gap-3">
        <motion.span animate={{ scale: [1,1.2,1] }} transition={{ repeat:Infinity, duration:2 }} className="text-2xl">{user?.avatar}</motion.span>
        {!sidebarCollapsed && <span className="text-white font-bold">{user?.username}</span>}
      </div>
      {!sidebarCollapsed && (
        <div className="p-4 border-b border-white/20">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-xs text-white/60">Balance</div>
            <div className="text-xl font-bold text-green-400">${balance.demoBalance.toLocaleString()}</div>
          </div>
        </div>
      )}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {['Navigation','Popular','Classic','New','Card','Sports'].map(cat => (
          <div key={cat}>
            <div className="text-xs text-white/50 uppercase px-3 py-2">{cat}</div>
            {items.filter(i=>i.cat===cat).map(item => (
              <motion.button
                key={item.id}
                whileHover={{ scale:1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={()=>handle(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${currentGame===item.id ? 'bg-pink-500/30 text-white' : 'text-white/70'}`}
              >
                <span className="text-lg">{item.label.split(' ')[0]}</span>
                {!sidebarCollapsed && item.label.split(' ').slice(1).join(' ')}
              </motion.button>
            ))}
          </div>
        ))}
        <div className="pt-4">
          <button onClick={()=>setCurrentView('profile')} className="w-full flex gap-2 text-white/70 hover:text-white px-3 py-2">👤 Profile</button>
          <button onClick={logout} className="w-full flex gap-2 text-white/70 hover:text-white px-3 py-2">🚪 Logout</button>
        </div>
      </nav>
      <button onClick={toggleSidebar} className="absolute -right-3 top-8 w-6 h-6 bg-pink-500 rounded-full text-white">◀</button>
    </motion.aside>
  );
}

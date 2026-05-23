"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import { GAMES, Category } from "@/lib/games";
import GameLauncher from "@/components/games/GameLauncher";

const categories: Category[] = ['all','slots','table','crash','live']
const volatilities = ['all','low','medium','high']
const rtpOptions = ['all',95,96,97,98]

export default function CasinoPage() {
  const { isLoggedIn, balance } = useStore()
  const router = useRouter()
  const [activeCat, setActiveCat] = useState<Category>('all')
  const [activeVol, setActiveVol] = useState('all')
  const [activeRTP, setActiveRTP] = useState<number|'all'>('all')
  const [search, setSearch] = useState('')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const filtered = GAMES.filter(g => {
    if (activeCat !== 'all' && g.category !== activeCat) return false
    if (activeVol !== 'all' && g.volatility !== activeVol) return false
    if (activeRTP !== 'all' && g.rtp < activeRTP) return false
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handlePlay = (gameId: string) => {
    if (!isLoggedIn) { router.push(`/auth/login`); return }
    if (balance <= 0) { router.push('/wallet'); return }
    setSelectedGame(gameId)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-bold text-[#f0b429]">🎮 Casino Lobby</h1>
      <div className="glass-panel p-4 space-y-3">
        <input placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${activeCat===c?'bg-[#f0b429] text-black':'bg-white/5 text-white/70'}`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-2 text-xs">
          <span className="text-white/40">Vol:</span>
          {volatilities.map(v => (
            <button key={v} onClick={() => setActiveVol(v)}
              className={`px-2 py-0.5 rounded capitalize ${activeVol===v?'text-[#f0b429]':'text-white/50'}`}>{v}</button>
          ))}
          <span className="text-white/40 ml-4">RTP:</span>
          {rtpOptions.map(r => (
            <button key={r} onClick={() => setActiveRTP(r)}
              className={`px-2 py-0.5 rounded ${activeRTP===r?'text-[#f0b429]':'text-white/50'}`}>{r==='all'?'All':r+'%+'}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <AnimatePresence>
          {filtered.map(game => (
            <motion.div key={game.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              whileHover={{ scale:1.03, boxShadow:'0 0 30px rgba(240,180,41,0.2)' }}
              onClick={() => handlePlay(game.id)}
              className="bg-[#12121a] border border-[#ffffff14] rounded-2xl p-4 cursor-pointer hover:border-[#f0b429]/50 transition relative overflow-hidden group">
              {game.badge && (
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${game.badge==='HOT'?'bg-red-500 text-white':'bg-green-500 text-black'}`}>{game.badge}</span>
              )}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{game.emoji}</div>
              <h3 className="text-white font-bold text-sm mb-1">{game.name}</h3>
              <div className="flex justify-between text-[10px] text-white/40">
                <span>RTP {game.rtp}%</span>
                <span className="capitalize">{game.volatility}</span>
              </div>
              <div className="absolute inset-0 bg-[#f0b429]/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="bg-[#f0b429] text-black px-4 py-2 rounded-xl font-bold text-sm">▶ Play</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <GameLauncher gameId={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}
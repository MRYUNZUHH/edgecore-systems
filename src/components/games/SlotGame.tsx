"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const SYMBOLS = ['🍒','🍋','🔔','⭐','💎','7️⃣']

export default function SlotGame({ onClose }: { onClose: () => void }) {
  const { balance, adjustBalance, addBet, currency } = useStore()
  const [betAmount, setBetAmount] = useState(1)
  const [reels, setReels] = useState([0,0,0,0,0])
  const [spinning, setSpinning] = useState(false)
  const [win, setWin] = useState(0)

  const spin = () => {
    if (spinning || betAmount > balance) return
    adjustBalance(-betAmount)
    setSpinning(true)
    setWin(0)
    const interval = setInterval(() => {
      setReels(Array.from({length:5}, () => Math.floor(Math.random()*6)))
    }, 80)
    setTimeout(() => {
      clearInterval(interval)
      const final = Array.from({length:5}, () => Math.floor(Math.random()*6))
      setReels(final)
      const winAmount = calculateWin(final, betAmount)
      if (winAmount > 0) {
        adjustBalance(winAmount)
        setWin(winAmount)
        addBet({ game:'Slots', amount:betAmount, outcome:'win', payout:winAmount, multiplier: winAmount/betAmount })
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })
      } else {
        addBet({ game:'Slots', amount:betAmount, outcome:'loss', payout:0, multiplier: 0 })
      }
      setSpinning(false)
    }, 2000)
  }

  const calculateWin = (reels: number[], bet: number) => {
    if (reels.every(r => r === reels[0])) return bet * 50
    if (reels.slice(0,3).every(r => r === reels[0])) return bet * 10
    if (reels[0] === reels[1]) return bet * 2
    return 0
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#ffffff14]">
        <h2 className="text-xl font-bold text-white">🎰 Slots</h2>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="flex gap-2 mb-8">
          {reels.map((s,i) => (
            <motion.div key={i} animate={spinning ? { rotateY: 360 } : {}} transition={{ repeat: Infinity, duration: 0.3 }}
              className="w-16 h-20 bg-[#12121a] border border-[#ffffff14] rounded-xl flex items-center justify-center text-3xl">
              {SYMBOLS[s]}
            </motion.div>
          ))}
        </div>
        {win > 0 && <p className="text-green-400 text-xl font-bold mb-4">You won {formatMoney(win, currency)}!</p>}
      </div>
      <div className="p-4 border-t border-[#ffffff14] space-y-3">
        <div className="flex items-center gap-2">
          <input type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          {[1,5,10,25,50,100].map(a => <button key={a} onClick={() => setBetAmount(a)} className="px-3 py-1 bg-white/5 rounded-lg text-white text-xs">${a}</button>)}
        </div>
        <button onClick={spin} disabled={spinning} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-xl disabled:opacity-50">
          {spinning ? 'Spinning...' : 'Spin'}
        </button>
        <p className="text-white/40 text-sm text-center">{formatMoney(balance, currency)}</p>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";
import { motion } from "framer-motion";

export default function MinesGame({ onClose }: { onClose: () => void }) {
  const { balance, adjustBalance, currency, addBet } = useStore()
  const [betAmount, setBetAmount] = useState(10)
  const [mineCount, setMineCount] = useState(3)
  const [mines, setMines] = useState<number[]>([])
  const [revealed, setRevealed] = useState<number[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [multiplier, setMultiplier] = useState(1.0)

  const startGame = () => {
    if (betAmount > balance) return
    adjustBalance(-betAmount)
    const newMines = Array.from({length:25},(_,i)=>i).sort(()=>Math.random()-0.5).slice(0,mineCount)
    setMines(newMines)
    setRevealed([])
    setGameOver(false)
    setWon(false)
    setMultiplier(1.0)
  }

  const clickCell = (idx: number) => {
    if (gameOver || revealed.includes(idx) || mines.length===0) return
    const newRevealed = [...revealed, idx]
    setRevealed(newRevealed)
    if (mines.includes(idx)) {
      setGameOver(true)
      addBet({ game:'Mines', amount:betAmount, multiplier:0, win:false, time:Date.now() })
    } else {
      const safe = 25 - mineCount
      const newMult = multiplier * (safe - newRevealed.length + 1) / (safe - newRevealed.length + 1 - mineCount) * 0.97
      setMultiplier(parseFloat(newMult.toFixed(2)))
      if (newRevealed.length === safe) {
        setGameOver(true)
        setWon(true)
        const win = betAmount * multiplier
        adjustBalance(win)
        addBet({ game:'Mines', amount:betAmount, multiplier, win:true, time:Date.now() })
      }
    }
  }

  const cashOut = () => {
    const win = betAmount * multiplier
    adjustBalance(win)
    setGameOver(true)
    setWon(true)
    addBet({ game:'Mines', amount:betAmount, multiplier, win:true, time:Date.now() })
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0F1A] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#1E2235]">
        <h2 className="text-xl font-bold text-white">💣 Mines</h2>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">×</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <p className="text-2xl font-bold text-white mb-2">{multiplier.toFixed(2)}x</p>
        <p className="text-white/40 text-sm mb-4">{formatMoney(balance, currency)}</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({length:25}).map((_,i) => (
            <motion.button key={i} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
              onClick={() => clickCell(i)}
              disabled={gameOver || mines.length===0}
              className={`w-14 h-14 rounded-xl text-lg font-bold transition ${
                revealed.includes(i) 
                  ? (mines.includes(i) ? 'bg-red-500' : 'bg-green-400 text-black')
                  : 'bg-[#131626] border border-[#1E2235] hover:border-[#E6B84F]/50'
              }`}>
              {revealed.includes(i) ? (mines.includes(i) ? '💣' : '💎') : '?'}
            </motion.button>
          ))}
        </div>
        {!gameOver && mines.length>0 && (
          <button onClick={cashOut} className="mt-4 px-6 py-2 bg-green-500 text-black font-bold rounded-xl">
            Cash Out ({formatMoney(betAmount * multiplier, currency)})
          </button>
        )}
      </div>
      <div className="p-4 border-t border-[#1E2235] space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm">Mines:</span>
          {[1,3,5,10,15,20].map(n => (
            <button key={n} onClick={() => setMineCount(n)}
              className={`px-3 py-1 rounded-lg text-xs ${mineCount===n?'bg-[#E6B84F] text-black':'bg-white/5 text-white'}`}>{n}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          {[10,50,100,500].map(a => <button key={a} onClick={() => setBetAmount(a)} className="px-3 py-1 bg-white/5 rounded-lg text-white text-xs">{a}</button>)}
        </div>
        <button onClick={startGame} className="w-full py-3 bg-[#E6B84F] text-black font-bold rounded-xl">
          {mines.length>0 ? 'New Game' : 'Start Game'}
        </button>
      </div>
    </div>
  );
}
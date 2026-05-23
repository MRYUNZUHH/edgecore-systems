"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const NUMBERS = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]
const RED = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]

export default function RouletteGame({ onClose }: { onClose: () => void }) {
  const { balance, adjustBalance, addBet, currency } = useStore()
  const [bets, setBets] = useState<{type:string; value:any; amount:number}[]>([])
  const [result, setResult] = useState<number | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [betAmount, setBetAmount] = useState(10)

  const placeBet = (type: string, value: any) => {
    setBets(prev => [...prev, { type, value, amount: betAmount }])
  }

  const spin = () => {
    if (bets.length === 0 || spinning) return
    const totalBet = bets.reduce((s,b) => s + b.amount, 0)
    if (totalBet > balance) return
    adjustBalance(-totalBet)
    setSpinning(true)
    setResult(null)
    setTimeout(() => {
      const num = Math.floor(Math.random() * 37)
      setResult(num)
      let totalWin = 0
      bets.forEach(bet => {
        if (bet.type === 'number' && bet.value === num) totalWin += bet.amount * 35
        if (bet.type === 'red' && RED.includes(num)) totalWin += bet.amount * 2
        if (bet.type === 'black' && !RED.includes(num) && num !== 0) totalWin += bet.amount * 2
        if (bet.type === 'even' && num % 2 === 0 && num !== 0) totalWin += bet.amount * 2
        if (bet.type === 'odd' && num % 2 === 1) totalWin += bet.amount * 2
      })
      if (totalWin > 0) {
        adjustBalance(totalWin)
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } })
      }
      addBet({ game:'Roulette', amount:totalBet, outcome: totalWin > 0 ? 'win' : 'loss', payout:totalWin, multiplier: totalWin/totalBet })
      setSpinning(false)
      setBets([])
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#ffffff14]">
        <h2 className="text-xl font-bold text-white">🎡 Roulette</h2>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div animate={spinning ? { rotate: 720 } : {}} transition={{ duration: 3 }}
          className="w-48 h-48 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-5xl font-black text-white border-4 border-[#f0b429] mb-4">
          {result !== null ? result : '?'}
        </motion.div>
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          <button onClick={() => placeBet('red', null)} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold">Red (2x)</button>
          <button onClick={() => placeBet('black', null)} className="px-4 py-2 bg-black text-white rounded-lg font-bold border border-white/20">Black (2x)</button>
          <button onClick={() => placeBet('even', null)} className="px-4 py-2 bg-white/5 text-white rounded-lg">Even (2x)</button>
          <button onClick={() => placeBet('odd', null)} className="px-4 py-2 bg-white/5 text-white rounded-lg">Odd (2x)</button>
        </div>
        <div className="grid grid-cols-6 gap-1 mb-4">
          {NUMBERS.slice(0, 12).map(n => (
            <button key={n} onClick={() => placeBet('number', n)}
              className={`w-10 h-10 rounded-lg text-xs font-bold ${RED.includes(n) ? 'bg-red-500' : 'bg-black border border-white/20'} text-white`}>{n}</button>
          ))}
        </div>
        <p className="text-white/40 text-sm">Bets: {bets.length} | Total: ${bets.reduce((s,b) => s + b.amount, 0)}</p>
      </div>
      <div className="p-4 border-t border-[#ffffff14] space-y-3">
        <div className="flex items-center gap-2">
          <input type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          {[10,50,100,500].map(a => <button key={a} onClick={() => setBetAmount(a)} className="px-3 py-1 bg-white/5 rounded-lg text-white text-xs">{a}</button>)}
        </div>
        <button onClick={spin} disabled={spinning || bets.length===0} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-xl">Spin</button>
        <p className="text-white/40 text-sm text-center">{formatMoney(balance, currency)}</p>
      </div>
    </div>
  );
}
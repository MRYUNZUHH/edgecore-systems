"use client";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";
import confetti from "canvas-confetti";

export default function CrashGame({ onClose }: { onClose: () => void }) {
  const { balance, adjustBalance, placeBet, currency } = useStore()
  const [phase, setPhase] = useState<'betting'|'flying'|'cashedout'|'crashed'>('betting')
  const [multiplier, setMultiplier] = useState(1.0)
  const [betAmount, setBetAmount] = useState(10)
  const [crashPoint, setCrashPoint] = useState(0)
  const [history, setHistory] = useState<number[]>([2.3,1.1,8.4,1.5,3.2,1.0,14.7])
  const [countdown, setCountdown] = useState(5)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  const startRound = () => {
    if (betAmount > balance) return
    const cp = parseFloat((Math.max(1.0, 0.99 / Math.random())).toFixed(2))
    setCrashPoint(cp)
    setMultiplier(1.0)
    setPhase('flying')
    adjustBalance(-betAmount)
  }

  const cashOut = () => {
    if (phase !== 'flying') return
    if (intervalRef.current) clearInterval(intervalRef.current)
    const win = betAmount * multiplier
    adjustBalance(win)
    setHistory(prev => [parseFloat(multiplier.toFixed(2)), ...prev].slice(0,10))
    setPhase('cashedout')
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    setTimeout(() => { setPhase('betting'); setCountdown(5) }, 2500)
  }

  useEffect(() => {
    if (phase === 'betting' && countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000)
      return () => clearInterval(timer)
    }
    if (phase === 'betting' && countdown === 0 && betAmount > 0) {
      startRound()
    }
  }, [phase, countdown])

  useEffect(() => {
    if (phase !== 'flying') return
    intervalRef.current = setInterval(() => {
      setMultiplier(prev => {
        const next = parseFloat((prev + (Math.random() * 0.06 + 0.01)).toFixed(2))
        if (next >= crashPoint) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setPhase('crashed')
          setHistory(prev => [crashPoint, ...prev].slice(0,10))
          setTimeout(() => { setPhase('betting'); setCountdown(5) }, 2500)
          return crashPoint
        }
        return next
      })
    }, 100)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [phase, crashPoint])

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#ffffff14]">
        <h2 className="text-xl font-bold text-white">📈 Crash</h2>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative p-4">
        <p className={`text-6xl font-black mb-4 ${multiplier >= 2 ? 'text-green-400' : multiplier >= 1.5 ? 'text-yellow-400' : 'text-white'}`}>
          {multiplier.toFixed(2)}x
        </p>
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {history.map((h,i) => (
            <span key={i} className={`px-3 py-1 rounded-lg text-xs font-bold ${h<2?'bg-red-500/20 text-red-400':h<5?'bg-yellow-500/20 text-yellow-400':'bg-green-500/20 text-green-400'}`}>{h}x</span>
          ))}
        </div>
        {phase === 'betting' && <p className="text-white/40 text-lg">Next round in {countdown}s</p>}
        {phase === 'crashed' && <p className="text-red-400 text-xl font-bold">Crashed at {crashPoint}x</p>}
        {phase === 'cashedout' && <p className="text-green-400 text-xl font-bold">Cashed out! Won {formatMoney(betAmount * multiplier, currency)}</p>}
      </div>
      <div className="p-4 border-t border-[#ffffff14] space-y-3">
        <div className="flex items-center gap-2">
          <input type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          <span className="text-white/40 text-sm">{formatMoney(balance, currency)}</span>
        </div>
        <div className="flex gap-2">{[10,50,100,500].map(a => (
          <button key={a} onClick={() => setBetAmount(a)} className="px-3 py-1 bg-white/5 rounded-lg text-white text-xs">{a}</button>
        ))}</div>
        {phase === 'betting' && <button onClick={startRound} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-xl">Place Bet</button>}
        {phase === 'flying' && <button onClick={cashOut} className="w-full py-3 bg-green-500 text-black font-bold rounded-xl animate-pulse">Cash Out @ {multiplier.toFixed(2)}x</button>}
      </div>
    </div>
  );
}
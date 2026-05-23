"use client";
import { useRef, useEffect, useState } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";

export default function AviatorGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { balance, adjustBalance, currency, addBet } = useStore()
  const [phase, setPhase] = useState<'betting'|'flying'|'cashedout'|'crashed'>('betting')
  const [multiplier, setMultiplier] = useState(1.0)
  const [betAmount, setBetAmount] = useState(10)
  const [crashPoint, setCrashPoint] = useState(0)
  const [history, setHistory] = useState<number[]>([2.3,1.1,8.4,1.5,3.2])
  const animRef = useRef<number>(0)

  const startGame = () => {
    if (betAmount > balance) return
    adjustBalance(-betAmount)
    const cp = Math.max(1.0, 1/(1-Math.random())*0.97)
    setCrashPoint(cp)
    setMultiplier(1.0)
    setPhase('flying')
  }

  const cashOut = () => {
    const win = betAmount * multiplier
    adjustBalance(win)
    addBet({ game:'Aviator', amount:betAmount, multiplier, win, time:Date.now() })
    setHistory(prev => [multiplier, ...prev].slice(0,10))
    setPhase('cashedout')
    setTimeout(() => setPhase('betting'), 2000)
  }

  useEffect(() => {
    if (phase !== 'flying') return
    const interval = setInterval(() => {
      setMultiplier(prev => {
        const next = prev + (Math.random()*0.06+0.02)
        if (next >= crashPoint) {
          clearInterval(interval)
          setPhase('crashed')
          addBet({ game:'Aviator', amount:betAmount, multiplier:0, win:false, time:Date.now() })
          setHistory(prev => [parseFloat(crashPoint.toFixed(2)), ...prev].slice(0,10))
          setTimeout(() => setPhase('betting'), 2000)
          return crashPoint
        }
        return parseFloat(next.toFixed(2))
      })
    }, 100)
    return () => clearInterval(interval)
  }, [phase, crashPoint])

  return (
    <div className="fixed inset-0 z-50 bg-[#0D0F1A] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#1E2235]">
        <h2 className="text-xl font-bold text-white">✈️ Aviator</h2>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">×</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <canvas ref={canvasRef} className="w-full h-64" />
        <p className={`text-5xl font-black ${multiplier >= 2 ? 'text-green-400' : 'text-white'}`}>{multiplier.toFixed(2)}x</p>
        <div className="flex gap-2 mt-4">
          {history.map((h,i) => (
            <span key={i} className={`px-2 py-1 rounded text-xs font-bold ${h<2?'bg-red-500/20 text-red-400':h<5?'bg-yellow-500/20 text-yellow-400':'bg-green-500/20 text-green-400'}`}>{h}x</span>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-[#1E2235] space-y-3">
        <div className="flex items-center gap-2">
          <input type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
          <span className="text-white/40 text-sm">{formatMoney(balance, currency)}</span>
        </div>
        <div className="flex gap-2">
          {[10,50,100,500].map(a => <button key={a} onClick={() => setBetAmount(a)} className="px-3 py-1 bg-white/5 rounded-lg text-white text-xs">{a}</button>)}
        </div>
        {phase === 'betting' && <button onClick={startGame} className="w-full py-3 bg-[#E6B84F] text-black font-bold rounded-xl">Place Bet</button>}
        {phase === 'flying' && <button onClick={cashOut} className="w-full py-3 bg-green-500 text-black font-bold rounded-xl animate-pulse">Cash Out @ {multiplier.toFixed(2)}x</button>}
        {phase === 'crashed' && <p className="text-center text-red-400 font-bold">Crashed at {crashPoint.toFixed(2)}x</p>}
        {phase === 'cashedout' && <p className="text-center text-green-400 font-bold">Cashed out! Won {formatMoney(betAmount * multiplier, currency)}</p>}
      </div>
    </div>
  );
}
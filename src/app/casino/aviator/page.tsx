"use client";
import { useState, useEffect, useRef } from "react";
import { useBalance } from "@/hooks/useBalance";
import GameLayout from "@/components/layout/GameLayout";

export default function AviatorPage() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [multiplier, setMultiplier] = useState(1.00);
  const [phase, setPhase] = useState<"betting"|"flying"|"crashed"|"cashed">("betting");
  const [bet, setBet] = useState(50);
  const [crashPoint, setCrashPoint] = useState(0);
  const [history, setHistory] = useState<number[]>([2.31,1.05,8.42,1.53,3.28]);
  const [countdown, setCountdown] = useState(5);
  const timerRef = useRef<NodeJS.Timeout>();
  const posRef = useRef(0);

  const startRound = () => {
    if (!placeBet(bet)) return alert("Insufficient balance");
    const cp = parseFloat((Math.floor(100/(1-Math.random()))/100).toFixed(2)) || 1.01;
    setCrashPoint(cp); setMultiplier(1.00); setPhase("betting");
    let cd = 5; setCountdown(cd);
    timerRef.current = setInterval(() => { cd--; setCountdown(cd); if(cd<=0){clearInterval(timerRef.current);setPhase("flying");startFlying(cp);} },1000);
  };

  const startFlying = (cp: number) => {
    let m = 1.00;
    timerRef.current = setInterval(() => {
      m += 0.02; const r = parseFloat(m.toFixed(2)); setMultiplier(r); posRef.current += 2;
      if (r >= cp) { clearInterval(timerRef.current); setPhase("crashed"); setHistory(p=>[cp,...p].slice(0,20)); setTimeout(startRound,3000); }
    }, 100);
  };

  const cashOut = () => {
    if (phase !== "flying") return;
    clearInterval(timerRef.current);
    addWinnings(bet * multiplier);
    setPhase("cashed");
    setHistory(p=>[multiplier,...p].slice(0,20));
    setTimeout(startRound, 3000);
  };

  useEffect(() => { startRound(); return () => clearInterval(timerRef.current); }, []);

  return (
    <GameLayout title="✈️ Aviator" rtp={97}>
      <div className="bg-[#12121a] rounded-xl p-6 text-center mb-4">
        <div className="relative h-48 bg-[#0a0a0f] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          <span className={`text-6xl font-black transition-all ${phase==="flying"?"translate-x-"+posRef.current+"px":"translate-x-0"} ${phase==="crashed"?"text-red-500 scale-0":phase==="cashed"?"text-green-400":"text-white"}`}>✈️</span>
        </div>
        <p className={`text-5xl font-bold mb-2 ${phase==="crashed"?"text-red-400":phase==="cashed"?"text-green-400":"text-[#f0b429]"}`}>{multiplier.toFixed(2)}x</p>
        <p className="text-sm text-gray-400">{phase==="betting"&&`Round starts in ${countdown}s`}{phase==="flying"&&"Cash out before crash!"}{phase==="crashed"&&`Crashed at ${crashPoint.toFixed(2)}x`}{phase==="cashed"&&"You cashed out!"}</p>
        <div className="flex gap-1.5 flex-wrap justify-center mt-3">{history.slice(0,10).map((h,i)=><span key={i} className={`px-2 py-0.5 rounded text-xs font-bold ${h<2?"bg-red-500/20 text-red-400":h<5?"bg-yellow-500/20 text-yellow-400":"bg-green-500/20 text-green-400"}`}>{h}x</span>)}</div>
      </div>
      <div className="bg-[#12121a] rounded-xl p-4 space-y-3">
        <div className="flex gap-2 items-center">
          <input type="number" value={bet} onChange={e=>setBet(Number(e.target.value))} className="w-full bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-4 py-2" disabled={phase!=="betting"} />
          {[10,50,100,500].map(v=><button key={v} onClick={()=>setBet(v)} className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg">{v}</button>)}
        </div>
        {phase==="betting"&&<button onClick={startRound} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Place Bet (${bet})</button>}
        {phase==="flying"&&<button onClick={cashOut} className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-lg animate-pulse">Cash Out @ {multiplier.toFixed(2)}x (${(bet*multiplier).toFixed(2)})</button>}
      </div>
    </GameLayout>
  );
}
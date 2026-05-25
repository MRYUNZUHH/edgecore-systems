"use client";
import { useState, useEffect, useRef } from "react";
import { useBalance } from "@/hooks/useBalance";
import GameLayout from "@/components/layout/GameLayout";

export default function CrashPage() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [multiplier, setMultiplier] = useState(1.00);
  const [phase, setPhase] = useState<"betting"|"flying"|"crashed"|"cashed">("betting");
  const [bet, setBet] = useState(50);
  const [crashPoint, setCrashPoint] = useState(0);
  const [history, setHistory] = useState<number[]>([2.31,1.05,8.42,1.53,3.28]);
  const [countdown, setCountdown] = useState(5);
  const [autoCashout, setAutoCashout] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRound = () => {
    if (!placeBet(bet)) return alert("Insufficient balance");
    const cp = parseFloat((Math.floor(100/(1-Math.random()))/100).toFixed(2)) || 1.01;
    setCrashPoint(cp); setMultiplier(1.00); setPhase("betting"); pointsRef.current = [];
    let cd = 5; setCountdown(cd);
    timerRef.current = setInterval(() => { cd--; setCountdown(cd); if(cd<=0){clearInterval(timerRef.current);setPhase("flying");startFlying(cp);} },1000);
  };

  const startFlying = (cp: number) => {
    let m = 1.00;
    timerRef.current = setInterval(() => {
      m += m * 0.015; const r = parseFloat(m.toFixed(2)); setMultiplier(r); pointsRef.current.push(r); drawGraph();
      if (autoCashout > 1 && r >= autoCashout) cashOut(r);
      if (r >= cp) { clearInterval(timerRef.current); setPhase("crashed"); setHistory(p=>[cp,...p].slice(0,20)); setTimeout(startRound,3000); }
    }, 100);
  };

  const cashOut = (m?: number) => {
    clearInterval(timerRef.current);
    const payout = bet * (m || multiplier);
    addWinnings(payout);
    setPhase("cashed");
    setHistory(p=>[(m||multiplier),...p].slice(0,20));
    setTimeout(startRound, 3000);
  };

  const drawGraph = () => {
    const c = canvasRef.current; if(!c) return;
    const ctx = c.getContext("2d")!; const W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
    for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,H*i/4);ctx.lineTo(W,H*i/4);ctx.stroke();}
    const pts = pointsRef.current; if(pts.length<2)return;
    const maxM = Math.max(...pts,2);
    ctx.beginPath(); ctx.strokeStyle = phase==="crashed"?"#ff4444":"#f0b429"; ctx.lineWidth=3;
    pts.forEach((m,i)=>{const x=(i/pts.length)*W;const y=H-((m-1)/(maxM-1||1))*H*0.8-H*0.1;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);});
    ctx.stroke();
  };

  useEffect(() => { startRound(); return () => clearInterval(timerRef.current); }, []);

  return (
    <GameLayout title="📈 Crash" rtp={97}>
      <div className="bg-[#12121a] rounded-xl p-4 text-center mb-4">
        <canvas ref={canvasRef} width={600} height={280} className="w-full rounded-lg mb-2" />
        <p className={`text-5xl font-bold ${phase==="crashed"?"text-red-400":phase==="cashed"?"text-green-400":"text-[#f0b429]"}`}>{multiplier.toFixed(2)}x</p>
        <p className="text-sm text-gray-400 mt-1">{phase==="flying"&&"Cash out!"}{phase==="crashed"&&`Crashed at ${crashPoint.toFixed(2)}x`}{phase==="cashed"&&"Won!"}</p>
        <div className="flex gap-1.5 flex-wrap justify-center mt-3">{history.slice(0,10).map((h,i)=><span key={i} className={`px-2 py-0.5 rounded text-xs font-bold ${h<2?"bg-red-500/20 text-red-400":h<5?"bg-yellow-500/20 text-yellow-400":"bg-green-500/20 text-green-400"}`}>{h}x</span>)}</div>
      </div>
      <div className="bg-[#12121a] rounded-xl p-4 space-y-3">
        <div className="flex gap-2 items-center">
          <input type="number" value={bet} onChange={e=>setBet(Number(e.target.value))} className="w-full bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-4 py-2" disabled={phase!=="betting"} />
          {[10,50,100,500].map(v=><button key={v} onClick={()=>setBet(v)} className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg">{v}</button>)}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-400">Auto Cashout:</span>
          <input type="number" value={autoCashout||""} onChange={e=>setAutoCashout(Number(e.target.value))} placeholder="e.g. 2.00" className="flex-1 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-4 py-2 text-sm" />
        </div>
        {phase==="betting"&&<button onClick={startRound} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Place Bet (${bet})</button>}
        {phase==="flying"&&<button onClick={()=>cashOut()} className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-lg animate-pulse">Cash Out @ {multiplier.toFixed(2)}x (${(bet*multiplier).toFixed(2)})</button>}
      </div>
    </GameLayout>
  );
}
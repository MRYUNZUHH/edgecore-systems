"use client";
import { useState, useEffect, useRef } from "react";
import { useBalance } from "@/lib/useBalance";
import GameShell from "@/components/layout/GameShell";
import RulesModal from "@/components/ui/RulesModal";
import { crashPoint } from "@/lib/gameEngine";
import { playCoin, playCrash, playWin } from "@/lib/sounds";

export default function Page() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [mult, setMult] = useState(1);
  const [phase, setPhase] = useState("betting");
  const [bet, setBet] = useState(50);
  const [cp, setCp] = useState(0);
  const [hist, setHist] = useState<number[]>([2.31, 1.05, 8.42]);
  const [auto, setAuto] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pts = useRef<number[]>([]);
  const timer = useRef<NodeJS.Timeout>();

  const draw = () => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!; const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, H * i / 4); ctx.lineTo(W, H * i / 4); ctx.stroke(); }
    if (pts.current.length < 2) return;
    const maxM = Math.max(...pts.current, 2);
    ctx.beginPath(); ctx.strokeStyle = phase === "crashed" ? "#ff4444" : "#f0b429"; ctx.lineWidth = 3;
    pts.current.forEach((m, i) => { const x = (i / pts.current.length) * W; const y = H - ((m - 1) / (maxM - 1)) * H * 0.8 - H * 0.1; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
    ctx.stroke();
    if (phase === "crashed") { ctx.fillStyle = "rgba(255,0,0,0.15)"; ctx.fillRect(0, 0, W, H); }
  };

  const start = () => {
    if (!placeBet(bet)) return;
    const c = crashPoint(); setCp(c); setMult(1); setPhase("betting"); pts.current = [];
    let cd = 5; setCountdown(cd);
    timer.current = setInterval(() => { cd--; setCountdown(cd); if (cd <= 0) { clearInterval(timer.current); setPhase("flying"); playCoin(); let m = 1; timer.current = setInterval(() => { m += m * 0.015; const r = parseFloat(m.toFixed(2)); setMult(r); pts.current.push(r); draw(); if (auto > 1 && r >= auto) cashOut(r); if (r >= c) { clearInterval(timer.current); setPhase("crashed"); playCrash(); setHist(p => [c, ...p].slice(0, 20)); setTimeout(start, 3000); } }, 100); } }, 1000);
  };

  const cashOut = (m?: number) => { clearInterval(timer.current); addWinnings(bet * (m || mult)); setPhase("cashed"); playWin(); setHist(p => [(m || mult), ...p].slice(0, 20)); setTimeout(start, 3000); };

  useEffect(() => { start(); return () => clearInterval(timer.current); }, []);

  return (
    <GameShell title="📈 Crash" history={hist.slice(0, 15).map((h, i) => <span key={i} className={"inline-block px-2 py-0.5 rounded text-xs font-bold m-0.5 " + (h < 2 ? "bg-red-500/20 text-red-400" : h < 5 ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400")}>{h}x</span>)}>
      <RulesModal gameKey="crash" title="Crash" emoji="📈" accentColor="#f0b429" rules={["Place your bet before the round starts","A multiplier begins rising from 1.00x","Cash out manually before the graph crashes","If you don't cash out in time, you lose your bet","The crash point is randomly determined each round","You can see recent crash history to gauge patterns","Higher multipliers = higher risk, higher reward"]} />
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4">
        <canvas ref={canvasRef} width={500} height={240} className="w-full rounded-lg" />
        <p className={"text-4xl font-bold text-center mt-2 " + (phase === "crashed" ? "text-red-400" : phase === "cashed" ? "text-green-400" : "text-[#f0b429]")}>{mult.toFixed(2)}x</p>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2" disabled={phase !== "betting"} />{[10, 50, 100, 500].map(v => <button key={v} onClick={() => setBet(v)} className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg">{v}</button>)}</div>
        <input type="number" value={auto || ""} onChange={e => setAuto(Number(e.target.value))} placeholder="Auto cashout" className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2 text-sm" />
        {phase === "betting" && <button onClick={start} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Place Bet</button>}
        {phase === "flying" && <button onClick={() => cashOut()} className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-lg animate-pulse">Cash Out</button>}
      </div>
    </GameShell>
  );
}
"use client";
import { useState, useRef, useEffect } from "react";
import { useBalance } from "@/lib/useBalance";
import GameShell from "@/components/layout/GameShell";
import RulesModal from "@/components/ui/RulesModal";
import { playBallTick, playWin } from "@/lib/sounds";

const SLOTS = [[2,1.5,1,0.7,0.5,0.3,0.2,0.3,0.5,0.7,1,1.5,2],[10,5,2,1,0.5,0.2,0.1,0.2,0.5,1,2,5,10],[50,20,10,3,1,0.5,0.1,0.5,1,3,10,20,50]];

export default function Page() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [bet, setBet] = useState(50);
  const [risk, setRisk] = useState(1);
  const [ball, setBall] = useState<{ x: number; y: number; col: number; active: boolean } | null>(null);
  const [hist, setHist] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drop = () => {
    if (!placeBet(bet)) return;
    const col = Math.floor(Math.random() * 13);
    let x = 50, y = 0, active = true, row = 0;
    const animate = () => {
      if (!active) return;
      row++;
      if (row >= 12) {
        active = false;
        const m = SLOTS[risk][col]; addWinnings(bet * m); setHist(p => [m, ...p].slice(0, 15));
        playWin(); setBall(null); return;
      }
      x += (Math.random() - 0.5) * 8;
      y = (row / 12) * 100;
      playBallTick();
      setBall({ x, y, col, active: true });
      requestAnimationFrame(() => setTimeout(animate, 150));
    };
    setBall({ x, y, col, active: true });
    animate();
  };

  return (
    <GameShell title="🟡 Plinko" history={hist.slice(0, 12).map((h, i) => <span key={i} className={"inline-block px-2 py-0.5 rounded text-xs font-bold m-0.5 " + (h >= 5 ? "bg-green-500/20 text-green-400" : h >= 1 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400")}>{h}x</span>)}>
      <RulesModal gameKey="plinko" title="Plinko" emoji="🟡" accentColor="#f0b429" rules={["Drop a ball from the top of the peg board","The ball bounces randomly through pegs","It lands in a multiplier slot at the bottom","Higher risk setting = wider range of multipliers","Each drop is independent - no memory of past drops","Your payout = bet × the slot multiplier the ball lands in"]} />
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4">
        <div className="relative h-72 bg-[#0a0a0f] rounded-lg overflow-hidden mb-4">
          {Array.from({ length: 12 }).map((_, r) => <div key={r} className="absolute flex justify-center w-full" style={{ top: ((r + 1) / 13 * 85) + "%" }}>{Array.from({ length: r + 2 }).map((_, p) => <div key={p} className="w-1.5 h-1.5 rounded-full bg-gray-600 mx-5" />)}</div>)}
          {ball && <div className="absolute w-3 h-3 rounded-full bg-[#f0b429] transition-all duration-200 shadow-[0_0_10px_#f0b429]" style={{ left: ball.x + "%", top: ball.y + "%", transform: "translate(-50%,-50%)" }} />}
          <div className="absolute bottom-0 flex w-full">{SLOTS[risk].map((s, i) => <div key={i} className={"flex-1 text-center text-[10px] font-bold py-1 " + (s >= 5 ? "bg-green-500/20 text-green-400" : s >= 1 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400")}>{s}x</div>)}</div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2">{["Low","Med","High"].map((l, i) => <button key={l} onClick={() => setRisk(i)} className={"flex-1 py-2 rounded-lg font-bold text-sm " + (risk === i ? "bg-[#f0b429] text-black" : "bg-gray-800 text-gray-400")}>{l}</button>)}</div>
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2" /></div>
        <button onClick={drop} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Drop Ball</button>
      </div>
    </GameShell>
  );
}
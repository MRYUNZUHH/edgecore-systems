"use client";
import { useState } from "react";
import { useBalance } from "@/lib/useBalance";
import GameShell from "@/components/layout/GameShell";
import RulesModal from "@/components/ui/RulesModal";
import { playCoin, playWin } from "@/lib/sounds";

const RED = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const NUMS = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];

export default function Page() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [bet, setBet] = useState(50);
  const [bets, setBets] = useState<any[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hist, setHist] = useState<number[]>([]);

  const place = (type: string, val?: number) => { setBets(p => [...p, { type, val, amount: bet }]); playCoin(); };

  const spin = () => {
    if (bets.length === 0) return;
    const totalB = bets.reduce((s, b) => s + b.amount, 0);
    if (!placeBet(totalB)) return;
    setSpinning(true); setResult(null);
    const num = Math.floor(Math.random() * 37);
    const deg = 360 * 5 + (num / 37) * 360;
    setRotation(deg);
    setTimeout(() => {
      setResult(num); let win = 0;
      bets.forEach(b => { if (b.type === "number" && b.val === num) win += b.amount * 35; if (b.type === "red" && RED.includes(num)) win += b.amount * 2; if (b.type === "black" && !RED.includes(num) && num !== 0) win += b.amount * 2; if (b.type === "even" && num % 2 === 0 && num !== 0) win += b.amount * 2; if (b.type === "odd" && num % 2 === 1) win += b.amount * 2; });
      if (win > 0) { addWinnings(win); playWin(); }
      setHist(p => [num, ...p].slice(0, 20)); setSpinning(false); setBets([]);
    }, 4000);
  };

  return (
    <GameShell title="🎡 Roulette" history={hist.slice(0, 15).map((h, i) => <span key={i} className={"inline-block px-2 py-0.5 rounded text-xs font-bold m-0.5 " + (RED.includes(h) ? "bg-red-500/20 text-red-400" : h === 0 ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400")}>{h}</span>)}>
      <RulesModal gameKey="roulette" title="Roulette" emoji="🎡" accentColor="#dc2626" rules={["Place chips on numbers, colors, or groups before spinning","Click Spin to launch the wheel","If the ball lands on your selection, you win","Red/Black pays 2x, single numbers pay 36x","0 (green) wins for the house on most outside bets","You can place multiple bets per spin"]} />
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 text-center">
        <div className="relative w-56 h-56 mx-auto mb-4">
          <div className="w-full h-full rounded-full border-4 border-[#f0b429] flex items-center justify-center transition-all duration-[4s] ease-out" style={{ transform: "rotate(" + rotation + "deg)", background: "conic-gradient(#dc2626 0deg 9.7deg,#1a1a2e 9.7deg 19.5deg,#dc2626 19.5deg 29.2deg,#1a1a2e 29.2deg 38.9deg,#dc2626 38.9deg 48.6deg,#1a1a2e 48.6deg 58.4deg,#dc2626 58.4deg 68.1deg,#1a1a2e 68.1deg 77.8deg,#dc2626 77.8deg 87.6deg,#1a1a2e 87.6deg 97.3deg,#dc2626 97.3deg 107deg,#1a1a2e 107deg 116.8deg,#dc2626 116.8deg 126.5deg,#1a1a2e 126.5deg 136.2deg,#dc2626 136.2deg 145.9deg,#1a1a2e 145.9deg 155.7deg,#dc2626 155.7deg 165.4deg,#1a1a2e 165.4deg 175.1deg,#22c55e 175.1deg 184.9deg,#dc2626 184.9deg 194.6deg,#1a1a2e 194.6deg 204.3deg,#dc2626 204.3deg 214.1deg,#1a1a2e 214.1deg 223.8deg,#dc2626 223.8deg 233.5deg,#1a1a2e 233.5deg 243.2deg,#dc2626 243.2deg 253deg,#1a1a2e 253deg 262.7deg,#dc2626 262.7deg 272.4deg,#1a1a2e 272.4deg 282.2deg,#dc2626 282.2deg 291.9deg,#1a1a2e 291.9deg 301.6deg,#dc2626 301.6deg 311.4deg,#1a1a2e 311.4deg 321.1deg,#dc2626 321.1deg 330.8deg,#1a1a2e 330.8deg 340.5deg,#dc2626 340.5deg 350.3deg,#1a1a2e 350.3deg 360deg)" }}>
            <span className="bg-white w-8 h-8 rounded-full shadow-lg" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-2xl">▼</div>
        </div>
        {result !== null && <p className={"mt-2 font-bold " + (RED.includes(result) ? "text-red-400" : result === 0 ? "text-green-400" : "text-gray-400")}>Result: {result}</p>}
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2 flex-wrap justify-center">
          <button onClick={() => place("red")} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold text-sm">Red 2x</button>
          <button onClick={() => place("black")} className="px-4 py-2 bg-gray-800 text-white rounded-lg font-bold text-sm">Black 2x</button>
          <button onClick={() => place("even")} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">Even 2x</button>
          <button onClick={() => place("odd")} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">Odd 2x</button>
        </div>
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2" /></div>
        <p className="text-xs text-gray-400">Bets: {bets.length} · Total: ${bets.reduce((s, b) => s + b.amount, 0)}</p>
        <button onClick={spin} disabled={spinning || bets.length === 0} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Spin</button>
      </div>
    </GameShell>
  );
}
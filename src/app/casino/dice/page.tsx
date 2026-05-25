"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";
import GameLayout from "@/components/layout/GameLayout";

export default function DicePage() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [bet, setBet] = useState(50); const [target, setTarget] = useState(50);
  const [over, setOver] = useState(false); const [result, setResult] = useState<number|null>(null);
  const [rolling, setRolling] = useState(false); const [lastWin, setLastWin] = useState(false);
  const multiplier = parseFloat((99/(over?99-target:target)).toFixed(2));

  const roll = () => {
    if(!placeBet(bet)) return alert("Insufficient balance");
    setRolling(true); setResult(null);
    setTimeout(() => {
      const r = Math.floor(Math.random()*10000)/100;
      setResult(r); const win = over ? r>target : r<target; setLastWin(win);
      if(win) addWinnings(bet*multiplier);
      setRolling(false);
    }, 800);
  };

  return (
    <GameLayout title="🎲 Dice" rtp={96}>
      <div className="bg-[#12121a] rounded-xl p-6 text-center mb-4">
        <div className="text-6xl font-bold text-white my-6">{result!==null?result.toFixed(2):"?"}</div>
        {result!==null&&<p className={`text-lg font-bold ${lastWin?"text-[#00ff88]":"text-red-400"}`}>{lastWin?`Won $${(bet*multiplier).toFixed(2)}`:"Lost"}</p>}
      </div>
      <div className="bg-[#12121a] rounded-xl p-4 space-y-3">
        <div className="flex gap-2">
          <button onClick={()=>setOver(false)} className={`flex-1 py-2 rounded-lg font-bold text-sm ${!over?"bg-[#f0b429] text-black":"bg-gray-800 text-gray-400"}`}>Roll Under</button>
          <button onClick={()=>setOver(true)} className={`flex-1 py-2 rounded-lg font-bold text-sm ${over?"bg-[#f0b429] text-black":"bg-gray-800 text-gray-400"}`}>Roll Over</button>
        </div>
        <input type="range" min={2} max={98} value={target} onChange={e=>setTarget(Number(e.target.value))} className="w-full" />
        <p className="text-center text-xs text-gray-400">Target: {target} · Win: {over?99-target:target}% · Payout: {multiplier.toFixed(2)}x</p>
        <div className="flex gap-2">
          <input type="number" value={bet} onChange={e=>setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-4 py-2" />
          {[10,50,100,500].map(v=><button key={v} onClick={()=>setBet(v)} className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg">{v}</button>)}
        </div>
        <button onClick={roll} disabled={rolling} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Roll Dice</button>
      </div>
    </GameLayout>
  );
}
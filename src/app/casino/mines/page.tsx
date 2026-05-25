"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";
import GameLayout from "@/components/layout/GameLayout";

const MULT_TABLE: Record<number,number[]> = {
  1:[1.04,1.09,1.15,1.22,1.30,1.40,1.52,1.67,1.85,2.08,2.38,2.78,3.33,4.17,5.56,8.33,14.29,33.33],
  3:[1.12,1.27,1.45,1.68,1.97,2.35,2.85,3.54,4.51,5.96,8.21,11.90,18.56,32.49,68.22,200],
  5:[1.22,1.52,1.93,2.51,3.34,4.59,6.56,9.80,15.39,25.87,48,102.86,266.67,1000],
};

export default function MinesPage() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [bet, setBet] = useState(50); const [mines, setMines] = useState(3);
  const [board, setBoard] = useState<string[]>(Array(25).fill("hidden"));
  const [minePos, setMinePos] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(0); const [mult, setMult] = useState(1);
  const [active, setActive] = useState(false); const [result, setResult] = useState<"win"|"loss"|null>(null);

  const start = () => {
    if(!placeBet(bet)) return alert("Insufficient balance");
    const mp: number[] = [];
    while(mp.length < mines) { const p = Math.floor(Math.random()*25); if(!mp.includes(p)) mp.push(p); }
    setMinePos(mp); setBoard(Array(25).fill("hidden")); setRevealed(0); setMult(1); setActive(true); setResult(null);
  };

  const click = (i: number) => {
    if(!active||board[i]!=="hidden") return;
    if(minePos.includes(i)){
      const b=[...board]; b[i]="bomb"; minePos.forEach(m=>{if(b[m]==="hidden")b[m]="bomb";});
      setBoard(b); setActive(false); setResult("loss");
    }else{
      const b=[...board]; b[i]="gem"; const r=revealed+1; setBoard(b); setRevealed(r);
      const mults=MULT_TABLE[mines]||MULT_TABLE[3];
      setMult(mults[Math.min(r-1,mults.length-1)]||mult);
      if(r>=25-mines) cashOut(mults[Math.min(r-1,mults.length-1)]||mult);
    }
  };

  const cashOut = (m?: number) => { addWinnings(bet*(m||mult)); setActive(false); setResult("win"); };

  return (
    <GameLayout title="💣 Mines" rtp={95}>
      <div className="flex justify-between text-center mb-4">
        <div><p className="text-xs text-gray-400">Multiplier</p><p className="text-2xl font-bold text-[#f0b429]">{mult.toFixed(2)}x</p></div>
        <div><p className="text-xs text-gray-400">Balance</p><p className="text-lg font-bold text-white">${balance.toFixed(2)}</p></div>
        <div><p className="text-xs text-gray-400">Potential</p><p className="text-lg font-bold text-[#00ff88]">${(bet*mult).toFixed(2)}</p></div>
      </div>
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {board.map((c,i)=><button key={i} onClick={()=>click(i)} disabled={!active||c!=="hidden"} className={`aspect-square rounded-lg text-xl font-bold transition ${c==="hidden"&&active?"bg-gray-800 border border-gray-700 hover:border-[#f0b429]":c==="hidden"?"bg-gray-800 opacity-50":c==="gem"?"bg-green-500/20 border-green-500":"bg-red-500/20 border-red-500"}`}>{c==="hidden"?"?":c==="gem"?"💎":"💣"}</button>)}
      </div>
      <div className="bg-[#12121a] rounded-xl p-4 space-y-3">
        {!active?<>
          <div className="flex gap-2">
            <input type="number" value={bet} onChange={e=>setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-4 py-2" />
            <select value={mines} onChange={e=>setMines(Number(e.target.value))} className="bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-2 py-2 w-20">{[1,3,5,10,15].map(v=><option key={v} value={v}>{v}</option>)}</select>
          </div>
          <button onClick={start} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Start Game</button>
          {result==="win"&&<p className="text-green-400 text-center font-bold">Won ${(bet*mult).toFixed(2)}!</p>}
          {result==="loss"&&<p className="text-red-400 text-center font-bold">Lost</p>}
        </>:<button onClick={()=>cashOut()} className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-lg animate-pulse">Cash Out ${(bet*mult).toFixed(2)}</button>}
      </div>
    </GameLayout>
  );
}
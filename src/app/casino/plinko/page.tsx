"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";
import GameLayout from "@/components/layout/GameLayout";

const ROWS = 12;
const SLOTS_LOW = [2,1.5,1,0.7,0.5,0.3,0.2,0.3,0.5,0.7,1,1.5,2];
const SLOTS_MED = [10,5,2,1,0.5,0.2,0.1,0.2,0.5,1,2,5,10];
const SLOTS_HIGH = [50,20,10,3,1,0.5,0.1,0.5,1,3,10,20,50];

export default function PlinkoPage() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [bet, setBet] = useState(50); const [risk, setRisk] = useState<"low"|"med"|"high">("med");
  const [balls, setBalls] = useState<{x:number;y:number;col:number;active:boolean}[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  const slots = risk==="low"?SLOTS_LOW:risk==="med"?SLOTS_MED:SLOTS_HIGH;

  const drop = () => {
    if(!placeBet(bet)) return alert("Insufficient balance");
    const col = Math.floor(Math.random() * slots.length);
    setBalls([{x:50,y:0,col,active:true}]);
    let row = 0;
    const interval = setInterval(() => {
      row++;
      setBalls([{x: 50 + (Math.random()-0.5)*10*(row/ROWS), y: (row/ROWS)*100, col, active: row < ROWS }]);
      if(row >= ROWS) {
        clearInterval(interval);
        const mult = slots[col]; addWinnings(bet*mult);
        setHistory(p=>[mult,...p].slice(0,10));
      }
    }, 200);
  };

  return (
    <GameLayout title="🟡 Plinko" rtp={96.5}>
      <div className="bg-[#12121a] rounded-xl p-4 mb-4">
        <div className="relative h-80 bg-[#0a0a0f] rounded-lg mb-4 overflow-hidden">
          {Array.from({length:ROWS}).map((_,r)=><div key={r} className="absolute flex justify-center w-full" style={{top:`${(r+1)/ROWS*80}%`}}>{Array.from({length:r+2}).map((_,p)=><div key={p} className="w-2 h-2 rounded-full bg-gray-600 mx-6" />)}</div>)}
          {balls.map((b,i)=><div key={i} className="absolute w-4 h-4 rounded-full bg-[#f0b429] transition-all duration-200" style={{left:`${b.x}%`,top:`${b.y}%`,transform:"translate(-50%,-50%)"}} />)}
          <div className="absolute bottom-0 flex w-full">{slots.map((s,i)=><div key={i} className={`flex-1 text-center text-xs font-bold py-1 ${s>=5?"bg-green-500/20 text-green-400":s>=1?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}`}>{s}x</div>)}</div>
        </div>
        <div className="flex gap-2 flex-wrap">{history.map((h,i)=><span key={i} className={`px-2 py-0.5 rounded text-xs font-bold ${h>=5?"bg-green-500/20 text-green-400":h>=1?"bg-yellow-500/20 text-yellow-400":"bg-red-500/20 text-red-400"}`}>{h}x</span>)}</div>
      </div>
      <div className="bg-[#12121a] rounded-xl p-4 space-y-3">
        <div className="flex gap-2">
          {(["low","med","high"] as const).map(r=><button key={r} onClick={()=>setRisk(r)} className={`flex-1 py-2 rounded-lg font-bold text-sm capitalize ${risk===r?"bg-[#f0b429] text-black":"bg-gray-800 text-gray-400"}`}>{r}</button>)}
        </div>
        <div className="flex gap-2">
          <input type="number" value={bet} onChange={e=>setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white px-4 py-2" />
          {[10,50,100,500].map(v=><button key={v} onClick={()=>setBet(v)} className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg">{v}</button>)}
        </div>
        <button onClick={drop} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Drop Ball</button>
      </div>
    </GameLayout>
  );
}
"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";

const SEGMENTS = [50,5,1,20,3,10,2,40,1,8,3,15,2,30,1,5,10,2,25,3,8,1,20,5,1,10,3,40,2,15,1,8,10,2,30,1,5,3,20,2,10,1,15,8,2,50,3,10,1,25,2,8,5,1];

export default function WheelGame() {
  const { balance, update } = useBalance();
  const [bet, setBet] = useState(50);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (bet > balance) return alert("Insufficient balance");
    update(-bet);
    const idx = Math.floor(Math.random() * SEGMENTS.length);
    const seg = SEGMENTS[idx];
    const deg = 360 * 5 + (idx * (360 / SEGMENTS.length));
    setRotation(deg);
    setSpinning(true);
    setTimeout(() => {
      setResult(seg);
      if (seg >= 1) update(bet * seg);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="card p-6 text-center">
        <p className="text-xs text-muted mb-2">Balance: <span className="text-gold font-bold">${balance.toFixed(2)}</span></p>
        <div className="relative w-64 h-64 mx-auto">
          <div className={`w-full h-full rounded-full border-4 border-gold flex items-center justify-center text-3xl font-black text-white transition-all duration-[4s] ${spinning ? "animate-spin" : ""}`}
            style={{ transform: `rotate(${rotation}deg)`, background: "conic-gradient(#EF4444 0deg 30deg,#3B82F6 30deg 60deg,#10B981 60deg 90deg,#F59E0B 90deg 120deg,#8B5CF6 120deg 150deg,#EF4444 150deg 180deg,#3B82F6 180deg 210deg,#10B981 210deg 240deg,#F59E0B 240deg 270deg,#8B5CF6 270deg 300deg,#EF4444 300deg 330deg,#3B82F6 330deg 360deg)" }}>
            <span className="bg-white w-8 h-8 rounded-full" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-2xl">▼</div>
        </div>
        {result !== null && <p className="mt-4 text-xl font-bold text-gold">{result}x {result > 0 ? `Won $${bet * result}` : "Lost"}</p>}
      </div>
      <div className="card p-4 space-y-3">
        <div className="flex gap-2">
          <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="input-field flex-1" />
          {[10, 50, 100, 500].map(v => <button key={v} onClick={() => setBet(v)} className="px-3 py-1 bg-[var(--bg3)] text-white text-xs rounded-lg">{v}</button>)}
        </div>
        <button onClick={spin} disabled={spinning} className="btn-gold w-full py-3">Spin the Wheel</button>
      </div>
    </div>
  );
}
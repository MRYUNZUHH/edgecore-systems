"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";

export default function KenoGame() {
  const { balance, update } = useBalance();
  const [bet, setBet] = useState(50);
  const [picks, setPicks] = useState<number[]>([]);
  const [drawn, setDrawn] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const toggle = (n: number) => {
    if (picks.includes(n)) setPicks(picks.filter(p => p !== n));
    else if (picks.length < 10) setPicks([...picks, n]);
  };

  const play = () => {
    if (picks.length === 0 || bet > balance) return;
    update(-bet);
    const d = Array.from({ length: 40 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 10);
    setDrawn(d);
    const matches = d.filter(n => picks.includes(n)).length;
    setResult(matches);
    if (matches >= 4) update(bet * matches * 2);
  };

  const clear = () => { setPicks([]); setDrawn([]); setResult(null); };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="card p-6 text-center">
        <p className="text-xs text-muted mb-2">Balance: <span className="text-gold font-bold">${balance.toFixed(2)}</span></p>
        <p className="text-sm text-muted mb-3">Pick {picks.length}/10 numbers</p>
        <div className="grid grid-cols-8 gap-1 mb-4">
          {Array.from({ length: 40 }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => toggle(n)} className={`aspect-square rounded text-xs font-bold ${picks.includes(n) ? "bg-gold text-black" : drawn.includes(n) ? "bg-blue-500/30 text-white" : "bg-[var(--bg3)] text-muted hover:bg-white/10"}`}>{n}</button>
          ))}
        </div>
        {result !== null && <p className="text-lg font-bold text-gold">Matched {result}/10! {result >= 4 ? `Won $${bet * result * 2}` : "Lost"}</p>}
      </div>
      <div className="card p-4 space-y-3">
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="input-field flex-1" /></div>
        <div className="flex gap-2">
          <button onClick={play} disabled={picks.length === 0} className="btn-gold flex-1 py-2">Play</button>
          <button onClick={clear} className="flex-1 py-2 border border-[var(--border)] text-muted rounded-lg text-sm">Clear</button>
        </div>
      </div>
    </div>
  );
}
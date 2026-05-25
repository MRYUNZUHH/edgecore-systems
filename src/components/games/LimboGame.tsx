"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";

export default function LimboGame() {
  const { balance, update } = useBalance();
  const [bet, setBet] = useState(50);
  const [target, setTarget] = useState(2);
  const [result, setResult] = useState<number | null>(null);
  const [lastWin, setLastWin] = useState(false);

  const play = () => {
    if (bet > balance) return alert("Insufficient balance");
    update(-bet);
    const r = parseFloat((1 / (1 - Math.random()) * 0.99).toFixed(2));
    setResult(r);
    const win = r >= target;
    setLastWin(win);
    if (win) update(bet * target);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="card p-6 text-center">
        <p className="text-xs text-muted mb-2">Balance: <span className="text-gold font-bold">${balance.toFixed(2)}</span></p>
        <div className="text-6xl font-heading font-bold text-white my-6">{result !== null ? result.toFixed(2) + "x" : "?"}</div>
        {result !== null && <p className={`text-lg font-bold ${lastWin ? "text-green-400" : "text-red-400"}`}>{lastWin ? `Won $${(bet * target).toFixed(2)}!` : "Lost"}</p>}
      </div>
      <div className="card p-4 space-y-3">
        <div>
          <label className="text-xs text-muted">Target Multiplier: {target}x</label>
          <input type="range" min={1.1} max={100} step={0.1} value={target} onChange={e => setTarget(Number(e.target.value))} className="w-full mt-1" />
        </div>
        <p className="text-xs text-muted">Win Chance: {(1 / target * 100).toFixed(2)}% · Payout: {target.toFixed(2)}x</p>
        <div className="flex gap-2">
          <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="input-field flex-1" />
          {[10, 50, 100, 500].map(v => <button key={v} onClick={() => setBet(v)} className="px-3 py-1 bg-[var(--bg3)] text-white text-xs rounded-lg">{v}</button>)}
        </div>
        <button onClick={play} className="btn-gold w-full py-3">Play Limbo</button>
      </div>
    </div>
  );
}
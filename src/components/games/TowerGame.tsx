"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";

const MULT = [1.32, 1.75, 2.3, 3.0, 4.0, 5.3, 7.0, 11, 18, 30];

export default function TowerGame() {
  const { balance, update } = useBalance();
  const [bet, setBet] = useState(50);
  const [level, setLevel] = useState(0);
  const [tiles, setTiles] = useState<number[]>([]);
  const [active, setActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const start = () => {
    if (bet > balance) return;
    update(-bet);
    setLevel(0);
    setTiles(Array.from({ length: 9 }, () => Math.floor(Math.random() * 3)));
    setActive(true);
    setGameOver(false);
  };

  const pick = (col: number) => {
    if (!active || gameOver) return;
    if (col === tiles[level]) {
      const l = level + 1;
      setLevel(l);
      if (l >= 9) { update(bet * MULT[8]); setGameOver(true); }
    } else { setGameOver(true); }
  };

  const cashOut = () => { update(bet * MULT[Math.max(0, level - 1)]); setActive(false); };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="card p-6 text-center">
        <p className="text-xs text-muted mb-2">Balance: <span className="text-gold font-bold">${balance.toFixed(2)}</span></p>
        <p className="text-2xl font-heading font-bold text-gold mb-4">Level {level}/9 · {level > 0 ? MULT[level - 1].toFixed(2) : "1.00"}x</p>
        <div className="space-y-1">
          {Array.from({ length: 9 }).map((_, r) => (
            <div key={r} className="flex gap-1 justify-center">
              {Array.from({ length: 3 }).map((_, c) => (
                <button key={c} onClick={() => pick(c)} disabled={!active || gameOver || r !== level}
                  className={`w-16 h-16 rounded-lg text-xl font-bold transition ${r < level ? "bg-green-500/20" : r === level && active ? "bg-[var(--bg3)] border border-[var(--border)] hover:border-gold" : "bg-[var(--bg3)] opacity-30"}`}>
                  {r < level ? "✅" : r === level ? "?" : "🔒"}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="card p-4 space-y-3">
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="input-field flex-1" /></div>
        {!active ? (
          <button onClick={start} className="btn-gold w-full py-3">Start Tower</button>
        ) : (
          <button onClick={cashOut} className="w-full py-3 bg-green-500 text-black font-bold rounded-lg">Cash Out ${(bet * (level > 0 ? MULT[level - 1] : 1)).toFixed(2)}</button>
        )}
      </div>
    </div>
  );
}
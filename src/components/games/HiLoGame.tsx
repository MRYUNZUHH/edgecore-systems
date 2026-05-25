"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export default function HiLoGame() {
  const { balance, update } = useBalance();
  const [bet, setBet] = useState(50);
  const [current, setCurrent] = useState<{ rank: string; idx: number } | null>(null);
  const [streak, setStreak] = useState(0);
  const [mult, setMult] = useState(1);
  const [active, setActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const start = () => {
    if (bet > balance) return;
    update(-bet);
    const c = RANKS[Math.floor(Math.random() * 13)];
    setCurrent({ rank: c, idx: RANKS.indexOf(c) });
    setStreak(0);
    setMult(1);
    setActive(true);
    setGameOver(false);
  };

  const guess = (dir: "higher" | "lower") => {
    if (!current || !active) return;
    const n = RANKS[Math.floor(Math.random() * 13)];
    if ((dir === "higher" && RANKS.indexOf(n) > current.idx) || (dir === "lower" && RANKS.indexOf(n) < current.idx)) {
      const s = streak + 1;
      setStreak(s);
      setMult(parseFloat((1 + 0.3 * s).toFixed(2)));
      setCurrent({ rank: n, idx: RANKS.indexOf(n) });
    } else {
      setActive(false);
      setGameOver(true);
    }
  };

  const cashOut = () => { update(bet * mult); setActive(false); };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="card p-6 text-center">
        <p className="text-xs text-muted mb-2">Balance: <span className="text-gold font-bold">${balance.toFixed(2)}</span></p>
        <p className="text-2xl font-heading font-bold text-gold mb-2">{mult.toFixed(2)}x</p>
        {current && <div className="text-6xl mb-4">{current.rank}</div>}
        <p className="text-sm text-muted">Streak: {streak}</p>
        {gameOver && <p className="text-red-400 font-bold mt-2">Game Over!</p>}
      </div>
      <div className="card p-4 space-y-3">
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="input-field flex-1" /></div>
        {!current ? (
          <button onClick={start} className="btn-gold w-full py-3">Start Game</button>
        ) : active ? (
          <>
            <div className="flex gap-3">
              <button onClick={() => guess("higher")} className="flex-1 py-3 bg-green-500 text-black font-bold rounded-lg">Higher</button>
              <button onClick={() => guess("lower")} className="flex-1 py-3 bg-red-500 text-black font-bold rounded-lg">Lower</button>
            </div>
            <button onClick={cashOut} className="w-full py-2 bg-gold text-black font-bold rounded-lg mt-2">Cash Out ${(bet * mult).toFixed(2)}</button>
          </>
        ) : (
          <button onClick={start} className="btn-gold w-full py-3">Play Again</button>
        )}
      </div>
    </div>
  );
}
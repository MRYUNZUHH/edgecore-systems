"use client";
import { useState } from "react";
import { useBalance } from "@/hooks/useBalance";

export default function CoinFlipGame() {
  const { balance, update } = useBalance();
  const [bet, setBet] = useState(50);
  const [choice, setChoice] = useState<"heads" | "tails">("heads");
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const flip = () => {
    if (bet > balance) return;
    update(-bet);
    setFlipping(true);
    setResult(null);
    const win = Math.random() > 0.505;
    const side = win ? choice : (choice === "heads" ? "tails" : "heads");
    setTimeout(() => {
      setResult(side);
      if (win) update(bet * 1.98);
      setFlipping(false);
    }, 1500);
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="card p-6 text-center">
        <p className="text-xs text-muted mb-2">Balance: <span className="text-gold font-bold">${balance.toFixed(2)}</span></p>
        <div className={`text-8xl my-6 transition-all duration-[1.5s] ${flipping ? "animate-spin scale-150" : ""}`}>{result === "heads" ? "🪙" : result === "tails" ? "🪙" : "💰"}</div>
        {result && <p className={`text-lg font-bold ${result === choice ? "text-green-400" : "text-red-400"}`}>{result === choice ? `Won $${(bet * 1.98).toFixed(2)}!` : "Lost"}</p>}
      </div>
      <div className="card p-4 space-y-3">
        <div className="flex gap-2">
          <button onClick={() => setChoice("heads")} className={`flex-1 py-2 rounded-lg font-bold text-sm ${choice === "heads" ? "bg-gold text-black" : "bg-[var(--bg3)] text-muted"}`}>Heads</button>
          <button onClick={() => setChoice("tails")} className={`flex-1 py-2 rounded-lg font-bold text-sm ${choice === "tails" ? "bg-gold text-black" : "bg-[var(--bg3)] text-muted"}`}>Tails</button>
        </div>
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="input-field flex-1" /></div>
        <button onClick={flip} disabled={flipping} className="btn-gold w-full py-3">Flip Coin</button>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect, useRef } from "react";
import GameShell from "@/components/layout/GameShell";
import RulesModal from "@/components/ui/RulesModal";
import { rollFloat } from "@/lib/gameEngine";
import { playDiceRoll, playWin } from "@/lib/sounds";
import { placeBet, addWinnings } from "@/lib/gameBalance";

export default function Page() {
  const [bet, setBet] = useState(50);
  const [target, setTarget] = useState(50);
  const [over, setOver] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [lastWin, setLastWin] = useState(false);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const multiplier = parseFloat((99 / (over ? 99 - target : target)).toFixed(2));
  const mountedRef = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const roll = () => {
    if (!placeBet(bet)) return;
    setRolling(true); setResult(null);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { if (mountedRef.current) { setDice1(Math.ceil(Math.random() * 6)); setDice2(Math.ceil(Math.random() * 6)); } }, 80);
    playDiceRoll();
    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!mountedRef.current) return;
      const r = rollFloat(); setResult(r);
      const win = over ? r > target : r < target; setLastWin(win);
      setDice1(Math.ceil(r / 16.67)); setDice2(Math.ceil((r % 16.67) / 2.78));
      if (win) { addWinnings(bet * multiplier); playWin(); }
      setRolling(false);
    }, 800);
  };

  return (
    <GameShell title="🎲 Dice">
      <RulesModal gameKey="dice" title="Dice" emoji="🎲" accentColor="#f0b429" rules={["Predict whether the dice roll will be OVER or UNDER your chosen number","Set your target number using the slider","The win chance and multiplier adjust automatically","Lower win chance = higher payout multiplier","Roll result is randomly generated each time","You win if the result matches your over/under prediction"]} />
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <div className={"w-16 h-16 rounded-xl flex items-center justify-center text-4xl font-bold transition-all " + (rolling ? "bg-gray-700 animate-spin" : "bg-white text-black")}>{["","⚀","⚁","⚂","⚃","⚄","⚅"][dice1]}</div>
          <div className={"w-16 h-16 rounded-xl flex items-center justify-center text-4xl font-bold transition-all " + (rolling ? "bg-gray-700 animate-spin" : "bg-white text-black")}>{["","⚀","⚁","⚂","⚃","⚄","⚅"][dice2]}</div>
        </div>
        <div className="text-5xl font-bold text-white my-4">{result !== null ? result.toFixed(2) : "?"}</div>
        {result !== null && <p className={"text-lg font-bold " + (lastWin ? "text-[#00ff88]" : "text-red-400")}>{lastWin ? "Won $" + (bet * multiplier).toFixed(2) : "Lost"}</p>}
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex gap-2"><button onClick={() => setOver(false)} className={"flex-1 py-2 rounded-lg font-bold text-sm " + (!over ? "bg-[#f0b429] text-black" : "bg-gray-800 text-gray-400")}>Roll Under</button><button onClick={() => setOver(true)} className={"flex-1 py-2 rounded-lg font-bold text-sm " + (over ? "bg-[#f0b429] text-black" : "bg-gray-800 text-gray-400")}>Roll Over</button></div>
        <input type="range" min={2} max={98} value={target} onChange={e => setTarget(Number(e.target.value))} className="w-full" />
        <p className="text-center text-xs text-gray-400">Target: {target} · Win: {over ? 99 - target : target}% · Payout: {multiplier.toFixed(2)}x</p>
        <div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2" />{[10, 50, 100, 500].map(v => <button key={v} onClick={() => setBet(v)} className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg">{v}</button>)}</div>
        <button onClick={roll} disabled={rolling} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Roll Dice</button>
      </div>
    </GameShell>
  );
}
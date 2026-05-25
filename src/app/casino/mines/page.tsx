"use client";
import { useState, useEffect, useRef } from "react";
import GameShell from "@/components/layout/GameShell";
import RulesModal from "@/components/ui/RulesModal";
import { generateMines } from "@/lib/gameEngine";
import { playCoin, playExplosion, playClick } from "@/lib/sounds";
import { placeBet, addWinnings } from "@/lib/gameBalance";

export default function Page() {
  const [bet, setBet] = useState(50);
  const [mines, setMines] = useState(3);
  const [board, setBoard] = useState<string[]>(Array(25).fill("hidden"));
  const [minePos, setMinePos] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(0);
  const [mult, setMult] = useState(1);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);

  const start = () => { if (!placeBet(bet)) return; setMinePos(generateMines(mines)); setBoard(Array(25).fill("hidden")); setRevealed(0); setMult(1); setActive(true); setResult(""); };

  const click = (i: number) => {
    if (!active || board[i] !== "hidden") return;
    playClick();
    if (minePos.includes(i)) {
      const b = [...board]; b[i] = "bomb"; minePos.forEach(m => { if (b[m] === "hidden") b[m] = "bomb"; });
      if (mountedRef.current) { setBoard(b); setActive(false); setResult("loss"); }
      playExplosion();
    } else {
      const b = [...board]; b[i] = "gem"; const r = revealed + 1;
      const safe = 25 - mines; let m = 1; for (let j = 0; j < r; j++) m *= safe - j; for (let j = 0; j < r; j++) m /= 25 - j;
      m = parseFloat((m * 0.97).toFixed(2));
      if (mountedRef.current) { setBoard(b); setRevealed(r); setMult(m); }
      if (r >= safe) { addWinnings(bet * m); if (mountedRef.current) { setActive(false); setResult("win"); } playCoin(); }
    }
  };

  const cashOut = () => { addWinnings(bet * mult); if (mountedRef.current) { setActive(false); setResult("win"); } playCoin(); };

  return (
    <GameShell title="💣 Mines" history={result ? <span className={"text-sm font-bold " + (result === "win" ? "text-green-400" : "text-red-400")}>{result === "win" ? "Won $" + (bet * mult).toFixed(2) : "Lost"}</span> : null}>
      <RulesModal gameKey="mines" title="Mines" emoji="💣" accentColor="#ef4444" rules={["Choose how many mines are hidden on the 5×5 grid (1-15)","Click tiles to reveal gems - each safe tile increases your multiplier","Hit a mine and you lose your entire bet","Cash out anytime to lock in your current winnings","More mines = higher multiplier per gem, but higher risk","The mine positions are randomized each game","You cannot undo a tile reveal"]} />
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4">
        <div className="flex justify-between mb-4"><span className="text-[#f0b429] font-bold text-lg">{mult.toFixed(2)}x</span></div>
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 25 }).map((_, i) => {
            const rev = board[i] !== "hidden"; const isMine = minePos.includes(i);
            return (<button key={i} onClick={() => click(i)} disabled={!active || rev} className={"aspect-square rounded-lg text-xl font-bold transition " + (rev ? (isMine ? "bg-red-500/20 border-red-500" : "bg-green-500/20 border-green-500") : "bg-gray-800 border border-gray-700 hover:border-[#f0b429]")}>{rev ? (isMine ? "💣" : "💎") : "?"}</button>);
          })}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {!active ? (<><div className="flex gap-2"><input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} className="flex-1 bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2" /><select value={mines} onChange={e => setMines(Number(e.target.value))} className="bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-2 py-2">{[1, 3, 5, 10, 15].map(v => <option key={v} value={v}>{v}</option>)}</select></div><button onClick={start} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg">Start Game</button></>) : (<button onClick={cashOut} className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-lg animate-pulse">Cash Out ${(bet * mult).toFixed(2)}</button>)}
      </div>
    </GameShell>
  );
}
"use client";
import { useEffect, useState } from "react";

const names = ["JackpotJack", "LuckySpin", "CryptoLord", "NeonNinja", "DiamondHands"];

export default function RightPanel() {
  const [bets, setBets] = useState<{ player: string; amount: number; win: boolean }[]>([]);

  useEffect(() => {
    const generate = () => {
      const bet = {
        player: names[Math.floor(Math.random() * names.length)],
        amount: Math.floor(Math.random() * 500) + 10,
        win: Math.random() > 0.8,
      };
      setBets(prev => [bet, ...prev].slice(0, 10));
    };
    const interval = setInterval(generate, 3000);
    generate();
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden xl:flex flex-col w-64 bg-navy-950 border-l border-white/10 p-4">
      <h2 className="text-lg font-heading font-bold text-white mb-4">Live Wins</h2>
      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        {bets.map((bet, i) => (
          <div key={i} className="flex justify-between items-center text-xs">
            <span className="text-white/70">{bet.player}</span>
            <span className={bet.win ? "text-green-400" : "text-red-400"}>
              {bet.win ? "+" : "-"}${bet.amount}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

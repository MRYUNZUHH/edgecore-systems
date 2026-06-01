"use client";
import { useEffect, useState } from "react";

const NAMES = [
  "Alex K.", "Priya M.", "John D.", "Amina W.", "Carlos R.",
  "Fatima S.", "David L.", "Nguyen T.", "Sara B.", "Omar H.",
  "Lena V.", "Mike O.", "Aisha F.", "Pedro C.", "Yuki N."
];
const GAMES = ["Crash", "Mines", "Aviator", "Plinko", "Roulette", "Dice", "Limbo", "HiLo", "Blackjack"];
const FLAGS = ["🇰🇪", "🇳🇬", "🇿🇦", "🇬🇭", "🇺🇬", "🇹🇿", "🇪🇬", "🇲🇦"];

interface Win {
  id: number;
  name: string;
  game: string;
  amount: string;
  multiplier: string;
  flag: string;
}

function randomWin(): Win {
  return {
    id: Math.random(),
    name: NAMES[Math.floor(Math.random() * NAMES.length)],
    game: GAMES[Math.floor(Math.random() * GAMES.length)],
    amount: (Math.random() * 4800 + 50).toFixed(2),
    multiplier: (Math.random() * 19 + 1.2).toFixed(2),
    flag: FLAGS[Math.floor(Math.random() * FLAGS.length)],
  };
}

export default function LiveWinsFeed() {
  const [wins, setWins] = useState<Win[]>(() =>
    Array.from({ length: 6 }, randomWin)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWins(prev => [randomWin(), ...prev.slice(0, 11)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3 style={{ color: "#9ca3af", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}>
        🔴 Live Wins
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {wins.map((w, i) => (
          <div
            key={w.id}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 14px", background: i === 0 ? "#1a1f2e" : "#111827",
              borderRadius: 10, border: `1px solid ${i === 0 ? "#2d3748" : "#1f2937"}`,
              fontSize: 13, animation: i === 0 ? "slideIn 0.35s ease" : "none",
              transition: "background 0.3s"
            }}
          >
            <span>
              <span style={{ marginRight: 6 }}>{w.flag}</span>
              <span style={{ color: "#e5e7eb", fontWeight: 600 }}>{w.name}</span>
              <span style={{ color: "#6b7280" }}> · {w.game}</span>
            </span>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "#9ca3af", fontSize: 11 }}>{w.multiplier}x</span>
              <span style={{ color: "#f0b429", fontWeight: 700 }}>${w.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

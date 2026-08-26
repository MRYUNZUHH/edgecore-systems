"use client";
import Link from "next/link";

type Odd = { label: string; value: number };
type Match = { id: string; home: string; away: string; time: string; odds: Odd[] };

const sample: Match[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `m-${i}`,
  home: ["Arsenal", "Real", "PSG", "Inter"][i % 4],
  away: ["Chelsea", "Barcelona", "Lyon", "Milan"][i % 4],
  time: `${12 + (i % 12)}:00`,
  odds: [1.45 + Math.random(), 2.1 + Math.random(), 3.2 + Math.random()].map((v, idx) => ({ label: ["1", "X", "2"][idx], value: parseFloat(v.toFixed(2)) })),
}));

export default function SportsGrid() {
  const addBet = (match: Match, odd: Odd) => {
    const payload = { id: Date.now().toString(), matchId: match.id, match: `${match.home} vs ${match.away}`, selection: odd.label, price: odd.value };
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent('edgecore:add-bet', { detail: payload }));
  };

  return (
    <div className="grid gap-2">
      {sample.map((m) => (
        <div key={m.id} className="flex items-center justify-between rounded-xl border border-white/6 bg-[#071017] px-3 py-2 text-sm hover:shadow-md hover:scale-[1.01] transition-transform">
          <div>
            <div className="font-semibold text-white">{m.home} <span className="text-[#7a8498]">vs</span> {m.away}</div>
            <div className="text-xs text-[#9da7bb]">{m.time} · Match #{m.id}</div>
          </div>
          <div className="flex items-center gap-2">
            {m.odds.map((o) => {
              const cls = o.value < 1.8 ? 'text-[#00ff88]' : o.value < 2.5 ? 'text-[#f0b429]' : 'text-[#8b5cf6]';
              return (
                <button key={o.label} onClick={() => addBet(m, o)} className={`rounded-lg border border-white/8 bg-[#051018] px-3 py-2 text-xs font-semibold text-[#f5f7fb] hover:bg-white/4 transition`}>
                  <div className="text-[12px]">{o.label}</div>
                  <div className={`text-sm ${cls}`}>{o.value}</div>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useBalance } from "@/lib/useBalance";
import MobileNav from "@/components/layout/MobileNav";

const matches = [
  {h:"Arsenal",a:"Chelsea",ho:2.1,do:3.4,ao:3.2,t:900},
  {h:"Man United",a:"Liverpool",ho:2.8,do:3.2,ao:2.5,t:1200},
  {h:"Real Madrid",a:"Barcelona",ho:2.3,do:3.3,ao:3.0,t:600},
  {h:"Bayern",a:"Dortmund",ho:1.9,do:3.6,ao:3.8,t:1800},
  {h:"PSG",a:"Marseille",ho:1.6,do:3.8,ao:5.0,t:2400},
];

export default function Page() {
  const { balance, placeBet, addWinnings } = useBalance();
  const [slip, setSlip] = useState<any[]>([]);
  const [stake, setStake] = useState(100);
  const [times, setTimes] = useState<number[]>(matches.map(() => Math.floor(Math.random() * 3600 + 300)));

  useEffect(() => {
    const i = setInterval(() => setTimes(p => p.map(t => Math.max(0, t - 1))), 1000);
    return () => clearInterval(i);
  }, []);

  const add = (m: any, market: string, odds: number) => {
    setSlip(p => p.some(b => b.id === m.home && b.market === market)
      ? p.filter(b => !(b.id === m.home && b.market === market))
      : [...p, { id: m.home, label: m.home + " vs " + m.away, market, odds }]);
  };

  const place = () => {
    const tot = slip.reduce((a, b) => a * b.odds, 1);
    if (!placeBet(stake)) return;
    const win = Math.random() < 0.42;
    if (win) addWinnings(stake * tot);
    setSlip([]);
  };

  const fmt = (s: number) => Math.floor(s / 60) + "m " + (s % 60) + "s";

  const isSelected = (matchHome: string, market: string) => {
    return slip.some(b => b.id === matchHome && b.market === market);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">📊 Predictions</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {matches.map((m, i) => (
              <div key={m.h} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-400">⚽ Football</span>
                  <span className="text-xs text-[#f0b429]">{fmt(times[i])}</span>
                </div>
                <h3 className="text-white font-bold mb-3">{m.h} vs {m.a}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: "1", v: m.ho },
                    { l: "X", v: m.do },
                    { l: "2", v: m.ao },
                  ].map(o => (
                    <button
                      key={o.l}
                      onClick={() => add(m, o.l, o.v)}
                      className={
                        "p-2 rounded-lg text-sm font-bold " +
                        (isSelected(m.h, o.l)
                          ? "bg-[#f0b429] text-black"
                          : "bg-[#0a0a0f] text-white hover:bg-[#f0b429]/20")
                      }
                    >
                      {o.l} @ {o.v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4 h-fit sticky top-20">
            <h3 className="text-white font-bold mb-3">🎫 Bet Slip</h3>
            <p className="text-xs text-gray-400 mb-2">Balance: ${balance.toFixed(2)}</p>
            {slip.length === 0 ? (
              <p className="text-gray-500 text-sm">Click odds to add</p>
            ) : (
              <>
                {slip.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="text-gray-400">{b.label} - {b.market}</span>
                    <span className="text-[#f0b429] font-bold">@{b.odds}</span>
                  </div>
                ))}
                <input
                  type="number"
                  value={stake}
                  onChange={e => setStake(Number(e.target.value))}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2 mt-3"
                />
                <p className="text-[#00ff88] text-sm mt-2">
                  Potential: ${(stake * slip.reduce((a, b) => a * b.odds, 1)).toFixed(2)}
                </p>
                <button onClick={place} className="w-full py-2 bg-[#f0b429] text-black font-bold rounded-lg mt-3">
                  Place Bet
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
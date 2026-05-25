"use client";
import { useEffect, useState } from "react";
const names = ["Kwame","Amina","João","Fatou","Carlos","Priya","Liu","Ayesha","Mike","Sara","Omar","Nia","Kwesi","Zara","Dev"];
const games = ["Aviator","Crash","Mines","Plinko","Dice","Roulette","Blackjack","Limbo","Wheel","HiLo"];
export default function LiveFeed() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const gen = () => `${names[Math.floor(Math.random()*15)]} won $${(Math.random()*5000+10).toFixed(0)} on ${games[Math.floor(Math.random()*10)]}`;
    setItems(Array.from({length:6}, gen));
    const i = setInterval(() => setItems(p => [gen(), ...p].slice(0, 20)), 3000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="bg-[#13131f] border-y border-white/5 py-2 overflow-hidden relative">
      <div className="flex gap-8 animate-[scrollLeft_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((t, i) => <span key={i} className="text-xs text-gray-400">{t}</span>)}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#13131f] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#13131f] to-transparent pointer-events-none" />
    </div>
  );
}
"use client";
import { useEffect, useState, useRef } from "react";

const NAMES = ["Kwame","Amina","Joao","Fatou","Carlos","Priya","Liu","Ayesha","Mike","Sara","Omar","Nia","Kwesi","Zara","Dev","Ahmad","Maria","John","Ling","Sade"];
const GAMES = ["Aviator","Crash","Mines","Plinko","Dice","Roulette","Blackjack","Limbo","Wheel","HiLo"];

type FeedItem = { id: number; name: string; game: string; amount: number; mult: string };

export default function LiveFeed() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<FeedItem[]>([]);
  const lastNames = useRef<string[]>([]);
  const idCounter = useRef(0);

  const makeItem = (): FeedItem => {
    const available = NAMES.filter(n => !lastNames.current.includes(n));
    const pool = available.length >= 5 ? available : NAMES;
    const name = pool[Math.floor(Math.random() * pool.length)];
    lastNames.current = [...lastNames.current, name].slice(-10);
    const mults = ["2.4×","3.1×","5.0×","8.3×","12.0×","1.8×","34.2×","6.6×"];
    return {
      id: idCounter.current++,
      name,
      game: GAMES[Math.floor(Math.random() * GAMES.length)],
      amount: Math.floor(Math.random() * 4500) + 10,
      mult: mults[Math.floor(Math.random() * mults.length)],
    };
  };

  useEffect(() => {
    setMounted(true);
    setItems(Array.from({ length: 10 }, makeItem));
    const interval = setInterval(() => {
      setItems(prev => [makeItem(), ...prev].slice(0, 20));
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#0a0e18] border-y border-[#ffffff08] py-2.5 overflow-hidden relative">
      <div className="flex gap-8 animate-[scrollLeft_50s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={`${item.id}-${i}`} className="inline-flex items-center gap-2 text-xs text-gray-500">
            <span className="text-[#00ff88] font-bold">↑</span>
            <span className="text-gray-400 font-medium">{item.name}</span>
            <span>won</span>
            <span className="text-white font-bold">${item.amount.toLocaleString()}</span>
            <span>on</span>
            <span className="text-[#f0b429]">{item.game}</span>
            <span className="text-[#00ff88] font-bold">@ {item.mult}</span>
            <span className="text-[#1a2235] ml-2">·</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0e18] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0e18] to-transparent pointer-events-none" />
    </div>
  );
}

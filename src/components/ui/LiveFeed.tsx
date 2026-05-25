"use client";
import { useEffect, useState, useRef } from "react";

const NAMES = ["Kwame","Amina","Joao","Fatou","Carlos","Priya","Liu","Ayesha","Mike","Sara","Omar","Nia","Kwesi","Zara","Dev","Ahmad","Patel","Maria","John","Ling"];
const GAMES = ["Aviator","Crash","Mines","Plinko","Dice","Roulette","Blackjack","Limbo","Wheel","HiLo"];

export default function LiveFeed() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<{ id: number; text: string }[]>([]);
  const lastNames = useRef<string[]>([]);
  const lastGames = useRef<string[]>([]);
  const idCounter = useRef(0);

  const getRandomName = (): string => {
    const available = NAMES.filter(n => !lastNames.current.includes(n));
    const pool = available.length >= 5 ? available : NAMES;
    const name = pool[Math.floor(Math.random() * pool.length)];
    lastNames.current = [...lastNames.current, name].slice(-8);
    return name;
  };

  const getRandomGame = (): string => {
    const available = GAMES.filter(g => !lastGames.current.includes(g));
    const pool = available.length >= 3 ? available : GAMES;
    const game = pool[Math.floor(Math.random() * pool.length)];
    lastGames.current = [...lastGames.current, game].slice(-5);
    return game;
  };

  useEffect(() => {
    setMounted(true);
    const initial = Array.from({ length: 8 }, () => ({
      id: idCounter.current++,
      text: getRandomName() + " won $" + (Math.floor(Math.random() * 4500) + 10) + " on " + getRandomGame()
    }));
    setItems(initial);
    const interval = setInterval(() => {
      setItems(prev => [{ id: idCounter.current++, text: getRandomName() + " won $" + (Math.floor(Math.random() * 4500) + 10) + " on " + getRandomGame() }, ...prev].slice(0, 20));
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#0f1520] border-y border-[#ffffff0f] py-2 overflow-hidden relative">
      <div className="flex gap-10 animate-[scrollLeft_40s_linear_infinite] whitespace-nowrap">
        {[...items, ...items].map((item) => (
          <span key={item.id} className="text-xs text-gray-400">{item.text}</span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f1520] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f1520] to-transparent pointer-events-none" />
    </div>
  );
}
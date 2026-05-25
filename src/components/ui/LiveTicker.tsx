"use client";
import { useEffect, useState } from "react";
const names = ["K***y7","M***a9","J***n3","L***aX","C***sM","A***aF"];
const games = ["Aviator","Crash","Mines","Blackjack","Roulette","Plinko"];
export default function LiveTicker() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const gen = () => `${names[Math.floor(Math.random()*6)]} won $${(Math.random()*5000+100).toFixed(0)} on ${games[Math.floor(Math.random()*6)]}`;
    setItems(Array.from({length:8},gen));
    const i = setInterval(() => setItems(p=>[gen(),...p.slice(0,20)]),3000);
    return ()=>clearInterval(i);
  },[]);
  return (
    <div className="bg-[var(--card)] border-y border-[var(--border)] py-2 overflow-hidden relative">
      <div className="flex gap-8 animate-[scrollLeft_30s_linear_infinite] whitespace-nowrap">
        {[...items,...items].map((t,i)=><span key={i} className="text-xs text-muted">{t}</span>)}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--card)] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--card)] to-transparent pointer-events-none" />
    </div>
  );
}
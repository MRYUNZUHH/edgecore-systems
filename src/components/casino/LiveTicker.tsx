"use client";
import { useEffect, useState } from "react";

export default function LiveTicker() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    const generate = () => setItems(prev => [`Player won $${Math.floor(Math.random()*1000)} on Dice`, ...prev].slice(0,5));
    const interval = setInterval(generate, 4000);
    generate();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-xl p-4 h-48 overflow-y-auto space-y-2 text-sm">
      <h3 className="text-white font-bold mb-2">Live Feed</h3>
      {items.map((msg, i) => <div key={i} className="text-white/70">{msg}</div>)}
    </div>
  );
}

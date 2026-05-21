"use client";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
export default function GameGrid({ title, filter }: { title: string; filter?: string }) {
  const [games, setGames] = useState<any[]>([]);
  useEffect(() => {
    // Simulated games (could be fetched from API)
    const allGames = [
      { id: "1", title: "Starburst", category: "slots", rtp: 96.1, volatility: "LOW" },
      { id: "2", title: "Book of Dead", category: "slots", rtp: 94.2, volatility: "HIGH" },
      { id: "3", title: "Blackjack", category: "table", rtp: 99.5, volatility: "LOW" },
      { id: "4", title: "Roulette", category: "table", rtp: 97.3, volatility: "MEDIUM" },
      { id: "5", title: "Aviator", category: "crash", rtp: 97.0, volatility: "HIGH" },
      { id: "6", title: "Crash", category: "crash", rtp: 97.0, volatility: "HIGH" },
      { id: "7", title: "Mines", category: "crash", rtp: 95.0, volatility: "MEDIUM" },
      { id: "8", title: "Plinko", category: "crash", rtp: 96.5, volatility: "LOW" },
    ];
    setGames(filter ? allGames.filter(g => g.category === filter) : allGames);
  }, [filter]);
  return (
    <section>
      <h2 className="text-2xl font-heading font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map(game => <GameCard key={game.id} game={game} />)}
      </div>
    </section>
  );
}
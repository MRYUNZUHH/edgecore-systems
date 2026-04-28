"use client";
import { useState, useEffect } from "react";
import GameCard from "./GameCard";

export default function GameGrid({ title, filter }: { title: string; filter?: string }) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch(`/api/games${filter ? `?category=${filter}` : ""}`)
      .then(r => r.json())
      .then(d => setGames(d.games || d))
      .catch(console.error);
  }, [filter]);

  return (
    <section>
      <h2 className="text-2xl font-heading font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.slice(0,4).map((game:any) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

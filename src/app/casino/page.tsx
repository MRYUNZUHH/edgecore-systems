"use client";
import GameGrid from "@/components/casino/GameGrid";
export default function CasinoPage() {
  return (
    <div className="space-y-6">
      <GameGrid title="?? Slots" filter="slots" />
      <GameGrid title="?? Table Games" filter="table" />
      <GameGrid title="? Crash & Fast Games" filter="crash" />
    </div>
  );
}

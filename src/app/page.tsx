"use client";
import { useGameStore } from "@/store/game-store";
import { useRouter } from "next/navigation";
import HeroBanner from "@/components/casino/HeroBanner";
import GameGrid from "@/components/casino/GameGrid";
import LiveTicker from "@/components/casino/LiveTicker";
import VIPProgress from "@/components/casino/VIPProgress";

export default function Home() {
  const { isLoggedIn } = useGameStore();
  const router = useRouter();
  if (!isLoggedIn) { router.push("/auth/login"); return null; }
  return (
    <div className="space-y-6">
      <HeroBanner />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <GameGrid title="🔥 Popular Games" filter="popular" />
          <GameGrid title="🎰 Slots" filter="slots" />
          <GameGrid title="🃏 Table Games" filter="table" />
          <GameGrid title="⚡ Crash & Fast Games" filter="crash" />
        </div>
        <div className="space-y-6">
          <VIPProgress />
          <LiveTicker />
        </div>
      </div>
    </div>
  );
}
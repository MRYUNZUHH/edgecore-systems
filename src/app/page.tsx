import { Suspense } from "react";
import HeroBanner from "@/components/casino/HeroBanner";
import GameGrid from "@/components/casino/GameGrid";
import LiveTicker from "@/components/casino/LiveTicker";
import VIPProgress from "@/components/casino/VIPProgress";

export default function Home() {
  return (
    <div className="space-y-6">
      <HeroBanner />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Suspense fallback={<div>Loading games...</div>}>
            <GameGrid title="EdgeCore Originals" filter="Originals" />
            <GameGrid title="Trending" />
          </Suspense>
        </div>
        <div className="space-y-6">
          <VIPProgress />
          <LiveTicker />
        </div>
      </div>
    </div>
  );
}

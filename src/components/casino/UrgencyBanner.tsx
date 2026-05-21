"use client";
import { useLivePlayers } from "@/hooks/useLiveData";
import CountUp from "react-countup";
import { Users, Zap } from "lucide-react";

export default function UrgencyBanner() {
  const players = useLivePlayers();
  return (
    <div className="bg-gradient-to-r from-rose-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-neon-400" />
          <span className="text-white text-sm">
            <CountUp end={players} duration={3} className="font-bold text-neon-400" /> players online now
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-gold-400" />
          <span className="text-white text-sm">🔥 Hot streak: 12 players won in the last minute</span>
        </div>
      </div>
    </div>
  );
}
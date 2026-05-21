"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getLiveEvents, simulateOddsUpdate, SportEvent } from "@/lib/sports/live-odds";
import { useGameStore } from "@/store/game-store";

const sports = ["All", "Football", "Basketball", "Tennis", "Cricket"];

export default function SportsbookPage() {
  const [events, setEvents] = useState<SportEvent[]>(getLiveEvents());
  const [activeSport, setActiveSport] = useState("All");
  const [betSlip, setBetSlip] = useState<any[]>([]);
  const { wallet } = useGameStore();
  const cashBalance = wallet?.cashBalance ?? 0;

  useEffect(() => {
    const interval = setInterval(() => setEvents(simulateOddsUpdate()), 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeSport === "All" ? events : events.filter(e => e.sport === activeSport);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">🏆 Sportsbook</h1>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {sports.map(sport => (
          <button key={sport} onClick={() => setActiveSport(sport)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeSport === sport ? "btn-gold" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
            {sport}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filtered.map(event => (
            <motion.div key={event.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{event.sport}</span>
                  {event.status === 'live' && (
                    <span className="flex items-center gap-1 text-xs text-rose-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> LIVE
                    </span>
                  )}
                </div>
                {event.status === 'live' && event.score && (
                  <span className="text-white font-bold">{event.score.home} - {event.score.away}</span>
                )}
              </div>
              <h3 className="text-white font-bold mb-4">{event.homeTeam} vs {event.awayTeam}</h3>
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-white/5 hover:bg-gold-400/20 text-white rounded-xl p-3 text-center transition">
                  <span className="text-xs text-gray-400 block">1</span>
                  <span className="font-bold">{event.odds.home}</span>
                </button>
                {event.odds.draw && (
                  <button className="bg-white/5 hover:bg-gold-400/20 text-white rounded-xl p-3 text-center transition">
                    <span className="text-xs text-gray-400 block">X</span>
                    <span className="font-bold">{event.odds.draw}</span>
                  </button>
                )}
                <button className="bg-white/5 hover:bg-gold-400/20 text-white rounded-xl p-3 text-center transition">
                  <span className="text-xs text-gray-400 block">2</span>
                  <span className="font-bold">{event.odds.away}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="glass-panel p-4 rounded-2xl h-fit sticky top-20">
          <h3 className="text-lg font-bold text-white mb-4">🎫 Bet Slip</h3>
          <div className="text-xs text-gray-400 mb-2">Balance: <span className="text-neon-400 font-bold">${cashBalance.toLocaleString()}</span></div>
          <p className="text-gray-500 text-sm">Click odds to add selections.</p>
        </div>
      </div>
    </div>
  );
}
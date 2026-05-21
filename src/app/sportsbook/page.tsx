"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sports = ["All", "Football", "Basketball", "Tennis"];

export default function SportsbookPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [activeSport, setActiveSport] = useState("All");
  const [betSlip, setBetSlip] = useState<any[]>([]);
  const [stake, setStake] = useState(100);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Fetch live events every 2 seconds — NO CACHE
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/sportsbook/live", { cache: "no-store" });
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
        setLastUpdate(Date.now());
      } catch (err) {
        console.error("Failed to fetch live events:", err);
      }
    };
    
    fetchEvents();
    const interval = setInterval(fetchEvents, 2000);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeSport === "All" ? events : events.filter((e: any) => e.sport === activeSport);

  const addToSlip = (event: any, type: string, odds: number) => {
    setBetSlip(prev => {
      const exists = prev.find(b => b.eventId === event.id && b.type === type);
      if (exists) return prev.filter(b => !(b.eventId === event.id && b.type === type));
      return [...prev, { eventId: event.id, match: `${event.homeTeam} vs ${event.awayTeam}`, type, odds }];
    });
  };

  const clearSlip = () => setBetSlip([]);
  const totalOdds = betSlip.reduce((acc, b) => acc * b.odds, 1);
  const potentialWin = stake * totalOdds;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold gold-text">🏆 Live Sportsbook</h1>
        <span className="text-xs text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
          Live • Updated {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
        </span>
      </div>

      {/* Sport filters */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {sports.map(sport => (
          <button key={sport} onClick={() => setActiveSport(sport)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeSport === sport ? "btn-gold" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
            {sport}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events list */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {filtered.map((event: any) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="glass-card p-4 rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{event.sport}</span>
                    {event.status === 'live' && (
                      <span className="flex items-center gap-1 text-xs text-rose-500 font-bold">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> LIVE {event.minute}&apos;
                      </span>
                    )}
                    {event.status === 'upcoming' && (
                      <span className="text-xs text-yellow-400">Upcoming</span>
                    )}
                  </div>
                  {event.status === 'live' && (
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Poss: {event.stats?.possession?.home}% - {event.stats?.possession?.away}%</span>
                    </div>
                  )}
                </div>

                {/* Teams & Score */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{event.homeTeam}</h3>
                    {event.status === 'live' && <span className="text-2xl font-black text-white">{event.score?.home}</span>}
                  </div>
                  <div className="text-center text-gray-500 text-sm mx-4">VS</div>
                  <div className="flex-1 text-right">
                    <h3 className="text-white font-bold text-lg">{event.awayTeam}</h3>
                    {event.status === 'live' && <span className="text-2xl font-black text-white">{event.score?.away}</span>}
                  </div>
                </div>

                {/* Odds buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToSlip(event, 'home', event.odds.home)}
                    className={`rounded-xl p-3 text-center transition font-bold ${betSlip.some(b => b.eventId === event.id && b.type === 'home') ? 'bg-gold-400 text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                    <span className="block text-xs text-gray-400 mb-1">1</span>
                    <motion.span key={event.odds.home} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-lg">
                      {event.odds.home}
                    </motion.span>
                  </motion.button>
                  {event.odds.draw && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToSlip(event, 'draw', event.odds.draw)}
                      className={`rounded-xl p-3 text-center transition font-bold ${betSlip.some(b => b.eventId === event.id && b.type === 'draw') ? 'bg-gold-400 text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                      <span className="block text-xs text-gray-400 mb-1">X</span>
                      <motion.span key={event.odds.draw} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-lg">
                        {event.odds.draw}
                      </motion.span>
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToSlip(event, 'away', event.odds.away)}
                    className={`rounded-xl p-3 text-center transition font-bold ${betSlip.some(b => b.eventId === event.id && b.type === 'away') ? 'bg-gold-400 text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                    <span className="block text-xs text-gray-400 mb-1">2</span>
                    <motion.span key={event.odds.away} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="text-lg">
                      {event.odds.away}
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bet Slip */}
        <div className="glass-panel p-4 rounded-2xl h-fit sticky top-20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">🎫 Bet Slip</h3>
            {betSlip.length > 0 && (
              <button onClick={clearSlip} className="text-xs text-rose-400 hover:text-rose-300">Clear All</button>
            )}
          </div>
          
          {betSlip.length === 0 ? (
            <p className="text-gray-500 text-sm">Click odds to add selections.</p>
          ) : (
            <>
              <div className="space-y-2">
                {betSlip.map((bet, i) => (
                  <div key={i} className="flex justify-between items-center text-sm bg-white/5 rounded-lg p-2">
                    <span className="text-white text-xs">{bet.match}</span>
                    <span className="text-gold-400 font-bold">@{bet.odds}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400">Stake</label>
                  <input type="number" value={stake} onChange={e => setStake(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white mt-1 focus:outline-none focus:border-gold-400" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Odds</span>
                  <span className="text-white font-bold">{totalOdds.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Potential Win</span>
                  <span className="text-neon-400 font-bold">${potentialWin.toFixed(2)}</span>
                </div>
                <button className="btn-primary w-full py-3">Place Bet</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
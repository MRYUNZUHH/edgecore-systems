"use client";
import { useState } from "react";

export default function ResponsibleGamingPage() {
  const [depositLimit, setDepositLimit] = useState("");
  const [sessionTime, setSessionTime] = useState(0);
  const [selfExcluded, setSelfExcluded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold gold-text">🛡️ Responsible Gaming</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deposit Limit */}
        <div className="bg-[#0D0F1A] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Deposit Limit</h3>
          <input type="number" value={depositLimit} onChange={e => setDepositLimit(e.target.value)} placeholder="Daily limit amount"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E6B84F] mb-3" />
          <button className="px-4 py-2 bg-[#E6B84F] text-black font-bold rounded-xl text-sm">Set Limit</button>
        </div>

        {/* Session Timer */}
        <div className="bg-[#0D0F1A] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Session Timer</h3>
          <p className="text-2xl font-black text-white mb-3">{Math.floor(sessionTime / 3600)}h {Math.floor((sessionTime % 3600) / 60)}m</p>
          <button onClick={() => setSessionTime(prev => prev + 1)} className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-sm">Start Timer</button>
        </div>

        {/* Self Exclusion */}
        <div className="md:col-span-2 bg-[#0D0F1A] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Self Exclusion</h3>
          <p className="text-white/60 text-sm mb-3">Take a break from gambling for a set period.</p>
          <button onClick={() => setSelfExcluded(!selfExcluded)}
            className={`px-6 py-3 font-bold rounded-xl ${selfExcluded ? 'bg-green-500 text-black' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
            {selfExcluded ? "Exclusion Active" : "Self-Exclude"}
          </button>
        </div>
      </div>
    </div>
  );
}
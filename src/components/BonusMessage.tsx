// src/components/BonusMessage.tsx
"use client";

import { useState, useEffect } from "react";

export default function BonusMessage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("ec_seen_bonus_message");
    if (!seen) {
      setShow(true);
      localStorage.setItem("ec_seen_bonus_message", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#0f1520] to-[#1a2235] rounded-2xl p-8 max-w-md mx-4 border border-[#f0b429] shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h2 className="text-2xl font-bold text-[#f0b429] mb-3">Welcome Bonus!</h2>
          
          <div className="space-y-3 mb-6 text-left">
            <div className="bg-green-500/10 rounded-lg p-3">
              <p className="text-green-400 font-bold">📈 DEPOSIT BONUS</p>
              <p>$10 - $99 → <strong className="text-[#f0b429]">+$10</strong></p>
              <p>$100 - $599 → <strong className="text-[#f0b429]">+$50</strong></p>
              <p>$500+ → <strong className="text-[#f0b429]">+$150</strong></p>
            </div>
            
            <div className="bg-yellow-500/10 rounded-lg p-3">
              <p className="text-yellow-500 font-bold">💸 WITHDRAWAL SERVICE FEE</p>
              <p>Under $100 → <strong className="text-yellow-500">$5 fee</strong></p>
              <p>$100 - $499 → <strong className="text-yellow-500">$10 fee</strong></p>
              <p>$500+ → <strong className="text-yellow-500">$50 fee</strong></p>
            </div>
          </div>
          
          <button
            onClick={() => setShow(false)}
            className="w-full py-3 bg-gradient-to-r from-[#f0b429] to-amber-600 text-black font-bold rounded-lg hover:opacity-90 transition"
          >
            Start Playing
          </button>
        </div>
      </div>
    </div>
  );
}

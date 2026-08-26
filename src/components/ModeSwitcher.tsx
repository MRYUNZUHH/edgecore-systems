// src/components/ModeSwitcher.tsx
"use client";

import { useState } from "react";
import { useBalance } from "@/lib/useBalance";

export default function ModeSwitcher() {
  const { mode, switchMode, mounted } = useBalance();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-lg font-bold transition ${
          mode === "real"
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-[#f0b429] text-black hover:bg-amber-500"
        }`}
      >
        {mode === "real" ? "💰 REAL MODE" : "🎮 DEMO MODE"}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#0f1520] border border-[#1a2235] rounded-xl shadow-2xl overflow-hidden z-50">
          <button
            onClick={() => {
              switchMode("demo");
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left hover:bg-[#1a2235] transition ${
              mode === "demo" ? "bg-[#f0b429]/20 text-[#f0b429]" : "text-gray-300"
            }`}
          >
            🎮 Demo Mode
            <p className="text-xs text-gray-500">Play with fake money</p>
          </button>

          <button
            onClick={() => {
              switchMode("real");
              setIsOpen(false);
            }}
            className={`w-full px-4 py-3 text-left hover:bg-[#1a2235] transition ${
              mode === "real" ? "bg-green-600/20 text-green-400" : "text-gray-300"
            }`}
          >
            💰 Real Mode
            <p className="text-xs text-gray-500">Use real money (deposit required)</p>
          </button>
        </div>
      )}
    </div>
  );
}

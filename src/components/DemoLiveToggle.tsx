"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// ─── Context ──────────────────────────────────────────────
type GameMode = "demo" | "live";

interface GameModeContextType {
  mode: GameMode;
  setMode: (m: GameMode) => void;
  isDemo: boolean;
  balance: { demo: number; live: number };
  currentBalance: number;
}

const GameModeContext = createContext<GameModeContextType | null>(null);

export function GameModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<GameMode>("demo");
  const balance = { demo: 1000, live: 0 };

  return (
    <GameModeContext.Provider
      value={{
        mode,
        setMode,
        isDemo: mode === "demo",
        balance,
        currentBalance: balance[mode],
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  const ctx = useContext(GameModeContext);
  if (!ctx) throw new Error("useGameMode must be used inside GameModeProvider");
  return ctx;
}

// ─── Toggle UI ────────────────────────────────────────────
export function DemoLiveToggle() {
  const { mode, setMode, balance } = useGameMode();

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 select-none">
      {/* Demo */}
      <button
        onClick={() => setMode("demo")}
        className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
          mode === "demo"
            ? "bg-blue-500/30 text-blue-300 border border-blue-500/40"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${mode === "demo" ? "bg-blue-400" : "bg-gray-600"}`} />
        Demo
        {mode === "demo" && (
          <span className="ml-1 text-[10px] text-blue-400 font-mono">${balance.demo.toLocaleString()}</span>
        )}
      </button>

      {/* Live */}
      <button
        onClick={() => setMode("live")}
        className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
          mode === "live"
            ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {mode === "live" && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        )}
        {mode !== "live" && <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />}
        Live
        {mode === "live" && (
          <span className="ml-1 text-[10px] text-emerald-400 font-mono">${balance.live.toFixed(2)}</span>
        )}
      </button>
    </div>
  );
}

// ─── Live-mode deposit prompt (shown when switching to live) ─────
export function LiveModeDepositPrompt() {
  const { mode } = useGameMode();
  if (mode !== "live") return null;

  return (
    <div className="mx-4 mt-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-semibold text-emerald-300">You're in Live Mode</p>
        <p className="text-xs text-gray-400">Fund your account to start playing with real USDT.</p>
      </div>
      <a
        href="/wallet/deposit"
        className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-2 rounded-full transition whitespace-nowrap"
      >
        Deposit →
      </a>
    </div>
  );
}

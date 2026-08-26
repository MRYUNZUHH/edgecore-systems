"use client";

import { useBalance } from "@/lib/useBalance";
import ModeSwitcher from "@/components/ModeSwitcher";
import MobileNav from "@/components/layout/MobileNav";

export default function ProfilePage() {
  const { mounted, mode, username, demoBalance, realBalance } = useBalance();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#080b12] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{username || "Player"}</h1>
            <p className="text-gray-400 text-sm">Welcome back!</p>
          </div>
          <ModeSwitcher />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-4">
            <p className="text-gray-400 text-sm">🎮 Demo Balance</p>
            <p className="text-2xl font-bold text-[#f0b429]">${demoBalance.toFixed(2)}</p>
          </div>
          <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-4">
            <p className="text-gray-400 text-sm">💰 Real Balance</p>
            <p className={`text-2xl font-bold ${mode === "real" ? "text-green-400" : "text-gray-500"}`}>
              ${realBalance.toFixed(2)}
            </p>
            {mode === "demo" && <p className="text-xs text-gray-500">Switch to real mode to use</p>}
          </div>
        </div>

        <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-6">
          <p className="text-gray-400">Current Mode: <span className={`font-bold ${mode === "real" ? "text-green-400" : "text-[#f0b429]"}`}>{mode.toUpperCase()}</span></p>
          <p className="text-sm text-gray-500 mt-2">
            {mode === "real"
              ? "💡 You are using real money. Deposits will be deducted from your M-Pesa."
              : "🎮 You are using demo money. No real money is being used."}
          </p>
        </div>

        <MobileNav />
      </div>
    </div>
  );
}

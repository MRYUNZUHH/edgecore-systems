// src/app/profile/page.tsx (add to existing)
"use client";

import { useState, useEffect } from "react";
import ModeSwitcher from "@/components/ModeSwitcher";
import MobileNav from "@/components/layout/MobileNav";

export default function ProfilePage() {
  const [mode, setMode] = useState<"demo" | "real">("demo");
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [realBalance, setRealBalance] = useState(0);

  useEffect(() => {
    const currentMode = localStorage.getItem("ec_mode") as "demo" | "real" | null;
    if (currentMode) setMode(currentMode);
    
    const user = localStorage.getItem("ec_username") || "Player";
    setUsername(user);
    
    const demoBal = parseFloat(localStorage.getItem("ec_balance") || "10000");
    const realBal = parseFloat(localStorage.getItem("ec_real_balance") || "0");
    setBalance(demoBal);
    setRealBalance(realBal);
  }, []);

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Mode Switcher */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">{username}</h1>
            <p className="text-gray-400 text-sm">Welcome back!</p>
          </div>
          <ModeSwitcher />
        </div>
        
        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-4">
            <p className="text-gray-400 text-sm">🎮 Demo Balance</p>
            <p className="text-2xl font-bold text-[#f0b429]">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-4">
            <p className="text-gray-400 text-sm">💰 Real Balance</p>
            <p className={`text-2xl font-bold ${mode === "real" ? "text-green-400" : "text-gray-500"}`}>
              ${realBalance.toFixed(2)}
            </p>
            {mode === "demo" && <p className="text-xs text-gray-500">Switch to real mode to use</p>}
          </div>
        </div>
        
        {/* Rest of your profile content */}
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

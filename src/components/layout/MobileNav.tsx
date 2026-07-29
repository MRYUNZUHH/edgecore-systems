// src/components/layout/MobileNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"demo" | "real">("demo");
  const [showModeMenu, setShowModeMenu] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("ec_mode") as "demo" | "real" | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const switchMode = (newMode: "demo" | "real") => {
    setMode(newMode);
    localStorage.setItem("ec_mode", newMode);
    
    if (newMode === "demo") {
      // Show demo balance, hide real
      const demoBalance = localStorage.getItem("ec_balance") || "10000";
      // Keep real balance stored
      const realBalance = localStorage.getItem("ec_real_balance") || "0";
      localStorage.setItem("ec_real_balance_stored", realBalance);
      localStorage.setItem("ec_real_balance", "0");
      localStorage.setItem("ec_balance", demoBalance);
    } else {
      // Show real balance, hide demo
      const storedRealBalance = localStorage.getItem("ec_real_balance_stored") || "0";
      localStorage.setItem("ec_real_balance", storedRealBalance);
      localStorage.setItem("ec_balance", "0");
    }
    
    window.location.reload();
  };

  const navItems = [
    { href: "/", label: "🏠 Home" },
    { href: "/casino", label: "🎰 Casino" },
    { href: "/wallet/deposit", label: "💰 Deposit" },
    { href: "/profile", label: "👤 Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f1520] border-t border-[#1a2235] z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-3 py-1 text-xs transition ${
                isActive ? "text-[#f0b429]" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.label.split(" ")[0]}</span>
              <span>{item.label.split(" ").slice(1).join(" ")}</span>
            </Link>
          );
        })}
        
        {/* Mode Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setShowModeMenu(!showModeMenu)}
            className={`flex flex-col items-center px-3 py-1 text-xs transition ${
              mode === "real" ? "text-green-400" : "text-[#f0b429]"
            }`}
          >
            <span className="text-lg">{mode === "real" ? "💰" : "🎮"}</span>
            <span>{mode === "real" ? "Real" : "Demo"}</span>
          </button>
          
          {showModeMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-[#0f1520] border border-[#1a2235] rounded-xl shadow-2xl overflow-hidden">
              <button
                onClick={() => {
                  switchMode("demo");
                  setShowModeMenu(false);
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
                  setShowModeMenu(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-[#1a2235] transition ${
                  mode === "real" ? "bg-green-600/20 text-green-400" : "text-gray-300"
                }`}
              >
                💰 Real Mode
                <p className="text-xs text-gray-500">Use real money</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

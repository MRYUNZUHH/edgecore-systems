"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const AVATARS = ["🦊","🐼","🐨","🦄","😎","🤠","👾","🐸","🤑","👑"];

export default function Navbar() {
  const [username, setUsername] = useState("");
  const [demoBalance, setDemoBalance] = useState(10000);
  const [realBalance, setRealBalance] = useState(0);
  const [accountMode, setAccountMode] = useState<"demo"|"real">("demo");
  const [avatar, setAvatar] = useState("😎");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setUsername(localStorage.getItem("ec_username") || "");
      setDemoBalance(parseFloat(localStorage.getItem("ec_balance") || "10000"));
      setRealBalance(parseFloat(localStorage.getItem("ec_real_balance") || "0"));
      setAccountMode((localStorage.getItem("ec_mode") || "demo") as "demo"|"real");
      setAvatar(localStorage.getItem("ec_avatar") || "😎");
    };
    update();
    const interval = setInterval(update, 500);
    window.addEventListener("storage", update);
    return () => { clearInterval(interval); window.removeEventListener("storage", update); };
  }, []);

  const switchMode = (mode: "demo"|"real") => {
    localStorage.setItem("ec_mode", mode);
    setAccountMode(mode);
  };

  const resetDemo = () => {
    localStorage.setItem("ec_balance", "10000");
    setDemoBalance(10000);
  };

  const logout = () => {
    localStorage.removeItem("ec_username");
    localStorage.removeItem("ec_balance");
    localStorage.removeItem("ec_real_balance");
    localStorage.removeItem("ec_wager_total");
    localStorage.removeItem("ec_mode");
    localStorage.removeItem("ec_avatar");
    setUsername("");
    setDemoBalance(10000);
    setRealBalance(0);
    setAccountMode("demo");
    setAvatar("😎");
    setShowDropdown(false);
  };

  const isLoggedIn = mounted && !!username;
  const activeBalance = accountMode === "demo" ? demoBalance : realBalance;

  return (
    <header className="border-b border-[#ffffff0f] bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Logo size="sm" />
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white no-underline transition">Home</Link>
            <Link href="/casino" className="text-gray-400 hover:text-white no-underline transition">Casino</Link>
            <Link href="/live-casino" className="text-gray-400 hover:text-white no-underline transition">Live</Link>
            <Link href="/predictions" className="text-gray-400 hover:text-white no-underline transition">Predictions</Link>
            <Link href="/vip" className="text-gray-400 hover:text-white no-underline transition">VIP</Link>
            <Link href="/wallet" className="text-gray-400 hover:text-white no-underline transition">Wallet</Link>
          </nav>
        </div>

        {/* Right: Demo/Real + Balance + Avatar */}
        <div className="flex items-center gap-3">
          {mounted && isLoggedIn ? (
            <>
              {/* Demo/Real Toggle */}
              <div className="hidden sm:flex bg-[#0f1520] border border-[#ffffff0f] rounded-full p-0.5 gap-0.5">
                <button onClick={() => switchMode("demo")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${accountMode==="demo"?"bg-blue-500 text-white shadow-lg shadow-blue-500/30":"text-gray-500 hover:text-white"}`}>
                  🎮 DEMO
                </button>
                <button onClick={() => switchMode("real")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${accountMode==="real"?"bg-[#f0b429] text-black shadow-lg shadow-[#f0b429]/30":"text-gray-500 hover:text-white"}`}>
                  💰 REAL
                </button>
              </div>

              {/* Balance */}
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 border ${accountMode==="demo"?"bg-blue-500/10 border-blue-500/30":"bg-[#f0b429]/10 border-[#f0b429]/30"}`}>
                <span className={`text-sm font-heading font-bold ${accountMode==="demo"?"text-blue-400":"text-[#f0b429]"}`}>${activeBalance.toFixed(2)}</span>
                {accountMode==="demo" && (
                  <button onClick={resetDemo} className="text-[10px] text-blue-400 hover:text-blue-300" title="Reset demo balance">↻</button>
                )}
              </div>

              {/* Avatar + Dropdown */}
              <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full bg-[#1a2235] border border-[#ffffff0f] flex items-center justify-center text-lg hover:border-[#f0b429] transition">
                  {avatar}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[#0f1520] border border-[#ffffff0f] rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-[#ffffff0f]">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{avatar}</span>
                        <div>
                          <p className="text-white text-sm font-bold">{username}</p>
                          <p className="text-gray-500 text-xs">{accountMode==="demo"?"Demo Account":"Real Account"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="bg-[#1a2235] rounded-lg p-2 text-center">
                          <p className="text-gray-500">Demo</p>
                          <p className="text-blue-400 font-bold">${demoBalance.toFixed(0)}</p>
                        </div>
                        <div className="bg-[#1a2235] rounded-lg p-2 text-center">
                          <p className="text-gray-500">Real</p>
                          <p className="text-[#f0b429] font-bold">${realBalance.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                    <Link href="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 no-underline">👤 Profile</Link>
                    <Link href="/wallet" onClick={() => setShowDropdown(false)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 no-underline">💰 Wallet</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10">🚪 Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : mounted ? (
            <>
              <Link href="/auth/login" className="bg-[#f0b429] text-black font-bold px-5 py-2 rounded-lg text-sm no-underline">Sign In</Link>
              <Link href="/auth/signup" className="border border-[#f0b429]/30 text-[#f0b429] font-bold px-5 py-2 rounded-lg text-sm no-underline hidden sm:block">Register</Link>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
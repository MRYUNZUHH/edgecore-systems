"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const navLinks = [
  { h: "/", l: "Home" },
  { h: "/casino", l: "Casino" },
  { h: "/live-casino", l: "Live", live: true },
  { h: "/predictions", l: "Predict" },
  { h: "/vip", l: "VIP ✦" },
  { h: "/wallet", l: "Wallet" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [demoBalance, setDemoBalance] = useState(10000);
  const [realBalance, setRealBalance] = useState(0);
  const [accountMode, setAccountMode] = useState<"demo" | "real">("demo");
  const [avatar, setAvatar] = useState("😎");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setUsername(localStorage.getItem("ec_username") || "");
      setDemoBalance(parseFloat(localStorage.getItem("ec_balance") || "10000"));
      setRealBalance(parseFloat(localStorage.getItem("ec_real_balance") || "0"));
      setAccountMode((localStorage.getItem("ec_mode") || "demo") as "demo" | "real");
      setAvatar(localStorage.getItem("ec_avatar") || "😎");
    };
    update();
    const interval = setInterval(update, 500);
    window.addEventListener("storage", update);
    return () => { clearInterval(interval); window.removeEventListener("storage", update); };
  }, []);

  const switchMode = (mode: "demo" | "real") => {
    localStorage.setItem("ec_mode", mode);
    setAccountMode(mode);
  };

  const resetDemo = () => {
    localStorage.setItem("ec_balance", "10000");
    setDemoBalance(10000);
  };

  const logout = () => {
    ["ec_username", "ec_balance", "ec_real_balance", "ec_wager_total", "ec_mode", "ec_avatar"].forEach((k) =>
      localStorage.removeItem(k)
    );
    setUsername(""); setDemoBalance(10000); setRealBalance(0);
    setAccountMode("demo"); setShowDropdown(false);
  };

  const isLoggedIn = mounted && !!username;
  const activeBalance = accountMode === "demo" ? demoBalance : realBalance;

  if (!mounted) {
    return (
      <header className="border-b border-[#ffffff0a] bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Logo size="sm" />
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-[#ffffff0a] bg-[#080b12]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Logo size="sm" />
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {navLinks.map((l) => {
              const active = pathname === l.h;
              return (
                <Link
                  key={l.h}
                  href={l.h}
                  className={`px-3 py-2 rounded-lg font-medium transition no-underline relative
                    ${active ? "text-[#f0b429] bg-[#f0b429]/8" : "text-gray-400 hover:text-white hover:bg-white/5"}
                    ${l.live ? "!text-[#00ff88]" : ""}
                  `}
                >
                  {l.live && <span className="live-dot inline-block w-1.5 h-1.5 mr-1.5 mb-0.5" />}
                  {l.l}
                  {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#f0b429] rounded-full" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Auth / Balance */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Demo / Real toggle */}
              <div className="hidden sm:flex bg-[#0f1520] border border-[#ffffff0f] rounded-full p-0.5 gap-0.5">
                <button
                  onClick={() => switchMode("demo")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${accountMode === "demo" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:text-white"}`}
                >
                  DEMO
                </button>
                <button
                  onClick={() => switchMode("real")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${accountMode === "real" ? "bg-[#f0b429] text-black shadow-lg shadow-[#f0b429]/20" : "text-gray-500 hover:text-white"}`}
                >
                  REAL
                </button>
              </div>

              {/* Balance pill */}
              <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-sm font-bold
                ${accountMode === "demo" ? "bg-blue-500/10 border-blue-500/25 text-blue-400" : "bg-[#f0b429]/10 border-[#f0b429]/25 text-[#f0b429]"}`}>
                ${activeBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                {accountMode === "demo" && (
                  <button onClick={resetDemo} className="text-[10px] opacity-60 hover:opacity-100 ml-0.5" title="Reset demo">↻</button>
                )}
              </div>

              {/* Avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full bg-[#1a2235] border border-[#ffffff0f] flex items-center justify-center text-lg hover:border-[#f0b429]/50 transition"
                >
                  {avatar}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#0f1520] border border-[#ffffff0f] rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-[#ffffff0a]">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{avatar}</span>
                        <div>
                          <p className="text-white text-sm font-bold">{username}</p>
                          <p className="text-gray-500 text-xs">{accountMode === "demo" ? "Demo Account" : "Real Account"}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#1a2235] rounded-lg p-2 text-center">
                          <p className="text-gray-500 text-[10px] mb-0.5">Demo</p>
                          <p className="text-blue-400 font-bold text-sm">${demoBalance.toFixed(0)}</p>
                        </div>
                        <div className="bg-[#1a2235] rounded-lg p-2 text-center">
                          <p className="text-gray-500 text-[10px] mb-0.5">Real</p>
                          <p className="text-[#f0b429] font-bold text-sm">${realBalance.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>
                    {[{ href: "/profile", label: "👤  Profile" }, { href: "/wallet", label: "💰  Wallet" }, { href: "/vip", label: "✦  VIP Status" }].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 no-underline transition">
                        {item.label}
                      </Link>
                    ))}
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition border-t border-[#ffffff0a]">
                      🚪  Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition no-underline">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-[#f0b429] text-black font-bold px-5 py-2 rounded-lg text-sm no-underline hover:bg-[#d4981f] transition shadow-[0_0_20px_rgba(240,180,41,0.3)]">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

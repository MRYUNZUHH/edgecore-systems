"use client";
import { useState } from "react";
import { useBalance } from "@/lib/useBalance";
import MobileNav from "@/components/layout/MobileNav";

export default function ProfilePage() {
  const { username, isLoggedIn, avatar, updateAvatar, DEFAULT_AVATARS, demoBalance, realBalance, accountMode, totalWagered, logout } = useBalance();
  const [editing, setEditing] = useState(false);

  if (!isLoggedIn) return <div className="p-8 text-center text-gray-400">Please login to view your profile.</div>;

  return (
    <div className="pb-20 lg:pb-0 max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429]">👤 My Profile</h1>
      
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 text-center">
        <div className="text-6xl mb-4">{avatar}</div>
        <h2 className="text-xl font-heading font-bold text-white">{username}</h2>
        <p className="text-gray-400 text-sm mt-1">{accountMode === "demo" ? "Demo Account" : "Real Account"}</p>
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Choose your avatar</p>
          <div className="flex flex-wrap justify-center gap-2">
            {DEFAULT_AVATARS.map(a => (
              <button key={a} onClick={() => updateAvatar(a)} className={`text-3xl p-2 rounded-xl transition ${avatar === a ? "bg-[#f0b429]/20 ring-2 ring-[#f0b429]" : "hover:bg-white/10"}`}>{a}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 space-y-3">
        <h3 className="text-lg font-heading font-bold text-white">Account Details</h3>
        <div className="flex justify-between py-2 border-b border-[#ffffff0f]"><span className="text-gray-400">Username</span><span className="text-white">{username}</span></div>
        <div className="flex justify-between py-2 border-b border-[#ffffff0f]"><span className="text-gray-400">Account Mode</span><span className={accountMode==="demo"?"text-blue-400":"text-[#f0b429]"}>{accountMode.toUpperCase()}</span></div>
      </div>

      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 space-y-3">
        <h3 className="text-lg font-heading font-bold text-white">Balances</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a2235] rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">Demo Balance</p>
            <p className="text-xl font-heading font-bold text-blue-400">${demoBalance.toFixed(2)}</p>
          </div>
          <div className="bg-[#1a2235] rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">Real Balance</p>
            <p className="text-xl font-heading font-bold text-[#f0b429]">${realBalance.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-between py-2 border-b border-[#ffffff0f]"><span className="text-gray-400">Total Wagered</span><span className="text-white">${totalWagered.toFixed(2)}</span></div>
      </div>

      <button onClick={logout} className="w-full py-3 border border-red-500/30 text-red-400 rounded-lg font-bold text-sm hover:bg-red-500/10 transition">🚪 Logout</button>
      <MobileNav />
    </div>
  );
}
"use client";
import { useState } from "react";
import { X } from "lucide-react";

export function SignupBonusBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-4 py-3 flex items-center justify-between gap-3 shadow-lg z-50">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xl shrink-0">🎁</span>
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight">
            New Player? Get <span className="text-yellow-300">$15 FREE</span> — No Deposit Needed
          </p>
          <p className="text-xs text-white/80 truncate">Sign up now and claim your instant bonus. No strings attached.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="/auth/signup"
          className="bg-white text-emerald-700 font-bold text-xs px-4 py-1.5 rounded-full hover:bg-yellow-300 hover:text-black transition-all whitespace-nowrap"
        >
          Claim $15 →
        </a>
        <button onClick={() => setVisible(false)} className="text-white/60 hover:text-white transition">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export function DepositBonusBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-purple-700 via-fuchsia-700 to-pink-600 text-white px-4 py-3 flex items-center justify-between gap-3 shadow-lg z-50">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xl shrink-0">⚡</span>
        <div className="min-w-0">
          <p className="font-bold text-sm leading-tight">
            Deposit $100+ and get a <span className="text-yellow-300">$100 BONUS</span> instantly
          </p>
          <p className="text-xs text-white/80 truncate">100% match on deposits over $100. Credited to your wallet immediately.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href="/wallet/deposit"
          className="bg-white text-purple-700 font-bold text-xs px-4 py-1.5 rounded-full hover:bg-yellow-300 hover:text-black transition-all whitespace-nowrap"
        >
          Deposit Now →
        </a>
        <button onClick={() => setVisible(false)} className="text-white/60 hover:text-white transition">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

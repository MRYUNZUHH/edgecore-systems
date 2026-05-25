"use client";
import { useState, useEffect } from "react";

export function useBalance() {
  const [balance, setBalance] = useState(10000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored = localStorage.getItem("edgecore_balance");
      if (stored) setBalance(parseFloat(stored) || 10000);
    } catch {}
  }, [mounted]);

  const update = (delta: number) => {
    setBalance(prev => {
      const next = Math.max(0, prev + delta);
      if (mounted) localStorage.setItem("edgecore_balance", next.toString());
      return next;
    });
  };

  const placeBet = (amount: number): boolean => {
    const bal = parseFloat(localStorage.getItem("edgecore_balance") || "10000");
    if (amount > bal) return false;
    update(-amount);
    return true;
  };

  const addWinnings = (amount: number) => update(amount);
  const reset = () => { setBalance(10000); if (mounted) localStorage.setItem("edgecore_balance", "10000"); };

  return { balance, update, placeBet, addWinnings, reset, mounted };
}
"use client";
import { useState, useEffect } from "react";
export function useBalance() {
  const [balance, setBalance] = useState(10000);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem("edgecore_balance");
    if (stored) setBalance(parseFloat(stored) || 10000);
  }, [mounted]);
  const update = (delta: number) => {
    setBalance(prev => {
      const next = Math.max(0, prev + delta);
      if (mounted) localStorage.setItem("edgecore_balance", next.toString());
      return next;
    });
  };
  const reset = () => { setBalance(10000); if (mounted) localStorage.setItem("edgecore_balance", "10000"); };
  return { balance, update, reset, mounted };
}
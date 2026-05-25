"use client";
import { useState, useEffect, useCallback } from "react";

const BALANCE_KEY = "ec_balance";
const USERNAME_KEY = "ec_username";
const WAGER_KEY = "ec_wager_total";

export function useBalance() {
  const [balance, setBalance] = useState(10000);
  const [username, setUsername] = useState("");
  const [totalWagered, setTotalWagered] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Read from localStorage only on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const storedBalance = localStorage.getItem(BALANCE_KEY);
      if (storedBalance) setBalance(parseFloat(storedBalance));
      const storedUser = localStorage.getItem(USERNAME_KEY);
      if (storedUser) setUsername(storedUser);
      const storedWager = localStorage.getItem(WAGER_KEY);
      if (storedWager) setTotalWagered(parseFloat(storedWager));
    } catch (e) {}
  }, []);

  // Listen for storage changes from other tabs/components
  useEffect(() => {
    if (!mounted) return;
    const handler = () => {
      const storedBalance = localStorage.getItem(BALANCE_KEY);
      if (storedBalance) setBalance(parseFloat(storedBalance));
      const storedUser = localStorage.getItem(USERNAME_KEY);
      if (storedUser) setUsername(storedUser);
      const storedWager = localStorage.getItem(WAGER_KEY);
      if (storedWager) setTotalWagered(parseFloat(storedWager));
    };
    window.addEventListener("storage", handler);
    // Also poll every 500ms to catch same-tab updates
    const interval = setInterval(handler, 500);
    return () => {
      window.removeEventListener("storage", handler);
      clearInterval(interval);
    };
  }, [mounted]);

  // Deduct bet amount from balance
  const placeBet = useCallback((amount: number): boolean => {
    const currentBalance = parseFloat(localStorage.getItem(BALANCE_KEY) || "10000");
    if (amount > currentBalance) return false;
    const newBalance = currentBalance - amount;
    localStorage.setItem(BALANCE_KEY, newBalance.toString());
    setBalance(newBalance);
    // Update wager total
    const currentWager = parseFloat(localStorage.getItem(WAGER_KEY) || "0");
    const newWager = currentWager + amount;
    localStorage.setItem(WAGER_KEY, newWager.toString());
    setTotalWagered(newWager);
    return true;
  }, []);

  // Add winnings to balance
  const addWinnings = useCallback((amount: number) => {
    const currentBalance = parseFloat(localStorage.getItem(BALANCE_KEY) || "10000");
    const newBalance = currentBalance + amount;
    localStorage.setItem(BALANCE_KEY, newBalance.toString());
    setBalance(newBalance);
  }, []);

  // Login sets username and resets balance to 10000
  const login = useCallback((name: string) => {
    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(BALANCE_KEY, "10000");
    localStorage.setItem(WAGER_KEY, "0");
    setUsername(name);
    setBalance(10000);
    setTotalWagered(0);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(WAGER_KEY);
    setUsername("");
    setBalance(10000);
    setTotalWagered(0);
  }, []);

  const resetDemo = useCallback(() => {
    localStorage.setItem(BALANCE_KEY, "10000");
    setBalance(10000);
  }, []);

  const isLoggedIn = mounted && !!username;

  return {
    balance,
    username,
    totalWagered,
    isLoggedIn,
    mounted,
    placeBet,
    addWinnings,
    login,
    logout,
    resetDemo,
  };
}
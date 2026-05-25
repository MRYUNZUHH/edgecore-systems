"use client";
import { useState, useEffect } from "react";
const BALANCE_KEY = "ec_balance";
const USERNAME_KEY = "ec_username";
const WAGER_KEY = "ec_wager_total";
export function useBalance() {
  const [balance, setBalance] = useState(10000);
  const [username, setUsername] = useState("");
  const [totalWagered, setTotalWagered] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    try {
      setBalance(parseFloat(localStorage.getItem(BALANCE_KEY) || "10000"));
      setUsername(localStorage.getItem(USERNAME_KEY) || "");
      setTotalWagered(parseFloat(localStorage.getItem(WAGER_KEY) || "0"));
    } catch {}
    const handler = () => {
      setBalance(parseFloat(localStorage.getItem(BALANCE_KEY) || "10000"));
      setUsername(localStorage.getItem(USERNAME_KEY) || "");
      setTotalWagered(parseFloat(localStorage.getItem(WAGER_KEY) || "0"));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [mounted]);
  const placeBet = (amount: number): boolean => {
    const bal = parseFloat(localStorage.getItem(BALANCE_KEY) || "10000");
    if (amount > bal) return false;
    const newBal = bal - amount;
    localStorage.setItem(BALANCE_KEY, newBal.toString());
    const newWager = (parseFloat(localStorage.getItem(WAGER_KEY) || "0")) + amount;
    localStorage.setItem(WAGER_KEY, newWager.toString());
    setBalance(newBal); setTotalWagered(newWager);
    return true;
  };
  const addWinnings = (amount: number) => {
    const bal = parseFloat(localStorage.getItem(BALANCE_KEY) || "10000");
    const newBal = bal + amount;
    localStorage.setItem(BALANCE_KEY, newBal.toString());
    setBalance(newBal);
  };
  const login = (name: string) => {
    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(BALANCE_KEY, "10000");
    localStorage.setItem(WAGER_KEY, "0");
    setUsername(name); setBalance(10000); setTotalWagered(0);
  };
  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(WAGER_KEY);
    setUsername(""); setBalance(10000); setTotalWagered(0);
  };
  const isLoggedIn = mounted && !!username;
  return { balance, username, totalWagered, isLoggedIn, placeBet, addWinnings, login, logout, mounted };
}
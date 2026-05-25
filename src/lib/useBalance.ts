"use client";
import { useState, useEffect, useCallback } from "react";

const BALANCE_KEY = "ec_balance";
const REAL_BALANCE_KEY = "ec_real_balance";
const USERNAME_KEY = "ec_username";
const WAGER_KEY = "ec_wager_total";
const MODE_KEY = "ec_account_mode";
const AVATAR_KEY = "ec_avatar";

const DEFAULT_AVATARS = ["🦊","🐼","🐨","🦄","😎","🤠","👾","🐸","🤑","👑"];

export function useBalance() {
  const [balance, setBalance] = useState(10000);
  const [realBalance, setRealBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [totalWagered, setTotalWagered] = useState(0);
  const [accountMode, setAccountMode] = useState<"demo"|"real">("demo");
  const [avatar, setAvatar] = useState("😎");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      setBalance(parseFloat(localStorage.getItem(BALANCE_KEY) || "10000"));
      setRealBalance(parseFloat(localStorage.getItem(REAL_BALANCE_KEY) || "0"));
      setUsername(localStorage.getItem(USERNAME_KEY) || "");
      setTotalWagered(parseFloat(localStorage.getItem(WAGER_KEY) || "0"));
      setAccountMode((localStorage.getItem(MODE_KEY) || "demo") as "demo"|"real");
      setAvatar(localStorage.getItem(AVATAR_KEY) || "😎");
    } catch {}
    const handler = () => {
      setBalance(parseFloat(localStorage.getItem(BALANCE_KEY) || "10000"));
      setRealBalance(parseFloat(localStorage.getItem(REAL_BALANCE_KEY) || "0"));
      setUsername(localStorage.getItem(USERNAME_KEY) || "");
      setAccountMode((localStorage.getItem(MODE_KEY) || "demo") as "demo"|"real");
      setAvatar(localStorage.getItem(AVATAR_KEY) || "😎");
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [mounted]);

  const getActiveBalance = useCallback(() => {
    return accountMode === "demo" ? balance : realBalance;
  }, [accountMode, balance, realBalance]);

  const placeBet = (amount: number): boolean => {
    const bal = accountMode === "demo" ? parseFloat(localStorage.getItem(BALANCE_KEY) || "10000") : parseFloat(localStorage.getItem(REAL_BALANCE_KEY) || "0");
    if (amount > bal) return false;
    const newBal = bal - amount;
    if (accountMode === "demo") { localStorage.setItem(BALANCE_KEY, newBal.toString()); setBalance(newBal); }
    else { localStorage.setItem(REAL_BALANCE_KEY, newBal.toString()); setRealBalance(newBal); }
    const newWager = (parseFloat(localStorage.getItem(WAGER_KEY) || "0")) + amount;
    localStorage.setItem(WAGER_KEY, newWager.toString());
    setTotalWagered(newWager);
    return true;
  };

  const addWinnings = (amount: number) => {
    if (accountMode === "demo") {
      const bal = parseFloat(localStorage.getItem(BALANCE_KEY) || "10000");
      const newBal = bal + amount;
      localStorage.setItem(BALANCE_KEY, newBal.toString());
      setBalance(newBal);
    } else {
      const bal = parseFloat(localStorage.getItem(REAL_BALANCE_KEY) || "0");
      const newBal = bal + amount;
      localStorage.setItem(REAL_BALANCE_KEY, newBal.toString());
      setRealBalance(newBal);
    }
  };

  const switchMode = (mode: "demo"|"real") => {
    localStorage.setItem(MODE_KEY, mode);
    setAccountMode(mode);
  };

  const resetDemo = () => {
    localStorage.setItem(BALANCE_KEY, "10000");
    setBalance(10000);
  };

  const login = (name: string) => {
    const av = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(BALANCE_KEY, "10000");
    localStorage.setItem(REAL_BALANCE_KEY, "0");
    localStorage.setItem(WAGER_KEY, "0");
    localStorage.setItem(MODE_KEY, "demo");
    localStorage.setItem(AVATAR_KEY, av);
    setUsername(name); setBalance(10000); setRealBalance(0); setTotalWagered(0); setAccountMode("demo"); setAvatar(av);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(REAL_BALANCE_KEY);
    localStorage.removeItem(WAGER_KEY);
    localStorage.removeItem(MODE_KEY);
    localStorage.removeItem(AVATAR_KEY);
    setUsername(""); setBalance(10000); setRealBalance(0); setTotalWagered(0); setAccountMode("demo"); setAvatar("😎");
  };

  const updateAvatar = (av: string) => { localStorage.setItem(AVATAR_KEY, av); setAvatar(av); };

  const isLoggedIn = mounted && !!username;
  const activeBalance = getActiveBalance();

  return { balance: activeBalance, demoBalance: balance, realBalance, username, totalWagered, accountMode, avatar, isLoggedIn, placeBet, addWinnings, login, logout, switchMode, resetDemo, updateAvatar, DEFAULT_AVATARS, mounted };
}
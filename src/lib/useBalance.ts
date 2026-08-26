"use client";
import { useState, useEffect, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

const DEMO_KEY = "ec_balance";
const REAL_KEY = "ec_real_balance";
const MODE_KEY = "ec_mode";
const USERNAME_KEY = "ec_username";
const WAGER_KEY = "ec_wager_total";
const AVATAR_KEY = "ec_avatar";

type Mode = "demo" | "real";
const DEFAULT_DEMO_BALANCE = 10000;

const isBrowser = () => typeof window !== "undefined";

function safeParse(value: string | null, fallback: number) {
  const parsed = parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getStoredMode(): Mode {
  if (!isBrowser()) return "demo";
  const mode = localStorage.getItem(MODE_KEY);
  return mode === "real" ? "real" : "demo";
}

function getStoredAvatar(): string {
  if (!isBrowser()) return "😎";
  return localStorage.getItem(AVATAR_KEY) || "😎";
}

function getStoredDemoBalance(): number {
  if (!isBrowser()) return DEFAULT_DEMO_BALANCE;
  return safeParse(localStorage.getItem(DEMO_KEY), DEFAULT_DEMO_BALANCE);
}

function getStoredRealBalance(): number {
  if (!isBrowser()) return 0;
  return safeParse(localStorage.getItem(REAL_KEY), 0);
}

function getStoredUsername(): string {
  if (!isBrowser()) return "";
  return localStorage.getItem(USERNAME_KEY) || "";
}

function getStoredWager(): number {
  if (!isBrowser()) return 0;
  return safeParse(localStorage.getItem(WAGER_KEY), 0);
}

export function useBalance() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("demo");
  const [demoBalance, setDemoBalance] = useState(DEFAULT_DEMO_BALANCE);
  const [realBalance, setRealBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [totalWagered, setTotalWagered] = useState(0);
  const [avatar, setAvatar] = useState("😎");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const syncState = () => {
      setMode(getStoredMode());
      setDemoBalance(getStoredDemoBalance());
      setRealBalance(getStoredRealBalance());
      setUsername(getStoredUsername());
      setTotalWagered(getStoredWager());
      setAvatar(getStoredAvatar());
    };

    syncState();
    window.addEventListener("storage", syncState);
    return () => window.removeEventListener("storage", syncState);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (status === "authenticated" && session?.user?.name) {
      setUsername(session.user.name);
      try {
        localStorage.setItem(USERNAME_KEY, session.user.name);
      } catch (e) {}
    }
  }, [mounted, status, session?.user?.name]);

  const getActiveBalance = useCallback(() => {
    return mode === "real" ? realBalance : demoBalance;
  }, [mode, demoBalance, realBalance]);

  const placeBet = useCallback(
    (amount: number): boolean => {
      if (!isBrowser()) return false;
      const key = mode === "real" ? REAL_KEY : DEMO_KEY;
      const currentBalance = safeParse(localStorage.getItem(key), mode === "real" ? 0 : DEFAULT_DEMO_BALANCE);
      if (amount > currentBalance) return false;
      const newBalance = currentBalance - amount;
      localStorage.setItem(key, newBalance.toString());
      if (mode === "real") {
        setRealBalance(newBalance);
      } else {
        setDemoBalance(newBalance);
      }

      const currentWager = safeParse(localStorage.getItem(WAGER_KEY), 0);
      const newWager = currentWager + amount;
      localStorage.setItem(WAGER_KEY, newWager.toString());
      setTotalWagered(newWager);
      return true;
    },
    [mode]
  );

  const addWinnings = useCallback(
    (amount: number) => {
      if (!isBrowser()) return;
      const key = mode === "real" ? REAL_KEY : DEMO_KEY;
      const currentBalance = safeParse(localStorage.getItem(key), mode === "real" ? 0 : DEFAULT_DEMO_BALANCE);
      const newBalance = currentBalance + amount;
      localStorage.setItem(key, newBalance.toString());
      if (mode === "real") {
        setRealBalance(newBalance);
      } else {
        setDemoBalance(newBalance);
      }
    },
    [mode]
  );

  const switchMode = useCallback((newMode: Mode) => {
    if (!isBrowser()) return;
    localStorage.setItem(MODE_KEY, newMode);
    setMode(newMode);
  }, []);

  const login = useCallback((name: string) => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(USERNAME_KEY, name);
      localStorage.setItem(DEMO_KEY, DEFAULT_DEMO_BALANCE.toString());
      localStorage.setItem(WAGER_KEY, "0");
      localStorage.setItem(MODE_KEY, "demo");
    } catch (e) {}

    setUsername(name);
    setDemoBalance(DEFAULT_DEMO_BALANCE);
    setRealBalance(0);
    setTotalWagered(0);
    setMode("demo");
  }, []);

  const logout = useCallback(async () => {
    if (status === "authenticated") {
      await signOut({ redirect: false });
    }

    if (isBrowser()) {
      try {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(DEMO_KEY);
        localStorage.removeItem(REAL_KEY);
        localStorage.removeItem(WAGER_KEY);
        localStorage.removeItem(MODE_KEY);
        localStorage.removeItem(AVATAR_KEY);
      } catch (e) {}
    }

    setUsername("");
    setDemoBalance(DEFAULT_DEMO_BALANCE);
    setRealBalance(0);
    setTotalWagered(0);
    setMode("demo");
    setAvatar("😎");
  }, [status]);

  const resetDemo = useCallback(() => {
    if (!isBrowser()) return;
    localStorage.setItem(DEMO_KEY, DEFAULT_DEMO_BALANCE.toString());
    setDemoBalance(DEFAULT_DEMO_BALANCE);
  }, []);

  const activeBalance = getActiveBalance();
  const isLoggedIn = mounted && status === "authenticated";

  return {
    balance: activeBalance,
    username,
    mode,
    avatar,
    demoBalance,
    realBalance,
    totalWagered,
    isLoggedIn,
    mounted,
    placeBet,
    addWinnings,
    switchMode,
    login,
    logout,
    resetDemo,
  };
}

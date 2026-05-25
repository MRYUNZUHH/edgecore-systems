"use client";
import { useState, useEffect, useCallback } from "react";

interface User { username: string; balance: number; loggedIn: boolean; justLoggedIn?: boolean; }

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("edgecore_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "edgecore_user" && e.newValue) setUser(JSON.parse(e.newValue));
      if (e.key === "edgecore_user" && !e.newValue) setUser(null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const login = useCallback((username: string) => {
    const u: User = { username, balance: 10000, loggedIn: true, justLoggedIn: true };
    localStorage.setItem("edgecore_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("edgecore_user");
    setUser(null);
  }, []);

  const updateBalance = useCallback((n: number) => {
    if (!user) return;
    const u = { ...user, balance: n };
    localStorage.setItem("edgecore_user", JSON.stringify(u));
    setUser(u);
  }, [user]);

  const clearJustLoggedIn = useCallback(() => {
    if (!user?.justLoggedIn) return;
    const u = { ...user, justLoggedIn: false };
    localStorage.setItem("edgecore_user", JSON.stringify(u));
    setUser(u);
  }, [user]);

  return { user, isLoggedIn: !!user?.loggedIn, loading, login, logout, updateBalance, clearJustLoggedIn };
}
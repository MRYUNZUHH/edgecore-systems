"use client";
import { useState, useEffect, useCallback } from "react";

export interface User {
  username: string; email: string; phone: string;
  avatar: string; balance: number; realBalance: number;
  loggedIn: boolean; justLoggedIn?: boolean;
  accountMode: "demo" | "real";
}

const DEFAULT_AVATARS = ["🦊","🐼","🐨","🦄","😎","🤠","👾","🐸","🤑","👑","💀","🎃","🤖","👽","🐶"];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored = localStorage.getItem("edgecore_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: StorageEvent) => {
      if (e.key === "edgecore_user" && e.newValue) setUser(JSON.parse(e.newValue));
      if (e.key === "edgecore_user" && !e.newValue) setUser(null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [mounted]);

  const save = (u: User) => { if (mounted) { localStorage.setItem("edgecore_user", JSON.stringify(u)); setUser(u); } };

  const login = useCallback((username: string, email?: string, phone?: string) => {
    const avatar = DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];
    const u: User = { username, email: email || "", phone: phone || "", avatar, balance: 10000, realBalance: 0, loggedIn: true, justLoggedIn: true, accountMode: "demo" };
    save(u);
  }, [mounted]);

  const logout = useCallback(() => { if (mounted) { localStorage.removeItem("edgecore_user"); setUser(null); } }, [mounted]);

  const switchMode = useCallback((mode: "demo" | "real") => {
    if (!user) return;
    save({ ...user, accountMode: mode });
  }, [user, mounted]);

  const updateBalance = useCallback((delta: number) => {
    if (!user) return;
    if (user.accountMode === "demo") {
      save({ ...user, balance: Math.max(0, (user.balance || 0) + delta) });
    } else {
      save({ ...user, realBalance: Math.max(0, (user.realBalance || 0) + delta) });
    }
  }, [user, mounted]);

  const getBalance = useCallback(() => {
    if (!user) return 0;
    return user.accountMode === "demo" ? (user.balance || 0) : (user.realBalance || 0);
  }, [user]);

  const resetDemo = useCallback(() => {
    if (!user) return;
    save({ ...user, balance: 10000 });
  }, [user, mounted]);

  const updateAvatar = useCallback((avatar: string) => {
    if (!user) return;
    save({ ...user, avatar });
  }, [user, mounted]);

  const updateProfile = useCallback((data: { username?: string; email?: string; phone?: string }) => {
    if (!user) return;
    save({ ...user, ...data });
  }, [user, mounted]);

  const clearJustLoggedIn = useCallback(() => {
    if (!user?.justLoggedIn) return;
    save({ ...user, justLoggedIn: false });
  }, [user, mounted]);

  return { user, isLoggedIn: !!user?.loggedIn, mounted, login, logout, switchMode, updateBalance, getBalance, resetDemo, updateAvatar, updateProfile, clearJustLoggedIn, DEFAULT_AVATARS };
}
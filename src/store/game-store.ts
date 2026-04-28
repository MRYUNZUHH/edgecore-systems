import { create } from "zustand";

interface GameStore {
  isLoggedIn: boolean;
  user: { username: string; avatar: string; vipLevel: number } | null;
  balance: number;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  setBalance: (b: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isLoggedIn: false,
  user: null,
  balance: 10000,
  login: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    set({
      isLoggedIn: true,
      user: { username, avatar: "😎", vipLevel: 0 },
      balance: 10000,
    });
    return { success: true };
  },
  signup: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    set({
      isLoggedIn: true,
      user: { username, avatar: "😎", vipLevel: 0 },
      balance: 10000,
    });
    return { success: true };
  },
  logout: () => set({ isLoggedIn: false, user: null, balance: 10000 }),
  setBalance: (balance) => set({ balance }),
}));
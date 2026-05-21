import { create } from "zustand";

export interface GameStore {
  isLoggedIn: boolean;
  user: { username: string; role: string; balance: number; bonusBalance: number; vipLevel: number; country: string; language: string; wageringRequirement: number } | null;
  balance: number;
  bonusBalance: number;
  wageringRequirement: number;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  placeBet: (game: string, amount: number) => { win: boolean; payout: number };
  betHistory: { id: string; game: string; amount: number; outcome: string; profit: number; timestamp: string }[];
  addBet: (bet: any) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  balance: 10000,
  bonusBalance: 0,
  wageringRequirement: 0,
  betHistory: [],
  
  login: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    const isAdmin = username === "admin" && password === "admin";
    set({
      isLoggedIn: true,
      user: { username, role: isAdmin ? "admin" : "user", balance: 10000, bonusBalance: isAdmin ? 0 : 5000, vipLevel: isAdmin ? 5 : 0, country: "global", language: "en", wageringRequirement: isAdmin ? 0 : 15000 },
      balance: 10000,
      bonusBalance: isAdmin ? 0 : 5000,
      wageringRequirement: isAdmin ? 0 : 15000,
    });
    return { success: true };
  },
  
  signup: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    set({
      isLoggedIn: true,
      user: { username, role: "user", balance: 10000, bonusBalance: 5000, vipLevel: 0, country: "global", language: "en", wageringRequirement: 15000 },
      balance: 10000,
      bonusBalance: 5000,
      wageringRequirement: 15000,
    });
    return { success: true };
  },
  
  logout: () => set({ isLoggedIn: false, user: null, balance: 10000, bonusBalance: 0, betHistory: [] }),
  
  placeBet: (game, amount) => {
    const state = get();
    if (amount > state.balance) return { win: false, payout: 0 };
    const win = Math.random() > 0.06;
    const payout = win ? amount * (Math.random() * 2 + 0.5) : 0;
    const profit = payout - amount;
    set({
      balance: state.balance + profit,
      betHistory: [{ id: Date.now().toString(), game, amount, outcome: win ? "win" : "loss", profit, timestamp: new Date().toISOString() }, ...state.betHistory].slice(0, 50)
    });
    return { win, payout };
  },
  
  addBet: (bet) => set((state) => ({ betHistory: [bet, ...state.betHistory].slice(0, 50) })),
}));
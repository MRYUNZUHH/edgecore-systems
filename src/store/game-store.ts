import { create } from "zustand";

export interface GameStore {
  isLoggedIn: boolean;
  user: { username: string; role: string; country: string; vipLevel: number; kycVerified: boolean } | null;
  wallet: { cashBalance: number; bonusBalance: number; wageringRequirement: number; lockedFunds: number };
  betHistory: any[];
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  placeBet: (gameId: string, amount: number) => { success: boolean; result?: any; error?: string };
  addDemoFunds: (amount: number) => void;
}

const DEFAULT_WALLET = { cashBalance: 10000, bonusBalance: 0, wageringRequirement: 0, lockedFunds: 0 };

export const useGameStore = create<GameStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  wallet: DEFAULT_WALLET,
  betHistory: [],

  login: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    const isAdmin = username === "admin" && password === "admin";
    set({
      isLoggedIn: true,
      user: { username, role: isAdmin ? "admin" : "user", country: "global", vipLevel: isAdmin ? 5 : 0, kycVerified: isAdmin },
      wallet: { cashBalance: isAdmin ? 50000 : 10000, bonusBalance: isAdmin ? 0 : 5000, wageringRequirement: isAdmin ? 0 : 15000, lockedFunds: 0 },
      betHistory: [],
    });
    return { success: true };
  },

  signup: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    set({
      isLoggedIn: true,
      user: { username, role: "user", country: "global", vipLevel: 0, kycVerified: false },
      wallet: { cashBalance: 10000, bonusBalance: 5000, wageringRequirement: 15000, lockedFunds: 0 },
      betHistory: [],
    });
    return { success: true };
  },

  logout: () => set({ isLoggedIn: false, user: null, wallet: DEFAULT_WALLET, betHistory: [] }),

  placeBet: (gameId, amount) => {
    const { wallet } = get();
    if (amount > (wallet?.cashBalance || 0)) return { success: false, error: "Insufficient funds" };
    
    const win = Math.random() > 0.06;
    const payout = win ? amount * (Math.random() * 2 + 0.5) : 0;
    const profit = payout - amount;
    
    set({
      wallet: { ...wallet, cashBalance: (wallet?.cashBalance || 0) + profit },
      betHistory: [{ id: Date.now().toString(), gameId, amount, outcome: win ? 'win' : 'loss', profit, timestamp: new Date().toISOString() }, ...get().betHistory].slice(0, 50),
    });
    return { success: true, result: { win, payout } };
  },

  addDemoFunds: (amount) => {
    const { wallet } = get();
    set({ wallet: { ...(wallet || DEFAULT_WALLET), cashBalance: (wallet?.cashBalance || 0) + amount } });
  },
}));
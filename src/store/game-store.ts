import { create } from "zustand";

interface UserProfile {
  username: string;
  role: string; // 'user' | 'admin'
  balance: number;
  bonusBalance: number;
  wageringRequirement: number;
  vipLevel: number;
  preferredCurrency: string;
  country: string;
  language: string;
}

interface GameStore {
  isLoggedIn: boolean;
  user: UserProfile | null;
  balance: number;
  bonusBalance: number;
  wageringRequirement: number;
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  setCountry: (country: string) => void;
  setLanguage: (lang: string) => void;
  placeBet: (game: string, amount: number) => { win: boolean; payout: number };
}

export const useGameStore = create<GameStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  balance: 10000,
  bonusBalance: 0,
  wageringRequirement: 0,
  login: (username, password) => {
    // Simple auth: admin/admin for admin panel, any 3+ chars for user
    if (username.length < 3) return { success: false, error: "Username too short" };
    const isAdmin = username === "admin" && password === "admin";
    set({
      isLoggedIn: true,
      user: { username, role: isAdmin ? "admin" : "user", balance: 10000, bonusBalance: 0, wageringRequirement: 0, vipLevel: 0, preferredCurrency: "USD", country: "global", language: "en" },
      balance: 10000,
    });
    return { success: true };
  },
  signup: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    set({
      isLoggedIn: true,
      user: { username, role: "user", balance: 10000, bonusBalance: 5000, wageringRequirement: 15000, vipLevel: 0, preferredCurrency: "USD", country: "global", language: "en" },
      balance: 10000,
      bonusBalance: 5000,
      wageringRequirement: 15000,
    });
    return { success: true };
  },
  logout: () => set({ isLoggedIn: false, user: null, balance: 10000 }),
  setCountry: (country) => set(state => ({ user: state.user ? { ...state.user, country } : null })),
  setLanguage: (lang) => set(state => ({ user: state.user ? { ...state.user, language: lang } : null })),
  placeBet: (game, amount) => {
    const state = get();
    if (amount > state.balance) return { win: false, payout: 0 };
    const houseEdge = 0.06; // 94% RTP
    const win = Math.random() > houseEdge;
    const payout = win ? amount * (Math.random() * 2 + 0.5) : 0;
    set({ balance: state.balance - amount + payout });
    return { win, payout };
  },
}));
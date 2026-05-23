import { create } from "zustand";

export type Currency = "USD" | "KES" | "NGN" | "GHS" | "ZAR" | "EUR" | "GBP";
export type Language = "en" | "fr" | "pt" | "sw" | "ar";

interface GameStore {
  // Auth
  isLoggedIn: boolean;
  user: { username: string; role: string; avatar: string; vipLevel: number } | null;
  
  // Wallet
  balance: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  
  // Locale
  language: Language;
  setLanguage: (l: Language) => void;
  dir: "ltr" | "rtl";
  
  // Auth actions
  login: (username: string, password: string) => { success: boolean; error?: string };
  demoLogin: () => void;
  logout: () => void;
  
  // Wallet actions
  deposit: (amount: number, method: string) => void;
  withdraw: (amount: number, method: string) => boolean;
  
  // Game
  betHistory: any[];
  placeBet: (game: string, amount: number) => { win: boolean; payout: number };
}

const exchangeRates: Record<Currency, number> = {
  USD: 1, KES: 145, NGN: 1600, GHS: 15, ZAR: 18, EUR: 0.92, GBP: 0.79
};

export const useGameStore = create<GameStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  balance: 0,
  currency: "USD",
  setCurrency: (currency) => {
    const oldCurrency = get().currency;
    const balance = get().balance;
    const newBalance = (balance / exchangeRates[oldCurrency]) * exchangeRates[currency];
    set({ currency, balance: Math.floor(newBalance) });
    localStorage.setItem("edgecore-currency", currency);
  },
  language: "en",
  setLanguage: (language) => {
    set({ language, dir: language === "ar" ? "rtl" : "ltr" });
    localStorage.setItem("edgecore-lang", language);
  },
  dir: "ltr",
  
  login: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    const isAdmin = username === "admin" && password === "admin";
    set({
      isLoggedIn: true,
      user: { username, role: isAdmin ? "admin" : "user", avatar: "😎", vipLevel: isAdmin ? 5 : 0 },
      balance: isAdmin ? 50000 : 10000,
    });
    return { success: true };
  },
  
  demoLogin: () => {
    set({
      isLoggedIn: true,
      user: { username: "Demo Player", role: "user", avatar: "🎰", vipLevel: 0 },
      balance: 10000,
    });
  },
  
  logout: () => set({ isLoggedIn: false, user: null, balance: 0, betHistory: [] }),
  
  deposit: (amount, method) => set(state => ({ balance: state.balance + amount })),
  withdraw: (amount, method) => {
    const state = get();
    if (amount > state.balance) return false;
    set({ balance: state.balance - amount });
    return true;
  },
  
  betHistory: [],
  placeBet: (game, amount) => {
    const state = get();
    if (amount > state.balance) return { win: false, payout: 0 };
    const win = Math.random() > 0.06;
    const payout = win ? amount * (Math.random() * 2 + 0.5) : 0;
    set({ balance: state.balance - amount + payout, betHistory: [{ game, amount, win, payout, time: Date.now() }, ...state.betHistory].slice(0, 100) });
    return { win, payout };
  },
}));
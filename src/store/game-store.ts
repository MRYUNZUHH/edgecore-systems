"use client";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string; balance: number; vipLevel: number;
  totalWagered: number; email: string; phone: string;
}
interface Transaction {
  id: string; type: string; amount: number; description: string; timestamp: string;
}
interface Bet {
  id: string; game: string; amount: number; outcome: string; payout: number; timestamp: string;
}

interface GameStore {
  isLoggedIn: boolean; user: User | null;
  transactions: Transaction[]; bets: Bet[];
  login: (username: string, password?: string) => { success: boolean; error?: string };
  logout: () => void;
  deposit: (amount: number, method: string) => void;
  withdraw: (amount: number, method: string) => boolean;
  placeBet: (game: string, amount: number) => { win: boolean; payout: number; multiplier: number };
  getBalance: () => number;
}

export const useStore = create<GameStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false, user: null, transactions: [], bets: [],
      
      login: (username, password) => {
        if (!username || username.length < 2) return { success: false, error: "Username too short" }
        set({
          isLoggedIn: true,
          user: { username, balance: 10000, vipLevel: 0, totalWagered: 0, email: '', phone: '' },
          transactions: [], bets: [],
        })
        return { success: true }
      },
      
      logout: () => set({ isLoggedIn: false, user: null, transactions: [], bets: [] }),
      
      deposit: (amount, method) => set(s => ({
        user: s.user ? { ...s.user, balance: s.user.balance + amount } : null,
        transactions: [{ id: Date.now().toString(), type: 'deposit', amount, description: `Deposit via ${method}`, timestamp: new Date().toISOString() }, ...s.transactions].slice(0, 100)
      })),
      
      withdraw: (amount, method) => {
        const s = get(); if (!s.user || s.user.balance < amount) return false
        set({
          user: { ...s.user!, balance: s.user!.balance - amount },
          transactions: [{ id: Date.now().toString(), type: 'withdraw', amount, description: `Withdraw via ${method}`, timestamp: new Date().toISOString() }, ...s.transactions].slice(0, 100)
        })
        return true
      },
      
      placeBet: (game, amount) => {
        const s = get(); if (!s.user || s.user.balance < amount) return { win: false, payout: 0, multiplier: 0 }
        const win = Math.random() > 0.06
        const multiplier = win ? parseFloat((0.5 + Math.random() * 3).toFixed(2)) : 0
        const payout = win ? amount * multiplier : 0
        const profit = payout - amount
        set({
          user: { ...s.user!, balance: s.user!.balance + profit, totalWagered: s.user!.totalWagered + amount },
          bets: [{ id: Date.now().toString(), game, amount, outcome: win ? 'win' : 'loss', payout, timestamp: new Date().toISOString() }, ...s.bets].slice(0, 100)
        })
        return { win, payout, multiplier }
      },
      
      getBalance: () => get().user?.balance ?? 0,
    }),
    { name: 'edgecore-store' }
  )
)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string; username: string; email: string; phone: string;
  balanceCents: number; totalWageredCents: number; vipLevel: number;
  createdAt: string;
}
interface Transaction {
  id: string; type: 'deposit'|'withdraw'|'bet'|'win';
  amountCents: number; description: string; timestamp: string;
}
interface Bet {
  id: string; amountCents: number; gameId: string;
  outcome?: 'win'|'loss'|'pending'; winAmountCents?: number;
  timestamp: string;
}

interface GameStore {
  isLoggedIn: boolean; user: User | null;
  transactions: Transaction[]; openBets: Bet[]; settledBets: Bet[];
  login: (username: string, password?: string) => { success: boolean; error?: string };
  demoLogin: () => void; logout: () => void;
  deposit: (amountCents: number, method: string) => void;
  withdraw: (amountCents: number, method: string) => boolean;
  placeBet: (amountCents: number, gameId: string) => string;
  settleBet: (betId: string, winAmountCents: number) => void;
  getBalanceDollars: () => number;
}

export const useStore = create<GameStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false, user: null, transactions: [], openBets: [], settledBets: [],
      login: (username, password) => {
        if (!username || username.length < 2) return { success: false, error: "Username too short" }
        const isAdmin = username === "admin" && password === "admin"
        set({ isLoggedIn: true, user: { id: 'u1', username, email: '', phone: '', balanceCents: isAdmin ? 5000000 : 1000000, totalWageredCents: 0, vipLevel: isAdmin ? 5 : 0, createdAt: new Date().toISOString() }, transactions: [], openBets: [], settledBets: [] })
        return { success: true }
      },
      demoLogin: () => set({ isLoggedIn: true, user: { id: 'demo', username: 'Demo Player', email: '', phone: '', balanceCents: 1000000, totalWageredCents: 0, vipLevel: 0, createdAt: new Date().toISOString() }, transactions: [], openBets: [], settledBets: [] }),
      logout: () => set({ isLoggedIn: false, user: null }),
      deposit: (amountCents, method) => set(s => ({ user: s.user ? { ...s.user, balanceCents: s.user.balanceCents + amountCents } : null, transactions: [{ id: crypto.randomUUID(), type: 'deposit', amountCents, description: `Deposit via ${method}`, timestamp: new Date().toISOString() }, ...s.transactions].slice(0, 100) })),
      withdraw: (amountCents, method) => {
        const s = get(); if (!s.user || s.user.balanceCents < amountCents) return false
        set({ user: { ...s.user!, balanceCents: s.user!.balanceCents - amountCents }, transactions: [{ id: crypto.randomUUID(), type: 'withdraw', amountCents, description: `Withdraw via ${method}`, timestamp: new Date().toISOString() }, ...s.transactions].slice(0, 100) })
        return true
      },
      placeBet: (amountCents, gameId) => {
        const s = get(); if (!s.user || s.user.balanceCents < amountCents) return ''
        const id = crypto.randomUUID()
        set({ user: { ...s.user!, balanceCents: s.user!.balanceCents - amountCents, totalWageredCents: s.user!.totalWageredCents + amountCents }, openBets: [{ id, amountCents, gameId, timestamp: new Date().toISOString() }, ...s.openBets] })
        return id
      },
      settleBet: (betId, winAmountCents) => set(s => {
        const bet = s.openBets.find(b => b.id === betId)
        if (!bet) return s
        return { user: s.user ? { ...s.user, balanceCents: s.user.balanceCents + winAmountCents } : null, openBets: s.openBets.filter(b => b.id !== betId), settledBets: [{ ...bet, winAmountCents, outcome: winAmountCents > 0 ? 'win' : 'loss' }, ...s.settledBets].slice(0, 100) }
      }),
      getBalanceDollars: () => (get().user?.balanceCents ?? 0) / 100,
    }),
    { name: 'edgecore-store' }
  )
)
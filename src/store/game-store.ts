import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Transaction {
  id: string; type: 'deposit'|'withdraw'|'bet'|'win';
  amount: number; method?: string; status: 'pending'|'completed'|'failed';
  timestamp: number;
}

interface Bet {
  id: string; game: string; amount: number; outcome: 'win'|'loss';
  payout: number; multiplier: number; timestamp: number;
}

interface UserState {
  isLoggedIn: boolean
  user: { name: string; avatar: string; role: string; vipLevel: number; email?: string; phone?: string } | null
  balance: number
  totalWagered: number
  totalWon: number
  totalLost: number
  currency: string
  transactions: Transaction[]
  bets: Bet[]
  login: (name: string, password?: string) => { success: boolean; error?: string }
  demoLogin: () => void
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
  adjustBalance: (delta: number) => void
  addTransaction: (tx: Omit<Transaction,'id'|'timestamp'>) => void
  addBet: (bet: Omit<Bet,'id'|'timestamp'>) => void
  placeBet: (game: string, amount: number) => { win: boolean; payout: number; multiplier: number }
  isBalanceSufficient: (amount: number) => boolean
}

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      balance: 0,
      totalWagered: 0,
      totalWon: 0,
      totalLost: 0,
      currency: 'USD',
      transactions: [],
      bets: [],

      login: (name, password) => {
        if (!name || name.length < 2) return { success: false, error: "Username too short" }
        const isAdmin = name === "admin" && password === "admin"
        set({
          isLoggedIn: true,
          user: { name, avatar: name.slice(0,2).toUpperCase(), role: isAdmin ? 'admin' : 'user', vipLevel: isAdmin ? 5 : 0 },
          balance: isAdmin ? 50000 : 10000,
        })
        return { success: true }
      },

      demoLogin: () => set({
        isLoggedIn: true,
        user: { name: "Demo Player", avatar: "DP", role: "user", vipLevel: 0 },
        balance: 10000,
      }),

      signup: (name, email, password) => {
        if (!name || name.length < 2) return { success: false, error: "Username too short" }
        if (!email || !email.includes('@')) return { success: false, error: "Invalid email" }
        if (!password || password.length < 6) return { success: false, error: "Password must be 6+ characters" }
        set({
          isLoggedIn: true,
          user: { name, avatar: name.slice(0,2).toUpperCase(), role: 'user', vipLevel: 0, email },
          balance: 10000,
        })
        return { success: true }
      },

      logout: () => set({
        isLoggedIn: false, user: null, balance: 0,
        totalWagered: 0, totalWon: 0, totalLost: 0,
        transactions: [], bets: [],
      }),

      adjustBalance: (delta) => set(s => ({ balance: Math.max(0, s.balance + delta) })),

      addTransaction: (tx) => set(s => ({
        transactions: [{ ...tx, id: `tx_${Date.now()}`, timestamp: Date.now() }, ...s.transactions].slice(0, 100)
      })),

      addBet: (bet) => set(s => ({
        bets: [{ ...bet, id: `bet_${Date.now()}`, timestamp: Date.now() }, ...s.bets].slice(0, 100),
        totalWagered: s.totalWagered + bet.amount,
        totalWon: s.totalWon + (bet.outcome === 'win' ? bet.payout : 0),
        totalLost: s.totalLost + (bet.outcome === 'loss' ? bet.amount : 0),
      })),

      placeBet: (game, amount) => {
        const state = get()
        if (amount > state.balance) return { win: false, payout: 0, multiplier: 0 }
        const win = Math.random() > 0.06
        const multiplier = win ? parseFloat((0.5 + Math.random() * 3).toFixed(2)) : 0
        const payout = win ? amount * multiplier : 0
        const profit = payout - amount
        set({ balance: state.balance + profit })
        get().addBet({ game, amount, outcome: win ? 'win' : 'loss', payout, multiplier })
        return { win, payout, multiplier }
      },

      isBalanceSufficient: (amount) => get().balance >= amount,
    }),
    { name: 'edgecore-store' }
  )
)
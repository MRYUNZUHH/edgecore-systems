import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameState {
  isLoggedIn: boolean
  balance: number
  currency: string
  user: { name: string; avatar: string; role: string; vipLevel: number } | null
  login: (name: string, password?: string) => { success: boolean; error?: string }
  demoLogin: () => void
  logout: () => void
  adjustBalance: (delta: number) => void
  addBet: (bet: any) => void
  betHistory: any[]
}

export const useStore = create<GameState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      balance: 10000,
      currency: 'USD',
      user: null,
      betHistory: [],
      
      login: (name, password) => {
        if (!name || name.length < 2) return { success: false, error: "Username too short" }
        const isAdmin = name === "admin" && password === "admin"
        set({
          isLoggedIn: true,
          user: { name, avatar: name.slice(0,2).toUpperCase(), role: isAdmin ? 'admin' : 'user', vipLevel: isAdmin ? 5 : 0 },
          balance: isAdmin ? 50000 : 10000,
          betHistory: [],
        })
        return { success: true }
      },
      
      demoLogin: () => {
        set({
          isLoggedIn: true,
          user: { name: "Demo Player", avatar: "DP", role: "user", vipLevel: 0 },
          balance: 10000,
          betHistory: [],
        })
      },
      
      logout: () => set({
        isLoggedIn: false,
        user: null,
        balance: 10000,
        betHistory: [],
      }),
      
      adjustBalance: (delta) => set(s => ({ balance: Math.max(0, s.balance + delta) })),
      
      addBet: (bet) => set(s => ({ betHistory: [bet, ...s.betHistory].slice(0, 100) })),
    }),
    { name: 'edgecore-store' }
  )
)
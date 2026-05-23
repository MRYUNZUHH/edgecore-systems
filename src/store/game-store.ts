import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameState {
  balance: number; currency: string; lang: string;
  user: { name: string; avatar: string; role: string } | null;
  wagerTotal: number; betHistory: any[]; transactions: any[];
  claimedPromos: string[]; selfExcluded: boolean; depositLimit: number;
  setBalance: (n: number) => void; adjustBalance: (delta: number) => void;
  setCurrency: (c: string) => void; setLang: (l: string) => void;
  login: (name: string) => void; logout: () => void;
  addWager: (amount: number) => void; addBet: (bet: any) => void;
  addTransaction: (tx: any) => void; claimPromo: (id: string) => void;
  setSelfExcluded: (v: boolean) => void; setDepositLimit: (n: number) => void;
}

export const useStore = create<GameState>()(
  persist(
    (set, get) => ({
      balance: 10000, currency: 'USD', lang: 'en',
      user: null, wagerTotal: 0, betHistory: [], transactions: [],
      claimedPromos: [], selfExcluded: false, depositLimit: 5000,
      setBalance: (n) => set({ balance: n }),
      adjustBalance: (delta) => set(s => ({ balance: Math.max(0, s.balance + delta) })),
      setCurrency: (c) => set({ currency: c }),
      setLang: (l) => set({ lang: l }),
      login: (name) => set({ user: { name, avatar: name.slice(0,2).toUpperCase(), role: name === 'admin' ? 'admin' : 'user' }, balance: 10000 }),
      logout: () => set({ user: null, balance: 0 }),
      addWager: (amount) => set(s => ({ wagerTotal: s.wagerTotal + amount })),
      addBet: (bet) => set(s => ({ betHistory: [bet, ...s.betHistory].slice(0, 100) })),
      addTransaction: (tx) => set(s => ({ transactions: [tx, ...s.transactions].slice(0, 50) })),
      claimPromo: (id) => set(s => ({ claimedPromos: [...s.claimedPromos, id] })),
      setSelfExcluded: (v) => set({ selfExcluded: v }),
      setDepositLimit: (n) => set({ depositLimit: n }),
    }),
    { name: 'edgecore-store' }
  )
)
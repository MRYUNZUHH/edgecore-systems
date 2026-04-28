import { create } from "zustand";
import { Bet, User } from "@prisma/client";

interface GameStore {
  user: (User & { wallet?: any }) | null;
  setUser: (user: any) => void;
  balance: number;
  setBalance: (b: number) => void;
  bets: Bet[];
  addBet: (bet: Bet) => void;
  setBets: (bets: Bet[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  balance: 10000,
  setBalance: (balance) => set({ balance }),
  bets: [],
  addBet: (bet) => set((state) => ({ bets: [bet, ...state.bets].slice(0, 100) })),
  setBets: (bets) => set({ bets }),
}));

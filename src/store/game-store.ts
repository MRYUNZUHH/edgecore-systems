import { create } from "zustand";

interface Bet {
  id: string;
  game: string;
  amount: number;
  outcome: string;
  profit: number;
  timestamp: string;
}

interface GameStore {
  balance: number;
  setBalance: (b: number) => void;
  bets: Bet[];
  addBet: (bet: Bet) => void;
  setBets: (bets: Bet[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  balance: 10000,
  setBalance: (balance) => set({ balance }),
  bets: [],
  addBet: (bet) => set((state) => ({ bets: [bet, ...state.bets].slice(0, 100) })),
  setBets: (bets) => set({ bets }),
}));

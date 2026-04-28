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
  signup: (username: string, password: string) => { success: boolean; error?: string };
}

export const useGameStore = create<GameStore>((set) => ({
  balance: 10000,
  setBalance: (balance) => set({ balance }),
  bets: [],
  addBet: (bet) => set((state) => ({ bets: [bet, ...state.bets].slice(0, 100) })),
  setBets: (bets) => set({ bets }),
  signup: (username, password) => {
    if (username.length < 3) return { success: false, error: "Username too short" };
    // In a real app, this would call an API. For now we just return success.
    return { success: true };
  },
}));
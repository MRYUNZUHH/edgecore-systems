import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface GameStore {
  // Auth
  isLoggedIn: boolean;
  user: any;
  token: string | null;
  
  // Balance & Stats
  balance: any;
  betHistory: any[];
  
  // UI State
  currentGame: any;
  currentView: string;
  sidebarCollapsed: boolean;
  showOperatorView: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, username: string) => Promise<any>;
  logout: () => void;
  placeBet: (gameType: string, betAmount: number) => Promise<any>;
  fetchUserProfile: () => Promise<any>;
  updateAvatar: (avatar: string) => void;
  setCurrentGame: (game: any) => void;
  setCurrentView: (view: string) => void;
  toggleSidebar: () => void;
  toggleOperatorView: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  
  balance: {
    demoBalance: 10000,
    totalBets: 0,
    totalWins: 0,
    totalLosses: 0,
  },
  
  betHistory: [],
  currentGame: null,
  currentView: 'lobby',
  sidebarCollapsed: false,
  showOperatorView: false,

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        action: 'login',
        email,
        password,
      });
      
      if (response.data.success) {
        set({
          isLoggedIn: true,
          user: response.data.user,
          token: response.data.token,
        });
        return { success: true };
      }
      return { success: false, error: response.data.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  register: async (email, password, username) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        action: 'register',
        email,
        password,
        username,
      });
      
      if (response.data.success) {
        set({
          isLoggedIn: true,
          user: response.data.user,
          token: response.data.token,
        });
        return { success: true };
      }
      return { success: false, error: response.data.error };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
      token: null,
      balance: { demoBalance: 10000, totalBets: 0, totalWins: 0, totalLosses: 0 },
      betHistory: [],
      currentGame: null,
      currentView: 'lobby',
    });
  },

  placeBet: async (gameType, betAmount) => {
    try {
      const response = await axios.post(`${API_URL}/game`, {
        gameType,
        betAmount,
        userId: get().user?.id,
      });
      
      if (response.data.success) {
        const result = response.data.result;
        set((state) => ({
          balance: {
            ...state.balance,
            demoBalance: state.balance.demoBalance + result.profit,
            totalBets: state.balance.totalBets + 1,
            totalWins: state.balance.totalWins + (result.isWin ? 1 : 0),
            totalLosses: state.balance.totalLosses + (result.isWin ? 0 : 1),
          },
          betHistory: [result, ...state.betHistory].slice(0, 100),
        }));
        return result;
      }
    } catch (error: any) {
      console.error('Bet failed:', error);
    }
  },

  fetchUserProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      if (response.data.success) {
        set({ user: response.data.user });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  },

  updateAvatar: (avatar) => {
    set((state) => ({
      user: { ...state.user, avatar },
    }));
  },

  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentView: (view) => set({ currentView: view }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleOperatorView: () => set((s) => ({ showOperatorView: !s.showOperatorView })),
}));

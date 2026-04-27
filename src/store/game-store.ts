import { create } from 'zustand';

interface UserProfile {
  id: string;
  username: string;
  email?: string;
  avatar: string;
  balance: number;
  vipTier: number;
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  sessionCount: number;
  achievements: string[];
  dailyBonusCollected: boolean;
  lastActivity: number;
}

interface BetResult {
  id: string;
  gameType: string;
  betAmount: number;
  multiplier: number;
  payout: number;
  profit: number;
  timestamp: number;
  isWin: boolean;
  gameData: any;
  nearMiss?: boolean;
  rngSeed: number;
}

interface GameStore {
  // Auth
  isLoggedIn: boolean;
  user: UserProfile | null;
  
  // Balance & Stats
  balance: any;
  betHistory: BetResult[];
  
  // UI State
  currentGame: string | null;
  currentView: 'lobby' | 'profile';
  sidebarCollapsed: boolean;
  showOperatorView: boolean;
  
  // Actions
  login: (username: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, password: string, email?: string) => { success: boolean; error?: string };
  logout: () => void;
  placeBet: (gameType: string, betAmount: number) => BetResult;
  setCurrentGame: (game: string | null) => void;
  setCurrentView: (view: 'lobby' | 'profile') => void;
  toggleSidebar: () => void;
  toggleOperatorView: () => void;
  collectDailyBonus: () => void;
  setAvatar: (avatar: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  isLoggedIn: false,
  user: null,
  
  balance: {
    demoBalance: 10000,
    totalBets: 0,
    totalWins: 0,
    totalLosses: 0,
    totalWagered: 0,
    totalPayout: 0,
    netProfit: 0,
    personalRTP: 0,
    currentStreak: 0,
    bestStreak: 0,
    worstStreak: 0,
    sessionStart: Date.now(),
  },
  
  betHistory: [],
  currentGame: null,
  currentView: 'lobby',
  sidebarCollapsed: false,
  showOperatorView: false,

  login: (username, password) => {
    if (username.length >= 3) {
      set({
        isLoggedIn: true,
        user: {
          id: 'user-' + username,
          username,
          avatar: '😎',
          balance: 10000,
          vipTier: 0,
          totalBets: 0,
          totalWins: 0,
          totalLosses: 0,
          sessionCount: 1,
          achievements: [],
          dailyBonusCollected: false,
          lastActivity: Date.now(),
        },
        balance: {
          demoBalance: 10000,
          totalBets: 0,
          totalWins: 0,
          totalLosses: 0,
          totalWagered: 0,
          totalPayout: 0,
          netProfit: 0,
          personalRTP: 0,
          currentStreak: 0,
          bestStreak: 0,
          worstStreak: 0,
          sessionStart: Date.now(),
        },
        betHistory: [],
      });
      return { success: true };
    }
    return { success: false, error: 'Username must be at least 3 characters.' };
  },

  signup: (username, password, email) => {
    if (username.length >= 3) {
      set({
        isLoggedIn: true,
        user: {
          id: 'user-' + username,
          username,
          email,
          avatar: '😎',
          balance: 10000,
          vipTier: 0,
          totalBets: 0,
          totalWins: 0,
          totalLosses: 0,
          sessionCount: 1,
          achievements: [],
          dailyBonusCollected: false,
          lastActivity: Date.now(),
        },
        balance: {
          demoBalance: 10000,
          totalBets: 0,
          totalWins: 0,
          totalLosses: 0,
          totalWagered: 0,
          totalPayout: 0,
          netProfit: 0,
          personalRTP: 0,
          currentStreak: 0,
          bestStreak: 0,
          worstStreak: 0,
          sessionStart: Date.now(),
        },
        betHistory: [],
      });
      return { success: true };
    }
    return { success: false, error: 'Username must be at least 3 characters.' };
  },

  logout: () => set({
    isLoggedIn: false,
    user: null,
    balance: {
      demoBalance: 10000,
      totalBets: 0,
      totalWins: 0,
      totalLosses: 0,
      totalWagered: 0,
      totalPayout: 0,
      netProfit: 0,
      personalRTP: 0,
      currentStreak: 0,
      bestStreak: 0,
      worstStreak: 0,
      sessionStart: Date.now(),
    },
    betHistory: [],
    currentGame: null,
    currentView: 'lobby',
  }),

  placeBet: (gameType, betAmount) => {
    const state = get();
    const winProbability = 0.06;
    const isWin = Math.random() < winProbability;
    const payout = isWin ? betAmount * (0.5 + Math.random() * 2) : 0;
    const profit = payout - betAmount;

    const result: BetResult = {
      id: 'bet-' + Date.now(),
      gameType,
      betAmount,
      multiplier: isWin ? payout / betAmount : 0,
      payout,
      profit,
      timestamp: Date.now(),
      isWin,
      gameData: {},
      nearMiss: !isWin && Math.random() < 0.3,
      rngSeed: Date.now() % 10000,
    };

    const newBalance = { ...state.balance };
    newBalance.demoBalance += profit;
    newBalance.totalBets++;
    newBalance.totalWins += isWin ? 1 : 0;
    newBalance.totalLosses += isWin ? 0 : 1;
    newBalance.totalWagered += betAmount;
    newBalance.totalPayout += payout;
    newBalance.netProfit += profit;
    newBalance.personalRTP = newBalance.totalWagered > 0 ? newBalance.totalPayout / newBalance.totalWagered : 0;
    newBalance.currentStreak = isWin ? (state.balance.currentStreak > 0 ? state.balance.currentStreak + 1 : 1) : (state.balance.currentStreak < 0 ? state.balance.currentStreak - 1 : -1);
    newBalance.bestStreak = Math.max(state.balance.bestStreak, isWin ? Math.abs(newBalance.currentStreak) : 0);

    set({
      balance: newBalance,
      betHistory: [result, ...state.betHistory].slice(0, 100),
    });

    return result;
  },

  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentView: (view) => set({ currentView: view, currentGame: null }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleOperatorView: () => set((s) => ({ showOperatorView: !s.showOperatorView })),

  collectDailyBonus: () => {
    const bonus = 500 + Math.floor(Math.random() * 1000);
    set((state) => ({
      balance: {
        ...state.balance,
        demoBalance: state.balance.demoBalance + bonus,
      },
      user: state.user ? {
        ...state.user,
        dailyBonusCollected: true,
        vipTier: Math.min(5, state.user.vipTier + 1),
      } : null,
    }));
  },

  setAvatar: (avatar) => set((state) => ({
    user: state.user ? { ...state.user, avatar } : null,
  })),
}));

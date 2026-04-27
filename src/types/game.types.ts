// src/types/game.types.ts
export type GameType = 'dice' | 'crash' | 'roulette' | 'slots' | 'mines';

export interface BetResult {
  id: string;
  gameType: GameType;
  betAmount: number;
  multiplier: number;
  payout: number;
  profit: number;
  timestamp: number;
  isWin: boolean;
  gameData: Record<string, any>;
  nearMiss?: boolean;
  rngSeed: number;
}

export interface GameConfig {
  rtp: number;
  houseEdge: number;
  minBet: number;
  maxBet: number;
  maxMultiplier: number;
  volatility: 'low' | 'medium' | 'high' | 'extreme';
}

export interface UserBalance {
  demoBalance: number;
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  totalWagered: number;
  totalPayout: number;
  netProfit: number;
  personalRTP: number;
  currentStreak: number;
  bestStreak: number;
  worstStreak: number;
  sessionStart: number;
}

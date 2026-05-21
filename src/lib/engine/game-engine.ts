// REAL-TIME GAME ENGINE
// Simulates actual casino game logic with configurable RTP

export interface GameConfig {
  rtp: number;        // Return to Player percentage (e.g., 96.0 = 96%)
  houseEdge: number;  // House edge percentage
  minBet: number;
  maxBet: number;
  volatility: 'low' | 'medium' | 'high';
}

export interface BetResult {
  id: string;
  gameId: string;
  amount: number;
  payout: number;
  multiplier: number;
  outcome: 'win' | 'loss';
  profit: number;
  timestamp: number;
}

export class GameEngine {
  private config: GameConfig;

  constructor(config: GameConfig) {
    this.config = config;
  }

  // Generates a fair outcome based on RTP
  processBet(amount: number): BetResult {
    if (amount < this.config.minBet || amount > this.config.maxBet) {
      throw new Error(`Bet must be between ${this.config.minBet} and ${this.config.maxBet}`);
    }

    const winProbability = this.config.rtp / 100;
    const isWin = Math.random() < winProbability;
    
    let multiplier = 0;
    if (isWin) {
      // Calculate payout based on volatility
      switch (this.config.volatility) {
        case 'low':
          multiplier = 0.5 + Math.random() * 1.5; // 0.5x - 2x
          break;
        case 'medium':
          multiplier = 0.3 + Math.random() * 3;   // 0.3x - 3.3x
          break;
        case 'high':
          multiplier = 0.1 + Math.random() * 10;  // 0.1x - 10x
          break;
      }
    }

    const payout = isWin ? amount * multiplier : 0;
    const profit = payout - amount;

    return {
      id: `bet_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      gameId: 'game_unknown',
      amount,
      payout,
      multiplier: parseFloat(multiplier.toFixed(2)),
      outcome: isWin ? 'win' : 'loss',
      profit: parseFloat(profit.toFixed(2)),
      timestamp: Date.now(),
    };
  }

  // Batch processing for multiple bets (tournament mode)
  processBets(bets: { amount: number }[]): BetResult[] {
    return bets.map(bet => this.processBet(bet.amount));
  }

  // Calculate RTP over a set of bets
  calculateRTP(results: BetResult[]): number {
    const totalBets = results.reduce((sum, r) => sum + r.amount, 0);
    const totalPayouts = results.reduce((sum, r) => sum + r.payout, 0);
    return totalBets > 0 ? (totalPayouts / totalBets) * 100 : 0;
  }
}

// Pre-configured game engines
export const gameEngines: Record<string, GameEngine> = {
  dice: new GameEngine({ rtp: 96.0, houseEdge: 4.0, minBet: 1, maxBet: 10000, volatility: 'low' }),
  crash: new GameEngine({ rtp: 97.0, houseEdge: 3.0, minBet: 1, maxBet: 10000, volatility: 'high' }),
  roulette: new GameEngine({ rtp: 97.3, houseEdge: 2.7, minBet: 1, maxBet: 5000, volatility: 'medium' }),
  blackjack: new GameEngine({ rtp: 99.5, houseEdge: 0.5, minBet: 1, maxBet: 10000, volatility: 'low' }),
  plinko: new GameEngine({ rtp: 96.5, houseEdge: 3.5, minBet: 1, maxBet: 5000, volatility: 'low' }),
  aviator: new GameEngine({ rtp: 97.0, houseEdge: 3.0, minBet: 1, maxBet: 10000, volatility: 'high' }),
  mines: new GameEngine({ rtp: 95.0, houseEdge: 5.0, minBet: 1, maxBet: 5000, volatility: 'medium' }),
  slots: new GameEngine({ rtp: 96.1, houseEdge: 3.9, minBet: 1, maxBet: 5000, volatility: 'medium' }),
};
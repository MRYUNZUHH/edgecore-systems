// src/lib/engine/house-edge-system.ts
import { RNG } from './rng';

export class HouseEdgeSystem {
  private rng: RNG;
  public baseRTP: number = 0.94; // 94% RTP = 6% house edge
  public currentRTP: number = 0.94;
  public houseEdge: number = 0.06;
  
  constructor(seed?: number) {
    this.rng = new RNG(seed);
  }

  setRTP(rtp: number): void {
    this.currentRTP = Math.min(0.98, Math.max(0.50, rtp));
    this.houseEdge = 1 - this.currentRTP;
  }

  shouldPlayerWin(trueProbability: number): boolean {
    const adjustedProbability = trueProbability * this.currentRTP;
    return this.rng.next() < adjustedProbability;
  }

  calculatePayout(betAmount: number, trueMultiplier: number): number {
    const adjustedMultiplier = trueMultiplier * this.currentRTP;
    return betAmount * adjustedMultiplier;
  }

  generateWinProbability(gameType: string, userProfile?: any): number {
    const base = this.rng.next();
    
    // Early session bias: higher win rate for first 10 minutes
    if (userProfile?.earlySession) {
      return Math.min(0.75, base * 1.5);
    }
    
    // Variable reward system: occasional wins to maintain engagement
    if (userProfile?.recentLosses > 5) {
      return Math.min(0.60, base * 1.3);
    }
    
    // Standard rigged probability
    return Math.min(0.06, base); // 6% base win rate
  }
}

// src/lib/math/probability-models.ts
export class ProbabilityModels {
  static expectedValue(payout: number, probability: number, betAmount: number): number {
    return (payout * probability) - betAmount;
  }

  static variance(outcomes: number[], probability: number): number {
    const mean = outcomes.reduce((a, b) => a + b, 0) / outcomes.length;
    return outcomes.reduce((sum, val) => sum + Math.pow(val - mean, 2) * probability, 0);
  }

  static standardDeviation(variance: number): number {
    return Math.sqrt(variance);
  }

  static riskOfRuin(bankroll: number, betSize: number, winProbability: number): number {
    const q = 1 - winProbability;
    const p = winProbability;
    if (p === q) return 1 - (bankroll / betSize);
    return Math.pow(q / p, bankroll / betSize);
  }

  static kellyCriterion(winProbability: number, odds: number): number {
    return (winProbability * odds - (1 - winProbability)) / odds;
  }

  static sharpeRatio(returns: number[], riskFreeRate: number = 0): number {
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const std = Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length);
    return std === 0 ? 0 : (mean - riskFreeRate) / std;
  }
}

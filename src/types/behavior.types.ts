// src/types/behavior.types.ts
export interface UserProfile {
  id: string;
  riskScore: number;
  behaviorClass: 'casual' | 'high-frequency' | 'loss-chasing' | 'high-risk';
  engagementLevel: number;
  sessionCount: number;
  averageBetSize: number;
  timeSpent: number;
  vipTier: number;
  achievements: string[];
  dailyBonusCollected: boolean;
  lastActivity: number;
}

export interface BehavioralState {
  earlySession: boolean;
  recentLosses: number;
  lossStreak: number;
  winStreak: number;
  nearMissCount: number;
  engagementLoop: 'initial' | 'engaged' | 'retention' | 'at-risk';
  triggeredBehaviors: BehaviorTrigger[];
}

export type BehaviorTrigger = 
  | 'near-miss'
  | 'streak-emphasis'
  | 'loss-chasing-prompt'
  | 'variable-reward'
  | 'early-session-bias'
  | 'daily-bonus'
  | 'vip-progression';

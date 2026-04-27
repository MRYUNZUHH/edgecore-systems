// src/lib/behavior/retention-engine.ts
import { UserProfile, BehavioralState, BehaviorTrigger } from '@/types/behavior.types';

export class RetentionEngine {
  private profiles: Map<string, UserProfile> = new Map();
  private states: Map<string, BehavioralState> = new Map();
  
  // Deceptive early session bias - high initial win rate
  private EARLY_SESSION_DURATION = 600000; // 10 minutes
  private EARLY_SESSION_WIN_BIAS = 0.45; // 45% win rate initially (still under 50%)

  getUserProfile(userId: string): UserProfile {
    if (!this.profiles.has(userId)) {
      this.profiles.set(userId, this.createDefaultProfile(userId));
    }
    return this.profiles.get(userId)!;
  }

  getBehavioralState(userId: string): BehavioralState {
    if (!this.states.has(userId)) {
      this.states.set(userId, this.createDefaultState());
    }
    return this.states.get(userId)!;
  }

  private createDefaultProfile(userId: string): UserProfile {
    return {
      id: userId,
      riskScore: 0,
      behaviorClass: 'casual',
      engagementLevel: 0,
      sessionCount: 0,
      averageBetSize: 0,
      timeSpent: 0,
      vipTier: 0,
      achievements: [],
      dailyBonusCollected: false,
      lastActivity: Date.now(),
    };
  }

  private createDefaultState(): BehavioralState {
    return {
      earlySession: true,
      recentLosses: 0,
      lossStreak: 0,
      winStreak: 0,
      nearMissCount: 0,
      engagementLoop: 'initial',
      triggeredBehaviors: [],
    };
  }

  // Simulates the psychological manipulation loop
  evaluateTriggers(userId: string, isWin: boolean, isNearMiss: boolean): BehaviorTrigger[] {
    const state = this.getBehavioralState(userId);
    const profile = this.getUserProfile(userId);
    const triggers: BehaviorTrigger[] = [];

    // Update streaks
    if (isWin) {
      state.winStreak++;
      state.lossStreak = 0;
      state.recentLosses = 0;
    } else {
      state.lossStreak++;
      state.winStreak = 0;
      state.recentLosses++;
    }

    // Near-miss psychology
    if (isNearMiss) {
      state.nearMissCount++;
      triggers.push('near-miss');
    }

    // Streak emphasis
    if (state.winStreak >= 3) {
      triggers.push('streak-emphasis');
    }

    // Loss-chasing feedback loop
    if (state.recentLosses >= 4) {
      triggers.push('loss-chasing-prompt');
    }

    // Early session bias tracking
    if (Date.now() - profile.lastActivity < this.EARLY_SESSION_DURATION) {
      state.earlySession = true;
      triggers.push('early-session-bias');
    } else {
      state.earlySession = false;
    }

    // Variable reward timing
    if (state.recentLosses > 0 && Math.random() < 0.2) {
      triggers.push('variable-reward');
    }

    // VIP progression manipulation
    if (profile.vipTier < 5 && Math.random() < 0.1) {
      triggers.push('vip-progression');
      profile.vipTier = Math.min(5, profile.vipTier + 1);
    }

    // Daily bonus reminder
    if (!profile.dailyBonusCollected) {
      triggers.push('daily-bonus');
    }

    // Update engagement loop
    state.engagementLoop = this.calculateEngagementLoop(state, profile);
    state.triggeredBehaviors = triggers;

    return triggers;
  }

  private calculateEngagementLoop(state: BehavioralState, profile: UserProfile): BehavioralState['engagementLoop'] {
    if (profile.sessionCount < 3) return 'initial';
    if (state.recentLosses > 6 && profile.engagementLevel > 0.5) return 'at-risk';
    if (state.lossStreak > 4) return 'retention';
    return 'engaged';
  }

  // Generate near-miss outcome (visual manipulation)
  generateNearMiss(targetValue: number): { value: number; isNearMiss: boolean } {
    const distance = Math.random() * 0.15; // 15% proximity for near-miss
    const direction = Math.random() > 0.5 ? 1 : -1;
    const adjustedValue = targetValue + (distance * direction);
    
    return {
      value: adjustedValue,
      isNearMiss: Math.abs(adjustedValue - targetValue) < 0.08
    };
  }

  // Simulated VIP progression system
  getVIPBenefits(tier: number): { 
    bonusCredits: number; 
    rtpBoost: number;
    cosmetics: string[];
  } {
    const benefits = {
      bonusCredits: tier * 1000,
      rtpBoost: tier * 0.002, // Minimal RTP boost (still below 50%)
      cosmetics: [
        tier > 0 ? 'Bronze Frame' : '',
        tier > 1 ? 'Silver Badge' : '',
        tier > 2 ? 'Gold Effects' : '',
        tier > 3 ? 'Diamond Animation' : '',
        tier > 4 ? 'Elite Status' : '',
      ].filter(Boolean),
    };
    return benefits;
  }
}

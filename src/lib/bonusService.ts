// src/lib/bonusService.ts
export interface BonusTier {
  min: number;
  max: number;
  bonusAmount: number;
  title: string;
}

export interface FeeTier {
  min: number;
  max: number;
  feeAmount: number;
}

export const bonusTiers: BonusTier[] = [
  { min: 10, max: 99.99, bonusAmount: 10, title: "Starter Bonus" },
  { min: 100, max: 599.99, bonusAmount: 50, title: "High Roller Bonus" },
  { min: 500, max: Infinity, bonusAmount: 150, title: "VIP Bonus" }
];

export const feeTiers: FeeTier[] = [
  { min: 0, max: 99.99, feeAmount: 5 },
  { min: 100, max: 499.99, feeAmount: 10 },
  { min: 500, max: Infinity, feeAmount: 50 }
];

export function calculateBonus(depositAmount: number): { bonus: number; tier: BonusTier | null } {
  const tier = bonusTiers.find(t => depositAmount >= t.min && depositAmount <= t.max);
  if (!tier) return { bonus: 0, tier: null };
  return { bonus: tier.bonusAmount, tier };
}

export function calculateWithdrawalFee(amount: number): { fee: number; netAmount: number; requiresFee: boolean } {
  const tier = feeTiers.find(t => amount >= t.min && amount <= t.max);
  if (!tier) return { fee: 0, netAmount: amount, requiresFee: false };
  return { fee: tier.feeAmount, netAmount: amount - tier.feeAmount, requiresFee: true };
}

export function applyBonus(userId: string, depositAmount: number, username: string): void {
  const { bonus, tier } = calculateBonus(depositAmount);
  
  if (bonus > 0 && tier) {
    const currentBalance = parseFloat(localStorage.getItem("ec_real_balance") || "0");
    const newBalance = currentBalance + bonus;
    localStorage.setItem("ec_real_balance", newBalance.toString());
    
    const bonusHistory = JSON.parse(localStorage.getItem("ec_bonus_history") || "[]");
    bonusHistory.unshift({
      id: Date.now(),
      amount: bonus,
      depositAmount: depositAmount,
      tier: tier.title,
      date: new Date().toISOString(),
      type: "DEPOSIT_BONUS"
    });
    localStorage.setItem("ec_bonus_history", JSON.stringify(bonusHistory.slice(0, 20)));
    
    const notifications = JSON.parse(localStorage.getItem("ec_notifications") || "[]");
    notifications.unshift({
      id: Date.now(),
      title: "🎉 BONUS CREDITED! 🎉",
      message: `You deposited $${depositAmount} and received a ${tier.title} of $${bonus}!`,
      type: "bonus",
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("ec_notifications", JSON.stringify(notifications.slice(0, 10)));
  }
}

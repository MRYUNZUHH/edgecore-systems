// src/app/wallet/deposit/page.tsx
"use client";

import { useState } from "react";
import { bonusTiers, applyBonus } from "@/lib/bonusService";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const [bonusPreview, setBonusPreview] = useState<{ bonus: number; tier: any }>({ bonus: 0, tier: null });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateBonusPreview = (value: string) => {
    setAmount(value);
    const depositAmount = parseFloat(value);
    if (depositAmount >= 10) {
      if (depositAmount >= 10 && depositAmount < 100) setBonusPreview({ bonus: 10, tier: bonusTiers[0] });
      else if (depositAmount >= 100 && depositAmount < 600) setBonusPreview({ bonus: 50, tier: bonusTiers[1] });
      else if (depositAmount >= 500) setBonusPreview({ bonus: 150, tier: bonusTiers[2] });
      else setBonusPreview({ bonus: 0, tier: null });
    } else {
      setBonusPreview({ bonus: 0, tier: null });
    }
  };

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (!depositAmount || depositAmount < 10) {
      setMessage("Minimum deposit is $10");
      return;
    }

    setLoading(true);
    setMessage("Processing deposit...");

    setTimeout(() => {
      const currentBalance = parseFloat(localStorage.getItem("ec_real_balance") || "0");
      let newBalance = currentBalance + depositAmount;
      let bonusAmount = 0;
      
      if (depositAmount >= 10 && depositAmount < 100) bonusAmount = 10;
      else if (depositAmount >= 100 && depositAmount < 600) bonusAmount = 50;
      else if (depositAmount >= 500) bonusAmount = 150;
      
      if (bonusAmount > 0) {
        newBalance += bonusAmount;
        
        const bonusHistory = JSON.parse(localStorage.getItem("ec_bonus_history") || "[]");
        bonusHistory.unshift({
          id: Date.now(),
          amount: bonusAmount,
          depositAmount: depositAmount,
          date: new Date().toISOString(),
          type: "DEPOSIT_BONUS"
        });
        localStorage.setItem("ec_bonus_history", JSON.stringify(bonusHistory.slice(0, 20)));
        
        const notifications = JSON.parse(localStorage.getItem("ec_notifications") || "[]");
        notifications.unshift({
          id: Date.now(),
          title: "🎉 BONUS CREDITED! 🎉",
          message: `You deposited $${depositAmount} and received a $${bonusAmount} bonus!`,
          type: "bonus",
          timestamp: new Date().toISOString()
        });
        localStorage.setItem("ec_notifications", JSON.stringify(notifications.slice(0, 10)));
        
        setMessage(`✅ Deposit successful! +$${bonusAmount} BONUS added! New balance: $${newBalance}`);
      } else {
        setMessage(`✅ Deposit successful! New balance: $${newBalance}`);
      }
      
      localStorage.setItem("ec_real_balance", newBalance.toString());
      setLoading(false);
      setTimeout(() => window.location.reload(), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#f0b429] mb-6">Deposit Funds</h1>
        
        <div className="bg-gradient-to-r from-[#f0b429]/20 to-amber-600/20 border border-[#f0b429] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-[#f0b429] mb-3">🎁 Deposit Bonus</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>$10 - $99 deposit</span>
              <span className="text-[#f0b429] font-bold">+$10 BONUS</span>
            </div>
            <div className="flex justify-between items-center">
              <span>$100 - $599 deposit</span>
              <span className="text-[#f0b429] font-bold">+$50 BONUS</span>
            </div>
            <div className="flex justify-between items-center">
              <span>$500+ deposit</span>
              <span className="text-[#f0b429] font-bold">+$150 BONUS</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-6">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => updateBonusPreview(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 bg-[#1a2235] border border-[#2a3a5a] rounded-lg text-white focus:outline-none focus:border-[#f0b429]"
            />
          </div>

          {bonusPreview.bonus > 0 && (
            <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 mb-4">
              <p className="text-green-400">
                🎉 You qualify for a <strong>${bonusPreview.bonus}</strong> bonus!
              </p>
            </div>
          )}

          <button
            onClick={handleDeposit}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#f0b429] to-amber-600 text-black font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Deposit Now"}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${message.includes("✅") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

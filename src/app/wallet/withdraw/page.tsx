// src/app/wallet/withdraw/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    const balance = parseFloat(localStorage.getItem("ec_real_balance") || "0");
    setCurrentBalance(balance);
  }, []);

  const withdrawAmount = parseFloat(amount) || 0;
  
  let feeAmount = 0;
  if (withdrawAmount > 0) {
    if (withdrawAmount < 100) feeAmount = 5;
    else if (withdrawAmount >= 100 && withdrawAmount < 500) feeAmount = 10;
    else if (withdrawAmount >= 500) feeAmount = 50;
  }
  const netAmount = withdrawAmount - feeAmount;

  const handleWithdraw = async () => {
    if (!withdrawAmount || withdrawAmount < 10) {
      setMessage("Minimum withdrawal is $10");
      return;
    }

    if (withdrawAmount > currentBalance) {
      setMessage("Insufficient balance");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newBalance = currentBalance - withdrawAmount;
      localStorage.setItem("ec_real_balance", newBalance.toString());
      setCurrentBalance(newBalance);
      
      if (feeAmount > 0) {
        setMessage(`✅ Withdrawal of $${withdrawAmount} processed. Service fee: $${feeAmount}. Net received: $${netAmount}`);
      } else {
        setMessage(`✅ Withdrawal of $${withdrawAmount} processed successfully!`);
      }
      
      setLoading(false);
      setTimeout(() => {
        setAmount("");
        window.location.reload();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#f0b429] mb-6">Withdraw Funds</h1>
        
        <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-6 mb-8">
          <p className="text-gray-400">Available Balance</p>
          <p className="text-3xl font-bold text-[#f0b429]">${currentBalance.toFixed(2)}</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-500 mb-3">💰 Withdrawal Service Fee</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Withdrawals under $100</span>
              <span className="text-yellow-500 font-bold">$5 fee</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Withdrawals $100 - $499</span>
              <span className="text-yellow-500 font-bold">$10 fee</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Withdrawals $500+</span>
              <span className="text-yellow-500 font-bold">$50 fee</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-6">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 bg-[#1a2235] border border-[#2a3a5a] rounded-lg text-white focus:outline-none focus:border-[#f0b429]"
            />
          </div>

          {withdrawAmount > 0 && (
            <div className="bg-[#1a2235] rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Withdrawal Amount:</span>
                <span>${withdrawAmount.toFixed(2)}</span>
              </div>
              {feeAmount > 0 && (
                <div className="flex justify-between mb-2 text-yellow-500">
                  <span>Service Fee:</span>
                  <span> -${feeAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold pt-2 border-t border-[#2a3a5a]">
                <span>You Receive:</span>
                <span className="text-[#f0b429]">${netAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleWithdraw}
            disabled={loading || withdrawAmount > currentBalance || withdrawAmount < 10}
            className="w-full py-3 bg-gradient-to-r from-[#f0b429] to-amber-600 text-black font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Withdraw Funds"}
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

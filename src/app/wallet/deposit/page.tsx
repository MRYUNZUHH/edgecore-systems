// src/app/wallet/deposit/page.tsx
"use client";

import { useState, useEffect } from "react";
import ModeSwitcher from "@/components/ModeSwitcher";
import { useBalance } from "@/lib/useBalance";

export default function DepositPage() {
  const { mounted, mode, realBalance, demoBalance, setBalanceForMode } = useBalance();
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [mpesaMessage, setMpesaMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "confirmed" | "rejected" | null>(null);
  const [bonusPreview, setBonusPreview] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(130);

  const TILL_NUMBER = "4753611";
  const BUSINESS_NAME = "EdgeCore Systems";

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        if (data.rates?.KES) setExchangeRate(data.rates.KES);
      } catch (error) {}
    };
    fetchRate();
  }, []);

  useEffect(() => {
    const depositAmount = parseFloat(amount);
    if (depositAmount >= 10 && depositAmount < 100) setBonusPreview(10);
    else if (depositAmount >= 100 && depositAmount < 600) setBonusPreview(50);
    else if (depositAmount >= 500) setBonusPreview(150);
    else setBonusPreview(0);
  }, [amount]);

  const handleSubmitVerification = async () => {
    if (!phone || phone.length < 10) {
      setMessage("Please enter your M-Pesa phone number");
      return;
    }
    
    if (!mpesaMessage) {
      setMessage("Please paste your M-Pesa confirmation message");
      return;
    }
    
    const depositAmount = parseFloat(amount);
    if (!depositAmount || depositAmount < 10) {
      setMessage("Minimum deposit is $10 USD");
      return;
    }
    
    setLoading(true);
    
    try {
      // Extract transaction ID from message
      const idMatch = mpesaMessage.match(/Transaction ID:\s*([A-Z0-9]+)/i) || 
                      mpesaMessage.match(/Code:\s*([A-Z0-9]+)/i);
      const extractedId = idMatch ? idMatch[1] : `MANUAL_${Date.now()}`;
      
      const res = await fetch("/api/mpesa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: depositAmount,
          transactionId: extractedId,
          mpesaMessage
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setVerificationStatus("pending");
        setMessage(`✅ Verification submitted! ID: ${data.verificationId}. Awaiting confirmation.`);
        
        // Auto-confirm after 30 seconds (for demo)
        setTimeout(() => {
          setVerificationStatus("confirmed");
          let bonusAmount = 0;
          if (depositAmount >= 10 && depositAmount < 100) bonusAmount = 10;
          else if (depositAmount >= 100 && depositAmount < 600) bonusAmount = 50;
          else if (depositAmount >= 500) bonusAmount = 150;
          
          const newBalance = realBalance + depositAmount + bonusAmount;
          setBalanceForMode(newBalance, "real");
          
          setMessage(`✅ Payment confirmed! +$${bonusAmount} BONUS added! New balance: $${newBalance}`);
          setLoading(false);
        }, 30000);
      } else {
        setMessage("❌ " + (data.error || "Verification failed"));
      }
    } catch (error) {
      setMessage("❌ Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#f0b429]">Deposit Funds</h1>
          <ModeSwitcher />
        </div>
        
        <div className="bg-[#0f1520] rounded-xl border border-[#1a2235] p-4 mb-6">
          <p className="text-gray-400">Available {mode === "real" ? "REAL" : "DEMO"} Balance</p>
          <p className={`text-3xl font-bold ${mode === "real" ? "text-green-400" : "text-[#f0b429]"}`}>
            ${mode === "real" ? realBalance.toFixed(2) : demoBalance.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-[#f0b429]/20 to-amber-600/20 border border-[#f0b429] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-[#f0b429] mb-3">🎁 Welcome Bonus</h2>
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
          <div className="text-center mb-6">
            <p className="text-gray-400">Pay to:</p>
            <p className="text-2xl font-bold text-[#f0b429]">{BUSINESS_NAME}</p>
            <p className="text-xl font-bold text-white">Till: {TILL_NUMBER}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Amount (USD)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 bg-[#1a2235] border border-[#2a3a5a] rounded-lg text-white focus:outline-none focus:border-[#f0b429]"
            />
            {amount && (
              <p className="text-sm text-gray-400 mt-1">
                You will pay: KES {Math.round(parseFloat(amount) * exchangeRate)}
              </p>
            )}
          </div>

          {bonusPreview > 0 && (
            <div className="bg-green-500/10 border border-green-500 rounded-lg p-3 mb-4">
              <p className="text-green-400 text-center">🎉 +${bonusPreview} BONUS will be added!</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">M-Pesa Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0712 345 678"
              className="w-full px-4 py-3 bg-[#1a2235] border border-[#2a3a5a] rounded-lg text-white focus:outline-none focus:border-[#f0b429]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Paste M-Pesa Confirmation Message</label>
            <textarea
              value={mpesaMessage}
              onChange={(e) => setMpesaMessage(e.target.value)}
              placeholder="Paste your M-Pesa confirmation message here..."
              rows={4}
              className="w-full px-4 py-3 bg-[#1a2235] border border-[#2a3a5a] rounded-lg text-white focus:outline-none focus:border-[#f0b429] text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Copy the full M-Pesa message you received after paying to Till {TILL_NUMBER}
            </p>
          </div>

          <button
            onClick={handleSubmitVerification}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#f0b429] to-amber-600 text-black font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Payment Verification"}
          </button>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              message.includes("✅") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}>
              {message}
            </div>
          )}
          
          {verificationStatus === "pending" && (
            <div className="mt-4 p-3 rounded-lg text-center bg-yellow-500/20 text-yellow-400">
              ⏳ Verification pending. You'll receive confirmation shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

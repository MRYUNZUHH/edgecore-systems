"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import PaymentMethods from "@/components/wallet/PaymentMethods";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function WalletPage() {
  const { balance, currency, deposit, withdraw } = useStore();
  const [showModal, setShowModal] = useState<"deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState("M-Pesa");
  const [confirming, setConfirming] = useState(false);

  const formatted = new Intl.NumberFormat("en", { style: "currency", currency }).format(balance);

  const handleAction = () => {
    setConfirming(true);
    setTimeout(() => {
      if (showModal === "deposit") deposit(amount, method);
      else withdraw(amount, method);
      setConfirming(false);
      setShowModal(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold gold-text">💰 Wallet</h1>
      
      {/* Balance */}
      <div className="bg-gradient-to-r from-[#0D0F1A] to-[#1a1f2e] border border-[#E6B84F]/20 rounded-2xl p-6">
        <p className="text-sm text-white/60">Available Balance</p>
        <p className="text-4xl font-black text-white mt-2">{formatted}</p>
        <div className="flex gap-3 mt-4">
          <button onClick={() => setShowModal("deposit")} className="px-6 py-2 bg-[#E6B84F] text-black font-bold rounded-xl">Deposit</button>
          <button onClick={() => setShowModal("withdraw")} className="px-6 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl">Withdraw</button>
        </div>
      </div>

      {/* Payment Methods */}
      <PaymentMethods />

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowModal(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="w-full max-w-md bg-[#0D0F1A] border border-[#E6B84F]/20 rounded-2xl p-6"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white capitalize">{showModal}</h2>
                <button onClick={() => setShowModal(null)}><FiX className="w-5 h-5 text-white/40" /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60">Amount ({currency})</label>
                  <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                    className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#E6B84F]" />
                </div>
                <div>
                  <label className="text-sm text-white/60">Method</label>
                  <select value={method} onChange={e => setMethod(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none">
                    {["M-Pesa", "MTN MoMo", "Airtel Money", "Visa", "Mastercard", "BTC", "USDT"].map(m => (
                      <option key={m} value={m} className="bg-[#0D0F1A]">{m}</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleAction} disabled={confirming}
                  className="w-full py-3 bg-[#E6B84F] text-black font-bold rounded-xl disabled:opacity-50">
                  {confirming ? "Processing..." : `Confirm ${showModal}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useGameStore } from "@/store/game-store";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const promos = [
  { id: 1, title: "Welcome Bonus", desc: "Get 5,000 demo credits on signup", bonus: 5000 },
  { id: 2, title: "Daily Reward", desc: "Login daily for bonus credits", bonus: 1000 },
  { id: 3, title: "Referral Bonus", desc: "Invite friends and earn", bonus: 2500 },
  { id: 4, title: "VIP Cashback", desc: "Up to 20% cashback for VIP members", bonus: 3000 },
];

export default function PromotionsPage() {
  const { balance, deposit } = useGameStore();
  const [claimed, setClaimed] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClaim = (promo: typeof promos[0]) => {
    deposit(promo.bonus, "Bonus");
    setClaimed(promo.id);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold gold-text">🎁 Promotions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map(promo => (
          <div key={promo.id} className="bg-[#0D0F1A] border border-[#E6B84F]/20 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg">{promo.title}</h3>
            <p className="text-white/60 text-sm mt-1">{promo.desc}</p>
            <p className="text-[#E6B84F] font-bold mt-2">+{promo.bonus.toLocaleString()} Credits</p>
            <button onClick={() => handleClaim(promo)}
              className={`mt-3 px-6 py-2 rounded-xl font-bold text-sm transition ${claimed === promo.id ? 'bg-green-500/20 text-green-400' : 'bg-[#E6B84F] text-black hover:bg-yellow-500'}`}>
              {claimed === promo.id ? "✓ Claimed" : "Claim Bonus"}
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Toast */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-4 right-4 bg-green-500 text-black font-bold px-6 py-3 rounded-xl shadow-2xl z-50">
            ✅ Bonus applied to your balance!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
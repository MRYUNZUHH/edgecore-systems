"use client";
import { useStore } from "@/store/game-store";

const promos = [
  { id:1, title:"Welcome Bonus", desc:"Get $500 bonus credits", amount:500 },
  { id:2, title:"Daily Reward", desc:"Login daily for $50", amount:50 },
  { id:3, title:"VIP Cashback", desc:"Up to 20% cashback", amount:100 },
];

export default function PromotionsPage() {
  const { deposit, isLoggedIn } = useStore();
  const handleClaim = (amount: number) => {
    if (!isLoggedIn) return alert('Please login first');
    deposit(amount, 'Bonus');
    alert(`$${amount} bonus credited!`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">🎁 Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promos.map(p => (
          <div key={p.id} className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg">{p.title}</h3>
            <p className="text-[#5a6a85] text-sm mt-1">{p.desc}</p>
            <p className="text-[#f5c842] font-bold mt-2">+${p.amount}</p>
            <button onClick={() => handleClaim(p.amount)} className="mt-3 w-full py-2 bg-[#f5c842] text-black font-bold rounded-lg text-sm">Claim Bonus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
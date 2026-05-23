"use client";
import { useStore } from "@/store/game-store";

const promos = [
  { id:1, title:"Welcome Bonus", desc:"100% match up to $500 + 50 Free Spins", bonus:500 },
  { id:2, title:"Daily Reward", desc:"Login daily for bonus credits", bonus:50 },
  { id:3, title:"Referral Bonus", desc:"Invite friends, earn 10%", bonus:100 },
]

export default function PromotionsPage() {
  const { deposit } = useStore()
  const handleClaim = (amount: number) => deposit(Math.round(amount * 100), 'Bonus')

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">🎁 Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map(p => (
          <div key={p.id} className="card p-6">
            <h3 className="text-white font-heading font-bold text-lg">{p.title}</h3>
            <p className="text-[#5a6a85] text-sm mt-1">{p.desc}</p>
            <p className="text-[#f5c842] font-bold mt-2">+${p.bonus} Credits</p>
            <button onClick={() => handleClaim(p.bonus)} className="btn-primary mt-3 text-sm">Claim Bonus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
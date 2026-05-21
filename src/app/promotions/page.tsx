"use client";
export default function PromotionsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">🎁 Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6"><h3 className="text-xl font-bold text-white">Welcome Bonus</h3><p className="text-white/60 mt-2">Get 5,000 demo credits on signup</p></div>
        <div className="glass-card p-6"><h3 className="text-xl font-bold text-white">Daily Reward</h3><p className="text-white/60 mt-2">Login daily for bonus credits</p></div>
        <div className="glass-card p-6"><h3 className="text-xl font-bold text-white">Referral Program</h3><p className="text-white/60 mt-2">Invite friends and earn</p></div>
        <div className="glass-card p-6"><h3 className="text-xl font-bold text-white">VIP Cashback</h3><p className="text-white/60 mt-2">Up to 20% cashback for VIP members</p></div>
      </div>
    </div>
  );
}
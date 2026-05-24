export default function PromotionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-500">🎁 Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {title:"Welcome Bonus",desc:"Get $500 bonus credits",amount:500},
          {title:"Daily Reward",desc:"Login daily for $50",amount:50},
          {title:"VIP Cashback",desc:"Up to 20% cashback",amount:100},
        ].map(p=>(
          <div key={p.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg">{p.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
            <p className="text-yellow-500 font-bold mt-2">+${p.amount}</p>
            <button className="mt-3 w-full py-2 bg-yellow-500 text-black font-bold rounded-lg text-sm">Claim Bonus</button>
          </div>
        ))}
      </div>
    </div>
  );
}
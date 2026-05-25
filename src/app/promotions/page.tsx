import Link from "next/link";
export default function PromotionsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gold">🎁 Promotions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{t:"Welcome Bonus",d:"Get $500 bonus credits",a:500},{t:"Daily Reward",d:"Login daily for $50",a:50},{t:"VIP Cashback",d:"Up to 20% cashback",a:100}].map(p=><div key={p.t} className="card p-6"><h3 className="text-white font-bold text-lg">{p.t}</h3><p className="text-muted text-sm mt-1">{p.d}</p><p className="text-gold font-bold mt-2">+${p.a}</p><button className="mt-3 w-full py-2 btn-gold text-sm">Claim Bonus</button></div>)}
        </div>
      </main>
    </div>
  );
}
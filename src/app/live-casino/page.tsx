import Link from "next/link";
const tables = [{g:"Blackjack",d:"Sophia",p:142},{g:"Roulette",d:"Marco",p:237},{g:"Baccarat",d:"Ling",p:89}];
export default function LiveCasinoPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gold mb-6">🔴 Live Casino</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tables.map(t=><div key={t.g} className="card p-6"><span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">LIVE</span><div className="text-5xl my-4">🃏</div><h3 className="text-white font-bold text-xl">{t.g}</h3><p className="text-muted text-sm">Dealer: {t.d} · {t.p} playing</p></div>)}
        </div>
      </main>
    </div>
  );
}
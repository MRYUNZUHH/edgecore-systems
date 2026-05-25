import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/casino" className="text-muted hover:text-white no-underline">Casino</Link>
            <Link href="/live-casino" className="text-muted hover:text-white no-underline">Live</Link>
            <Link href="/predictions" className="text-muted hover:text-white no-underline">Predictions</Link>
            <Link href="/wallet" className="text-muted hover:text-white no-underline">Wallet</Link>
            <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <div className="text-center space-y-6 py-16">
          <h1 className="text-5xl lg:text-6xl font-bold">Welcome to <span className="text-gold">EdgeCore</span></h1>
          <p className="text-xl text-muted">Premium Casino Experience · 10,000 Demo Credits Free</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login" className="btn-gold text-lg px-8 py-4 no-underline">🎰 Play Now</Link>
            <Link href="/casino" className="border border-[#f5c842]/30 text-gold font-bold px-8 py-4 rounded-lg text-lg no-underline hover:bg-[#f5c842]/10">Browse Games</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {[{n:"Aviator",e:"✈️"},{n:"Crash",e:"📈"},{n:"Mines",e:"💣"},{n:"Blackjack",e:"🃏"},{n:"Roulette",e:"🎡"},{n:"Starburst",e:"⭐"}].map(g=>(
            <Link key={g.n} href="/casino" className="card p-5 text-center no-underline hover:border-[#f5c842]/30 transition block"><div className="text-4xl mb-3">{g.e}</div><h3 className="text-white font-bold">{g.n}</h3></Link>
          ))}
        </div>
      </main>
      <footer className="border-t border-subtle py-4 px-4 text-center text-xs text-muted">© 2026 EdgeCore. Demo platform. 18+ only.</footer>
    </div>
  );
}
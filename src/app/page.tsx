import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-[#f5c842]">EDGECORE CASINO</h1>
        <p className="text-xl text-white/70">Premium gaming experience. Play for free.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/auth/login" className="px-8 py-3 bg-[#f5c842] text-black font-bold rounded-lg inline-block">Login to Play</Link>
          <Link href="/casino" className="px-8 py-3 border border-[#f5c842]/30 text-[#f5c842] font-bold rounded-lg inline-block">Browse Games</Link>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name:"Slots", emoji:"🎰", href:"/casino" },
          { name:"Crash", emoji:"📈", href:"/casino" },
          { name:"Blackjack", emoji:"🃏", href:"/casino" },
          { name:"Roulette", emoji:"🎡", href:"/casino" },
        ].map(game => (
          <Link key={game.name} href={game.href} 
            className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 text-center hover:border-[#f5c842]/30 transition">
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h3 className="text-white font-bold">{game.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
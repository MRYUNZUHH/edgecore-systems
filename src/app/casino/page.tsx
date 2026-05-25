import Link from "next/link";
const games = [
  {n:"Aviator",e:"✈️",r:97,c:"Crash"},{n:"Crash",e:"📈",r:97,c:"Crash"},{n:"Mines",e:"💣",r:95,c:"Crash"},
  {n:"Blackjack Pro",e:"🃏",r:99.5,c:"Table"},{n:"Roulette",e:"🎡",r:97.3,c:"Table"},
  {n:"Starburst",e:"⭐",r:96.1,c:"Slots"},{n:"Baccarat",e:"🎴",r:98.9,c:"Table"},{n:"Plinko",e:"🟡",r:96.5,c:"Crash"},
];
export default function CasinoPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gold mb-6">🎮 Casino Lobby</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map(g=>(
            <div key={g.n} className="card p-5 cursor-pointer hover:border-[#f5c842]/30 transition">
              <div className="text-4xl mb-3">{g.e}</div>
              <h3 className="text-white font-bold">{g.n}</h3>
              <div className="flex justify-between text-xs text-muted mt-2"><span>RTP {g.r}%</span><span>{g.c}</span></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
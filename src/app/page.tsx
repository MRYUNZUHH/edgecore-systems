"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useBalance } from "@/lib/useBalance";
import LiveFeed from "@/components/ui/LiveFeed";
import MobileNav from "@/components/layout/MobileNav";

const games = [
  {n:"Aviator",e:"✈️",h:"/casino/aviator",hot:true,players:12847},
  {n:"Crash",e:"📈",h:"/casino/crash",hot:true,players:8942},
  {n:"Mines",e:"💣",h:"/casino/mines",players:4521},
  {n:"Plinko",e:"🟡",h:"/casino/plinko",new:true,players:3210},
  {n:"Dice",e:"🎲",h:"/casino/dice",players:5678},
  {n:"Roulette",e:"🎡",h:"/casino/roulette",players:7890},
];

const liveGames = [
  {n:"Blackjack Live",e:"🃏",d:"Sophia",p:142},
  {n:"Roulette Live",e:"🎡",d:"Marco",p:237},
  {n:"Baccarat Live",e:"🎴",d:"Ling",p:89},
];

export default function Home() {
  const { isLoggedIn, username } = useBalance();
  const [jackpot, setJackpot] = useState(850000);
  const [players, setPlayers] = useState(47231);
  const [wins, setWins] = useState<any[]>([]);

  useEffect(() => {
    const jp = setInterval(() => setJackpot(p => p + Math.random() * 100 + 50), 2000);
    const pl = setInterval(() => setPlayers(p => p + Math.floor(Math.random() * 3 - 1)), 5000);
    const genWins = () => {
      const names = ["Kwame","Amina","Joao","Fatou","Carlos"];
      const gms = ["Aviator","Crash","Mines","Blackjack","Roulette","Dice"];
      return Array.from({length:8}, (_,i)=>({id:Date.now()+i, player:names[Math.floor(Math.random()*5)], game:gms[Math.floor(Math.random()*6)], bet:Math.floor(Math.random()*200)+10, mult:(Math.random()*10+1).toFixed(2), profit:Math.floor(Math.random()*2000)+50}));
    };
    setWins(genWins());
    const wi = setInterval(()=>setWins(genWins()),5000);
    return () => { clearInterval(jp); clearInterval(pl); clearInterval(wi); };
  }, []);

  return (
    <>
      <LiveFeed />
      <div className="pb-20 lg:pb-0">
        {/* Hero */}
        <section className="relative px-4 py-12 lg:py-20" style={{background:'radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.08) 0%, transparent 60%)'}}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#0f1520] border border-[#ffffff0f] rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span className="text-xs text-gray-400">{players.toLocaleString()} players online now</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">Play Smarter,<br/><span className="text-[#f0b429]">Win Bigger.</span></h1>
              <p className="text-gray-400 text-lg max-w-md">{isLoggedIn ? `Welcome back, ${username}!` : 'Join 50,000+ players. 200+ games. Instant payouts.'}</p>
              <div className="flex gap-3">
                {isLoggedIn ? <Link href="/casino" className="bg-[#f0b429] text-black font-bold px-8 py-4 rounded-lg text-lg no-underline">🎮 Play Now</Link> : <Link href="/auth/login" className="bg-[#f0b429] text-black font-bold px-8 py-4 rounded-lg text-lg no-underline">🔐 Login to Play</Link>}
                <Link href="/casino" className="border border-[#f0b429]/30 text-[#f0b429] font-bold px-8 py-4 rounded-lg text-lg no-underline">Browse Games</Link>
              </div>
              <div className="flex gap-6 text-sm text-gray-500 flex-wrap">
                <span>💰 $2.8M Paid Today</span><span>🏆 12,847 Winners</span><span>🎮 200+ Games</span><span>⚡ Instant Payouts</span>
              </div>
            </div>
            <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-400 mb-2">🔥 LIVE JACKPOT</p>
              <p className="font-heading text-5xl font-bold text-[#f0b429]">${jackpot.toLocaleString()}</p>
              <Link href="/casino/crash" className="bg-[#f0b429] text-black font-bold w-full mt-6 py-3 rounded-lg no-underline block">Play Crash Now →</Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[{l:"Online Now",v:players.toLocaleString(),c:"text-[#00ff88]"},{l:"Paid Today",v:"$2.8M",c:"text-[#f0b429]"},{l:"Games",v:"200+",c:"text-blue-400"},{l:"Support",v:"24/7",c:"text-purple-400"}].map(s=><div key={s.l} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-5 text-center"><p className={`text-2xl font-heading font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-gray-500 mt-1">{s.l}</p></div>)}
        </section>

        {/* Featured Games */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">Featured Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map(g => <Link key={g.n} href={g.h} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4 text-center no-underline hover:border-[#f0b429]/50 transition relative">
              {g.hot&&<span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>}
              {g.new&&<span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
              <div className="text-4xl mb-3">{g.e}</div><h3 className="text-white font-bold">{g.n}</h3>
              <p className="text-gray-500 text-xs mt-1">{g.players.toLocaleString()} playing</p>
            </Link>)}
          </div>
        </section>

        {/* Live Games */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">🔴 Live Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveGames.map(g=><div key={g.n} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4"><span className="bg-[#00ff88] text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"/>LIVE</span><span className="text-xs text-gray-400">{g.p} playing</span></div>
              <div className="text-5xl mb-3">{g.e}</div><h3 className="text-white font-heading font-bold text-xl">{g.n}</h3>
              <p className="text-gray-500 text-sm">Dealer: {g.d}</p>
              <Link href="/live-casino" className="bg-[#f0b429] text-black font-bold w-full mt-4 py-2 rounded-lg text-sm no-underline text-center block">Join Table</Link>
            </div>)}
          </div>
        </section>

        {/* Big Wins */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">🏆 Recent Big Wins</h2>
          <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl overflow-x-auto">
            <table className="w-full text-sm"><thead><tr className="border-b border-[#ffffff0f] text-left text-gray-500 text-xs"><th className="p-3">Player</th><th className="p-3">Game</th><th className="p-3">Bet</th><th className="p-3">Multiplier</th><th className="p-3">Profit</th></tr></thead>
            <tbody>{wins.map(w=><tr key={w.id} className="border-b border-[#ffffff0f]"><td className="p-3 text-white">{w.player}</td><td className="p-3 text-gray-400">{w.game}</td><td className="p-3 text-white">${w.bet}</td><td className={`p-3 font-bold ${Number(w.mult)>5?'text-[#f0b429]':Number(w.mult)>2?'text-blue-400':'text-gray-500'}`}>{w.mult}x</td><td className="p-3 text-[#00ff88] font-bold">+${w.profit}</td></tr>)}</tbody></table>
          </div>
        </section>
      </div>
      <MobileNav />
    </>
  );
}
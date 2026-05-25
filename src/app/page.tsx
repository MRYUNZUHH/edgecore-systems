"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import LiveTicker from "@/components/ui/LiveTicker";
import { ToastContainer, toast } from "@/components/ui/Toast";

const categories = ["All","Crash","Slots","Table","Live","Sports"];
const games = [
  {id:"aviator",n:"Aviator",e:"✈️",c:"Crash",bg:"from-purple-900 to-fuchsia-900",p:12847,b:"HOT",r:97},
  {id:"crash",n:"Crash X",e:"📈",c:"Crash",bg:"from-green-900 to-emerald-900",p:8942,b:"HOT",r:97},
  {id:"mines",n:"Mines",e:"💣",c:"Crash",bg:"from-amber-900 to-orange-900",p:4521,b:null,r:95},
  {id:"plinko",n:"Plinko",e:"🟡",c:"Crash",bg:"from-indigo-900 to-purple-900",p:3210,b:"NEW",r:96.5},
  {id:"blackjack",n:"Blackjack",e:"🃏",c:"Table",bg:"from-blue-900 to-indigo-900",p:6234,b:null,r:99.5},
  {id:"roulette",n:"Roulette",e:"🎡",c:"Table",bg:"from-red-900 to-rose-900",p:7890,b:"LIVE",r:97.3},
  {id:"baccarat",n:"Baccarat",e:"🎴",c:"Table",bg:"from-cyan-900 to-teal-900",p:2341,b:null,r:98.9},
  {id:"dragon",n:"Dragon Tiger",e:"🐉",c:"Table",bg:"from-orange-900 to-red-900",p:1567,b:null,r:96.9},
  {id:"starburst",n:"Starburst",e:"⭐",c:"Slots",bg:"from-pink-900 to-rose-900",p:10234,b:"HOT",r:96.1},
  {id:"book",n:"Book of Dead",e:"📖",c:"Slots",bg:"from-yellow-900 to-amber-900",p:5678,b:null,r:94.2},
  {id:"football",n:"Football",e:"⚽",c:"Sports",bg:"from-green-900 to-lime-900",p:3456,b:null,r:95},
  {id:"basketball",n:"Basketball",e:"🏀",c:"Sports",bg:"from-orange-900 to-yellow-900",p:2890,b:null,r:94},
];

const liveGames = [
  {n:"Blackjack Live",e:"🃏",d:"Sophia",p:142},
  {n:"Roulette Live",e:"🎡",d:"Marco",p:237},
  {n:"Baccarat Live",e:"🎴",d:"Ling",p:89},
];

const promos = [
  {t:"Welcome Bonus",d:"200% match up to $1,000 + 50 Free Spins",a:"$1,000",bg:"from-gold to-yellow-600",emoji:"🎁"},
  {t:"Weekly Cashback",d:"Get 15% cashback on all losses every Monday",a:"15%",bg:"from-green-600 to-emerald-700",emoji:"💵"},
  {t:"VIP Program",d:"Unlock exclusive rewards, higher limits & personal manager",a:"JOIN",bg:"from-purple-600 to-violet-700",emoji:"👑"},
];

export default function Home() {
  const { user, isLoggedIn, clearJustLoggedIn } = useAuth();
  const [jackpot, setJackpot] = useState(850000);
  const [activeCat, setActiveCat] = useState("All");
  const [showBanner, setShowBanner] = useState(false);
  const [wins, setWins] = useState<any[]>([]);

  useEffect(() => {
    if (user?.justLoggedIn) { setShowBanner(true); clearJustLoggedIn(); setTimeout(()=>setShowBanner(false),5000); }
    const jp = setInterval(() => setJackpot(p => p + Math.floor(Math.random()*100)+50), 2000);
    const genWins = () => {
      const names = ["K***a","M***i","J***n","L***a","C***s","A***a"];
      const gms = ["Aviator","Crash","Mines","Blackjack","Roulette","Plinko"];
      return Array.from({length:8}, (_,i)=>({id:Date.now()+i, player:names[Math.floor(Math.random()*6)], game:gms[Math.floor(Math.random()*6)], bet:Math.floor(Math.random()*200)+10, mult:(Math.random()*10+1).toFixed(2), profit:Math.floor(Math.random()*2000)+50}));
    };
    setWins(genWins());
    const wi = setInterval(()=>setWins(genWins()),5000);
    return () => { clearInterval(jp); clearInterval(wi); };
  }, [user, clearJustLoggedIn]);

  const filtered = activeCat==="All" ? games : games.filter(g=>g.c===activeCat);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LiveTicker />
      <ToastContainer />
      <main className="flex-1 pb-20 lg:pb-0">
        {/* Success Banner */}
        {showBanner && (
          <div className="bg-green-500/10 border border-green-500/20 text-center py-3 px-4 animate-fade-in-up">
            <p className="text-green-400 font-bold">🎉 Welcome back, {user?.username}! Your $10,000 balance is ready</p>
          </div>
        )}

        {/* Hero */}
        <section className="relative px-4 py-12 lg:py-20" style={{background:'radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.08) 0%, transparent 60%)'}}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-full px-4 py-1.5">
                <span className="live-dot" /><span className="text-xs text-muted">47,231 players online now</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">Play Smarter,<br/><span className="text-gold">Win Bigger.</span></h1>
              <p className="text-muted text-lg max-w-md">Join 50,000+ players. 200+ games. Instant payouts. Premium casino experience.</p>
              <div className="flex gap-3">
                {isLoggedIn ? <Link href="/casino" className="btn-gold text-lg px-8 py-4 no-underline">🎮 Play Now</Link> : <Link href="/auth/login" className="btn-gold text-lg px-8 py-4 no-underline">🔐 Login to Play</Link>}
                <Link href="/casino" className="border border-[var(--gold)]/30 text-gold font-bold px-8 py-4 rounded-lg text-lg no-underline hover:bg-[var(--gold)]/10 transition">Browse Games</Link>
              </div>
              <div className="flex gap-6 text-sm text-muted flex-wrap">
                <span>💰 $2.8M Paid Today</span><span>🏆 12,847 Winners</span><span>🎮 200+ Games</span><span>⚡ Instant Payouts</span>
              </div>
            </div>
            <div className="card p-8 text-center">
              <p className="text-sm text-muted mb-2">🔥 LIVE JACKPOT</p>
              <p className="font-heading text-5xl font-bold text-gold transition-all">${jackpot.toLocaleString()}</p>
              <p className="text-xs text-muted mt-2">Auto-incrementing · Play to win</p>
              <Link href="/casino" className="btn-gold w-full mt-6 py-3 no-underline">Play Now →</Link>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[{l:"Online Now",v:"47,231",c:"text-green-400"},{l:"Paid Today",v:"$2.8M",c:"text-gold"},{l:"Games",v:"200+",c:"text-blue-400"},{l:"Support",v:"24/7",c:"text-purple-400"}].map(s=><div key={s.l} className="card p-5 text-center"><p className={`text-2xl font-heading font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-muted mt-1">{s.l}</p></div>)}
        </section>

        {/* Featured Games */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">Featured Games</h2>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {categories.map(c=><button key={c} onClick={()=>setActiveCat(c)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeCat===c?'bg-gold text-black':'bg-[var(--card)] text-muted border border-[var(--border)] hover:border-gold'}`}>{c}</button>)}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filtered.map(g=><div key={g.id} className={`card card-hover p-4 cursor-pointer relative overflow-hidden bg-gradient-to-br ${g.bg}`}>
              {g.b&&<span className={`absolute top-2 right-2 ${g.b==='HOT'?'badge-hot':g.b==='LIVE'?'badge-live':'badge-new'}`}>{g.b}</span>}
              <div className="text-4xl mb-3">{g.e}</div><h3 className="text-white font-heading font-bold text-lg">{g.n}</h3>
              <p className="text-white/50 text-xs mt-1">{g.p.toLocaleString()} playing · RTP {g.r}%</p>
            </div>)}
          </div>
        </section>

        {/* Live Games */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">🔴 Live Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveGames.map(g=><div key={g.n} className="card p-6"><div className="flex items-center justify-between mb-4"><span className="badge-live flex items-center gap-1"><span className="live-dot" />LIVE</span><span className="text-xs text-muted">{g.p} playing</span></div><div className="text-5xl mb-3">{g.e}</div><h3 className="text-white font-heading font-bold text-xl">{g.n}</h3><p className="text-muted text-sm">Dealer: {g.d}</p><Link href="/live-casino" className="btn-gold w-full mt-4 py-2 text-sm no-underline text-center block">Join Table</Link></div>)}
          </div>
        </section>

        {/* Big Wins */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">🏆 Recent Big Wins</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)] text-left text-muted text-xs"><th className="p-3">Player</th><th className="p-3">Game</th><th className="p-3">Bet</th><th className="p-3">Multiplier</th><th className="p-3">Profit</th></tr></thead>
              <tbody>{wins.map(w=><tr key={w.id} className="border-b border-[var(--border)]"><td className="p-3 text-white">{w.player}</td><td className="p-3 text-muted">{w.game}</td><td className="p-3 text-white">${w.bet}</td><td className={`p-3 font-bold ${Number(w.mult)>5?'text-gold':Number(w.mult)>2?'text-blue-400':'text-muted'}`}>{w.mult}x</td><td className="p-3 text-green-400 font-bold">+${w.profit}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        {/* Promotions */}
        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">🎁 Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promos.map(p=><div key={p.t} className={`bg-gradient-to-br ${p.bg} rounded-2xl p-6 text-white`}><span className="text-4xl">{p.emoji}</span><h3 className="font-heading font-bold text-xl mt-3">{p.t}</h3><p className="text-white/70 text-sm mt-1">{p.d}</p><p className="text-2xl font-heading font-bold mt-3">{p.a}</p><button className="mt-4 w-full py-2 bg-white/20 text-white font-bold rounded-lg text-sm hover:bg-white/30 transition">Claim Now</button></div>)}
          </div>
        </section>
      </main>
      <MobileNav />
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-6 px-4 text-center text-xs text-muted">© 2026 EdgeCore. Demo platform. 18+ only. Play responsibly.</footer>
    </div>
  );
}
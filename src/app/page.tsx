"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useBalance } from "@/lib/useBalance";
import LiveFeed from "@/components/ui/LiveFeed";
import MobileNav from "@/components/layout/MobileNav";

const JACKPOT_KEY = "ec_jackpot";
const BASE_JACKPOT = 847000;

const games = [
  {n:"Aviator",e:"✈️",h:"/casino/aviator",hot:true},
  {n:"Crash",e:"📈",h:"/casino/crash",hot:true},
  {n:"Mines",e:"💣",h:"/casino/mines"},
  {n:"Plinko",e:"🟡",h:"/casino/plinko",new:true},
  {n:"Dice",e:"🎲",h:"/casino/dice"},
  {n:"Roulette",e:"🎡",h:"/casino/roulette"},
];

export default function Home() {
  const { isLoggedIn, username } = useBalance();
  const [jackpot, setJackpot] = useState(BASE_JACKPOT);

  useEffect(() => {
    // Load persisted jackpot or initialize it
    const stored = localStorage.getItem(JACKPOT_KEY);
    if (stored) {
      setJackpot(parseFloat(stored));
    } else {
      localStorage.setItem(JACKPOT_KEY, BASE_JACKPOT.toString());
    }

    // Slowly increment the jackpot every 2 seconds
    const jp = setInterval(() => {
      setJackpot(prev => {
        const increment = Math.random() * 80 + 20;
        const next = prev + increment;
        localStorage.setItem(JACKPOT_KEY, next.toString());
        return next;
      });
    }, 2000);

    return () => clearInterval(jp);
  }, []);

  return (
    <>
      <LiveFeed />
      <div className="pb-20 lg:pb-0">
        <section className="relative px-4 py-12 lg:py-20" style={{background:'radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.08) 0%, transparent 60%)'}}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">Play Smarter,<br/><span className="text-[#f0b429]">Win Bigger.</span></h1>
              <p className="text-gray-400 text-lg">{isLoggedIn ? `Welcome back, ${username}!` : 'Join 50,000+ players.'}</p>
              <div className="flex gap-3">
                {isLoggedIn ? <Link href="/casino" className="bg-[#f0b429] text-black font-bold px-8 py-4 rounded-lg text-lg no-underline">🎮 Play Now</Link> : <Link href="/auth/login" className="bg-[#f0b429] text-black font-bold px-8 py-4 rounded-lg text-lg no-underline">🔐 Login to Play</Link>}
                <Link href="/casino" className="border border-[#f0b429]/30 text-[#f0b429] font-bold px-8 py-4 rounded-lg text-lg no-underline">Browse Games</Link>
              </div>
            </div>
            <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-400 mb-2">🔥 LIVE JACKPOT</p>
              <p className="font-heading text-5xl font-bold text-[#f0b429] transition-all">${jackpot.toLocaleString('en-US', {maximumFractionDigits:2})}</p>
              <p className="text-xs text-gray-500 mt-2">Growing in real-time · Never resets</p>
              <Link href="/casino/crash" className="bg-[#f0b429] text-black font-bold w-full mt-6 py-3 rounded-lg no-underline block">Play Crash Now →</Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">Featured Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map(g => <Link key={g.n} href={g.h} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-4 text-center no-underline hover:border-[#f0b429]/50 transition relative">
              {g.hot&&<span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>}
              {g.new&&<span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
              <div className="text-4xl mb-3">{g.e}</div><h3 className="text-white font-bold">{g.n}</h3>
            </Link>)}
          </div>
        </section>
      </div>
      <MobileNav />
    </>
  );
}
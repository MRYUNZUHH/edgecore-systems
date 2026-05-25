"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import LiveFeed from "@/components/ui/LiveFeed";
import MobileNav from "@/components/layout/MobileNav";
const games = [
  {n:"Aviator",e:"✈️",h:"/casino/aviator",hot:true},{n:"Crash",e:"📈",h:"/casino/crash",hot:true},
  {n:"Mines",e:"💣",h:"/casino/mines"},{n:"Plinko",e:"🟡",h:"/casino/plinko",new:true},
  {n:"Dice",e:"🎲",h:"/casino/dice"},{n:"Roulette",e:"🎡",h:"/casino/roulette"},
];
export default function Home() {
  const [jackpot, setJackpot] = useState(847000);
  useEffect(() => { const i = setInterval(() => setJackpot(p => p + Math.random() * 100 + 50), 2000); return () => clearInterval(i); }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Nav /><LiveFeed />
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4">
          <div className="text-center py-12">
            <h1 className="text-5xl font-bold text-white mb-2">Welcome to <span className="text-[#f0b429]">EdgeCore</span></h1>
            <p className="text-2xl font-bold text-[#f0b429] mb-6">Live Jackpot: ${jackpot.toLocaleString()}</p>
            <div className="flex gap-3 justify-center">
              <Link href="/casino" className="bg-[#f0b429] text-black font-bold px-8 py-3 rounded-lg text-lg no-underline">Play Now</Link>
              <Link href="/auth/login" className="border border-[#f0b429]/30 text-[#f0b429] font-bold px-8 py-3 rounded-lg text-lg no-underline">Login</Link>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Featured Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map(g => <Link key={g.n} href={g.h} className="bg-[#13131f] border border-white/5 rounded-xl p-4 text-center no-underline hover:border-[#f0b429]/50 transition relative">{g.hot&&<span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>}{g.new&&<span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}<div className="text-4xl mb-3">{g.e}</div><h3 className="text-white font-bold">{g.n}</h3></Link>)}
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
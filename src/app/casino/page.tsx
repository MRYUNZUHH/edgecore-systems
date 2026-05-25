"use client";
import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";

const games = [
  {n:"Aviator",e:"✈️",h:"/casino/aviator",c:"Originals",hot:true,r:97},
  {n:"Crash",e:"📈",h:"/casino/crash",c:"Originals",hot:true,r:97},
  {n:"Mines",e:"💣",h:"/casino/mines",c:"Originals",r:95},
  {n:"Plinko",e:"🟡",h:"/casino/plinko",c:"Originals",r:96.5},
  {n:"Dice",e:"🎲",h:"/casino/dice",c:"Originals",r:96},
  {n:"Limbo",e:"🔮",h:"/casino/limbo",c:"Originals",new:true,r:97},
  {n:"Keno",e:"🎯",h:"/casino/keno",c:"Originals",new:true,r:95},
  {n:"Wheel",e:"🎡",h:"/casino/wheel",c:"Originals",new:true,r:96},
  {n:"HiLo",e:"🃏",h:"/casino/hilo",c:"Originals",new:true,r:96},
  {n:"Dragon Tower",e:"🗼",h:"/casino/dragon-tower",c:"Originals",new:true,r:96},
  {n:"Pump",e:"🎈",h:"/casino/pump",c:"Originals",new:true,r:97},
  {n:"Blackjack",e:"🃏",h:"/casino/blackjack",c:"Table",r:99.5},
  {n:"Roulette",e:"🎡",h:"/casino/roulette",c:"Table",r:97.3},
  {n:"Baccarat",e:"🎴",h:"/casino/baccarat",c:"Table",r:98.9},
  {n:"Video Poker",e:"🎰",h:"/casino/video-poker",c:"Table",r:98},
  {n:"Starburst",e:"⭐",h:"/casino/starburst",c:"Slots",r:96.1},
];

export default function CasinoPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-[#f0b429] mb-6">🎮 Casino Lobby</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {games.map(g => (
            <Link key={g.n} href={g.h} className="bg-[#12121a] border border-gray-800 rounded-xl p-4 cursor-pointer no-underline hover:border-[#f0b429]/50 hover:shadow-[0_0_20px_rgba(240,180,41,0.15)] transition-all relative overflow-hidden group">
              {g.hot && <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">HOT</span>}
              {g.new && <span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{g.e}</div>
              <h3 className="text-white font-bold text-sm mb-1">{g.n}</h3>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{g.c}</span>
                <span>RTP {g.r}%</span>
              </div>
              <div className="absolute inset-0 bg-[#f0b429]/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="bg-[#f0b429] text-black px-4 py-2 rounded-lg font-bold text-sm">▶ Play</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
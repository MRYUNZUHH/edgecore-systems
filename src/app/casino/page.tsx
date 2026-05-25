"use client";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import MobileNav from "@/components/layout/MobileNav";
const games = [
  {n:"Aviator",e:"✈️",h:"/casino/aviator",c:"Originals",hot:true},{n:"Crash",e:"📈",h:"/casino/crash",c:"Originals",hot:true},
  {n:"Mines",e:"💣",h:"/casino/mines",c:"Originals"},{n:"Plinko",e:"🟡",h:"/casino/plinko",c:"Originals",new:true},
  {n:"Dice",e:"🎲",h:"/casino/dice",c:"Originals"},{n:"Limbo",e:"🔮",h:"/casino/limbo",c:"Originals"},
  {n:"Wheel",e:"🎡",h:"/casino/wheel",c:"Originals"},{n:"HiLo",e:"🃏",h:"/casino/hilo",c:"Originals"},
  {n:"Dragon Tower",e:"🗼",h:"/casino/dragon-tower",c:"Originals"},{n:"Pump",e:"🎈",h:"/casino/pump",c:"Originals"},
  {n:"Keno",e:"🎯",h:"/casino/keno",c:"Originals"},{n:"Blackjack",e:"🃏",h:"/casino/blackjack",c:"Table"},
  {n:"Roulette",e:"🎡",h:"/casino/roulette",c:"Table"},{n:"Baccarat",e:"🎴",h:"/casino/baccarat",c:"Table"},
  {n:"Video Poker",e:"🎰",h:"/casino/video-poker",c:"Table"},{n:"Starburst",e:"⭐",h:"/casino/starburst",c:"Slots"},
  {n:"Book of Dead",e:"📖",h:"/casino/book-of-dead",c:"Slots"},{n:"Gates of Olympus",e:"⚡",h:"/casino/gates-of-olympus",c:"Slots"},
  {n:"Sweet Bonanza",e:"🍬",h:"/casino/sweet-bonanza",c:"Slots"},{n:"Big Bass Bonanza",e:"🐟",h:"/casino/big-bass-bonanza",c:"Slots"},
];
export default function CasinoPage() {
  return (
    <div className="min-h-screen flex flex-col"><Nav />
      <main className="flex-1 pb-20 lg:pb-0"><div className="max-w-7xl mx-auto p-4"><h1 className="text-3xl font-bold text-[#f0b429] mb-6">🎮 Casino Lobby</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {games.map(g => <Link key={g.n} href={g.h} className="bg-[#13131f] border border-white/5 rounded-xl p-4 cursor-pointer no-underline hover:border-[#f0b429]/50 hover:shadow-[0_0_20px_rgba(240,180,41,0.15)] transition relative group">{g.hot&&<span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>}{g.new&&<span className="absolute top-2 right-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}<div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{g.e}</div><h3 className="text-white font-bold text-sm">{g.n}</h3><span className="text-xs text-gray-500">{g.c}</span></Link>)}
        </div></div></main><MobileNav /></div>);
}
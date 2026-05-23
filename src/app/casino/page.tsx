import Link from "next/link";

const games = [
  { id:"aviator", name:"Aviator", emoji:"✈️" },
  { id:"crash", name:"Crash", emoji:"📈" },
  { id:"mines", name:"Mines", emoji:"💣" },
  { id:"blackjack-pro", name:"Blackjack", emoji:"🃏" },
  { id:"roulette", name:"Roulette", emoji:"🎡" },
  { id:"starburst", name:"Starburst", emoji:"⭐" },
];

export default function CasinoPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">🎮 Casino Lobby</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {games.map(game => (
          <div key={game.id} className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-5 text-center hover:border-[#f5c842]/30 cursor-pointer transition">
            <div className="text-4xl mb-3">{game.emoji}</div>
            <h3 className="text-white font-bold">{game.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
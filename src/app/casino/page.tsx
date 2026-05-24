export default function CasinoPage() {
  const games = [
    {name:"Aviator",emoji:"✈️",rtp:97.0,cat:"Crash"},
    {name:"Crash",emoji:"📈",rtp:97.0,cat:"Crash"},
    {name:"Mines",emoji:"💣",rtp:95.0,cat:"Crash"},
    {name:"Blackjack Pro",emoji:"🃏",rtp:99.5,cat:"Table"},
    {name:"Roulette",emoji:"🎡",rtp:97.3,cat:"Table"},
    {name:"Starburst",emoji:"⭐",rtp:96.1,cat:"Slots"},
    {name:"Baccarat",emoji:"🎴",rtp:98.9,cat:"Table"},
    {name:"Plinko",emoji:"🟡",rtp:96.5,cat:"Crash"},
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-500">🎮 Casino Lobby</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map(g=>(
          <div key={g.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 cursor-pointer hover:border-yellow-500/30 transition">
            <div className="text-4xl mb-3">{g.emoji}</div>
            <h3 className="text-white font-bold">{g.name}</h3>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>RTP {g.rtp}%</span><span>{g.cat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
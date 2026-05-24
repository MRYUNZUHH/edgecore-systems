export default function Home() {
  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-4 py-12 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-2xl border border-gray-800">
        <h1 className="text-4xl lg:text-5xl font-bold">Welcome to EdgeCore</h1>
        <p className="text-xl text-yellow-500 font-bold">Premium Casino Experience</p>
        <p className="text-gray-400">10,000 demo credits. No deposit needed.</p>
        <div className="flex gap-3 justify-center">
          <a href="/auth/login" className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg text-lg">Login to Play</a>
          <a href="/casino" className="inline-block px-8 py-3 border border-yellow-500/30 text-yellow-500 font-bold rounded-lg text-lg">Browse Games</a>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {name:"Aviator",emoji:"✈️"},{name:"Crash",emoji:"📈"},{name:"Mines",emoji:"💣"},
          {name:"Blackjack",emoji:"🃏"},{name:"Roulette",emoji:"🎡"},{name:"Starburst",emoji:"⭐"}
        ].map(g=>(
          <a key={g.name} href="/casino" className="block bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center hover:border-yellow-500/30 transition no-underline">
            <div className="text-4xl mb-3">{g.emoji}</div>
            <h3 className="text-white font-bold">{g.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
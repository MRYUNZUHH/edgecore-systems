export default function LiveCasinoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-500">🔴 Live Casino</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{game:"Blackjack",dealer:"Sophia",players:142},{game:"Roulette",dealer:"Marco",players:237},{game:"Baccarat",dealer:"Ling",players:89}].map(t=>(
          <div key={t.game} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">LIVE</span>
            <div className="text-5xl my-4">🃏</div>
            <h3 className="text-white font-bold text-xl">{t.game}</h3>
            <p className="text-gray-500 text-sm">Dealer: {t.dealer} · {t.players} playing</p>
            <button className="mt-3 w-full py-2 bg-yellow-500 text-black font-bold rounded-lg text-sm">Join Table</button>
          </div>
        ))}
      </div>
    </div>
  );
}
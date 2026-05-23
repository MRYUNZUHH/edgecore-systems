"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";

const COMPETITIONS = [
  { code:'PL', name:'Premier League', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code:'CL', name:'Champions League', flag:'🌍' },
  { code:'PD', name:'La Liga', flag:'🇪🇸' },
  { code:'BL1', name:'Bundesliga', flag:'🇩🇪' },
  { code:'SA', name:'Serie A', flag:'🇮🇹' },
]

function generateOdds(fixtureId: number) {
  const seed = fixtureId % 100
  const home = parseFloat((1 / ((seed % 40 + 30) / 100) * 0.9).toFixed(2))
  const away = parseFloat((1 / (((100 - seed % 40 - 30) / 100) * 0.85) * 0.9).toFixed(2))
  const draw = parseFloat(((home + away) / 2 * 1.1).toFixed(2))
  return { home, draw, away }
}

export default function PredictionsPage() {
  const [matches, setMatches] = useState<any[]>([])
  const [activeComp, setActiveComp] = useState('PL')
  const [betSlip, setBetSlip] = useState<any[]>([])
  const [stake, setStake] = useState(100)
  const { balance, adjustBalance, currency, addBet } = useStore()

  useEffect(() => {
    fetch(`/api/fixtures?competition=${activeComp}`)
      .then(r => r.json())
      .then(d => setMatches(d.matches || []))
      .catch(() => setMatches([]))
  }, [activeComp])

  const addToSlip = (match: any, market: string, odds: number) => {
    setBetSlip(prev => {
      const exists = prev.find(b => b.matchId === match.id && b.market === market)
      if (exists) return prev.filter(b => !(b.matchId === match.id && b.market === market))
      return [...prev, { matchId: match.id, teams: `${match.homeTeam?.name} vs ${match.awayTeam?.name}`, market, odds }]
    })
  }

  const placeBet = () => {
    const totalOdds = betSlip.reduce((acc, b) => acc * b.odds, 1)
    const potentialWin = stake * totalOdds
    if (stake > balance) return
    adjustBalance(-stake)
    const win = Math.random() > 0.55
    if (win) adjustBalance(potentialWin)
    addBet({ type: 'prediction', stake, odds: totalOdds, win, payout: win ? potentialWin : 0, time: Date.now() })
    setBetSlip([])
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-bold text-[#E6B84F]">📊 Predictions</h1>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {COMPETITIONS.map(c => (
          <button key={c.code} onClick={() => setActiveComp(c.code)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${activeComp === c.code ? 'bg-[#E6B84F] text-black' : 'bg-white/5 text-white/70'}`}>
            {c.flag} {c.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {matches.slice(0, 8).map((match: any) => {
            const odds = generateOdds(match.id || 0)
            return (
              <div key={match.id} className="bg-[#131626] border border-[#1E2235] rounded-2xl p-4">
                <p className="text-xs text-white/40 mb-2">{new Date(match.utcDate).toLocaleDateString()}</p>
                <h3 className="text-white font-bold">{match.homeTeam?.name} vs {match.awayTeam?.name}</h3>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[{ label:'1', val:odds.home },{ label:'X', val:odds.draw },{ label:'2', val:odds.away }].map(o => (
                    <button key={o.label} onClick={() => addToSlip(match, o.label, o.val)}
                      className={`p-2 rounded-xl text-sm font-bold ${betSlip.some(b => b.matchId === match.id && b.market === o.label) ? 'bg-[#E6B84F] text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                      {o.label} @ {o.val}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div className="bg-[#131626] border border-[#1E2235] rounded-2xl p-4 h-fit sticky top-20">
          <h3 className="text-white font-bold mb-3">🎫 Bet Slip</h3>
          {betSlip.length === 0 ? <p className="text-white/40 text-sm">Click odds to add selections</p> : (
            <>
              {betSlip.map((b,i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5">
                  <span className="text-white/70">{b.teams} - {b.market}</span>
                  <span className="text-[#E6B84F] font-bold">@{b.odds}</span>
                </div>
              ))}
              <input type="number" value={stake} onChange={e => setStake(Number(e.target.value))}
                className="w-full mt-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white" />
              <p className="text-neon-400 text-sm mt-2">Potential: {formatMoney(stake * betSlip.reduce((a,b) => a*b.odds,1), currency)}</p>
              <button onClick={placeBet} className="w-full mt-3 py-2 bg-[#E6B84F] text-black font-bold rounded-xl">Place Bet</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
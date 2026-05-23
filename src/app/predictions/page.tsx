"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";

const COMPETITIONS = [
  { code:'PL', name:'Premier League', flag:'🏴' },
  { code:'PD', name:'La Liga', flag:'🇪🇸' },
  { code:'BL1', name:'Bundesliga', flag:'🇩🇪' },
]

export default function PredictionsPage() {
  const [matches] = useState([
    { id:1, home:'Arsenal', away:'Chelsea', homeOdds:2.10, drawOdds:3.40, awayOdds:3.20 },
    { id:2, home:'Man United', away:'Liverpool', homeOdds:2.80, drawOdds:3.20, awayOdds:2.50 },
    { id:3, home:'Real Madrid', away:'Barcelona', homeOdds:2.30, drawOdds:3.30, awayOdds:3.00 },
  ])
  const [activeComp, setActiveComp] = useState('PL')
  const [betSlip, setBetSlip] = useState<any[]>([])
  const [stake, setStake] = useState(100)
  const { getBalanceDollars, placeBet, settleBet } = useStore()
  const balance = getBalanceDollars()

  const addToSlip = (match: any, market: string, odds: number) => {
    setBetSlip(prev => prev.some(b => b.matchId === match.id && b.market === market)
      ? prev.filter(b => !(b.matchId === match.id && b.market === market))
      : [...prev, { matchId: match.id, teams: `${match.home} vs ${match.away}`, market, odds }])
  }

  const handlePlaceBet = () => {
    const totalOdds = betSlip.reduce((a,b) => a * b.odds, 1)
    const amountCents = Math.round(stake * 100)
    if (amountCents > balance * 100) return
    const betId = placeBet(amountCents, 'predictions')
    const win = Math.random() > 0.55
    const winAmount = win ? Math.round(stake * totalOdds * 100) : 0
    if (betId) settleBet(betId, winAmount)
    setBetSlip([])
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">📊 Predictions</h1>
      <div className="flex gap-2">
        {COMPETITIONS.map(c => (
          <button key={c.code} onClick={() => setActiveComp(c.code)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${activeComp===c.code?'bg-[#f5c842] text-black':'bg-white/5 text-white/70'}`}>{c.flag} {c.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {matches.map(m => (
            <div key={m.id} className="card p-4">
              <h3 className="text-white font-bold mb-3">{m.home} vs {m.away}</h3>
              <div className="grid grid-cols-3 gap-2">
                {[{label:'1',val:m.homeOdds},{label:'X',val:m.drawOdds},{label:'2',val:m.awayOdds}].map(o => (
                  <button key={o.label} onClick={() => addToSlip(m, o.label, o.val)}
                    className={`p-2 rounded-xl text-sm font-bold ${betSlip.some(b=>b.matchId===m.id&&b.market===o.label)?'bg-[#f5c842] text-black':'bg-white/5 text-white'}`}>{o.label} @ {o.val}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card p-4 h-fit sticky top-20">
          <h3 className="text-white font-bold mb-3">🎫 Bet Slip</h3>
          <p className="text-xs text-[#5a6a85] mb-3">Balance: ${balance.toFixed(2)}</p>
          {betSlip.length===0 ? <p className="text-[#5a6a85] text-sm">Click odds to add</p> : (
            <>
              {betSlip.map((b,i) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span className="text-white/70">{b.teams} - {b.market}</span>
                  <span className="text-[#f5c842] font-bold">@{b.odds}</span>
                </div>
              ))}
              <input type="number" value={stake} onChange={e => setStake(Number(e.target.value))}
                className="input mt-3" />
              <p className="text-[#22c55e] text-sm mt-2">Potential: ${(stake * betSlip.reduce((a,b)=>a*b.odds,1)).toFixed(2)}</p>
              <button onClick={handlePlaceBet} className="btn-primary w-full mt-3">Place Bet</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
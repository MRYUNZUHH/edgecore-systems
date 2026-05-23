"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import { formatMoney } from "@/lib/format";
import confetti from "canvas-confetti";

const suits = ['♠','♥','♦','♣']
const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']

function createDeck() {
  return suits.flatMap(s => values.map(v => ({ suit:s, value:v, numeric: v==='A'?11:['J','Q','K'].includes(v)?10:parseInt(v) })))
    .sort(() => Math.random()-0.5)
}
function handTotal(hand: any[]) {
  let t = hand.reduce((s,c) => s + c.numeric, 0)
  let aces = hand.filter(c => c.value==='A').length
  while (t > 21 && aces > 0) { t -= 10; aces-- }
  return t
}

export default function BlackjackGame({ onClose }: { onClose: () => void }) {
  const { balance, adjustBalance, addBet, currency } = useStore()
  const [betAmount, setBetAmount] = useState(10)
  const [deck, setDeck] = useState<any[]>(createDeck())
  const [player, setPlayer] = useState<any[]>([])
  const [dealer, setDealer] = useState<any[]>([])
  const [phase, setPhase] = useState<'bet'|'play'|'dealer'|'end'>('bet')
  const [message, setMessage] = useState('')

  const deal = () => {
    if (betAmount > balance) return
    adjustBalance(-betAmount)
    const d = createDeck()
    setDeck(d)
    setPlayer([d.pop()!, d.pop()!])
    setDealer([d.pop()!, d.pop()!])
    setPhase('play')
    setMessage('')
  }

  const hit = () => {
    const newPlayer = [...player, deck.pop()!]
    setPlayer(newPlayer)
    if (handTotal(newPlayer) > 21) { setPhase('end'); setMessage('Bust! Dealer wins.'); addBet({ game:'Blackjack', amount:betAmount, outcome:'loss', payout:0, multiplier:0 }) }
  }

  const stand = () => {
    let dealerHand = [...dealer]
    let d = [...deck]
    while (handTotal(dealerHand) < 17) dealerHand.push(d.pop()!)
    setDealer(dealerHand)
    const pv = handTotal(player), dv = handTotal(dealerHand)
    if (dv > 21 || pv > dv) {
      const win = betAmount * 2
      adjustBalance(win)
      setMessage('You win!')
      addBet({ game:'Blackjack', amount:betAmount, outcome:'win', payout:win, multiplier:2 })
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } })
    } else if (pv === dv) {
      adjustBalance(betAmount)
      setMessage('Push')
    } else {
      setMessage('Dealer wins.')
      addBet({ game:'Blackjack', amount:betAmount, outcome:'loss', payout:0, multiplier:0 })
    }
    setPhase('end')
  }

  const Card = ({ card, hidden }: { card?: any; hidden?: boolean }) => (
    <div className={`w-14 h-20 rounded-xl border-2 flex flex-col items-center justify-center font-bold ${hidden ? 'bg-blue-800 border-blue-400 text-white' : 'bg-white text-black border-gray-300'}`}>
      {hidden ? '?' : <><span className="text-sm">{card?.value}</span><span className="text-2xl">{card?.suit}</span></>}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#ffffff14]">
        <h2 className="text-xl font-bold text-white">🃏 Blackjack</h2>
        <button onClick={onClose} className="text-white/40 hover:text-white text-2xl">&times;</button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
        <div className="text-center">
          <p className="text-white/40 text-sm mb-2">Dealer ({phase!=='bet' ? handTotal(dealer) : '?'})</p>
          <div className="flex gap-2">{dealer.map((c,i) => <Card key={i} card={c} hidden={i===1 && phase==='play'} />)}</div>
        </div>
        <div className="text-center">
          <p className="text-white/40 text-sm mb-2">You ({handTotal(player)})</p>
          <div className="flex gap-2">{player.map((c,i) => <Card key={i} card={c} />)}</div>
        </div>
        {message && <p className="text-xl font-bold text-[#f0b429]">{message}</p>}
      </div>
      <div className="p-4 border-t border-[#ffffff14] space-y-3">
        {phase === 'bet' && (
          <>
            <div className="flex items-center gap-2">
              <input type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white" />
              {[10,50,100,500].map(a => <button key={a} onClick={() => setBetAmount(a)} className="px-3 py-1 bg-white/5 rounded-lg text-white text-xs">{a}</button>)}
            </div>
            <button onClick={deal} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-xl">Deal</button>
          </>
        )}
        {phase === 'play' && (
          <div className="flex gap-4">
            <button onClick={hit} className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl">Hit</button>
            <button onClick={stand} className="flex-1 py-3 bg-[#f0b429] text-black font-bold rounded-xl">Stand</button>
          </div>
        )}
        {phase === 'end' && (
          <button onClick={() => { setPhase('bet'); setPlayer([]); setDealer([]); setMessage('') }} className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-xl">Play Again</button>
        )}
        <p className="text-white/40 text-sm text-center">{formatMoney(balance, currency)}</p>
      </div>
    </div>
  );
}
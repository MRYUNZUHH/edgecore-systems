"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";

const methods = [
  { id:'mpesa', name:'M-Pesa', icon:'📱' },
  { id:'mtn', name:'MTN MoMo', icon:'📱' },
  { id:'airtel', name:'Airtel Money', icon:'📱' },
  { id:'visa', name:'Visa/MC', icon:'💳' },
  { id:'btc', name:'Bitcoin', icon:'₿' },
  { id:'usdt', name:'USDT', icon:'💎' },
];

export default function WalletPage() {
  const { user, getBalance, deposit, withdraw, transactions, bets } = useStore();
  const [showModal, setShowModal] = useState<'deposit'|'withdraw'|null>(null);
  const [method, setMethod] = useState('mpesa');
  const [amount, setAmount] = useState(100);
  const [phone, setPhone] = useState('');
  const [confirming, setConfirming] = useState(false);
  const balance = getBalance();

  const handleAction = () => {
    setConfirming(true);
    setTimeout(() => {
      if (showModal === 'deposit') deposit(amount, method);
      else withdraw(amount, method);
      setConfirming(false);
      setShowModal(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">💰 Wallet</h1>
      
      {/* Balance Card */}
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-6">
        <p className="text-sm text-[#5a6a85]">{user ? 'Available Balance' : 'Demo Balance'}</p>
        <p className="text-4xl font-bold text-white mt-2">${balance.toFixed(2)}</p>
        {!user && <p className="text-xs text-[#5a6a85] mt-2"><a href="/auth/login" className="text-[#f5c842]">Login</a> to manage your wallet</p>}
        {user && (
          <div className="flex gap-3 mt-4">
            <button onClick={() => setShowModal('deposit')} className="px-6 py-2 bg-[#f5c842] text-black font-bold rounded-lg">Deposit</button>
            <button onClick={() => setShowModal('withdraw')} className="px-6 py-2 border border-[#f5c842]/30 text-[#f5c842] font-bold rounded-lg">Withdraw</button>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="flex flex-wrap gap-3">
        {methods.map(m => (
          <div key={m.id} className="bg-[#0f1520] border border-[#ffffff0f] rounded-lg px-4 py-2 flex items-center gap-2 text-sm text-white/70">
            <span>{m.icon}</span> <span>{m.name}</span>
          </div>
        ))}
      </div>

      {/* Bet History */}
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-4">
        <h3 className="text-lg font-bold text-white mb-3">Bet History</h3>
        {bets.length === 0 ? <p className="text-[#5a6a85] text-sm">No bets yet.</p> : (
          bets.slice(0, 10).map(bet => (
            <div key={bet.id} className="flex justify-between py-2 text-sm border-b border-[#ffffff0f]">
              <span className="text-white/70 capitalize">{bet.game}</span>
              <span>${bet.amount}</span>
              <span className={bet.outcome==='win'?'text-[#22c55e]':'text-[#ef4444]'}>
                {bet.outcome==='win'?'+':'-'}${bet.payout.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Deposit/Withdraw Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowModal(null)}>
          <div className="w-full max-w-md bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-6" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-white capitalize mb-4">{showModal}</h2>
            <div className="space-y-3">
              <select value={method} onChange={e => setMethod(e.target.value)} className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-2">
                {methods.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              {['mpesa','mtn','airtel'].includes(method) && (
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-2" />
              )}
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                className="w-full bg-[#1a2235] border border-[#ffffff0f] rounded-lg text-white px-4 py-2" min={10} />
              <button onClick={handleAction} disabled={confirming} className="w-full py-3 bg-[#f5c842] text-black font-bold rounded-lg">
                {confirming ? 'Processing...' : `Confirm ${showModal}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
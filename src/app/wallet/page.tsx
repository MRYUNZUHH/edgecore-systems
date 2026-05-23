"use client";
import { useState } from "react";
import { useStore } from "@/store/game-store";
import { motion, AnimatePresence } from "framer-motion";

const methods = [
  { id: 'mpesa', name: 'M-Pesa', icon: '📱', fields: ['phone','amount'] },
  { id: 'mtn', name: 'MTN MoMo', icon: '📱', fields: ['phone','amount'] },
  { id: 'airtel', name: 'Airtel Money', icon: '📱', fields: ['phone','amount'] },
  { id: 'visa', name: 'Visa/MC', icon: '💳', fields: ['card','expiry','cvv','amount'] },
  { id: 'btc', name: 'Bitcoin', icon: '₿', fields: ['address','amount'] },
  { id: 'usdt', name: 'USDT', icon: '💎', fields: ['network','address','amount'] },
];

export default function WalletPage() {
  const { user, getBalanceDollars, deposit, withdraw } = useStore();
  const [showModal, setShowModal] = useState<'deposit' | 'withdraw' | null>(null);
  const [method, setMethod] = useState('mpesa');
  const [amount, setAmount] = useState(100);
  const [phone, setPhone] = useState('');
  const [confirming, setConfirming] = useState(false);

  const balance = getBalanceDollars();

  const handleAction = () => {
    setConfirming(true);
    setTimeout(() => {
      if (showModal === 'deposit') deposit(Math.round(amount * 100), method);
      else withdraw(Math.round(amount * 100), method);
      setConfirming(false);
      setShowModal(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f5c842]">💰 Wallet</h1>
      
      <div className="card p-6">
        <p className="text-sm text-[#5a6a85]">Available Balance</p>
        <p className="text-4xl font-display font-black text-white mt-2">${balance.toFixed(2)}</p>
        <div className="flex gap-3 mt-4">
          <button onClick={() => setShowModal('deposit')} className="btn-primary">Deposit</button>
          <button onClick={() => setShowModal('withdraw')} className="px-6 py-3 border border-[#f5c842]/30 text-[#f5c842] font-heading font-bold rounded-lg">Withdraw</button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex flex-wrap gap-3">
        {methods.map(m => (
          <div key={m.id} className="card px-4 py-2 flex items-center gap-2 text-sm text-white/70">
            <span>{m.icon}</span> <span>{m.name}</span>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="card p-4">
        <h3 className="font-heading text-lg font-bold text-white mb-3">Transaction History</h3>
        {useStore.getState().transactions.length === 0 ? (
          <p className="text-[#5a6a85] text-sm">No transactions yet.</p>
        ) : (
          useStore.getState().transactions.slice(0, 10).map(tx => (
            <div key={tx.id} className="flex justify-between py-2 text-sm border-b border-[#ffffff0f]">
              <span className="text-white/70">{tx.description}</span>
              <span className={tx.type === 'deposit' || tx.type === 'win' ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                {tx.type === 'deposit' || tx.type === 'win' ? '+' : '-'}${(tx.amountCents / 100).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowModal(null)}>
            <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} exit={{ scale:0.9 }}
              className="w-full max-w-md card p-6" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-heading font-bold text-white capitalize mb-4">{showModal}</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-[#5a6a85]">Method</label>
                  <select value={method} onChange={e => setMethod(e.target.value)} className="input mt-1">
                    {methods.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                {(method === 'mpesa' || method === 'mtn' || method === 'airtel') && (
                  <div>
                    <label className="text-sm text-[#5a6a85]">Phone Number</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" className="input mt-1" />
                  </div>
                )}
                <div>
                  <label className="text-sm text-[#5a6a85]">Amount (USD)</label>
                  <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                    className="input mt-1" min={10} max={showModal === 'deposit' ? 10000 : balance} />
                </div>
                <button onClick={handleAction} disabled={confirming} className="btn-primary w-full">
                  {confirming ? 'Processing...' : `Confirm ${showModal}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
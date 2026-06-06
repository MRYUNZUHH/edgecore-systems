"use client";
import { useState, useEffect } from "react";
import MobileNav from "@/components/layout/MobileNav";

const METHODS = [
  { id: "bank", label: "Bank Transfer", icon: "🏦", placeholder: "Account number" },
  { id: "paypal", label: "PayPal", icon: "🅿️", placeholder: "PayPal email" },
  { id: "skrill", label: "Skrill", icon: "💜", placeholder: "Skrill email" },
  { id: "mpesa", label: "M-Pesa", icon: "📱", placeholder: "M-Pesa number e.g. 07XXXXXXXX" },
];

const FEE_RATE = 0.10;

export default function Page() {
  const [balance, setBalance] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState("mpesa");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const fee = Math.round(amount * FEE_RATE * 100) / 100;
  const youGet = Math.round((amount - fee) * 100) / 100;

  useEffect(() => {
    fetch("/api/wallet")
      .then(r => r.json())
      .then(d => setBalance(d.cashBalance ?? 0));
  }, []);

  const handleWithdraw = async () => {
    if (!destination.trim()) {
      setMessage({ text: "Please enter your " + METHODS.find(m => m.id === method)?.label + " details.", ok: false });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "withdraw", amount, method, destination }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.error || "Withdrawal failed", ok: false });
      } else {
        setBalance(data.balance);
        setMessage({ text: `Withdrawal of $${youGet} submitted via ${METHODS.find(m=>m.id===method)?.label}. Processing in 24–72 hours.`, ok: true });
        setShow(false);
        setDestination("");
      }
    } catch {
      setMessage({ text: "Network error. Please try again.", ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-20 lg:pb-0 max-w-4xl mx-auto w-full p-4 space-y-6">
        <h1 className="text-3xl font-bold text-[#f0b429]">💰 Wallet</h1>

        {message && (
          <div className={`rounded-xl px-4 py-3 text-sm font-medium ${message.ok ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700" : "bg-red-900/40 text-red-400 border border-red-700"}`}>
            {message.text}
          </div>
        )}

        <div className="bg-[#13131f] border border-white/5 rounded-xl p-6">
          <p className="text-sm text-gray-400">Balance</p>
          <p className="text-4xl font-bold text-white mt-2">
            {balance === null ? "Loading..." : `$${balance.toFixed(2)}`}
          </p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => window.location.href = "/wallet/deposit"} className="bg-[#f0b429] text-black font-bold px-6 py-2 rounded-lg">Deposit</button>
            <button onClick={() => { setShow(true); setMessage(null); }} className="border border-[#f0b429]/30 text-[#f0b429] font-bold px-6 py-2 rounded-lg">Withdraw</button>
          </div>
        </div>

        <div className="bg-[#13131f] border border-white/5 rounded-xl p-6 space-y-2">
          <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest mb-3">Fee Info</p>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Withdrawal fee</span><span className="text-white">10% of amount</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Min withdrawal</span><span className="text-white">$10</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Processing time</span><span className="text-white">24–72 hours</span></div>
        </div>

        {show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShow(false)}>
            <div className="bg-[#13131f] border border-white/5 rounded-xl p-6 w-full max-w-md space-y-4" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white">Withdraw Funds</h2>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Select Method</p>
                <div className="grid grid-cols-2 gap-2">
                  {METHODS.map(m => (
                    <button key={m.id} onClick={() => { setMethod(m.id); setDestination(""); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${method === m.id ? "border-[#f0b429] text-[#f0b429] bg-[#f0b429]/10" : "border-white/10 text-gray-400"}`}>
                      <span>{m.icon}</span>{m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  {METHODS.find(m => m.id === method)?.label} Details
                </p>
                <input
                  type="text"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder={METHODS.find(m => m.id === method)?.placeholder}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2 text-sm"
                />
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Amount (USD)</p>
                <input
                  type="number"
                  value={amount}
                  min={10}
                  onChange={e => setAmount(Number(e.target.value))}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg text-white px-4 py-2"
                />
              </div>

              <div className="bg-[#0a0a0f] rounded-lg p-3 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Withdrawal amount</span><span className="text-white">${amount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Service fee (10%)</span><span className="text-red-400">-${fee.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 mt-2"><span className="text-white font-bold">You receive</span><span className="text-emerald-400 font-bold">${youGet.toFixed(2)}</span></div>
              </div>

              <button onClick={handleWithdraw} disabled={loading}
                className="w-full py-3 bg-[#f0b429] text-black font-bold rounded-lg disabled:opacity-50">
                {loading ? "Processing..." : "Confirm Withdrawal"}
              </button>
            </div>
          </div>
        )}
      </main>
      <MobileNav />
    </div>
  );
}

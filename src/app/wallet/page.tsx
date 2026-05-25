import Link from "next/link";
export default function WalletPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gold">💰 Wallet</h1>
        <div className="card p-6"><p className="text-sm text-muted">Available Balance</p><p className="text-4xl font-bold text-white mt-2">$10,000.00</p><p className="text-xs text-muted mt-2"><Link href="/auth/login" className="text-gold">Login</Link> to manage your wallet</p></div>
        <div className="flex flex-wrap gap-3">{['M-Pesa','MTN MoMo','Airtel Money','Visa','Bitcoin','USDT'].map(m=><div key={m} className="card px-4 py-2 text-sm text-muted">{m}</div>)}</div>
      </main>
    </div>
  );
}
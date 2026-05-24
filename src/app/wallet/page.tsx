export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-yellow-500">💰 Wallet</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <p className="text-sm text-gray-400">Available Balance</p>
        <p className="text-4xl font-bold text-white mt-2">$10,000.00</p>
        <p className="text-xs text-gray-500 mt-2"><a href="/auth/login" className="text-yellow-500">Login</a> to manage your wallet</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {['M-Pesa','MTN MoMo','Airtel Money','Visa','Bitcoin','USDT'].map(m=>(
          <div key={m} className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-400">{m}</div>
        ))}
      </div>
    </div>
  );
}
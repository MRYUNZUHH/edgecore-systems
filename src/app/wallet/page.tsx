export default function WalletPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">💰 Wallet</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-6">
        <p className="text-sm text-[#5a6a85]">Available Balance</p>
        <p className="text-4xl font-bold text-white mt-2">$10,000.00</p>
        <p className="text-xs text-[#5a6a85] mt-2"><a href="/auth/login" className="text-[#f5c842]">Login</a> to manage your wallet</p>
      </div>
    </div>
  );
}
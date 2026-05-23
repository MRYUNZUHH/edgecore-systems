export default function PaymentMethods() {
  const methods = [
    { name: "M-Pesa", icon: "📱" },
    { name: "MTN MoMo", icon: "📱" },
    { name: "Airtel Money", icon: "📱" },
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "BTC", icon: "₿" },
    { name: "USDT", icon: "💎" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-white/40">Payment Methods:</span>
      {methods.map(m => (
        <div key={m.name} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70">
          <span>{m.icon}</span>
          <span>{m.name}</span>
        </div>
      ))}
    </div>
  );
}
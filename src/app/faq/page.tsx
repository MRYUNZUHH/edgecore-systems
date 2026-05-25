import MobileNav from "@/components/layout/MobileNav";
export default function FAQPage() {
  const faqs = [
    {q:"Is EdgeCore a real gambling platform?",a:"No. EdgeCore is a demo/simulation platform. All credits are virtual. No real money is used."},
    {q:"How do I get more demo credits?",a:"Login and your account starts with $10,000 demo credits. You can reset your demo balance anytime from the header."},
    {q:"Are the games fair?",a:"All games use provably fair algorithms. Crash points, mine placements, and card shuffles are generated using cryptographic random seeds."},
    {q:"Can I play on mobile?",a:"Yes! EdgeCore is fully responsive and works on all devices — desktop, tablet, and mobile."},
    {q:"How do I switch between Demo and Real mode?",a:"Click the DEMO/REAL toggle in the header. Demo mode uses virtual credits. Real mode requires a deposit."},
    {q:"What payment methods are supported?",a:"M-Pesa, MTN MoMo, Airtel Money, Visa, Mastercard, Bitcoin, and USDT (TRC20/ERC20)."},
    {q:"Is there a VIP program?",a:"Yes! Visit the VIP page to see your tier. Earn higher tiers by wagering more. Benefits include cashback, faster withdrawals, and exclusive bonuses."},
    {q:"How do I contact support?",a:"Email us at binaryalexx@gmail.com or visit the Contact page."},
  ];
  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">❓ Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((f,i) => (
          <div key={i} className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-2">{f.q}</h3>
            <p className="text-gray-400 text-sm">{f.a}</p>
          </div>
        ))}
      </div>
      <MobileNav />
    </div>
  );
}
export default function ResponsibleGamingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f5c842]">🛡️ Responsible Gaming</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-6 space-y-4">
        <p className="text-white/80">This is a demo platform. No real money is used.</p>
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 border border-[#f5c842]/30 text-[#f5c842] rounded-lg text-sm">Set Session Limit</button>
          <button className="py-2 border border-[#f5c842]/30 text-[#f5c842] rounded-lg text-sm">Set Loss Limit</button>
          <button className="py-2 border border-[#f5c842]/30 text-[#f5c842] rounded-lg text-sm">Self-Exclusion</button>
          <button className="py-2 border border-[#f5c842]/30 text-[#f5c842] rounded-lg text-sm">Cool-Off Period</button>
        </div>
      </div>
    </div>
  );
}
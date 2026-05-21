"use client";
export default function ResponsibleGamingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold gold-text">🛡️ Responsible Gaming</h1>
      <div className="glass-panel p-6 space-y-4">
        <p className="text-white/80">This platform is a demo/simulation environment. No real money is used. Play responsibly.</p>
        <p className="text-white/60 text-sm">18+ only. If you feel you may have a gambling problem, seek help at begambleaware.org</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <button className="btn-outline">Set Session Limit</button>
          <button className="btn-outline">Set Loss Limit</button>
          <button className="btn-outline">Self-Exclusion</button>
          <button className="btn-outline">Cool-Off Period</button>
        </div>
      </div>
    </div>
  );
}
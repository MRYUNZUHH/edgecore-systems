import MobileNav from "@/components/layout/MobileNav";
export default function ResponsibleGamingPage() {
  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">🛡️ Responsible Gaming</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 space-y-6 text-gray-400 text-sm">
        <p>EdgeCore is committed to promoting responsible gaming. This is a demo platform — no real money is used. However, we encourage healthy gaming habits.</p>
        
        <div>
          <h3 className="text-white font-bold text-lg mb-2">🎮 Demo Mode</h3>
          <p>All gameplay on EdgeCore uses virtual demo credits. You cannot deposit, withdraw, or win real money. This is a simulation for entertainment purposes only.</p>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-2">⏰ Set Limits</h3>
          <p>Take regular breaks. Set a time limit for your gaming sessions. Never play for extended periods without rest.</p>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-2">🚫 Self-Exclusion</h3>
          <p>If you feel you need a break, you can log out at any time. Your data is stored locally and can be cleared by logging out.</p>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-2">🆘 Getting Help</h3>
          <p>If you or someone you know has a gambling problem, these resources can help:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>GamCare: www.gamcare.org.uk</li>
            <li>BeGambleAware: www.begambleaware.org</li>
            <li>National Gambling Helpline: 1-800-522-4700</li>
          </ul>
        </div>

        <div className="bg-[#1a2235] rounded-xl p-4 text-center">
          <p className="text-white font-bold">🔞 18+ Only</p>
          <p className="text-xs mt-1">This platform is intended for users aged 18 and above.</p>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
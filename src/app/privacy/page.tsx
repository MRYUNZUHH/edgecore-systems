import MobileNav from "@/components/layout/MobileNav";
export default function PrivacyPage() {
  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">🔒 Privacy Policy</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 space-y-4 text-gray-400 text-sm">
        <p><strong className="text-white">Last Updated:</strong> May 2026</p>
        
        <h2 className="text-white font-bold text-lg">1. Information We Collect</h2>
        <p>EdgeCore is a demo platform. We collect minimal data: username, email (if provided), and gameplay statistics (bets, wins, losses). All data is stored locally in your browser&apos;s localStorage.</p>
        
        <h2 className="text-white font-bold text-lg">2. How We Use Your Data</h2>
        <p>Gameplay data is used to track your balance, VIP progress, and provide a personalized experience. No data is shared with third parties.</p>
        
        <h2 className="text-white font-bold text-lg">3. Cookies & Local Storage</h2>
        <p>We use localStorage to persist your account information and game state. No tracking cookies are used.</p>
        
        <h2 className="text-white font-bold text-lg">4. Data Security</h2>
        <p>All data is stored client-side. We do not operate backend servers for user data storage in demo mode.</p>
        
        <h2 className="text-white font-bold text-lg">5. Your Rights</h2>
        <p>You can clear all your data at any time by logging out or clearing your browser&apos;s localStorage.</p>
        
        <h2 className="text-white font-bold text-lg">6. Contact</h2>
        <p>For privacy concerns, contact: <a href="mailto:binaryalexx@gmail.com" className="text-[#f0b429]">binaryalexx@gmail.com</a></p>
      </div>
      <MobileNav />
    </div>
  );
}
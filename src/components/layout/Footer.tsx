import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D0F1A] border-t border-white/10 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-white/50">
        <div>
          <h4 className="text-white font-bold mb-3">EDGECORE</h4>
          <p>Premium online casino experience.</p>
          <p className="mt-2 text-xs">Licensed under Curaçao eGaming # 8048/JAZ</p>
          <p className="text-xs mt-1 flex items-center gap-1">🎲 RNG Certified</p>
          <p className="text-xs mt-1">🔞 18+ Only</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Quick Links</h4>
          <div className="space-y-1">
            <Link href="/terms" className="block hover:text-[#E6B84F]">Terms & Conditions</Link>
            <Link href="/privacy" className="block hover:text-[#E6B84F]">Privacy Policy</Link>
            <Link href="/responsible-gaming" className="block hover:text-[#E6B84F]">Responsible Gaming</Link>
            <Link href="/contact" className="block hover:text-[#E6B84F]">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Games</h4>
          <div className="space-y-1">
            <Link href="/casino" className="block hover:text-[#E6B84F]">Slots</Link>
            <Link href="/casino" className="block hover:text-[#E6B84F]">Table Games</Link>
            <Link href="/live-casino" className="block hover:text-[#E6B84F]">Live Casino</Link>
            <Link href="/predictions" className="block hover:text-[#E6B84F]">Predictions</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Support</h4>
          <div className="space-y-1">
            <p>24/7 Live Chat</p>
            <p>support@edgecore.com</p>
            <div className="flex gap-2 mt-2">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">FB</span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">TW</span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">IG</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
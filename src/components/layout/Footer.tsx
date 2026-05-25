import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-[#ffffff0f] bg-[#080b12] py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-500">
        <div>
          <h4 className="text-white font-bold mb-3">EDGECORE</h4>
          <p className="text-xs">Premium online casino experience.</p>
          <p className="text-xs mt-2">Licensed under Curaçao eGaming #8048/JAZ</p>
          <p className="text-xs mt-1">RNG Certified · 18+ Only</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Games</h4>
          <Link href="/casino" className="block hover:text-[#f0b429] mb-1">Casino</Link>
          <Link href="/live-casino" className="block hover:text-[#f0b429] mb-1">Live Casino</Link>
          <Link href="/predictions" className="block hover:text-[#f0b429] mb-1">Predictions</Link>
          <Link href="/virtual" className="block hover:text-[#f0b429] mb-1">Virtual Sports</Link>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Support</h4>
          <Link href="/help" className="block hover:text-[#f0b429] mb-1">Help Center</Link>
          <Link href="/faq" className="block hover:text-[#f0b429] mb-1">FAQ</Link>
          <Link href="/responsible-gaming" className="block hover:text-[#f0b429] mb-1">Responsible Play</Link>
          <Link href="/contact" className="block hover:text-[#f0b429] mb-1">Contact Us</Link>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Legal</h4>
          <Link href="/terms" className="block hover:text-[#f0b429] mb-1">Terms & Conditions</Link>
          <Link href="/privacy" className="block hover:text-[#f0b429] mb-1">Privacy Policy</Link>
          <p className="text-xs mt-3">© 2026 EdgeCore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
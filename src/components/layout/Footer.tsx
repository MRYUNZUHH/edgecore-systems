import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t border-[#ffffff0f] bg-[#080b12] py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="text-white font-bold mb-3">EDGECORE</h4>
          <p className="text-gray-500 text-xs">Premium online casino experience.</p>
          <p className="text-gray-500 text-xs mt-2">Licensed under Curaçao eGaming #8048/JAZ</p>
          <p className="text-gray-500 text-xs mt-1">RNG Certified · 18+ Only</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Games</h4>
          <Link href="/casino" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Casino</Link>
          <Link href="/live-casino" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Live Casino</Link>
          <Link href="/predictions" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Predictions</Link>
          <Link href="/virtual" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Virtual Sports</Link>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Support</h4>
          <Link href="/help" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Help Center</Link>
          <Link href="/faq" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">FAQ</Link>
          <Link href="/contact" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Contact Us</Link>
          <Link href="/responsible-gaming" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Responsible Play</Link>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Legal</h4>
          <Link href="/terms" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Terms & Conditions</Link>
          <Link href="/privacy" className="block text-gray-500 hover:text-[#f0b429] mb-1.5 text-xs">Privacy Policy</Link>
          <p className="text-gray-500 text-xs mt-3">© 2026 EdgeCore. All rights reserved.</p>
          <a href="mailto:binaryalexx@gmail.com" className="text-[#f0b429] text-xs hover:underline mt-1 block">binaryalexx@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
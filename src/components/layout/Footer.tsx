import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#ffffff0f] bg-[#080b12] py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-[#5a6a85]">
        <div>
          <h4 className="text-white font-bold mb-2">EDGECORE</h4>
          <p className="text-xs">Premium online casino experience. Demo platform only.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Games</h4>
          <Link href="/casino" className="block hover:text-[#f5c842]">Casino</Link>
          <Link href="/live-casino" className="block hover:text-[#f5c842]">Live Casino</Link>
          <Link href="/virtual" className="block hover:text-[#f5c842]">Virtual Sports</Link>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Support</h4>
          <Link href="/help" className="block hover:text-[#f5c842]">Help Center</Link>
          <Link href="/faq" className="block hover:text-[#f5c842]">FAQ</Link>
          <Link href="/responsible-gaming" className="block hover:text-[#f5c842]">Responsible Play</Link>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Legal</h4>
          <Link href="/terms" className="block hover:text-[#f5c842]">Terms</Link>
          <p className="text-xs mt-2">18+ Only. Play Responsibly.</p>
        </div>
      </div>
    </footer>
  );
}
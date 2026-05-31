import Link from "next/link";

const col1 = [
  { href: "/casino", label: "Casino" },
  { href: "/live-casino", label: "Live Casino" },
  { href: "/predictions", label: "Predictions" },
  { href: "/virtual", label: "Virtual Sports" },
  { href: "/vip", label: "VIP Program" },
];
const col2 = [
  { href: "/help", label: "Help Center" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
  { href: "/responsible-gaming", label: "Responsible Play" },
];
const col3 = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#ffffff0a] bg-[#080b12] mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-heading text-2xl font-bold text-[#f0b429] tracking-wider mb-3">EDGECORE</p>
            <p className="text-gray-500 text-xs leading-relaxed mb-4 max-w-xs">
              Premium online casino experience. Provably fair games, instant payouts, and 24/7 support.
            </p>
            <div className="space-y-1">
              <p className="text-gray-600 text-[11px]">🛡 Licensed · Curaçao eGaming #8048/JAZ</p>
              <p className="text-gray-600 text-[11px]">✅ RNG Certified · Provably Fair</p>
              <p className="text-gray-600 text-[11px]">🔞 18+ Only · Play Responsibly</p>
            </div>
          </div>

          {/* Games */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4">Games</h4>
            <ul className="space-y-2.5">
              {col1.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-[#f0b429] text-xs transition no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4">Support</h4>
            <ul className="space-y-2.5">
              {col2.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-[#f0b429] text-xs transition no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {col3.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 hover:text-[#f0b429] text-xs transition no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href="mailto:binaryalexx@gmail.com" className="text-[#f0b429]/60 hover:text-[#f0b429] text-xs mt-4 block transition no-underline">
              binaryalexx@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#ffffff0a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">© 2026 EdgeCore. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="bg-[#1a2235] border border-[#ffffff0a] text-gray-500 text-[10px] font-bold px-2.5 py-1 rounded">18+</span>
            <span className="text-gray-600 text-xs">Gamble responsibly. If you need help, visit</span>
            <Link href="/responsible-gaming" className="text-[#f0b429] text-xs hover:underline no-underline">
              Responsible Gaming
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

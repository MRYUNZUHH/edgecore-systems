import Link from "next/link";
export default function VirtualPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6"><h1 className="text-3xl font-bold text-gold">🐎 Virtual Sports</h1><div className="card p-8 text-center mt-6"><p className="text-6xl mb-4">🏇</p><p className="text-white text-xl font-bold">Virtual Racing</p><p className="text-muted mt-2">Coming soon</p></div></main>
    </div>
  );
}
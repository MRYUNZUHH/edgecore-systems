import Link from "next/link";
export default function VIPPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gold">👑 VIP Club</h1>
        <div className="card p-6 text-center"><p className="text-6xl">🥉</p><h2 className="text-2xl font-bold text-white mt-3">Bronze Tier</h2><p className="text-muted">Login to track your progress</p></div>
      </main>
    </div>
  );
}
import Link from "next/link";
const matches = [{h:"Arsenal",a:"Chelsea",ho:2.1,do:3.4,ao:3.2},{h:"Man United",a:"Liverpool",ho:2.8,do:3.2,ao:2.5},{h:"Real Madrid",a:"Barcelona",ho:2.3,do:3.3,ao:3.0}];
export default function PredictionsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-subtle bg-[#080b12]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 no-underline"><span className="w-8 h-8 bg-[#f5c842] rounded-lg flex items-center justify-center text-black font-bold">◆</span><span className="font-bold text-gold text-lg">EDGECORE</span></Link>
          <Link href="/auth/login" className="btn-gold text-sm px-4 py-2 no-underline">Login</Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gold mb-6">📊 Predictions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matches.map(m=><div key={m.h} className="card p-4"><h3 className="text-white font-bold mb-3">{m.h} vs {m.a}</h3><div className="grid grid-cols-3 gap-2 text-center text-sm">{[{l:"1",v:m.ho},{l:"X",v:m.do},{l:"2",v:m.ao}].map(o=><div key={o.l} className="bg-[#1a2235] text-white rounded-lg py-2 font-bold">{o.l}<br/>{o.v}</div>)}</div></div>)}
        </div>
      </main>
    </div>
  );
}
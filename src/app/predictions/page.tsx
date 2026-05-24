export default function PredictionsPage() {
  const matches = [
    {home:'Arsenal',away:'Chelsea',h:2.10,d:3.40,a:3.20},
    {home:'Man United',away:'Liverpool',h:2.80,d:3.20,a:2.50},
    {home:'Real Madrid',away:'Barcelona',h:2.30,d:3.30,a:3.00},
  ];
  return (
    <div className="space-y-6"><h1 className="text-3xl font-bold text-[#f5c842]">📊 Predictions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map(m=><div key={m.home} className="bg-[#0f1520] border border-[#ffffff0f] rounded-2xl p-4"><h3 className="text-white font-bold mb-3">{m.home} vs {m.away}</h3><div className="grid grid-cols-3 gap-2 text-center text-sm">{[{l:'1',v:m.h},{l:'X',v:m.d},{l:'2',v:m.a}].map(o=><div key={o.l} className="bg-white/5 text-white rounded-lg py-2 font-bold">{o.l}<br/>{o.v}</div>)}</div></div>)}
      </div>
    </div>
  );
}
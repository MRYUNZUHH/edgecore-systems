export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;
  const fs = size === 'sm' ? 12 : size === 'lg' ? 18 : 15;
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
      <svg width={s} height={s} viewBox="0 0 34 34">
        <polygon points="17,2 29,9 29,25 17,32 5,25 5,9" fill="none" stroke="#f5c842" strokeWidth="2"/>
        <polygon points="17,7 25,12 25,22 17,27 9,22 9,12" fill="#f5c842" fillOpacity="0.08"/>
        <text x="17" y="22" textAnchor="middle" fontFamily="Georgia,serif" fontSize={fs} fontWeight="700" fill="#f5c842">E</text>
        <line x1="17" y1="2" x2="17" y2="7" stroke="#f5c842" strokeWidth="2"/>
        <line x1="17" y1="27" x2="17" y2="32" stroke="#f5c842" strokeWidth="2"/>
      </svg>
      <span style={{ fontFamily:'Georgia,serif', fontWeight:700, fontSize: size==='sm'?16:size==='lg'?26:20, color:'#e8ecf5', letterSpacing:1 }}>
        EDGE<span style={{ color:'#f5c842' }}>CORE</span>
      </span>
    </div>
  );
}
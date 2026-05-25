"use client";
export default function Logo() {
  return (
    <a href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="18,2 31,9.5 31,26.5 18,34 5,26.5 5,9.5" fill="none" stroke="#f5c842" strokeWidth="2"/>
        <polygon points="18,7 27,12.5 27,23.5 18,29 9,23.5 9,12.5" fill="#f5c842" fillOpacity="0.08"/>
        <line x1="18" y1="2"  x2="18" y2="7"  stroke="#f5c842" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="29" x2="18" y2="34" stroke="#f5c842" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="18" y="23" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="17" fontWeight="700" fill="#f5c842">E</text>
      </svg>
      <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '20px', fontWeight: '700', letterSpacing: '1.5px', color: '#e8ecf5', lineHeight: 1 }}>
        EDGE<span style={{ color: '#f5c842' }}>CORE</span>
      </span>
    </a>
  );
}
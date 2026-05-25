"use client";

interface LogoProps {
  variant?: 'full' | 'icon-only' | 'wordmark-only' | 'monochrome' | 'inverted';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  const sizes: Record<string, number> = { sm: 28, md: 36, lg: 48, xl: 64 };
  const s = sizes[size] || 36;
  const fs = { sm: 14, md: 17, lg: 22, xl: 28 }[size] || 17;
  const wordSize = { sm: 16, md: 20, lg: 26, xl: 32 }[size] || 20;
  
  const colors = {
    full: { primary: '#8B5CF6', secondary: '#06B6D4', accent: '#F59E0B', text: '#e8ecf5', textAccent: '#F59E0B' },
    'icon-only': { primary: '#8B5CF6', secondary: '#06B6D4', accent: '#F59E0B', text: '#e8ecf5', textAccent: '#F59E0B' },
    'wordmark-only': { primary: '#8B5CF6', secondary: '#06B6D4', accent: '#F59E0B', text: '#e8ecf5', textAccent: '#F59E0B' },
    monochrome: { primary: '#e8ecf5', secondary: '#e8ecf5', accent: '#e8ecf5', text: '#e8ecf5', textAccent: '#e8ecf5' },
    inverted: { primary: '#0a0e1a', secondary: '#0a0e1a', accent: '#0a0e1a', text: '#0a0e1a', textAccent: '#0a0e1a' },
  }[variant] || { primary: '#8B5CF6', secondary: '#06B6D4', accent: '#F59E0B', text: '#e8ecf5', textAccent: '#F59E0B' };

  const showIcon = variant !== 'wordmark-only';
  const showWordmark = variant !== 'icon-only';

  return (
    <a href="/" className={`flex items-center gap-3 no-underline select-none ${className}`}>
      {showIcon && (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="50%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.accent} />
            </linearGradient>
            <linearGradient id="logoInner" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.15" />
              <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.08" />
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          
          {/* Outer crystal hexagon */}
          <polygon
            points="24,3 41,13 41,35 24,45 7,35 7,13"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />
          
          {/* Inner crystal facets */}
          <polygon
            points="24,9 35,15.5 35,32.5 24,39 13,32.5 13,15.5"
            fill="url(#logoInner)"
            stroke="url(#logoGrad)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          
          {/* Circuit/tech pattern lines inside */}
          <line x1="24" y1="9" x2="24" y2="15" stroke={colors.secondary} strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="13" y1="24" x2="19" y2="24" stroke={colors.secondary} strokeWidth="1" strokeOpacity="0.4" />
          <line x1="29" y1="24" x2="35" y2="24" stroke={colors.secondary} strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="24" cy="24" r="2" fill={colors.accent} opacity="0.8" />
          
          {/* Top/bottom crystal pips */}
          <line x1="24" y1="3" x2="24" y2="9" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" filter="url(#logoGlow)" />
          <line x1="24" y1="39" x2="24" y2="45" stroke={colors.primary} strokeWidth="3" strokeLinecap="round" filter="url(#logoGlow)" />
          <line x1="7" y1="13" x2="13" y2="15.5" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <line x1="41" y1="13" x2="35" y2="15.5" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          
          {/* Bold E letterform */}
          <text
            x="24" y="28"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={fs}
            fontWeight="700"
            fill="url(#logoGrad)"
            filter="url(#logoGlow)"
          >E</text>
        </svg>
      )}
      
      {showWordmark && (
        <span
          style={{
            fontFamily: "'Inter', 'Outfit', system-ui, sans-serif",
            fontSize: `${wordSize}px`,
            fontWeight: '700',
            letterSpacing: '2px',
            color: colors.text,
            lineHeight: 1,
          }}
        >
          EDGE<span style={{ color: colors.textAccent, fontWeight: '300' }}>CORE</span>
        </span>
      )}
    </a>
  );
}
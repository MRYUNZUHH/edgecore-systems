module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0a0a15', 950: '#06060d' },
        gold: { 400: '#d4af37', 500: '#c6a448', 600: '#b8942f' },
        neon: { 400: '#00ff88', 500: '#00e67a', 600: '#00cc66' },
        rose: { 500: '#f43f5e' },
        surface: { DEFAULT: 'rgba(255,255,255,0.05)', hover: 'rgba(255,255,255,0.08)' }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-cinzel)']
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0,255,136,0.25)',
        'glow-strong': '0 0 40px rgba(0,255,136,0.5)',
        'gold': '0 0 30px rgba(212,175,55,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.5)'
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        'glow-pulse': { '0%,100%': { boxShadow: '0 0 20px rgba(0,255,136,0.2)' }, '50%': { boxShadow: '0 0 40px rgba(0,255,136,0.5)' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } }
      }
    }
  },
  plugins: []
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0a0a15', 950: '#06060d' },
        gold: { 400: '#d4af37', 500: '#c6a448' },
        neon: { 400: '#00ff88', 500: '#00e67a' },
        rose: { 500: '#f43f5e' },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-cinzel)'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 136, 0.25)',
        'gold': '0 0 30px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%':{transform:'translateY(0px)'}, '50%':{transform:'translateY(-10px)'} },
        'glow-pulse': { '0%,100%':{boxShadow:'0 0 20px rgba(0,255,136,0.2)'}, '50%':{boxShadow:'0 0 40px rgba(0,255,136,0.5)'} },
      },
    },
  },
  plugins: [],
};
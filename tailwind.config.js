/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          950: '#06060d',
          900: '#0a0a15',
          850: '#0d0d1a',
          800: '#111122',
          750: '#161630',
        },
        'gold': {
          400: '#d4af37',
          500: '#c6a448',
          600: '#b8942f',
          700: '#a07d28',
        },
        'neon': {
          400: '#00ff88',
          500: '#00e67a',
          600: '#00cc66',
        },
        'electric': {
          400: '#3b82f6',
          500: '#2563eb',
        },
        'glass': 'rgba(255, 255, 255, 0.06)',
        'glass-border': 'rgba(255, 255, 255, 0.10)',
      },
      fontFamily: {
        heading: ['var(--font-cinzel)', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 136, 0.25)',
        'glow-strong': '0 0 35px rgba(0, 255, 136, 0.40)',
        'gold': '0 0 30px rgba(212, 175, 55, 0.30)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.5)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(212, 175, 55, 0.3)' },
          '50%': { borderColor: 'rgba(212, 175, 55, 0.7)' },
        },
      },
    },
  },
  plugins: [],
};

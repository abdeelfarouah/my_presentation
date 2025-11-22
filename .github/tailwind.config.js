/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chrome: {
          light: '#F5F7FA',
          mid: '#E6EBF2',
          dark: '#C8D0DB',
        },
        metallic: {
          silver: '#C0C5CE',
          steel: '#A7B0BD',
          graphite: '#4B5563',
          ink: '#0B1220',
        },
        fluid: {
          start: '#60A5FA',
          mid: '#A78BFA',
          end: '#22D3EE',
        },
      },
      backgroundImage: {
        'radial-faint': 'radial-gradient(50%_50%_at_50%_0%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 60%)',
        'fluid-wave': 'linear-gradient(120deg, rgba(96,165,250,0.20), rgba(167,139,250,0.20), rgba(34,211,238,0.20))',
        'metal-brush': 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(0,0,0,0.04))',
      },
      boxShadow: {
        'chrome': 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 1px rgba(0,0,0,0.06)',
        'glow': '0 0 0 3px rgba(59,130,246,0.15)',
        'metal': 'inset 0 0.5px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(2,6,23,0.08)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
        float: 'float 6s ease-in-out infinite',
        aurora: 'aurora 12s ease infinite',
      },
    },
  },
  plugins: [],
};
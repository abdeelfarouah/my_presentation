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
      },
      backgroundImage: {
        'radial-faint': 'radial-gradient(50%_50%_at_50%_0%, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0) 60%)',
      },
      boxShadow: {
        'chrome': 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 1px rgba(0,0,0,0.06)',
        'glow': '0 0 0 3px rgba(59,130,246,0.15)',
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
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
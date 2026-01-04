/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design system colors - Dark mode (default)
        'bg-main': '#0B1C2D',
        'bg-secondary': '#12283F',
        'accent': '#F26B2E',
        'accent-hover': '#FF8C42',
        'text-main': '#FFFFFF',
        'text-secondary': '#C9D1D9',
        'border-color': '#2B3E50',
        // Legacy colors (kept for compatibility)
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
          start: '#F26B2E',
          mid: '#FF8C42',
          end: '#FFB366',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'Poppins', 'sans-serif'],
        body: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'design': '12px',
      },
      backgroundImage: {
        'radial-faint': 'radial-gradient(50%_50%_at_50%_0%, rgba(242,107,46,0.15) 0%, rgba(242,107,46,0) 60%)',
        'radial-faint-light': 'radial-gradient(50%_50%_at_50%_0%, rgba(242,107,46,0.08) 0%, rgba(242,107,46,0) 60%)',
        'fluid-wave': 'linear-gradient(120deg, rgba(242,107,46,0.20), rgba(255,140,66,0.20), rgba(255,179,102,0.20))',
        'fluid-wave-light': 'linear-gradient(120deg, rgba(242,107,46,0.10), rgba(255,140,66,0.10), rgba(255,179,102,0.10))',
        'metal-brush': 'linear-gradient(180deg, rgba(18,40,63,0.12), rgba(11,28,45,0.04))',
        'metal-brush-light': 'linear-gradient(180deg, rgba(255,255,255,0.8), rgba(248,250,252,0.6))',
        'accent-gradient': 'linear-gradient(135deg, #F26B2E, #FF8C42)',
      },
      boxShadow: {
        'chrome': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 1px rgba(0,0,0,0.3)',
        'glow': '0 0 0 3px rgba(242,107,46,0.15)',
        'glow-orange': '0 0 25px rgba(242,107,46,0.35)',
        'glow-orange-hover': '0 10px 30px rgba(242,107,46,0.45)',
        'metal': 'inset 0 0.5px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.3)',
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
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        aurora: 'aurora 18s ease infinite',
      },
    },
  },
  plugins: [],
};

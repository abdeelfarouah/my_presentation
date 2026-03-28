/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Source Serif Pro', 'Georgia', 'serif'],
        heading: ['Cormorant Garamond', 'Source Serif Pro', 'Georgia', 'serif'],
        body: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Cascadia Code', 'monospace'],
        code: ['Fira Code', 'JetBrains Mono', 'Cascadia Code', 'monospace'],
      },
      borderRadius: {
        'design': '12px',
      },
    },
  },
  plugins: [],
};

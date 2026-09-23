/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deep: '#05050A',
        surface: '#0B0B14',
        card: '#0D0D18',
        violetAccent: '#8B5CF6',
        cyanAccent: '#22D3EE',
        magentaAccent: '#EC4899',
        whatsapp: '#25D366'
      },
      fontFamily: {
        display: ['"Clash Display"', '-apple-system', 'sans-serif'],
        sans: ['"Inter"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
};

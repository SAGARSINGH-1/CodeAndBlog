/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      Fira: ['Fira Sans', 'sans-serif'],
      Montserrat: ['Montserrat Alternates', 'sans-serif'],
      Rosarivo: ['Rosarivo', 'cursive'],
    },
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(15, 23, 42, 0.06)',
        glow: '0 0 0 3px rgba(249, 115, 22, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
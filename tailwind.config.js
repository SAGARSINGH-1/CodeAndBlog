/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      Fira: ['Fira Sans', 'sans-serif'],
      Montserrat: ['Montserrat Alternates', 'sans-serif'],
      Rosarivo: ['Rosarivo', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
}


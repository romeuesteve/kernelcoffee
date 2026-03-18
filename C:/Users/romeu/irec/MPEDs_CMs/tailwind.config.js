/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        green: {
          500: '#10b981',
          600: '#059669',
          400: '#34d399',
          300: '#6ee7b7',
        },
      },
    },
  },
  plugins: [],
}
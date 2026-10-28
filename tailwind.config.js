/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-green': '#2E4A35',
        'farm-green-dark': '#3a5c44',
        'farm-brown': '#5D4037',
        'farm-accent': '#FACC15',
        'farm-orange': '#D97706',
        'farm-orange-dark': '#e68a00',
        'google-blue': '#4285F4',
        'google-blue-dark': '#67a0fd',
        'youtube-red': '#FF0000',
        'youtube-red-dark': '#ff4d4d',
        'ledger-blue': '#4A5568',
        'ledger-blue-dark': '#718096',
        'farm-light-green': '#D0EAD6'
      },
      fontFamily: {
        handwritten: ['Kalam', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
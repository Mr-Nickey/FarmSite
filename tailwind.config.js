/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        'farm-green': '#2E4A35',
        'farm-brown': '#5D4037',
        'farm-accent': '#FACC15',
        'farm-orange': '#D97706',
        'google-blue': '#4285F4',
        'google-blue-dark': '#3367D6',
        'farm-light-green': '#D0EAD6'
      }
    },
  },
  plugins: [],
}
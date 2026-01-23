/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html", "./*.js", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'farm-green': '#2E4A35',
        'farm-green-dark': '#3a5c44', // A bit lighter for dark bg
        'farm-brown': '#5D4037',
        'farm-accent': '#FACC15',
        'farm-orange': '#D97706',
        'farm-orange-dark': '#e68a00', // A bit brighter for dark bg
        'google-blue': '#4285F4',
        'google-blue-dark': '#67a0fd', // Lighter for dark bg
        'youtube-red': '#FF0000',
        'youtube-red-dark': '#ff4d4d', // Lighter for dark bg
        'ledger-blue': '#4A5568', // Slate gray/blue
        'ledger-blue-dark': '#718096', // Lighter slate for dark bg
        'farm-light-green': '#D0EAD6'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // <--- ADD THIS LINE
  ],
}
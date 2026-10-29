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
        // Core Signature Greens (Sammie's Favorite)
        'farm-green': '#10b981',        // Meadow Emerald / Pine
        'farm-green-dark': '#047857',   // Deep Forest Pine
        'farm-sage': '#4d7c0f',         // Warm Orchard Sage
        'farm-light-green': '#e6f4ea',   // Spring Sprout Tint
        
        // Core Signature Blues (Nicky's Favorite)
        'stream-blue': '#0ea5e9',       // Millbrook Stream Blue
        'stream-blue-light': '#38bdf8', // Bluebird Sky
        'navy-slate': '#0f172a',        // Deep Homestead Slate-Navy
        'twilight-dark': '#0b131e',     // Autumn Twilight Base
        'card-dark': '#132232',          // Deep Blue-Pine Charcoal Card Surface

        // Seasonal Farm Accents
        'harvest-gold': '#f59e0b',      // Sunflower / Harvest Gold
        'harvest-gold-light': '#fbbf24',// Warm Sunburst
        'autumn-cider': '#ea580c',      // Cider Terracotta
        'autumn-orange': '#f97316',     // Barn Pumpkin Orange
        
        // Legacy compatibility
        'google-blue': '#4285F4',
        'youtube-red': '#FF0000',
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
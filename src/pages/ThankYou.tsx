import React, { useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import confetti from 'canvas-confetti';
import { Home, Users } from 'lucide-react';

export const ThankYou: React.FC = () => {
  const { setCurrentPage } = useFarm();

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E4A35', '#FACC15', '#D97706', '#4285F4'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-16 flex-grow max-w-2xl text-center space-y-6">
      <div className="bg-[#FEF9E7] dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-[#2E4A35] dark:border-green-600 space-y-6">
        <div className="text-6xl animate-bounce">🐓</div>
        <h1 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400">
          Thank You for Supporting the Flock!
        </h1>
        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed">
          Your kindness directly provides layer feed, fresh bedding, and cozy coops for our pasture-raised hens, quail, geese, and bunnies here in Grafton, NH.
        </p>

        <div className="p-4 bg-yellow-100/70 dark:bg-yellow-950/40 rounded-2xl border border-yellow-300 dark:border-yellow-900 text-sm text-stone-800 dark:text-stone-200">
          <p className="font-semibold">
            "Because of friends like you, our animals live long, peaceful lives."
          </p>
          <span className="text-xs text-stone-500 block mt-1">— Sammie & Nicky Reed</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-farm-green hover:bg-farm-green-dark text-white font-bold py-3 px-6 rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" /> Return to Farm Stand
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className="bg-yellow-500 hover:bg-yellow-400 text-stone-900 font-bold py-3 px-6 rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4" /> About Our Homestead
          </button>
        </div>
      </div>
    </main>
  );
};

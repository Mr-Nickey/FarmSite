import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { setCurrentPage } = useFarm();

  return (
    <main className="container mx-auto px-4 py-16 flex-grow max-w-lg text-center space-y-6">
      <div className="bg-[#FEF9E7] dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-[#8D6E63] dark:border-gray-700 space-y-4">
        <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow">
          <img
            src="/images/404.webp"
            alt="Lost Hen - Page Not Found at Flocking Reeds Farm in Grafton, NH"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="font-handwritten text-4xl font-bold text-[#2E4A35] dark:text-green-400">
          Looks Like You've Wandered Off The Pasture!
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-300">
          The hen you are looking for has flown the coop or the page has moved.
        </p>
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-farm-green hover:bg-farm-green-dark text-white font-bold py-3 px-6 rounded-xl transition shadow flex items-center justify-center gap-2 mx-auto"
        >
          <Home className="w-4 h-4" /> Back to Safety
        </button>
      </div>
    </main>
  );
};

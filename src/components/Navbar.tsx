import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sun, Moon, Type } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isDarkMode, toggleTheme, isDyslexiaMode, toggleDyslexiaMode } = useFarm();

  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'support', label: 'Support Farm' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-2.5 sm:px-4 pt-2 sm:pt-3 pb-1.5 sm:pb-2 transition-all duration-300">
      <nav className="max-w-5xl mx-auto backdrop-blur-md bg-[#D0EAD6]/95 dark:bg-[#1E2D22]/95 text-stone-800 dark:text-stone-200 shadow-lg rounded-2xl sm:rounded-full border-2 border-white/60 dark:border-green-800/60">
        <div className="px-3 sm:px-6 py-1.5 sm:py-2.5 flex flex-col md:flex-row justify-between items-center gap-1.5 sm:gap-3">
          {/* Logo & Brand */}
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <img
              src="/images/logo.webp"
              alt="Flocking Reeds Farm Logo"
              className="h-8 sm:h-10 w-auto transform group-hover:scale-105 transition duration-300 drop-shadow"
            />
            <div className="flex items-center">
              <span className="font-handwritten text-xl sm:text-3xl text-[#2E4A35] dark:text-yellow-100 group-hover:text-farm-orange transition font-bold block leading-none">
                Flocking Reeds Farm
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 text-[11px] sm:text-sm font-semibold">
            {primaryNavItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2E4A35] text-white shadow-sm dark:bg-yellow-400 dark:text-stone-900 font-bold'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Quick Utility Toggles in Header */}
            <div className="flex items-center gap-1 pl-1.5 sm:pl-2 border-l border-stone-300 dark:border-stone-700 ml-0.5 sm:ml-1">
              <button
                onClick={toggleDyslexiaMode}
                title="Toggle Dyslexia-Friendly Font"
                className={`p-1.5 sm:p-2 rounded-full transition cursor-pointer ${
                  isDyslexiaMode
                    ? 'bg-yellow-400 text-stone-900 shadow font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                aria-label="Toggle Dyslexia Font"
              >
                <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={toggleTheme}
                title="Toggle Dark / Light Theme"
                className="p-1.5 sm:p-2 rounded-full text-stone-600 dark:text-yellow-300 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

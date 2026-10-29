import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sun, Moon, Type } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, isDarkMode, toggleTheme, isDyslexiaMode, toggleDyslexiaMode } = useFarm();

  const primaryNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-2.5 sm:px-4 pt-2 sm:pt-3 pb-1.5 sm:pb-2 transition-all duration-300">
      <nav className="max-w-5xl mx-auto backdrop-blur-md bg-white/90 dark:bg-[#132232]/95 text-stone-800 dark:text-stone-100 shadow-lg shadow-emerald-500/5 rounded-2xl sm:rounded-full border-2 border-emerald-500/40 dark:border-emerald-500/60">
        <div className="px-3 sm:px-6 py-1.5 sm:py-2 flex flex-col md:flex-row justify-between items-center gap-1.5 sm:gap-3">
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
              <span className="font-handwritten text-xl sm:text-3xl text-emerald-800 dark:text-emerald-300 group-hover:text-amber-500 transition font-bold block leading-none">
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
                      ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-400 dark:text-stone-900 font-extrabold'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-emerald-500/10 dark:hover:bg-sky-500/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Quick Utility Toggles in Header */}
            <div className="flex items-center gap-1 pl-1.5 sm:pl-2 border-l border-emerald-300/60 dark:border-sky-700/60 ml-0.5 sm:ml-1">
              <button
                onClick={toggleDyslexiaMode}
                title="Toggle Dyslexia-Friendly Font"
                className={`p-1.5 sm:p-2 rounded-full transition cursor-pointer ${
                  isDyslexiaMode
                    ? 'bg-amber-400 text-stone-900 shadow font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-emerald-500/10 dark:hover:bg-sky-500/10'
                }`}
                aria-label="Toggle Dyslexia Font"
              >
                <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={toggleTheme}
                title="Toggle Dark / Light Theme"
                className="p-1.5 sm:p-2 rounded-full text-stone-600 dark:text-amber-300 hover:bg-emerald-500/10 dark:hover:bg-sky-500/10 transition cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

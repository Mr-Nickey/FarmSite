import React from 'react';
import { useFarm } from '../context/FarmContext';
import { MapPin } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';

export const Footer: React.FC = () => {
  const { currentPage, setCurrentPage, toggleTheme, isDarkMode, toggleDyslexiaMode, isDyslexiaMode } = useFarm();

  return (
    <footer className="bg-stone-100 dark:bg-[#080e17] text-stone-800 dark:text-stone-200 border-t-2 border-emerald-500/50 dark:border-emerald-500/60 mt-auto font-body relative transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Brand & Location */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <img
              src="/images/banner.webp"
              alt="Flocking Reeds Farm - 24/7 Self-Serve Farmstand in Grafton, NH"
              loading="lazy"
              decoding="async"
              className="w-44 h-auto opacity-95 hover:opacity-100 transition duration-300 drop-shadow"
            />
            <p className="text-sm text-stone-600 dark:text-stone-400 italic font-handwritten text-xl">
              Est. 2025 • Grafton, NH
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm leading-relaxed">
              Fueled by Caffeine & Chaos. Raising happy pasture-raised birds, farm fresh chicken & quail eggs, and enjoying simple living in Grafton, NH.
            </p>
          </div>

          {/* Column 2: Quick Links & Stand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider border-b-2 border-emerald-500 dark:border-emerald-600 inline-block pb-1 font-handwritten">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentPage === 'home'
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium'
                  }`}
                >
                  {currentPage === 'home' && <span className="text-emerald-500">•</span>}
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentPage === 'about'
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium'
                  }`}
                >
                  {currentPage === 'about' && <span className="text-emerald-500">•</span>}
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('donate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentPage === 'donate'
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium'
                  }`}
                >
                  {currentPage === 'donate' && <span className="text-emerald-500">•</span>}
                  <span>Donate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentPage === 'contact'
                      ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-medium'
                  }`}
                >
                  {currentPage === 'contact' && <span className="text-emerald-500">•</span>}
                  <span>Contact Us</span>
                </button>
              </li>
              <li className="pt-2 flex items-center justify-center md:justify-start gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>441 Millbrook Rd, Grafton, NH 03240</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials & Legal */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="text-lg font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider border-b-2 border-sky-500 dark:border-sky-600 inline-block pb-1 font-handwritten">
              Follow Our Journey
            </h4>
            
            <div className="grid grid-cols-2 gap-2 pt-1 w-full max-w-xs">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube: @sammiessimpleliving"
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#132232] border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 text-stone-800 dark:text-stone-200 hover:text-sky-600 transition-all duration-200 shadow-xs group cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 shadow-xs">
                  <YoutubeIcon className="w-4 h-4" />
                </span>
                <span className="font-bold text-xs">YouTube</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sammies.simple.living/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: @sammies.simple.living"
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#132232] border-2 border-emerald-500/50 dark:border-emerald-500/60 hover:border-emerald-400 text-stone-800 dark:text-stone-200 hover:text-emerald-600 transition-all duration-200 shadow-xs group cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-xs shadow-xs">
                  📸
                </span>
                <span className="font-bold text-xs">Instagram</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok: @sammiessimpleliving"
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#132232] border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 text-stone-800 dark:text-stone-200 hover:text-sky-600 transition-all duration-200 shadow-xs group cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-xs shadow-xs">
                  🎵
                </span>
                <span className="font-bold text-xs">TikTok</span>
              </a>

              {/* Reddit */}
              <a
                href="https://www.reddit.com/user/Sammiesimpleliving/"
                target="_blank"
                rel="noopener noreferrer"
                title="Reddit: u/Sammiesimpleliving"
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#132232] border-2 border-amber-500/50 dark:border-amber-500/60 hover:border-amber-400 text-stone-800 dark:text-stone-200 hover:text-amber-600 transition-all duration-200 shadow-xs group cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs shadow-xs">
                  💬
                </span>
                <span className="font-bold text-xs">Reddit</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs pt-2">
              <button
                onClick={() => {
                  setCurrentPage('privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-stone-400">•</span>
              <button
                onClick={() => {
                  setCurrentPage('tos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 underline cursor-pointer"
              >
                Terms of Service
              </button>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-400 pt-1">
              Built & maintained with care by <strong className="text-emerald-700 dark:text-emerald-300">Nicky</strong> for our family homestead.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-stone-200 dark:bg-[#05080f] py-3.5 border-t border-stone-300 dark:border-sky-900/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-600 dark:text-stone-400 text-center md:text-left">
            © 2026 Flocking Reeds Farm. All Rights Reserved. 441 Millbrook Rd, Grafton, NH.
          </p>

          {/* Accessibility & Theme Toggles */}
          <div className="flex gap-4 text-xs items-center text-stone-600 dark:text-stone-400">
            <button
              type="button"
              onClick={toggleDyslexiaMode}
              aria-pressed={isDyslexiaMode}
              aria-label="Toggle Dyslexia-Friendly Font"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer font-medium"
            >
              Dyslexia Font: {isDyslexiaMode ? 'On' : 'Off'}
            </button>
            <span className="text-stone-400">|</span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={isDarkMode}
              aria-label="Toggle Dark or Light Theme"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer font-medium"
            >
              Theme: {isDarkMode ? 'Dark 🌙' : 'Light ☀️'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

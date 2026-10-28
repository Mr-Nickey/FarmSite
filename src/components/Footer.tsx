import React from 'react';
import { useFarm } from '../context/FarmContext';
import { MapPin } from 'lucide-react';
import { YoutubeIcon } from './YoutubeIcon';

export const Footer: React.FC = () => {
  const { setCurrentPage, toggleTheme, isDarkMode, toggleDyslexiaMode, isDyslexiaMode } = useFarm();

  return (
    <footer className="bg-stone-200 dark:bg-[#1a120b] text-stone-800 dark:text-[#D7CCC8] border-t-4 border-stone-300 dark:border-[#271c19] mt-auto font-body relative transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Brand & Location */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <img
              src="/images/banner.webp"
              alt="Flocking Reeds Farm"
              loading="lazy"
              decoding="async"
              className="w-44 h-auto opacity-95 hover:opacity-100 transition duration-300 drop-shadow"
            />
            <p className="text-sm text-stone-600 dark:text-[#A1887F] italic font-handwritten text-xl">
              Est. 2025 • Grafton, NH
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm leading-relaxed">
              Fueled by Caffeine & Chaos. Raising happy pasture-raised birds, farm fresh chicken & quail eggs, and enjoying simple living in Grafton, NH.
            </p>
          </div>

          {/* Column 2: Quick Links & Stand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="text-lg font-bold text-yellow-600 dark:text-[#FACC15] uppercase tracking-wider border-b-2 border-stone-400 dark:border-[#8D6E63] inline-block pb-1 font-handwritten">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('support');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 cursor-pointer font-bold text-farm-green dark:text-yellow-400"
                >
                  Support Farm
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-yellow-600 dark:hover:text-[#FACC15] transition-colors duration-200 cursor-pointer"
                >
                  Contact Us
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
            <h4 className="text-lg font-bold text-yellow-600 dark:text-[#FACC15] uppercase tracking-wider border-b-2 border-stone-400 dark:border-[#8D6E63] inline-block pb-1 font-handwritten">
              Follow Our Journey
            </h4>
            
            <div className="grid grid-cols-2 gap-2 pt-1 w-full max-w-xs">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube: @sammiessimpleliving"
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-stone-900/90 border-2 border-red-300 dark:border-red-900/80 hover:border-amber-500 dark:hover:border-white hover:bg-red-600 dark:hover:bg-red-600 text-stone-800 dark:text-stone-200 hover:text-white dark:hover:text-white transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-red-500/20 group transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 group-hover:bg-white/20 group-hover:text-white transition-colors duration-200 shadow-xs">
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
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-stone-900/90 border-2 border-pink-300 dark:border-pink-900/80 hover:border-amber-500 dark:hover:border-white hover:bg-pink-600 dark:hover:bg-pink-600 text-stone-800 dark:text-stone-200 hover:text-white dark:hover:text-white transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-pink-500/20 group transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 group-hover:bg-white/20 group-hover:text-white transition-colors duration-200 text-xs shadow-xs">
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
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-stone-900/90 border-2 border-cyan-300 dark:border-cyan-900/80 hover:border-amber-500 dark:hover:border-white hover:bg-black dark:hover:bg-white text-stone-800 dark:text-stone-200 hover:text-cyan-400 dark:hover:text-black transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-cyan-500/20 group transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 group-hover:bg-white/20 group-hover:text-cyan-400 dark:group-hover:text-black transition-colors duration-200 text-xs shadow-xs">
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
                className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-stone-900/90 border-2 border-orange-300 dark:border-orange-900/80 hover:border-amber-500 dark:hover:border-white hover:bg-[#FF4500] dark:hover:bg-[#FF4500] text-stone-800 dark:text-stone-200 hover:text-white dark:hover:text-white transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-orange-500/20 group transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 group-hover:bg-white/20 group-hover:text-white transition-colors duration-200 text-xs shadow-xs">
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
                className="hover:text-yellow-600 dark:hover:text-[#FACC15] underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-stone-400">•</span>
              <button
                onClick={() => {
                  setCurrentPage('tos');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-yellow-600 dark:hover:text-[#FACC15] underline cursor-pointer"
              >
                Terms of Service
              </button>
            </div>

            <div className="text-xs text-stone-600 dark:text-[#A1887F] pt-1">
              Built & maintained with care by <strong className="text-yellow-700 dark:text-[#FACC15]">Nicky</strong> for our family homestead.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-stone-300 dark:bg-[#0f0806] py-3.5 border-t border-stone-400 dark:border-[#271c19]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-600 dark:text-[#8D6E63] text-center md:text-left">
            © 2026 Flocking Reeds Farm. All Rights Reserved. 441 Millbrook Rd, Grafton, NH.
          </p>

          {/* Accessibility & Theme Toggles */}
          <div className="flex gap-4 text-xs items-center text-stone-600 dark:text-[#8D6E63]">
            <button
              onClick={toggleDyslexiaMode}
              className="hover:text-yellow-600 dark:hover:text-[#FACC15] transition cursor-pointer font-medium"
            >
              Dyslexia Font: {isDyslexiaMode ? 'On' : 'Off'}
            </button>
            <span className="text-stone-400 dark:text-[#3E2723]">|</span>
            <button
              onClick={toggleTheme}
              className="hover:text-yellow-600 dark:hover:text-[#FACC15] transition cursor-pointer font-medium"
            >
              Theme: {isDarkMode ? 'Dark 🌙' : 'Light ☀️'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StandOffering, SquareData } from '../types';

interface FarmContextType {
  // Theme & Accessibility
  isDarkMode: boolean;
  toggleTheme: () => void;
  isDyslexiaMode: boolean;
  toggleDyslexiaMode: () => void;

  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Stand Offerings
  standOfferings: StandOffering[];

  // Live Square Data (Inventory & Donations)
  squareData: SquareData | null;
  refreshSquareData: () => Promise<void>;

  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultOfferings: StandOffering[] = [
  {
    id: 'offering-chicken-eggs',
    name: 'Farm Fresh Chicken Eggs',
    price: '$5.00 / dozen • $3.00 / half-dozen',
    description: 'Free-range, pasture-raised eggs with rich golden yolks from our happy flock of laying hens.',
    tag: 'Pasture-Raised',
    icon: '🥚',
  },
  {
    id: 'offering-quail-eggs',
    name: 'Farm Fresh Quail Eggs',
    price: '$3.00 / dozen',
    description: 'Delicate, speckled nutrient powerhouses! Rich, creamy yolks raised with clean sand baths and natural forage.',
    tag: 'Flock Favorite',
    icon: '🪺',
  },
  {
    id: 'offering-crafts',
    name: 'Homestead Crafts & Knick-Knacks',
    price: 'Individually Priced at Stand',
    description: 'Hand-painted egg cartons, handmade rustic decor, feather crafts, and cute keepsakes made right here on the farm.',
    tag: 'Handmade by Sammie',
    icon: '🎨',
  },
  {
    id: 'offering-baked-goods',
    name: 'Surprise Fresh Baked Goods',
    price: 'Hit-or-Miss Fresh Treats!',
    description: 'On baking days, you might find homemade breads or seasonal sweet treats. We never leave items out past 3 days, so catch them fresh!',
    tag: 'Catch Them When Fresh',
    icon: '🥖',
  },
];

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Dyslexia mode state
  const [isDyslexiaMode, setIsDyslexiaMode] = useState<boolean>(() => {
    return localStorage.getItem('dyslexiaMode') === 'true';
  });

  // Active page initialized from URL path or hash for direct links & Cloudflare Pages routing
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    const validPages = ['home', 'about', 'support', 'contact', 'donate', 'privacy', 'tos', 'thank-you'];
    if (validPages.includes(path)) return path;
    if (validPages.includes(hash)) return hash;
    return 'home';
  });

  // Sync URL hash/path changes for deep links (#about, #support, #contact, etc.)
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
      const validPages = ['home', 'about', 'support', 'contact', 'donate', 'privacy', 'tos', 'thank-you'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (hash === 'farm-stand' || hash === 'faq') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Stand offerings (static, simplified)
  const [standOfferings] = useState<StandOffering[]>(defaultOfferings);

  // Live Square Inventory & Donation data
  const [squareData, setSquareData] = useState<SquareData | null>(null);

  const fetchSquareData = async () => {
    try {
      const res = await fetch('/square-data.json');
      if (res.ok) {
        const data = await res.json();
        setSquareData(data);
      }
    } catch {
      // Static fallback data will be used automatically
    }
  };

  useEffect(() => {
    fetchSquareData();
  }, []);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Apply dark mode & dyslexia mode classes to html/body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isDyslexiaMode) {
      document.body.classList.add('dyslexia-mode');
      localStorage.setItem('dyslexiaMode', 'true');
    } else {
      document.body.classList.remove('dyslexia-mode');
      localStorage.setItem('dyslexiaMode', 'false');
    }
  }, [isDyslexiaMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleDyslexiaMode = () => setIsDyslexiaMode((prev) => !prev);

  return (
    <FarmContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        isDyslexiaMode,
        toggleDyslexiaMode,
        currentPage,
        setCurrentPage,
        standOfferings,
        squareData,
        refreshSquareData: fetchSquareData,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};

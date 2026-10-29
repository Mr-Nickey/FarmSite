import React, { useEffect } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Support } from './pages/Support';
import { DonateRedirect } from './pages/DonateRedirect';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ThankYou } from './pages/ThankYou';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const SQUARE_CHECKOUT_URL = 'https://square.link/u/uIosE4M7';
const SQUARE_SHOP_URL = 'https://flockingreedsfarm.square.site';

const AppContent: React.FC = () => {
  const { currentPage } = useFarm();

  // Client-side shortlink redirect for /shop, #shop
  useEffect(() => {
    const checkRedirects = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const hash = window.location.hash.toLowerCase();

      if (path === '/shop' || hash === '#shop') {
        window.location.replace(SQUARE_SHOP_URL);
      }
    };

    checkRedirects();
    window.addEventListener('hashchange', checkRedirects);
    window.addEventListener('popstate', checkRedirects);
    return () => {
      window.removeEventListener('hashchange', checkRedirects);
      window.removeEventListener('popstate', checkRedirects);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'support':
      case 'donate':
      case 'visit':
        return <Support />;
      case 'contact':
        return <Contact />;
      case 'donate':
        return <DonateRedirect />;
      case 'privacy':
        return <Privacy />;
      case 'tos':
        return <Terms />;
      case 'thank-you':
        return <ThankYou />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FarmProvider>
      <AppContent />
    </FarmProvider>
  );
};

export default App;

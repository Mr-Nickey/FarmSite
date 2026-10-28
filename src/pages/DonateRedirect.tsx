import React, { useEffect } from 'react';
import { CreditCard, ExternalLink } from 'lucide-react';

const SQUARE_CHECKOUT_URL = 'https://square.link/u/uIosE4M7';

export const DonateRedirect: React.FC = () => {
  useEffect(() => {
    // Perform immediate client-side redirection
    window.location.replace(SQUARE_CHECKOUT_URL);
  }, []);

  return (
    <main className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh] text-center">
      <div className="bg-[#FEF9E7] dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-[#2E4A35] max-w-md w-full space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#FACC15] text-stone-900 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CreditCard className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#2E4A35] dark:text-green-400">
            Redirecting to Square...
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Taking you to our secure checkout for Flocking Reeds Farm donations.
          </p>
        </div>

        <div className="pt-2">
          <a
            href={SQUARE_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-[#FACC15] hover:bg-yellow-400 text-stone-900 font-bold py-3.5 px-6 rounded-xl shadow transition text-base"
          >
            <span>Click here if not redirected automatically</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
};

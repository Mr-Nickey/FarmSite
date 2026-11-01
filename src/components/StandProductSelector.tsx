import React, { useState } from 'react';
import { AlertTriangle, CreditCard } from 'lucide-react';

interface StandItemOption {
  label: string;
  count: string;
  price: number;
  squareUrl: string;
}

export const StandProductSelector: React.FC = () => {
  const [selectedChickenOption, setSelectedChickenOption] = useState<'dozen' | 'half'>('dozen');
  const [activePaymentModal, setActivePaymentModal] = useState<{
    itemName: string;
    optionLabel: string;
    price: number;
    squareUrl: string;
  } | null>(null);

  const chickenOptions: Record<'dozen' | 'half', StandItemOption> = {
    dozen: {
      label: 'Full Dozen (12 Eggs)',
      count: '12 Large Brown & Pastel Eggs',
      price: 5.00,
      squareUrl: 'https://square.link/u/DQtlSmfE',
    },
    half: {
      label: 'Half Dozen (6 Eggs)',
      count: '6 Fresh Eggs',
      price: 3.00,
      squareUrl: 'https://square.link/u/xhJBvE8s',
    },
  };

  const quailOption: StandItemOption = {
    label: 'Dozen Quail Eggs (12 Eggs)',
    count: '12 Spotted Coturnix Eggs',
    price: 3.00,
    squareUrl: 'https://square.link/u/R6yBh3dh',
  };

  return (
    <div className="space-y-3">
      {/* Required Stock Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-700/80 rounded-2xl p-3 sm:p-4 text-xs text-stone-800 dark:text-stone-200 shadow-xs flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
            Please Grab Your Items Before Paying!
          </p>
          <p className="text-stone-700 dark:text-stone-300 leading-snug text-[11px] sm:text-xs">
            Please open the glass front doors and grab your carton off the back shelf in person <strong>before sending payment</strong> to make sure it is in stock. Because our honor stand is open 24/7, we are not responsible if online payment is sent when an item is sold out.
          </p>
        </div>
      </div>

      {/* Direct Stand Selection Cards */}
      <div className="space-y-2.5 pt-0.5">
        <div className="flex items-center justify-between">
          <h3 className="font-handwritten text-xl sm:text-2xl font-bold text-stone-900 dark:text-yellow-100">
            Select Your Stand Items:
          </h3>
          <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 dark:text-stone-400">
            Tap for Square Checkout
          </span>
        </div>

        {/* 1. Chicken Eggs Card */}
        <div className="bg-white/95 dark:bg-gray-900/90 rounded-2xl p-3.5 sm:p-4 border-2 border-green-600/60 dark:border-green-600 shadow-sm space-y-2.5 text-left">
          <div className="flex items-center justify-between gap-2 border-b border-stone-100 dark:border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl select-none">🥚</span>
              <div>
                <div className="flex items-center flex-wrap gap-1.5">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                    Farm Fresh Chicken Eggs
                  </h4>
                  <span className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Pasture-Raised
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
                  Natural bloom intact • Unwashed • From 60+ free-ranging hens
                </p>
              </div>
            </div>
          </div>

          {/* Size / Quantity Selection */}
          <div className="grid grid-cols-2 gap-2">
            {/* Dozen option */}
            <button
              type="button"
              onClick={() => setSelectedChickenOption('dozen')}
              className={`p-2.5 sm:p-3 rounded-xl border-2 transition text-left cursor-pointer flex items-center justify-between gap-1 ${
                selectedChickenOption === 'dozen'
                  ? 'border-green-600 bg-green-50/80 dark:bg-green-950/60 shadow-xs'
                  : 'border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600'
              }`}
            >
              <div>
                <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 block">
                  Full Dozen (12)
                </span>
                <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 block">
                  Brown & Pastel
                </span>
              </div>
              <span className="font-mono font-extrabold text-sm sm:text-base text-green-800 dark:text-green-300 flex-shrink-0">
                $5.00
              </span>
            </button>

            {/* Half Dozen option */}
            <button
              type="button"
              onClick={() => setSelectedChickenOption('half')}
              className={`p-2.5 sm:p-3 rounded-xl border-2 transition text-left cursor-pointer flex items-center justify-between gap-1 ${
                selectedChickenOption === 'half'
                  ? 'border-green-600 bg-green-50/80 dark:bg-green-950/60 shadow-xs'
                  : 'border-stone-200 dark:border-gray-700 hover:border-stone-300 dark:hover:border-gray-600'
              }`}
            >
              <div>
                <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 block">
                  Half Dozen (6)
                </span>
                <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 block">
                  6 Fresh Eggs
                </span>
              </div>
              <span className="font-mono font-extrabold text-sm sm:text-base text-green-800 dark:text-green-300 flex-shrink-0">
                $3.00
              </span>
            </button>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
            <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">
              Selected: <strong>{chickenOptions[selectedChickenOption].label}</strong> (${chickenOptions[selectedChickenOption].price.toFixed(2)})
            </span>

            <div className="flex items-center gap-2">
              <a
                href={chickenOptions[selectedChickenOption].squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#FACC15] hover:bg-yellow-400 text-stone-900 font-extrabold py-2 px-4 rounded-xl shadow-xs transition active:scale-95 text-xs cursor-pointer whitespace-nowrap"
              >
                <CreditCard className="w-3.5 h-3.5 text-stone-900" />
                <span>Pay ${chickenOptions[selectedChickenOption].price.toFixed(2)} on Square →</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  setActivePaymentModal({
                    itemName: 'Farm Fresh Chicken Eggs',
                    optionLabel: chickenOptions[selectedChickenOption].label,
                    price: chickenOptions[selectedChickenOption].price,
                    squareUrl: chickenOptions[selectedChickenOption].squareUrl,
                  })
                }
                className="px-2.5 py-2 rounded-xl bg-stone-100 dark:bg-gray-800 hover:bg-stone-200 dark:hover:bg-gray-700 text-stone-700 dark:text-stone-300 font-bold text-xs transition cursor-pointer whitespace-nowrap"
                title="View All Payment Methods"
              >
                Other Ways
              </button>
            </div>
          </div>
        </div>

        {/* 2. Quail Eggs Card */}
        <div className="bg-white/95 dark:bg-gray-900/90 rounded-2xl p-3.5 sm:p-4 border-2 border-amber-500/60 dark:border-amber-600 shadow-sm space-y-2 text-left">
          <div className="flex items-center justify-between gap-2 border-b border-stone-100 dark:border-gray-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl select-none">🪺</span>
              <div>
                <div className="flex items-center flex-wrap gap-1.5">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                    Farm Fresh Quail Eggs
                  </h4>
                  <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-yellow-300 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Coturnix Speckled
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
                  Delicate gourmet eggs • Creamy rich yolks • 12 eggs/carton
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-1 flex-shrink-0">
              <span className="font-mono font-extrabold text-base sm:text-lg text-amber-800 dark:text-yellow-400">
                $3.00
              </span>
              <span className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400">/ doz</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-0.5">
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Raised on clean shavings & sand baths
            </span>

            <div className="flex items-center gap-2">
              <a
                href={quailOption.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#FACC15] hover:bg-yellow-400 text-stone-900 font-extrabold py-2 px-4 rounded-xl shadow-xs transition active:scale-95 text-xs cursor-pointer whitespace-nowrap"
              >
                <CreditCard className="w-3.5 h-3.5 text-stone-900" />
                <span>Pay $3.00 on Square →</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  setActivePaymentModal({
                    itemName: 'Farm Fresh Quail Eggs',
                    optionLabel: quailOption.label,
                    price: quailOption.price,
                    squareUrl: quailOption.squareUrl,
                  })
                }
                className="px-2.5 py-2 rounded-xl bg-stone-100 dark:bg-gray-800 hover:bg-stone-200 dark:hover:bg-gray-700 text-stone-700 dark:text-stone-300 font-bold text-xs transition cursor-pointer whitespace-nowrap"
                title="View All Payment Methods"
              >
                Other Ways
              </button>
            </div>
          </div>
        </div>

        {/* 3. Crafts & Surprise Baked Goods */}
        <div className="bg-stone-50/90 dark:bg-gray-900/50 rounded-2xl p-3.5 sm:p-4 border border-stone-200 dark:border-gray-800 flex items-start gap-3 text-left">
          <span className="text-2xl mt-0.5 select-none">🎨</span>
          <div className="space-y-0.5 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                Crafts, Knick-Knacks & Fresh Baked Treats
              </h4>
              <span className="bg-stone-200 dark:bg-gray-800 text-stone-700 dark:text-stone-300 text-[10px] font-bold px-2 py-0.5 rounded">
                Priced as Marked
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Handcrafted decor and seasonal goods are individually priced on the stand shelves. On special days, you may find Sammie's freshly baked goods! We never keep baked items out longer than 3 days to guarantee freshness.
            </p>
          </div>
        </div>

        {/* Unified Payment Methods Strip */}
        <div className="p-3 rounded-2xl bg-stone-100/90 dark:bg-gray-800/80 border border-stone-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-left">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-farm-green dark:text-yellow-400 flex-shrink-0" />
            <span className="text-stone-700 dark:text-stone-300">
              Accepted at Stand: <strong>Square (Card/Apple Pay), Venmo, Cash App, PayPal, & Cash</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setActivePaymentModal({
                itemName: 'Stand Eggs & Items',
                optionLabel: 'Honor Stand Purchase',
                price: selectedChickenOption === 'dozen' ? 5.00 : 3.00,
                squareUrl: chickenOptions[selectedChickenOption].squareUrl,
              })
            }
            className="px-3.5 py-1.5 rounded-xl bg-[#2E4A35] hover:bg-[#3d6347] text-white font-bold text-xs transition cursor-pointer whitespace-nowrap self-stretch sm:self-auto text-center"
          >
            All Payment Options →
          </button>
        </div>
      </div>

      {/* Payment Options Quick Modal */}
      {activePaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FEF9E7] dark:bg-gray-900 max-w-md w-full rounded-3xl p-6 border-4 border-green-700 dark:border-green-600 shadow-2xl space-y-4 text-left">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 dark:text-green-300 bg-green-200 dark:bg-green-950 px-2 py-0.5 rounded">
                  Accepted Payment Methods
                </span>
                <h3 className="font-handwritten text-2xl font-bold text-[#2E4A35] dark:text-green-400 mt-1">
                  Pay for {activePaymentModal.itemName}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {activePaymentModal.optionLabel} • <strong>${activePaymentModal.price.toFixed(2)}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePaymentModal(null)}
                className="text-stone-500 hover:text-stone-800 dark:text-stone-400 font-bold text-xl px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              {/* Square Direct Link */}
              <a
                href={activePaymentModal.squareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FACC15] hover:bg-yellow-400 text-stone-900 font-bold transition shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-stone-900" />
                  <span>Square (Card / Apple Pay)</span>
                </div>
                <span>${activePaymentModal.price.toFixed(2)} →</span>
              </a>

              {/* Venmo */}
              <a
                href="https://venmo.com/u/samantha-Reed-183"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#008CFF]/15 hover:bg-[#008CFF]/25 text-[#008CFF] font-bold transition"
              >
                <div className="flex items-center gap-2">
                  <img src="/images/venmo.svg" alt="Venmo Payment Icon" loading="lazy" decoding="async" className="h-4 w-4" />
                  <span>Venmo (@samantha-Reed-183)</span>
                </div>
                <span>Send ${activePaymentModal.price.toFixed(2)} →</span>
              </a>

              {/* Cash App */}
              <a
                href="https://cash.app/$northeastnymph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#00D632]/15 hover:bg-[#00D632]/25 text-[#009e24] dark:text-[#00D632] font-bold transition"
              >
                <div className="flex items-center gap-2">
                  <img src="/images/cashapp.svg" alt="Cash App Payment Icon" loading="lazy" decoding="async" className="h-4 w-4" />
                  <span>Cash App ($northeastnymph)</span>
                </div>
                <span>Send ${activePaymentModal.price.toFixed(2)} →</span>
              </a>

              {/* PayPal */}
              <a
                href="https://paypal.biz/sammiesimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#003087]/15 hover:bg-[#003087]/25 text-[#003087] dark:text-[#5289df] font-bold transition"
              >
                <div className="flex items-center gap-2">
                  <img src="/images/paypal.svg" alt="PayPal Payment Icon" loading="lazy" decoding="async" className="h-4 w-4" />
                  <span>PayPal (sammiesimpleliving)</span>
                </div>
                <span>Send ${activePaymentModal.price.toFixed(2)} →</span>
              </a>

              {/* Square eGift Card */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎁</span>
                  <div>
                    <span className="font-bold block">Square eGift Card</span>
                    <span className="text-[11px] text-stone-600 dark:text-stone-300">Write 16-digit code on paper slip & drop in box</span>
                  </div>
                </div>
                <a
                  href="https://app.squareup.com/gift/MLNYMR5XWN0XP/check-balance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-emerald-700 dark:text-yellow-400 hover:text-emerald-900 whitespace-nowrap ml-2"
                >
                  Check Balance ↗
                </a>
              </div>

              {/* Cash */}
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-gray-800 text-stone-700 dark:text-stone-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span>💵</span>
                  <span className="font-bold">Exact Cash at Stand</span>
                </div>
                <span>Drop into metal honor box</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePaymentModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-gray-800 text-stone-700 dark:text-stone-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

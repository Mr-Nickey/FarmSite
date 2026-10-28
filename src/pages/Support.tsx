import React from 'react';
import { Navigation, CreditCard, ExternalLink } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { FundWidget } from '../components/FundWidget';
import { SEO } from '../components/SEO';

export const Support: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-10 flex-grow max-w-4xl space-y-10">
      <SEO
        title="Support the Farm & Stand | Flocking Reeds Farm (Grafton, NH)"
        description="Visit our 24/7 honor stand, get driving directions to 441 Millbrook Rd in Grafton NH, and support our 100% no-kill homestead feed & bedding fund."
        canonicalUrl="https://flockingreeds.farm/support"
      />
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/60 px-3.5 py-1 rounded-full">
          Grafton, New Hampshire
        </span>
        <h1 className="font-handwritten text-5xl sm:text-6xl font-bold text-[#2E4A35] dark:text-green-400 mt-2 mb-2">
          Support the Farm & Stand
        </h1>
        <p className="text-sm sm:text-base text-[#5D4037] dark:text-gray-300">
          How to visit our 24/7 honor stand, pickup farm fresh chicken and quail eggs, and support our no-kill family homestead.
        </p>
      </header>

      {/* Stand Directions & How It Works */}
      <section className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-[#2E4A35] dark:border-green-600 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 dark:border-gray-700 pb-5">
          <div>
            <span className="text-xs font-bold uppercase text-stone-500 dark:text-stone-400">
              Driveway Stand Location
            </span>
            <h2 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#2E4A35] dark:text-green-400">
              441 Millbrook Rd, Grafton, NH
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
              Look for the handcrafted old canoe sign right by the driveway!
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/yoWoFDjWZtRBRsJC6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-farm-green hover:bg-farm-green-dark text-white font-bold py-2.5 px-5 rounded-xl shadow transition text-sm cursor-pointer"
          >
            <Navigation className="w-4 h-4" /> Open in Google Maps
          </a>
        </div>

        {/* Real Stand Photo + How Buying Works */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 rounded-2xl overflow-hidden shadow-md border-2 border-stone-300 dark:border-gray-700">
            <img
              src="/assets/aistudio/PXL_20260917_132843208_8ac92c84.jpg"
              alt="Inside Flocking Reeds Farm Stand"
              loading="lazy"
              decoding="async"
              className="w-full h-56 object-cover"
            />
            <div className="p-2.5 bg-white dark:bg-gray-900 text-xs text-stone-600 dark:text-stone-300 text-center font-medium">
              Egg coolers, quail eggs, baked goods & honor box inside.
            </div>
          </div>

          <div className="md:col-span-7 space-y-3 text-left">
            <div className="bg-white/90 dark:bg-gray-900/50 p-3.5 rounded-xl border border-stone-200 dark:border-gray-700 flex items-start gap-3">
              <span className="font-mono font-bold text-farm-green dark:text-green-400 text-lg">01.</span>
              <div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Pull Up 24/7
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  Our stand is open day and night in all seasons. Pull straight into the driveway.
                </p>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/50 p-3.5 rounded-xl border border-stone-200 dark:border-gray-700 flex items-start gap-3">
              <span className="font-mono font-bold text-farm-green dark:text-green-400 text-lg">02.</span>
              <div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Choose Chicken or Quail Eggs
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  Open the insulated coolers for chicken eggs ($5/doz, $3/half doz) or fresh quail eggs ($3/doz). Check shelves for crafts & surprise baked goods!
                </p>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/50 p-3.5 rounded-xl border border-stone-200 dark:border-gray-700 flex items-start gap-3">
              <span className="font-mono font-bold text-farm-green dark:text-green-400 text-lg">03.</span>
              <div>
                <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Drop Payment in Honor Box or Pay Digitally
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  Drop exact cash into the locked metal box, or pay via Square, PayPal, Venmo (@samantha-Reed-183), or Cash App ($northeastnymph).
                </p>
              </div>
            </div>

            {/* Community First: Pay What You Can */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-start gap-2.5">
              <span className="text-lg">💛</span>
              <div className="text-xs text-stone-700 dark:text-stone-300">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-0.5">
                  Pay What You Can Promise
                </span>
                If you are struggling financially and need wholesome food, please take a dozen eggs and leave whatever you can afford — even a dollar in pennies. We are here to support our neighbors.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Homestead Feed & Bedding Fund Widget */}
      <section id="fund">
        <FundWidget />
      </section>

      {/* Ways to Support */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-handwritten text-4xl font-bold text-[#2E4A35] dark:text-green-400 mb-1">
            Ways to Support Our Homestead
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
            Because we are a 100% no-kill farm, our animals live here permanently. Your tips and viewership fund feed, clean straw bedding, and coop repairs!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Direct Donations via Square, Venmo, Cash App, PayPal */}
          <div className="bg-[#FEF9E7] dark:bg-gray-800 p-6 rounded-2xl border-2 border-stone-200 dark:border-gray-700 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Direct Homestead Donations
              </span>
              <h3 className="font-handwritten text-3xl font-bold text-[#2E4A35] dark:text-green-400">
                Donate to Support Our Flock & Farm
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                If you'd like to tip the farm, send extra for feed, or help fund winter bedding, your support directly cares for our 60+ pasture-raised chickens, quail, and rescue critters.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Primary Square Donation Button in Warm Harvest Gold */}
              <a
                href="https://square.link/u/uIosE4M7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#FACC15] hover:bg-yellow-400 text-stone-900 font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                <CreditCard className="w-5 h-5 text-stone-900 flex-shrink-0" />
                <span>Square (Card, Apple Pay, Google Pay & Afterpay)</span>
              </a>

              {/* Secondary Direct Donation Options */}
              <a
                href="https://venmo.com/u/samantha-Reed-183"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#008CFF] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow transition text-xs sm:text-sm cursor-pointer active:scale-95"
              >
                <img src="/images/venmo.svg" alt="Venmo" className="h-4 w-4 invert" />
                <span>Venmo: @samantha-Reed-183</span>
              </a>

              <a
                href="https://cash.app/$northeastnymph"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#00D632] hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow transition text-xs sm:text-sm cursor-pointer active:scale-95"
              >
                <img src="/images/cashapp.svg" alt="Cash App" className="h-4 w-4" />
                <span>Cash App: $northeastnymph</span>
              </a>

              <a
                href="https://paypal.biz/sammiesimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#003087] hover:bg-[#002466] text-white font-bold py-3 px-4 rounded-xl shadow transition text-xs sm:text-sm cursor-pointer active:scale-95"
              >
                <img src="/images/paypal.svg" alt="PayPal" className="h-4 w-4" />
                <span>PayPal: sammiesimpleliving</span>
              </a>
            </div>

            {/* Memo Note & All Sales Final Policy */}
            <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-gray-700 text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="bg-stone-50 dark:bg-gray-900/60 p-3 rounded-xl border border-stone-200 dark:border-gray-700 space-y-1">
                <span className="font-bold text-stone-800 dark:text-stone-200 block">
                  ⚠️ Note on Venmo, Cash App & PayPal Transfers:
                </span>
                <p>
                  If money is sent to our Venmo, Cash App, or PayPal without something typed in the memo stating what was bought at the stand, it will automatically be accepted as a direct homestead donation.
                </p>
              </div>

              <div className="bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1">
                <span className="font-bold text-amber-900 dark:text-yellow-300 block">
                  🛡️ All Sales & Donations Are Final:
                </span>
                <p>
                  All purchases and donations are 100% final — we cannot issue refunds. We are a small family farm living paycheck-to-paycheck, and incoming funds are immediately used within days to purchase animal feed, clean bedding, and supplies. Thank you for your understanding and gracious support of our family homestead!
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Free Support on YouTube with Video Embed */}
          <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border-2 border-red-200 dark:border-red-900 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                100% Free Way to Help
              </span>
              <h3 className="font-handwritten text-3xl font-bold text-red-700 dark:text-red-400">
                Subscribe on YouTube
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                Watching Sammie's videos, subscribing, and sharing them helps us earn creator revenue that directly pays for poultry feed and lumber at zero cost to you!
              </p>
            </div>

            {/* User Requested Featured Video Embed */}
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md border border-red-200 dark:border-red-900/60 bg-black">
              <iframe
                src="https://www.youtube.com/embed/uhc2ynIlb5k?controls=1&rel=0&playsinline=1"
                title="Sammies Simple Living Homestead Video"
                loading="lazy"
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="pt-1">
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl transition shadow text-sm sm:text-base cursor-pointer"
              >
                <YoutubeIcon className="w-5 h-5" />
                <span>Subscribe to @sammiessimpleliving</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

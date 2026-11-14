import React from 'react';
import { Navigation, CreditCard, ExternalLink } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { FundWidget } from '../components/FundWidget';
import { SEO } from '../components/SEO';
import { HeroBanner } from '../components/HeroBanner';

export const Support: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Donate to Support Our Flock & Farm | Flocking Reeds Farm (Grafton, NH)"
        description="Donate to support our 100% no-kill family homestead, 2026 Winter Preparedness & Predator-Proofing Fund, and 60+ pasture-raised chickens and quail."
        canonicalUrl="https://flockingreeds.farm/donate"
      />
      
      {/* Unified Hero Banner */}
      <HeroBanner
        bgImage="/images/geese.webp"
        bgAlt="Pasture-raised flock on Flocking Reeds Farm"
        badgeText="2026 Winter Preparedness & Flock Fund"
        title="Donate to Support Our Flock & Farm"
        subtitle="Help fund predator-proofing, winter warmth, non-GMO grain, and clean bedding for our 100% no-kill family homestead."
      />

      <main className="container mx-auto px-4 pt-2 sm:pt-4 pb-12 flex-grow max-w-4xl space-y-10 sm:space-y-12">

      {/* 2026 Homestead Feed & Bedding Fund Widget */}
      <section id="fund">
        <FundWidget />
      </section>

      {/* Ways to Support */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="font-handwritten text-4xl font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            Ways to Support Our Homestead
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
            Because we are a 100% no-kill farm, our animals live here permanently. Your tips and viewership fund feed, clean straw bedding, and coop repairs!
          </p>
        </div>

        <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
          
          {/* Card 1: Direct Homestead Donations via Square, Venmo, Cash App, PayPal */}
          <div className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-lg shadow-emerald-500/5 space-y-6">
            <div className="space-y-2">
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300/50">
                Direct Homestead Donations
              </span>
              <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300">
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
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-900 font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base cursor-pointer border-2 border-amber-500/80"
              >
                <CreditCard className="w-5 h-5 text-stone-900 flex-shrink-0" />
                <span>Square (Credit &amp; Debit Cards, Apple Pay, Google Pay, Cash App Pay &amp; Afterpay)</span>
              </a>

              {/* Secondary Direct Donation Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href="https://venmo.com/u/samantha-Reed-183"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#008CFF] hover:bg-blue-600 text-white font-bold py-3 px-3 rounded-xl shadow transition text-xs cursor-pointer active:scale-95"
                >
                  <img src="/images/venmo.svg" alt="Venmo Donation Icon" loading="lazy" decoding="async" className="h-4 w-4 invert" />
                  <span>Venmo: @samantha-Reed-183</span>
                </a>

                <a
                  href="https://cash.app/$northeastnymph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#00D632] hover:bg-green-600 text-white font-bold py-3 px-3 rounded-xl shadow transition text-xs cursor-pointer active:scale-95"
                >
                  <img src="/images/cashapp.svg" alt="Cash App Donation Icon" loading="lazy" decoding="async" className="h-4 w-4" />
                  <span>Cash App: $northeastnymph</span>
                </a>

                <a
                  href="https://paypal.biz/sammiesimpleliving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#003087] hover:bg-[#002466] text-white font-bold py-3 px-3 rounded-xl shadow transition text-xs cursor-pointer active:scale-95"
                >
                  <img src="/images/paypal.svg" alt="PayPal Donation Icon" loading="lazy" decoding="async" className="h-4 w-4" />
                  <span>PayPal: sammiesimpleliving</span>
                </a>
              </div>
            </div>

            {/* Memo Note, Tracker Timeframe & All Sales Final Policy */}
            <div className="space-y-2 pt-2 border-t border-emerald-200 dark:border-emerald-900/60 text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
              <div className="bg-amber-50/90 dark:bg-amber-950/40 p-3 rounded-xl border-2 border-amber-500/60 dark:border-amber-500/70 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">
                  ⏳ Note on Tracker Processing Time:
                </span>
                <p>
                  Online donations (Square, Venmo, Cash App, PayPal) and honor box contributions are manually synced to our site once daily. Please allow <strong>24–48 hours</strong> for your donation to reflect on the progress bar and recent supporters list.
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-[#0b131e] p-3 rounded-xl border-2 border-emerald-500/40 dark:border-emerald-500/50 space-y-1">
                <span className="font-bold text-stone-800 dark:text-stone-200 block">
                  ⚠️ Note on Venmo, Cash App & PayPal Transfers:
                </span>
                <p>
                  If money is sent to our Venmo, Cash App, or PayPal without something typed in the memo stating what was bought at the stand, it will automatically be accepted as a direct homestead donation.
                </p>
              </div>

              <div className="bg-amber-50/90 dark:bg-amber-950/40 p-3 rounded-xl border-2 border-amber-500/60 dark:border-amber-500/70 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">
                  🛡️ All Sales & Donations Are Final:
                </span>
                <p>
                  All purchases and donations are 100% final — we cannot issue refunds. We are a small family farm living paycheck-to-paycheck, and incoming funds are immediately used within days to purchase animal feed, clean bedding, and supplies. Thank you for your understanding and gracious support of our family homestead!
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Free Support on YouTube with Video Embed & Monetization Goal */}
          <div className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-8 rounded-2xl border-2 border-sky-500/80 dark:border-sky-500/80 shadow-lg shadow-sky-500/5 space-y-6">
            <div className="space-y-2">
              <span className="bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-sky-300/50">
                100% Free Way to Help
              </span>
              <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-sky-800 dark:text-sky-300">
                Subscribe & Watch on YouTube
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                If you don't have extra funds to donate, you can still support our homestead <strong>100% for free!</strong> Subscribing to Sammie's channel, watching our farm videos, and leaving a comment helps us reach YouTube's monetization requirements (subscribers & watch time). Once monetized, channel ad revenue will directly fund non-GMO poultry grain and clean pine bedding for our flock at zero cost to you!
              </p>
            </div>

            {/* Featured Video Embed */}
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md border-2 border-sky-500/50 dark:border-sky-500/60 bg-black">
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
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-5 rounded-xl transition shadow text-sm sm:text-base cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
              >
                <YoutubeIcon className="w-5 h-5 flex-shrink-0" />
                <span>Subscribe to @sammiessimpleliving on YouTube</span>
                <ExternalLink className="w-4 h-4 ml-1 flex-shrink-0" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  </div>
);
};

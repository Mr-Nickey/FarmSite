import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { MapPin, Phone, Star, CheckCircle, ExternalLink, Play, HelpCircle, ChevronDown, Gift, ShoppingBag, Navigation } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { StandProductSelector } from '../components/StandProductSelector';
import { SEO } from '../components/SEO';
import { HeroBanner } from '../components/HeroBanner';

export const Home: React.FC = () => {
  const { setCurrentPage } = useFarm();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isStandModalOpen, setIsStandModalOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Flocking Reeds Farm | Fresh Eggs & 24/7 Honor Stand (Grafton, NH)"
        description="Family homestead & 24/7 roadside honor stand in Grafton, NH. Farm fresh pasture-raised chicken eggs, Coturnix quail eggs ($3/doz), and hand-painted cartons."
        canonicalUrl="https://flockingreeds.farm/"
        ogImage="https://flockingreeds.farm/images/banner.webp"
      />
      {/* Unified Hero Banner */}
      <HeroBanner
        bgImage="/images/index-cover.webp"
        bgAlt="The Flocking Reeds Homestead"
        badgeText="Farm Stand • Grafton, NH"
        title="Fueled by Caffeine & Chaos."
        subtitle="Fresh Chicken & Quail Eggs from Happy Pasture-Raised Birds on our No-Kill Family Homestead."
        logoUrl="/images/banner.webp"
        logoAlt="Flocking Reeds Farm Logo"
      />

      {/* Main Content Area */}
      <main className="container mx-auto px-3 sm:px-4 pt-2 sm:pt-4 pb-12 flex-grow max-w-5xl space-y-6 sm:space-y-8">
        
        {/* THE FARM STAND */}
        <section
          id="farm-stand"
          className="bg-white/95 dark:bg-[#132232]/95 p-4 sm:p-7 rounded-3xl shadow-xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-emerald-500/5 relative overflow-hidden transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-start">
            
            {/* Left Column: Real Stand Photos, Quail Showcase & Canaan Hardware (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Stand Exterior & Interior: Side-by-side 2-col on mobile for a slimmer scroll */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                {/* Stand Exterior */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm border-2 border-emerald-500/50 dark:border-emerald-500/60 group">
                  <img
                    src="/assets/aistudio/PXL_20260917_132832965_c707baf7.jpg"
                    alt="Flocking Reeds Farm Roadside Honor Stand Exterior"
                    decoding="async"
                    className="w-full h-28 sm:h-48 object-cover group-hover:scale-102 transition duration-500"
                  />
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md">
                    441 Millbrook Rd
                  </div>
                  <div className="hidden sm:flex absolute bottom-2 right-2 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md items-center gap-1 shadow">
                    <CheckCircle className="w-3 h-3" /> OPEN 24/7
                  </div>
                </div>

                {/* Stand Interior Shelves */}
                <div className="relative rounded-2xl overflow-hidden shadow-sm border-2 border-emerald-500/50 dark:border-emerald-500/60 group">
                  <img
                    src="/assets/aistudio/PXL_20260917_132843208_8ac92c84.jpg"
                    alt="Inside the Farm Stand with fresh egg coolers, quail eggs, and baked goods"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-28 sm:h-44 object-cover group-hover:scale-102 transition duration-500"
                  />
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md">
                    Inside Stand Coolers
                  </div>
                </div>
              </div>

              {/* Fresh Quail & Hand-Painted Cartons Images - Right below other images */}
              <div className="space-y-2 pt-0.5">
                <div className="flex items-center justify-between text-left">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Fresh Quail & Hand-Painted Cartons
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300/50">
                    Daily Gathered
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 dark:border-emerald-500/60 shadow-xs group">
                    <img
                      src="/assets/aistudio/PXL_20261028_172944314_4a0d5d9d.jpg"
                      alt="Dozen fresh Coturnix quail eggs in carton at Flocking Reeds Farm stand"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 object-cover group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      Quail Eggs ($3/doz)
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 dark:border-emerald-500/60 shadow-xs group">
                    <img
                      src="/assets/aistudio/PXL_20261028_172928155_132412d5.jpg"
                      alt="Hand-painted seasonal pumpkin cartons in the farm stand cooler"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-28 sm:h-36 object-cover group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      Hand-Painted Cartons
                    </div>
                  </div>
                </div>
              </div>

              {/* Also Available in Canaan, NH - At the bottom on the left */}
              <div className="bg-amber-50/90 dark:bg-amber-950/30 p-3 sm:p-3.5 rounded-2xl border-2 border-amber-500/60 dark:border-amber-500/70 shadow-xs space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏪</span>
                  <h4 className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                    Also Available in Canaan, NH
                  </h4>
                </div>
                <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-snug">
                  Pick up our farm fresh eggs in town at <strong>Canaan Hardware & Supply</strong> (489 US-4, Canaan, NH) during regular store hours. Great, helpful local folks!
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Canaan+Hardware+%26+Supply+489+US-4+Canaan+NH+03741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline"
                >
                  <span>Directions to Canaan Hardware ↗</span>
                </a>
              </div>

            </div>

            {/* Right Column: Driveway Stand Location, 3-Step Guide & Stand Items Popup Trigger (7 cols) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 border-b border-emerald-200 dark:border-sky-900/60 pb-2.5">
                <div>
                  <h2 className="font-handwritten text-3xl sm:text-5xl font-bold text-emerald-800 dark:text-emerald-300 leading-none">
                    Driveway Stand Location
                  </h2>
                  <a
                    href="https://maps.app.goo.gl/yoWoFDjWZtRBRsJC6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-sky-600 dark:text-sky-300 hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" /> 
                    <span>441 Millbrook Rd, Grafton, NH 03240</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    Look for the handcrafted old canoe sign right by the driveway!
                  </p>
                </div>
                <div className="flex flex-col sm:items-end gap-1 flex-shrink-0 mt-1 sm:mt-0">
                  <a
                    href="https://maps.app.goo.gl/yoWoFDjWZtRBRsJC6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl shadow transition text-xs cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Open Maps
                  </a>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-semibold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> (603) 729-3568
                  </p>
                </div>
              </div>

              {/* 3-Step Stand Buying Guide */}
              <div className="space-y-2">
                <div className="bg-white dark:bg-[#0b131e] p-3 rounded-xl border-2 border-emerald-500/40 dark:border-emerald-500/50 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">01.</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      Pull Up 24/7
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
                      Our stand is open day and night in all seasons. Pull straight into the driveway.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0b131e] p-3 rounded-xl border-2 border-emerald-500/40 dark:border-emerald-500/50 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">02.</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      Choose Chicken or Quail Eggs
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
                      Open the insulated coolers for chicken eggs ($5/doz, $3/half doz) or fresh quail eggs ($3/doz). Check shelves for crafts & surprise baked goods!
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0b131e] p-3 rounded-xl border-2 border-emerald-500/40 dark:border-emerald-500/50 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">03.</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      Drop Payment in Honor Box or Pay Digitally Below
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
                      Drop exact cash into the locked metal box, or use our instant popup payment button below for Square, PayPal, Venmo (@samantha-Reed-183), or Cash App ($northeastnymph).
                    </p>
                  </div>
                </div>

                {/* Community First: Pay What You Can */}
                <div className="bg-emerald-50/90 dark:bg-emerald-950/40 p-3 rounded-xl border-2 border-emerald-500/60 dark:border-emerald-500/70 flex items-start gap-2">
                  <span className="text-base">💛</span>
                  <div className="text-[11px] sm:text-xs text-stone-700 dark:text-stone-300">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-0.5">
                      Pay What You Can Promise
                    </span>
                    If you are struggling financially and need wholesome food, please take a dozen eggs and leave whatever you can afford — even a dollar in pennies. We are here to support our neighbors.
                  </div>
                </div>
              </div>

              {/* Sleek Modern Popup Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsStandModalOpen(true)}
                  className="w-full flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-900 font-extrabold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-center cursor-pointer border-2 border-amber-500/80 group"
                >
                  <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-black text-stone-900">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-stone-900 group-hover:scale-110 transition duration-300" />
                    <span>Standing at the Farm Stand or Need to Pay for an Item?</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 mt-1">
                    Click Here to Select Items & Pay Online →
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-700 italic mt-0.5 font-normal">
                    (Instant Square Checkout, Venmo, Cash App, PayPal & eGift Card Payment Links)
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage('donate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:underline cursor-pointer"
                >
                  <span>Want to support our 2026 Winter Preparedness Fund? Visit Donate Page →</span>
                </button>
              </div>

            </div>
          </div>

          {/* SQUARE EGIFT CARD SECTION - Compact & clean */}
          <div className="mt-5 pt-5 border-t-2 border-emerald-200 dark:border-sky-900/60 bg-white/90 dark:bg-[#0b131e]/90 p-4 sm:p-6 rounded-2xl border-2 border-emerald-500/60 dark:border-emerald-500/70 shadow-sm space-y-3.5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-emerald-200 dark:border-sky-900/40 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs flex-shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full inline-block border border-emerald-300/50">
                    Digital Square eGift Cards
                  </span>
                  <h3 className="font-handwritten text-xl sm:text-2xl md:text-3xl font-bold text-emerald-800 dark:text-emerald-300 leading-tight">
                    🎁 Out-of-State? Buy a Farm Gift Card for Friends & Family
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <a
                  href="https://app.squareup.com/gift/MLNYMR5XWN0XP/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2 px-4 rounded-xl shadow-sm transition active:scale-95 text-xs cursor-pointer whitespace-nowrap"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Purchase eGift Card →</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://app.squareup.com/gift/MLNYMR5XWN0XP/check-balance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-stone-100 dark:bg-[#132232] hover:bg-stone-200 dark:hover:bg-sky-950 text-stone-800 dark:text-stone-100 font-bold py-2 px-3 rounded-xl border border-emerald-300 dark:border-emerald-700 shadow-xs transition text-xs cursor-pointer whitespace-nowrap"
                >
                  <span>Check Balance ↗</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug">
              Treat loved ones in Grafton, Canaan, or the Upper Valley with an instant digital Square eGift Card! Here is how offline redemption works at our 24/7 stand:
            </p>

            {/* 3-Step Offline Redemption Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <div className="bg-stone-50 dark:bg-[#132232] p-2.5 sm:p-3 rounded-xl border border-emerald-300/60 dark:border-emerald-700/60 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Buy Online
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug pl-7">
                  Friends or family out of state purchase a digital Square eGift Card instantly online.
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-[#132232] p-2.5 sm:p-3 rounded-xl border border-emerald-300/60 dark:border-emerald-700/60 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Pick Up & Drop Note
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug pl-7">
                  The recipient grabs their eggs, baked goods, or crafts and writes their 16-digit code on a slip of paper.
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-[#132232] p-2.5 sm:p-3 rounded-xl border border-emerald-300/60 dark:border-emerald-700/60 space-y-0.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                    Drop in Box
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug pl-7">
                  They drop that slip into our secure cash drop box. We process the card when we collect!
                </p>
              </div>
            </div>
          </div>

          {/* DEDICATED GOOGLE REVIEW BANNER (Centered & Slimmer) */}
          <div className="mt-4 pt-4 border-t-2 border-amber-200 dark:border-amber-900/60 flex flex-col items-center text-center gap-3 bg-amber-50/90 dark:bg-amber-950/30 p-4 sm:p-6 rounded-2xl border-2 border-amber-500/60 dark:border-amber-500/70 shadow-sm">
            <div className="space-y-1 max-w-2xl flex flex-col items-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-current text-amber-400 stroke-amber-500" />
                <Star className="w-4 h-4 fill-current text-amber-400 stroke-amber-500" />
                <Star className="w-4 h-4 fill-current text-amber-400 stroke-amber-500" />
                <Star className="w-4 h-4 fill-current text-amber-400 stroke-amber-500" />
                <Star className="w-4 h-4 fill-current text-amber-400 stroke-amber-500" />
                <span className="text-[10px] sm:text-xs font-bold text-amber-900 dark:text-amber-200 ml-1.5 uppercase tracking-wider">
                  Community Stand Reviews
                </span>
              </div>
              <h4 className="font-handwritten text-xl sm:text-3xl font-bold text-amber-900 dark:text-amber-200 leading-tight">
                Got Fresh Eggs From the Stand? Leave a Review!
              </h4>
              <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-snug">
                Your 5-star Google review helps neighbors and road-trippers discover our 24/7 honor stand!
              </p>
            </div>
            
            {/* Centered Review Button */}
            <div className="flex justify-center w-full">
              <a
                href="https://g.page/r/CYa2i42KWruvEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#4285F4] hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current text-amber-300" />
                <span>Leave a 5-Star Google Review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </section>

        {/* YOUTUBE PROMOTION & MULTI-VIDEO SHOWCASE - Signature Blue Theme */}
        <section className="bg-white/95 dark:bg-[#132232]/95 p-4 sm:p-7 rounded-3xl shadow-xl border-2 border-sky-500/80 dark:border-sky-500/80 shadow-sky-500/5 relative overflow-hidden space-y-5 sm:space-y-6">
          
          {/* Header & Emotional Hook */}
          <div className="text-center max-w-3xl mx-auto space-y-1.5">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-3 py-0.5 rounded-full inline-block border border-sky-300/50">
              Unfiltered Homestead Life • @sammiessimpleliving
            </span>
            <h3 className="font-handwritten text-3xl sm:text-5xl font-bold text-sky-800 dark:text-sky-300 leading-tight">
              Watch the Real Ups & Downs on YouTube!
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-snug sm:leading-relaxed max-w-2xl mx-auto">
              From tough New Hampshire weather to newborn critters, coop builds, and hilarious goose antics — Sammie captures it all raw, real, and unscripted.
            </p>
          </div>

          {/* Channel Statistics & Cool Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            <div className="bg-sky-50/50 dark:bg-[#0b131e]/80 p-2.5 sm:p-3 rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/60 text-center shadow-xs">
              <span className="text-lg sm:text-xl block mb-0.5">❤️</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base block leading-tight">
                799 Subscribers
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400">
                Joined Jan 31, 2025
              </span>
            </div>

            <div className="bg-sky-50/50 dark:bg-[#0b131e]/80 p-2.5 sm:p-3 rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/60 text-center shadow-xs">
              <span className="text-lg sm:text-xl block mb-0.5">🎬</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base block leading-tight">
                396 Videos
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400">
                Daily Vlogs & Builds
              </span>
            </div>

            <div className="bg-sky-50/50 dark:bg-[#0b131e]/80 p-2.5 sm:p-3 rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/60 text-center shadow-xs">
              <span className="text-lg sm:text-xl block mb-0.5">👀</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base block leading-tight">
                333,628 Views
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400">
                Unfiltered Farm Stories
              </span>
            </div>

            <div className="bg-sky-50/50 dark:bg-[#0b131e]/80 p-2.5 sm:p-3 rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/60 text-center shadow-xs">
              <span className="text-lg sm:text-xl block mb-0.5">🌾</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base block leading-tight">
                Grafton, NH (USA)
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-400">
                Views Buy Flock Feed
              </span>
            </div>
          </div>

          {/* Featured Video Embed & Channel Intro */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center bg-stone-50 dark:bg-[#0b131e]/80 p-3.5 sm:p-5 rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/60">
            <div className="md:col-span-6 w-full aspect-video rounded-xl overflow-hidden shadow-md border border-sky-500/40 bg-black">
              <iframe
                src="https://www.youtube.com/embed/uhc2ynIlb5k?autoplay=0&mute=1&loop=1&playlist=uhc2ynIlb5k&controls=1&rel=0&playsinline=1"
                title="Sammies Simple Living - Life on the Homestead"
                loading="lazy"
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="md:col-span-6 space-y-2 text-left">
              <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider bg-sky-100 dark:bg-sky-950/80 px-2 py-0.5 rounded-md">
                Featured Video
              </span>
              <h4 className="font-handwritten text-2xl sm:text-3xl font-bold text-sky-900 dark:text-sky-200">
                Follow Sammie's Daily Journey
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug sm:leading-relaxed">
                Whether showing off Nicky's latest upcycled coop expansion, tending our 60+ laying hens, or filming baby quail taking their first sand bath, there's always something new happening.
              </p>
              <div className="pt-1">
                <a
                  href="https://www.youtube.com/@sammiessimpleliving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl shadow transition text-xs cursor-pointer active:scale-95"
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <span>Subscribe to Channel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Life Behind the Stand */}
          <div className="space-y-3 pt-2 border-t border-sky-200 dark:border-sky-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-left">
              <div>
                <h4 className="font-handwritten text-xl sm:text-3xl font-bold text-sky-900 dark:text-sky-200">
                  Life Behind the Stand: Watch on YouTube
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300">
                  Daily routines, coops, quail breeding, and our no-kill animals.
                </p>
              </div>
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>View All Videos</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {/* Card 1: Japanese Coturnix Quail Flock */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-50 dark:bg-[#0b131e] rounded-2xl overflow-hidden shadow-xs hover:shadow-md border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-24 sm:h-36 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_133013159_b77d39c2.jpg"
                    alt="Coturnix quail in sandbox enclosure"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs p-1 rounded-full text-white">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition leading-snug">
                      Coturnix Quail Flock
                    </h5>
                    <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 mt-0.5 line-clamp-2 leading-snug">
                      Breeding chicks & gathering speckled eggs ($3/doz).
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    Watch →
                  </span>
                </div>
              </a>

              {/* Card 2: 60+ Hens & The Vintage Camper Coop */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-50 dark:bg-[#0b131e] rounded-2xl overflow-hidden shadow-xs hover:shadow-md border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-24 sm:h-36 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_132453213_8e87d5b5.jpg"
                    alt="Camper coop and pasture chickens"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs p-1 rounded-full text-white">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition leading-snug">
                      Upcycled Camper Coop
                    </h5>
                    <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 mt-0.5 line-clamp-2 leading-snug">
                      Vintage Catalina camper converted for 60+ hens.
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    Watch →
                  </span>
                </div>
              </a>

              {/* Card 3: Nicky's Builds & Pasture Geese */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-50 dark:bg-[#0b131e] rounded-2xl overflow-hidden shadow-xs hover:shadow-md border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-24 sm:h-36 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_132612817_ed22ad06.jpg"
                    alt="Watchful farm geese in pasture"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs p-1 rounded-full text-white">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition leading-snug">
                      Builds & Pasture Geese
                    </h5>
                    <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 mt-0.5 line-clamp-2 leading-snug">
                      Pallet carpentry & our watchful farm geese.
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    Watch →
                  </span>
                </div>
              </a>

              {/* Card 4: Ups, Downs & 100% No-Kill Care */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-50 dark:bg-[#0b131e] rounded-2xl overflow-hidden shadow-xs hover:shadow-md border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-24 sm:h-36 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_132543790_f8fde6dd.jpg"
                    alt="Homestead bunny and no-kill critters"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs p-1 rounded-full text-white">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
                <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition leading-snug">
                      100% No-Kill Homestead
                    </h5>
                    <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-400 mt-0.5 line-clamp-2 leading-snug">
                      Every animal has a permanent home for life.
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    Watch →
                  </span>
                </div>
              </a>
            </div>
          </div>

        </section>

        {/* STREAMLINED HOMEPAGE FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="bg-white/95 dark:bg-[#132232]/95 p-4 sm:p-7 rounded-3xl shadow-xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-emerald-500/5 space-y-3.5 sm:space-y-5 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-200 dark:border-emerald-900/60 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-300 leading-none">
                  Frequently Asked Questions
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                  Tap any question below for quick answers about stand stock, gift cards & egg care.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "Are chicken and quail eggs always in stock at the driveway stand?",
                a: "No — our stand operates strictly on a first-come, first-served basis. Please open the coolers in person to confirm eggs are on hand before sending digital payments. We are not responsible if payment is sent when the stand is sold out.",
                tag: "Stock"
              },
              {
                q: "How do I check the remaining balance on my gift card?",
                a: "You can check your balance anytime online by visiting our official Square balance checker:",
                tag: "Gift Card",
                link: { text: "Check Gift Card Balance", url: "https://app.squareup.com/gift/MLNYMR5XWN0XP/check-balance" }
              },
              {
                q: "How do I use a gift card at the roadside farm stand if there's no internet or card reader?",
                a: "Since our honor-system stand is offline, simply grab your items, write your 16-digit Square gift card code and your name on a piece of paper (or print out your gift card email), and drop it straight into the locked cash drop box. We will deduct the purchase total from your gift card balance as soon as we check the box!",
                tag: "Redeem"
              },
              {
                q: "Can out-of-state family members buy gift cards for us?",
                a: "Yes! Anyone anywhere can purchase an eGift card instantly through our site, making it a fantastic holiday or birthday gift for folks living in or visiting Grafton, NH.",
                tag: "Gifting",
                link: { text: "Buy a Square eGift Card Online", url: "https://app.squareup.com/gift/MLNYMR5XWN0XP/order" }
              },
              {
                q: "What is the fastest way to contact Nicky or Sammie?",
                a: "Texting Nicky at (603) 729-3568 is the fastest way! Phone calls are screened through voicemail while we're tending the flock. You can also email support@flockingreeds.farm.",
                tag: "Contact"
              },
              {
                q: "What is your 100% 'No-Kill' homestead philosophy?",
                a: "We don't have the heart to cull our animals for meat. Every bird lives out its natural life here as part of our homestead family.",
                tag: "No-Kill"
              },
              {
                q: "What payment methods are accepted at the driveway stand?",
                a: "Exact cash in our locked metal honor box, or digital payments via Square, Square eGift Cards, Venmo (@samantha-Reed-183), Cash App ($northeastnymph), or PayPal (sammiesimpleliving). If cell service is spotty, you can send payment once connected to Wi-Fi — just include a memo of what you picked up!",
                tag: "Payments"
              },
              {
                q: "Why are the eggs unwashed and how long do they last?",
                a: "Our eggs keep their natural protective 'bloom' to seal out bacteria naturally. Unwashed eggs stay fresh at room temperature for 3–4 weeks, or in the refrigerator for 3–4 months. Only wash with warm running water right before cooking!",
                tag: "Egg Care"
              },
              {
                q: "How does the 'Pay What You Can' neighbor promise work?",
                a: "If you or a neighbor are struggling financially and need wholesome food, please take a dozen eggs and leave whatever you can afford in the honor box — even a dollar in pennies.",
                tag: "Community"
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0b131e] rounded-xl border-2 border-emerald-500/40 dark:border-emerald-500/50 hover:border-emerald-400 overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between gap-2.5 text-left hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full flex-shrink-0">
                        {faq.tag}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-snug">
                        {faq.q}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 dark:text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3 pt-2 sm:px-4 sm:pb-3.5 text-xs text-stone-700 dark:text-stone-300 leading-relaxed border-t border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
                      <p>{faq.a}</p>
                      {'link' in faq && faq.link && (
                        <div className="pt-0.5">
                          <a
                            href={faq.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-300 hover:underline bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800 text-[11px] cursor-pointer"
                          >
                            <span>{faq.link.text} ↗</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-stone-50 dark:bg-[#0b131e] p-3 sm:p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
            <span className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 text-center sm:text-left">
              Still have a question or checking today's cooler stock?
            </span>
            <div className="flex items-center gap-2">
              <a
                href="sms:6037293568"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-2xs transition"
              >
                <Phone className="w-3 h-3" />
                <span>Text Nicky</span>
              </a>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 bg-stone-200 hover:bg-stone-300 dark:bg-[#132232] dark:hover:bg-sky-950 text-stone-800 dark:text-stone-100 text-xs font-bold py-1.5 px-3 rounded-lg transition cursor-pointer"
              >
                <span>Contact Page →</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Stand Item Selection Popup Modal */}
      {isStandModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="relative bg-white dark:bg-[#132232] max-w-2xl w-full rounded-3xl p-5 sm:p-7 border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-2xl space-y-4 my-auto text-left max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-emerald-200 dark:border-emerald-900/60 pb-3">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300/50">
                  🏪 Roadside Honor Stand
                </span>
                <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300 mt-1">
                  Select Your Stand Items
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  Grab your carton from the cooler, then select your items below for fast digital payment!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsStandModalOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-gray-800 text-stone-600 dark:text-stone-300 font-bold text-xl transition cursor-pointer flex-shrink-0"
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            {/* Product Selector inside Modal */}
            <StandProductSelector />

            {/* Close Footer */}
            <div className="pt-2 flex justify-end border-t border-emerald-200 dark:border-emerald-900/60">
              <button
                type="button"
                onClick={() => setIsStandModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-200 dark:bg-[#0b131e] hover:bg-stone-300 dark:hover:bg-sky-950 text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm transition cursor-pointer border border-stone-300 dark:border-sky-800/60"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

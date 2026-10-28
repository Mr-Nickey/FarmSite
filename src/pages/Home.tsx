import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { MapPin, Phone, Star, CheckCircle, ExternalLink, Play, HelpCircle, ChevronDown, Gift } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { StandProductSelector } from '../components/StandProductSelector';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const { setCurrentPage } = useFarm();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Flocking Reeds Farm | Fresh Eggs & 24/7 Honor Stand (Grafton, NH)"
        description="Family homestead & 24/7 roadside honor stand in Grafton, NH. Farm fresh pasture-raised chicken eggs, Coturnix quail eggs ($3/doz), and hand-painted cartons."
        canonicalUrl="https://flockingreeds.farm/"
        ogImage="https://flockingreeds.farm/images/banner.webp"
      />
      {/* Hero Section - Extended to top: 0 behind floating navbar with theme background fade */}
      <div className="relative w-full min-h-[46vh] sm:min-h-[50vh] flex flex-col justify-center items-center text-center px-4 -mt-[76px] sm:-mt-[84px] pt-26 sm:pt-32 pb-8 sm:pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/index-cover.webp"
            alt="The Flocking Reeds Homestead"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark tint for readable text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/80" />
          
          {/* Smooth vertical gradient overlay at bottom fading into page background in BOTH Light (#D0EAD6) & Dark (gray-900) mode */}
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-farm-light-green dark:from-gray-900 via-farm-light-green/80 dark:via-gray-900/80 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <img
            src="/images/banner.webp"
            alt="Flocking Reeds Farm Logo"
            className="w-36 sm:w-44 drop-shadow-2xl mb-4 hover:scale-105 transition duration-500 bg-white/20 rounded-full p-4 backdrop-blur-sm border border-white/30"
          />

          <span className="text-yellow-300 font-semibold text-xs sm:text-sm uppercase tracking-widest bg-black/40 px-3.5 py-1 rounded-full mb-3 border border-yellow-300/30">
            Farm Stand • Grafton, NH
          </span>

          <h1 className="font-handwritten text-4xl sm:text-5xl md:text-6xl font-bold text-green-400 mb-3 drop-shadow-lg leading-tight">
            Fueled by Caffeine & Chaos.
          </h1>

          <p className="text-lg sm:text-xl text-yellow-100 font-medium drop-shadow-md max-w-2xl leading-relaxed">
            Fresh Chicken & Quail Eggs from Happy Pasture-Raised Birds on our No-Kill Family Homestead.
          </p>
        </div>
      </div>

      {/* Main Content Area - sits tucked right below hero subtitle */}
      <main className="container mx-auto px-4 pt-2 sm:pt-4 pb-10 flex-grow max-w-5xl space-y-10">
        
        {/* THE FARM STAND */}
        <section
          id="farm-stand"
          className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-green-700/80 dark:border-green-600 relative overflow-hidden transition-all duration-300"
        >
          {/* Top Banner Ribbon - Symmetrical corner container */}
          <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden pointer-events-none z-30">
            <div className="absolute top-7 -right-7 w-48 bg-green-700 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider py-1.5 shadow-md transform rotate-45 text-center border-y border-green-600">
              ALWAYS IN STOCK
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Real Stand Photos, Quail Showcase & Canaan Hardware (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Stand Exterior */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-stone-300 dark:border-gray-700 group">
                <img
                  src="/assets/aistudio/PXL_20260917_132832965_c707baf7.jpg"
                  alt="Flocking Reeds Farm Roadside Honor Stand Exterior"
                  decoding="async"
                  className="w-full h-52 sm:h-56 object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  Roadside Stand at 441 Millbrook Rd
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-green-700 text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
                  <CheckCircle className="w-3.5 h-3.5" /> OPEN 24/7
                </div>
              </div>

              {/* Stand Interior Shelves */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-stone-300 dark:border-gray-700 group">
                <img
                  src="/assets/aistudio/PXL_20260917_132843208_8ac92c84.jpg"
                  alt="Inside the Farm Stand with fresh egg coolers, quail eggs, and baked goods"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-44 sm:h-48 object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  Inside: Coolers, Quail Eggs & Crafts
                </div>
              </div>

              {/* Fresh Quail & Hand-Painted Cartons Images - RIGHT BELOW OTHER IMAGES */}
              <div className="space-y-3 pt-0.5">
                <div className="flex items-center justify-between text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Fresh Quail & Hand-Painted Cartons
                  </span>
                  <span className="text-[10px] font-bold text-farm-green dark:text-green-400 bg-green-100 dark:bg-green-950/60 px-2 py-0.5 rounded">
                    Daily Gathered
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-gray-700 shadow-sm group">
                    <img
                      src="/assets/aistudio/PXL_20261028_172944314_4a0d5d9d.jpg"
                      alt="Dozen fresh Coturnix quail eggs in carton at Flocking Reeds Farm stand"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 object-cover group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      Coturnix Quail Eggs ($3/doz)
                    </div>
                    <span className="absolute top-2 right-2 bg-yellow-400 text-stone-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Customer Favorite
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-gray-700 shadow-sm group">
                    <img
                      src="/assets/aistudio/PXL_20261028_172928155_132412d5.jpg"
                      alt="Hand-painted seasonal pumpkin cartons in the farm stand cooler"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-40 object-cover group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      Hand-Painted Cartons in Cooler
                    </div>
                    <span className="absolute top-2 right-2 bg-green-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Painted by Sammie
                    </span>
                  </div>
                </div>
              </div>

              {/* Also Available in Canaan, NH - AT THE BOTTOM ON THE LEFT */}
              <div className="bg-amber-50/90 dark:bg-gray-900/90 p-4 rounded-2xl border-2 border-amber-300 dark:border-amber-800 shadow-sm space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏪</span>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-yellow-100">
                    Also Available in Canaan, NH
                  </h4>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                  You can also pick up our farm fresh eggs in town at <strong>Canaan Hardware & Supply</strong> (489 US-4, Canaan, NH) during regular store hours. They are great, helpful local folks who carry our eggs in town!
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Canaan+Hardware+%26+Supply+489+US-4+Canaan+NH+03741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-yellow-400 hover:underline pt-0.5"
                >
                  <span>Get Directions to Canaan Hardware ↗</span>
                </a>
              </div>

            </div>

            {/* Right Column: Stand Details, Direct Product Selection, Canaan Hardware & Pay What You Can (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div>
                <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400 leading-tight">
                  The Farm Stand
                </h2>
                <a
                  href="https://maps.app.goo.gl/yoWoFDjWZtRBRsJC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-blue-600 dark:text-blue-300 hover:underline inline-flex items-center gap-1.5 mt-1 font-semibold"
                >
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" /> 
                  <span>441 Millbrook Rd, Grafton, NH 03240</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 font-semibold flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-farm-green dark:text-green-400 flex-shrink-0" /> (603) 729-3568
                </p>
              </div>

              {/* Direct Stand Selection with Chicken & Quail Direct Square Links */}
              <StandProductSelector />

              <div className="pt-1">
                <button
                  onClick={() => {
                    setCurrentPage('support');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-farm-green dark:text-yellow-400 text-xs sm:text-sm font-bold hover:underline cursor-pointer"
                >
                  <span>Need more stand details, driving tips, or donation options? Visit Support Page →</span>
                </button>
              </div>

            </div>
          </div>

          {/* SQUARE EGIFT CARD SECTION - Prominent card for out-of-state supporters & gifting */}
          <div className="mt-8 pt-6 border-t-2 border-stone-200 dark:border-gray-700 bg-gradient-to-br from-emerald-50 via-green-50/60 to-emerald-100/70 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-7 rounded-2xl border-2 border-emerald-400 dark:border-emerald-600/60 shadow-md space-y-5 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm flex-shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full inline-block">
                    Digital Square eGift Cards
                  </span>
                  <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-[#2E4A35] dark:text-yellow-100 mt-0.5">
                    🎁 Out-of-State? Buy a Farm Gift Card for Friends & Family
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <a
                  href="https://app.squareup.com/gift/MLNYMR5XWN0XP/order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-md transition transform hover:-translate-y-0.5 active:scale-95 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
                >
                  <Gift className="w-4 h-4" />
                  <span>Purchase eGift Card →</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
                <a
                  href="https://app.squareup.com/gift/MLNYMR5XWN0XP/check-balance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 hover:bg-stone-50 dark:hover:bg-gray-700 text-stone-700 dark:text-stone-200 font-bold py-2.5 px-3.5 rounded-xl border border-stone-300 dark:border-gray-600 shadow-xs transition text-xs cursor-pointer whitespace-nowrap"
                >
                  <span>Check Balance ↗</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Looking for a meaningful way to treat loved ones in Grafton, Canaan, or the Upper Valley? Purchase an official Flocking Reeds Farm digital eGift Card powered by Square! It's delivered instantly by email or text and works seamlessly at our 24/7 honor stand.
            </p>

            {/* 3-Step Offline Redemption Guide */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <span>How Offline Stand Redemption Works (3 Simple Steps):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/90 dark:bg-gray-900/80 p-3.5 rounded-xl border border-emerald-200 dark:border-gray-700 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      Buy Online
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-8">
                    Friends or family out of state purchase a digital Square eGift Card instantly online.
                  </p>
                </div>

                <div className="bg-white/90 dark:bg-gray-900/80 p-3.5 rounded-xl border border-emerald-200 dark:border-gray-700 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      Pick Up & Drop Note
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-8">
                    The local recipient stops by the Grafton farm stand, grabs their fresh eggs, baked goods, or crafts, and writes their 16-digit gift card code (or prints their receipt) on a slip of paper.
                  </p>
                </div>

                <div className="bg-white/90 dark:bg-gray-900/80 p-3.5 rounded-xl border border-emerald-200 dark:border-gray-700 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      Drop in Box
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-8">
                    They drop that slip right into our secure cash drop box at the stand. We process the card against the order when we collect!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DEDICATED GOOGLE REVIEW BANNER (Centered) */}
          <div className="mt-6 pt-6 border-t-2 border-stone-200 dark:border-gray-700 flex flex-col items-center text-center gap-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-7 rounded-2xl border-2 border-yellow-400 dark:border-yellow-600/60 shadow-md">
            <div className="space-y-1.5 max-w-2xl flex flex-col items-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-current text-yellow-400 stroke-yellow-500" />
                <Star className="w-5 h-5 fill-current text-yellow-400 stroke-yellow-500" />
                <Star className="w-5 h-5 fill-current text-yellow-400 stroke-yellow-500" />
                <Star className="w-5 h-5 fill-current text-yellow-400 stroke-yellow-500" />
                <Star className="w-5 h-5 fill-current text-yellow-400 stroke-yellow-500" />
                <span className="text-xs font-bold text-stone-900 dark:text-yellow-200 ml-2 uppercase tracking-wider">
                  Community Stand Reviews
                </span>
              </div>
              <h4 className="font-handwritten text-2xl sm:text-3xl font-bold text-[#2E4A35] dark:text-yellow-100 leading-tight">
                Got Fresh Eggs From the Stand? Leave a Review!
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Your 5-star Google review helps other New Hampshire neighbors and road-trippers discover our 24/7 honor stand and keeps our family homestead going strong!
              </p>
            </div>
            
            {/* Centered Review Button */}
            <div className="pt-1 flex justify-center w-full">
              <a
                href="https://g.page/r/CYa2i42KWruvEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#4285F4] hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current text-yellow-300" />
                <span>Leave a 5-Star Google Review</span>
                <ExternalLink className="w-4 h-4 ml-0.5" />
              </a>
            </div>
          </div>

        </section>

        {/* YOUTUBE PROMOTION & MULTI-VIDEO SHOWCASE - Real Ups & Downs, Stats & Video Grid */}
        <section className="bg-red-50 dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-red-300 dark:border-red-900/60 relative overflow-hidden space-y-8">
          
          {/* Header & Emotional Hook */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-3.5 py-1 rounded-full inline-block">
              Unfiltered Homestead Life • @sammiessimpleliving
            </span>
            <h3 className="font-handwritten text-4xl sm:text-5xl font-bold text-red-700 dark:text-red-400 leading-tight">
              Watch the Real Ups & Downs on YouTube!
            </h3>
            <p className="text-sm sm:text-base text-stone-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Homesteading isn't always sunny days. From the heartbreak of tough losses and brutal New Hampshire weather, to the happy breakthroughs of newborn critters, coop builds, and hilarious goose antics — Sammie captures it all raw, real, and unscripted.
            </p>
          </div>

          {/* Channel Statistics & Cool Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="bg-white/90 dark:bg-gray-900/70 p-3.5 rounded-2xl border border-red-200 dark:border-red-900/40 text-center shadow-xs">
              <span className="text-2xl block mb-1">❤️</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg block leading-tight">
                799 Subscribers
              </span>
              <span className="text-[11px] text-stone-600 dark:text-stone-400">
                Joined Jan 31, 2025
              </span>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/70 p-3.5 rounded-2xl border border-red-200 dark:border-red-900/40 text-center shadow-xs">
              <span className="text-2xl block mb-1">🎬</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg block leading-tight">
                396 Videos
              </span>
              <span className="text-[11px] text-stone-600 dark:text-stone-400">
                Daily Vlogs & Coop Builds
              </span>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/70 p-3.5 rounded-2xl border border-red-200 dark:border-red-900/40 text-center shadow-xs">
              <span className="text-2xl block mb-1">👀</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg block leading-tight">
                333,628 Views
              </span>
              <span className="text-[11px] text-stone-600 dark:text-stone-400">
                Unfiltered Farm Life Stories
              </span>
            </div>

            <div className="bg-white/90 dark:bg-gray-900/70 p-3.5 rounded-2xl border border-red-200 dark:border-red-900/40 text-center shadow-xs">
              <span className="text-2xl block mb-1">🌾</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg block leading-tight">
                Grafton, NH (USA)
              </span>
              <span className="text-[11px] text-stone-600 dark:text-stone-400">
                Views Directly Buy Feed
              </span>
            </div>
          </div>

          {/* Featured Video Embed & Channel Intro */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/80 dark:bg-gray-900/60 p-5 sm:p-6 rounded-2xl border border-red-200 dark:border-red-900/40">
            <div className="md:col-span-6 w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-red-200 dark:border-red-900/60 bg-black">
              <iframe
                src="https://www.youtube.com/embed/uhc2ynIlb5k?autoplay=0&mute=1&loop=1&playlist=uhc2ynIlb5k&controls=1&rel=0&playsinline=1"
                title="Sammies Simple Living - Life on the Homestead"
                loading="lazy"
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="md:col-span-6 space-y-3 text-left">
              <span className="text-[11px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider bg-red-100 dark:bg-red-950/60 px-2.5 py-0.5 rounded-md">
                Featured Video
              </span>
              <h4 className="font-handwritten text-3xl font-bold text-[#2E4A35] dark:text-stone-100">
                Follow Sammie's Daily Journey
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-gray-300 leading-relaxed">
                Whether Sammie is opening up about the tough heartbreak of losing an animal, showing off Nicky's latest upcycled coop expansion, or filming baby quail taking their first sand bath, there's always something new happening.
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <a
                  href="https://www.youtube.com/@sammiessimpleliving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-xl shadow transition text-xs sm:text-sm cursor-pointer active:scale-95"
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <span>Subscribe to Channel</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Combined: Life Behind the Stand & Video Journey (Single unified clean area) */}
          <div className="space-y-4 pt-2 border-t border-stone-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-left">
              <div>
                <h4 className="font-handwritten text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100">
                  Life Behind the Stand: Watch on YouTube
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  A real glimpse into our daily routines, coops, quail breeding, and no-kill animals.
                </p>
              </div>
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>View All Videos on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Japanese Coturnix Quail Flock */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200 dark:border-gray-700 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_133013159_b77d39c2.jpg"
                    alt="Coturnix quail in sandbox enclosure"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />
                  <span className="absolute top-2 left-2 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    🪺 Quail Covey ($3/Doz)
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-full text-white">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-red-600 transition">
                      Coturnix Quail Flock & Breeding
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      Started with 5 quail—now breeding chicks and gathering speckled gourmet eggs for the stand ($3/dozen).
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 inline-flex items-center gap-1 pt-1">
                    Watch Quail Videos →
                  </span>
                </div>
              </a>

              {/* Card 2: 60+ Hens & The Vintage Camper Coop */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200 dark:border-gray-700 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_132453213_8e87d5b5.jpg"
                    alt="Camper coop and pasture chickens"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />
                  <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    🚐 Camper Coop (60+ Hens)
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-full text-white">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-red-600 transition">
                      Upcycled Camper Coop & Laying Hens
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      Nicky transformed an old Catalina camper trailer into a predator-proof coop with covered pasture runs.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 inline-flex items-center gap-1 pt-1">
                    Tour the Camper Coop →
                  </span>
                </div>
              </a>

              {/* Card 3: Nicky's Builds & Pasture Geese */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200 dark:border-gray-700 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_132612817_ed22ad06.jpg"
                    alt="Watchful farm geese in pasture"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    🪿 Pasture Geese & Builds
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-full text-white">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-red-600 transition">
                      Nicky's Builds & Friendly Geese
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      Custom pallet carpentry, woodland clears, and funny moments with our watchful pasture geese.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 inline-flex items-center gap-1 pt-1">
                    Watch Builds & Critters →
                  </span>
                </div>
              </a>

              {/* Card 4: Ups, Downs & 100% No-Kill Care */}
              <a
                href="https://www.youtube.com/@sammiessimpleliving"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-stone-200 dark:border-gray-700 transition flex flex-col text-left cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src="/assets/aistudio/PXL_20260917_132543790_f8fde6dd.jpg"
                    alt="Homestead bunny and no-kill critters"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    🐰 100% No-Kill Family
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm p-1.5 rounded-full text-white">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <h5 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-red-600 transition">
                      Real Life: Ups, Downs & Heartaches
                    </h5>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      Sammie's honest, transparent videos sharing the joys, challenges, and our promise that every animal lives here for life.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400 inline-flex items-center gap-1 pt-1">
                    Watch Real Life Stories →
                  </span>
                </div>
              </a>
            </div>
          </div>

        </section>

        {/* HOMEPAGE FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-[#2E4A35] dark:border-green-600 space-y-6 text-left">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-200 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400">
                <HelpCircle className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400 block">
                  Got Questions?
                </span>
                <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#2E4A35] dark:text-green-400">
                  Frequently Asked Questions
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-sm">
              Quick answers about stand stock, egg care, getting in touch, and our homestead promise.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Are chicken and quail eggs always in stock at the driveway stand?",
                a: "No — our stand operates strictly on a first-come, first-served basis. If we put out 5 cartons in the morning and someone buys them all, the stand might only have a single dozen or be completely sold out for the rest of the day until our next egg collection. This is why you must physically open the coolers to confirm eggs are on hand before sending digital payments. We are not responsible if payment is sent when the stand is already sold out.",
                tag: "Egg Availability"
              },
              {
                q: "How do I check the remaining balance on my gift card?",
                a: "You can check your balance anytime online by visiting our official Square balance checker. Simply enter your 16-digit digital gift card code to check your remaining balance before visiting the stand.",
                tag: "Gift Card Balance",
                link: { text: "Check Square Gift Card Balance", url: "https://app.squareup.com/gift/MLNYMR5XWN0XP/check-balance" }
              },
              {
                q: "How do I use a gift card at the roadside farm stand if there's no internet or card reader?",
                a: "Since our honor-system stand is offline, simply grab your items, write your 16-digit Square gift card code and your name on a piece of paper (or print out your gift card email), and drop it straight into the locked cash drop box. We will deduct the purchase total from your gift card balance as soon as we check the box!",
                tag: "Offline Redemption"
              },
              {
                q: "Can out-of-state family members buy gift cards for us?",
                a: "Yes! Anyone anywhere can purchase an eGift card instantly through our site, making it a fantastic holiday or birthday gift for folks living in or visiting Grafton, NH.",
                tag: "Out-of-State Gifting",
                link: { text: "Buy a Square eGift Card Online", url: "https://app.squareup.com/gift/MLNYMR5XWN0XP/order" }
              },
              {
                q: "What is the best and fastest way to contact Nicky or Sammie?",
                a: "Texting Nicky's phone at (603) 729-3568 is the fastest way to get an answer! All phone calls are automatically screened through voicemail while we are outside tending the flock, so please leave a voicemail if you call. You can also send an email to support@flockingreeds.farm or submit a message through our Contact page.",
                tag: "Fastest Contact"
              },
              {
                q: "What is your 100% 'No-Kill' homestead philosophy?",
                a: "To be completely honest, we simply don't have the heart to kill our animals. Maybe someday down the road we might find someone local to do the butchering and packaging, but right now we do not kill for meat on the farm. Of course, if a predator attacks our flock or if a hen becomes very sick, we will always do what is right and humane so our critters never suffer. But our birds live out their natural lives here as part of our homestead family.",
                tag: "No-Kill Philosophy"
              },
              {
                q: "What payment methods are accepted at the driveway stand?",
                a: "Cash payments into our locked metal honor box are exact change only — we do not leave out change or loose cash. For digital payments, you can pay via Square, Square eGift Cards, Venmo (@samantha-Reed-183), Cash App ($northeastnymph), or PayPal (sammiesimpleliving).\n\nPlease Note: Cell service and internet can sometimes be spotty out on Millbrook Road. If you take something and need to send payment once you get down the road or connect to Wi-Fi, you are welcome to do so, but please make sure to leave a note in your payment stating exactly what you took and the total so we can keep track of what was sold!",
                tag: "Payment Options"
              },
              {
                q: "Why are the eggs unwashed, how do I wash them at home, and how long do they last?",
                a: "Our eggs retain their natural protective 'bloom' (the natural cuticle sealed onto the shell when laid). This keeps oxygen and bacteria out naturally without chemicals!\n\n• Collection Date & Shelf Life: Look on the inside lid of your carton for our handwritten collection date! Unwashed eggs stay fresh at cool room temperature on your counter for 3 to 4 weeks, or in the refrigerator for up to 3 to 4 months past the collection date.\n\n• How to Wash at Home: Only wash your eggs right before you crack or cook them, because washing strips the protective bloom away. Rinse with warm running water (always warmer than the egg so bacteria isn't drawn into the porous shell), gently wipe with a cloth or soft towel, dry, and cook! Never soak farm fresh eggs in cold or standing water.",
                tag: "Egg Care & Bloom"
              },
              {
                q: "How does the 'Pay What You Can' neighbor promise work?",
                a: "No questions asked and no judgment. If you or a neighbor are struggling financially and need fresh, wholesome food, please take a carton of eggs and leave whatever you can afford in the honor box — even a single dollar in change. We believe community looks out for community.",
                tag: "Community Care"
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/95 dark:bg-gray-900/90 rounded-2xl border-2 border-stone-200 dark:border-gray-700 overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-stone-50 dark:hover:bg-gray-800/60 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-950/70 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        {faq.tag}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                        {faq.q}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 dark:text-stone-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-gray-800 pt-3 whitespace-pre-line space-y-2">
                      <p>{faq.a}</p>
                      {'link' in faq && faq.link && (
                        <div className="pt-1">
                          <a
                            href={faq.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-farm-green dark:text-yellow-400 hover:underline bg-green-50 dark:bg-green-950/50 px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-800 text-xs cursor-pointer"
                          >
                            <span>{faq.link.text} ↗</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/80 dark:bg-gray-900/80 p-4 rounded-2xl border border-stone-200 dark:border-gray-700">
            <span className="text-xs text-stone-600 dark:text-stone-400 text-center sm:text-left">
              Have a question not listed here or checking today's cooler stock?
            </span>
            <div className="flex items-center gap-2">
              <a
                href="sms:6037293568"
                className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Text Nicky (Fastest)</span>
              </a>
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-stone-800 dark:text-stone-200 text-xs font-bold py-2 px-3.5 rounded-xl transition cursor-pointer"
              >
                <span>Visit Contact Page →</span>
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

import React from 'react';
import { MapPin, Navigation, ExternalLink, HelpCircle } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { FarmContact } from '../components/FarmContact';
import { useFarm } from '../context/FarmContext';
import { SEO } from '../components/SEO';

export const Contact: React.FC = () => {
  const { setCurrentPage } = useFarm();
  return (
    <main className="container mx-auto px-4 py-10 flex-grow max-w-5xl space-y-10">
      <SEO
        title="Contact Us | Flocking Reeds Farm & Roadside Stand (Grafton, NH)"
        description="Contact Nicky & Sammie at Flocking Reeds Farm. Inquire about farm stand egg availability, Coturnix quail eggs, or homestead visits in Grafton, NH."
        canonicalUrl="https://flockingreeds.farm/contact"
        ogImage="https://flockingreeds.farm/images/banner.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Flocking Reeds Farm",
          "description": "Contact Nicky & Sammie at Flocking Reeds Farm. Inquire about farm stand egg availability, Coturnix quail eggs, or homestead visits in Grafton, NH.",
          "url": "https://flockingreeds.farm/contact",
          "mainEntity": {
            "@type": "Farm",
            "name": "Flocking Reeds Farm",
            "telephone": "+1-603-729-3568",
            "email": "support@flockingreeds.farm",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "441 Millbrook Rd",
              "addressLocality": "Grafton",
              "addressRegion": "NH",
              "postalCode": "03240",
              "addressCountry": "US"
            }
          }
        }}
      />
      {/* Page Header */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/60 px-3.5 py-1 rounded-full">
          Homestead Communications
        </span>
        <h1 className="font-handwritten text-5xl sm:text-6xl font-bold text-[#2E4A35] dark:text-green-400 mt-2 mb-2">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-[#5D4037] dark:text-gray-300 leading-relaxed">
          Have a question about daily egg stock, Coturnix quail chicks, or need driving directions down Millbrook Road? Reach out directly to Nicky & Sammie.
        </p>
      </header>

      {/* Main Interactive Contact Component */}
      <section>
        <FarmContact />
      </section>

      {/* Stand Location & Retail Partner Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Driveway Stand Details */}
        <div className="bg-white/95 dark:bg-gray-800/90 p-6 rounded-3xl border-2 border-stone-200 dark:border-gray-700 shadow-md space-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Primary Honor Stand (24/7)
              </span>
              <h3 className="font-handwritten text-2xl font-bold text-stone-900 dark:text-stone-100">
                The Millbrook Road Stand
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <p><strong>Address:</strong> 441 Millbrook Rd, Grafton, NH 03240</p>
            <p><strong>Hours:</strong> Open 24 Hours / 7 Days a Week (All Weather)</p>
            <p><strong>Directions:</strong> Turn onto Millbrook Road from Route 4. Look for our iconic hand-painted old canoe sign right by the gravel driveway.</p>
            <p><strong>Payment:</strong> Cash in locked metal box, Square, PayPal, Venmo, or Cash App.</p>
          </div>

          <a
            href="https://maps.app.goo.gl/yoWoFDjWZtRBRsJC6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2E4A35] hover:bg-[#3d6347] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Stand in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Also In Canaan at Canaan Hardware */}
        <div className="bg-white/95 dark:bg-gray-800/90 p-6 rounded-3xl border-2 border-stone-200 dark:border-gray-700 shadow-md space-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-yellow-400">
              <span className="text-xl">🏪</span>
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Also in Canaan, NH
              </span>
              <h3 className="font-handwritten text-2xl font-bold text-stone-900 dark:text-stone-100">
                Canaan Hardware & Supply
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <p><strong>Address:</strong> 489 US-4, Canaan, NH 03741</p>
            <p><strong>Phone:</strong> (603) 523-4331</p>
            <p>We sell our eggs with them — they are great, helpful local folks who carry our farm fresh eggs in town during regular store hours.</p>
            <p>Feel free to grab our pasture-raised eggs while getting hardware, tools, or feeds in Canaan!</p>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Canaan+Hardware+%26+Supply+489+US-4+Canaan+NH+03741"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stone-200 hover:bg-stone-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-stone-800 dark:text-stone-100 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            <span>Directions to Canaan Hardware</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

      </section>


      {/* Sammie's Homestead Socials */}
      <section className="bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-3xl border-2 border-stone-200 dark:border-gray-700 shadow-md space-y-4 text-left">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-3 py-0.5 rounded-full">
            Follow The Homestead Online
          </span>
          <h3 className="font-handwritten text-3xl font-bold text-stone-900 dark:text-yellow-100 mt-1">
            Connect with Sammie Across Socials
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5">
            Follow along with daily coop builds, critter antics, and simple living updates on your favorite platform:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@sammiessimpleliving"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-900/60 hover:border-amber-500 dark:hover:border-white transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-red-500/10 group transform hover:-translate-y-1 block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                <YoutubeIcon className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900/60">
                Videos
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition block">
              YouTube Channel
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
              @sammiessimpleliving ↗
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/sammies.simple.living/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-pink-300 dark:border-pink-900/60 hover:border-amber-500 dark:hover:border-white transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 group transform hover:-translate-y-1 block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-100 via-pink-100 to-purple-100 dark:from-amber-950/50 dark:via-pink-950/60 dark:to-purple-950/50 text-pink-600 dark:text-pink-400 group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-200 shadow-xs text-base">
                📸
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/50 px-2 py-0.5 rounded-md border border-pink-200 dark:border-pink-900/60">
                Photos
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition block">
              Instagram
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
              @sammies.simple.living ↗
            </span>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@sammiessimpleliving"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-cyan-300 dark:border-cyan-900/60 hover:border-amber-500 dark:hover:border-white transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 group transform hover:-translate-y-1 block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 group-hover:bg-black dark:group-hover:bg-white group-hover:text-cyan-400 dark:group-hover:text-black transition-colors duration-200 shadow-xs text-base">
                🎵
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-900/60">
                Shorts
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-cyan-600 dark:group-hover:text-white transition block">
              TikTok
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
              @sammiessimpleliving ↗
            </span>
          </a>

          {/* Reddit */}
          <a
            href="https://www.reddit.com/user/Sammiesimpleliving/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-900/60 hover:border-amber-500 dark:hover:border-white transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 group transform hover:-translate-y-1 block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 group-hover:bg-[#FF4500] group-hover:text-white transition-colors duration-200 shadow-xs text-base">
                💬
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-900/60">
                Community
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition block">
              Reddit
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
              u/Sammiesimpleliving ↗
            </span>
          </a>
        </div>
      </section>

      {/* Direct Link to Homepage Comprehensive FAQ */}
      <section className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-7 rounded-3xl border-2 border-stone-300 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <span className="p-3 rounded-2xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex-shrink-0">
            <HelpCircle className="w-6 h-6" />
          </span>
          <div>
            <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-[#2E4A35] dark:text-yellow-100">
              Looking for Common Farm Stand FAQs?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5 max-w-xl">
              Answers about egg availability, exact change at the honor box, how to wash fresh eggs at home, shelf life, and our no-kill philosophy are on our main page.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="inline-flex items-center gap-2 bg-[#2E4A35] hover:bg-[#3d6347] text-white font-bold py-3 px-5 rounded-xl shadow-md transition text-xs sm:text-sm whitespace-nowrap cursor-pointer flex-shrink-0 active:scale-95"
        >
          <span>View All FAQs on Home Page →</span>
        </button>
      </section>
    </main>
  );
};

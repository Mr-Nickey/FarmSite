import React from 'react';
import { MapPin, Navigation, ExternalLink, HelpCircle } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { FarmContact } from '../components/FarmContact';
import { useFarm } from '../context/FarmContext';
import { SEO } from '../components/SEO';
import { HeroBanner } from '../components/HeroBanner';

export const Contact: React.FC = () => {
  const { setCurrentPage } = useFarm();
  return (
    <div className="flex flex-col min-h-screen">
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

      {/* Unified Hero Banner */}
      <HeroBanner
        bgImage="/assets/aistudio/PXL_20261101_215538619_09755a8c.jpg"
        bgAlt="Updated Flocking Reeds 24/7 Glass-Door Roadside Farmstand on Millbrook Rd in Grafton, NH"
        badgeText="441 Millbrook Rd • Grafton, NH"
        title="Contact & Stand Location"
        subtitle="Have a question about daily egg stock, Coturnix quail chicks, or need driving directions down Millbrook Road? Reach out directly to Nicky & Sammie."
      />

      <main className="container mx-auto px-4 pt-2 sm:pt-4 pb-12 flex-grow max-w-5xl space-y-10 sm:space-y-12">

      {/* Main Interactive Contact Component */}
      <section>
        <FarmContact />
      </section>

      {/* Stand Location & Retail Partner Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Farmstand Details */}
        <div className="bg-white/95 dark:bg-[#132232]/95 p-6 rounded-3xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-md shadow-emerald-500/5 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Primary 24/7 Honor Farmstand
              </span>
              <h2 className="font-handwritten text-2xl font-bold text-emerald-900 dark:text-emerald-300">
                The Millbrook Road Farmstand
              </h2>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
            <p><strong>Address:</strong> 441 Millbrook Rd, Grafton, NH 03240</p>
            <p><strong>Hours:</strong> Open 24 Hours / 7 Days a Week (All Weather)</p>
            <p><strong>Setup:</strong> Beautiful front glass doors with fresh chicken & quail eggs out in the open on the back shelf, plus crafts and baked goods!</p>
            <p><strong>Directions:</strong> Turn onto Millbrook Road from Route 4. Look for our iconic hand-painted old canoe sign right by the gravel driveway.</p>
            <p><strong>Payment:</strong> Cash in locked metal box, Square, PayPal, Venmo, or Cash App.</p>
          </div>

          <a
            href="https://maps.app.goo.gl/yoWoFDjWZtRBRsJC6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Open Stand in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Also In Canaan at Canaan Hardware */}
        <div className="bg-white/95 dark:bg-[#132232]/95 p-6 rounded-3xl border-2 border-amber-500/80 dark:border-amber-500/80 shadow-md shadow-amber-500/5 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              <span className="text-xl">🏪</span>
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Also in Canaan, NH
              </span>
              <h2 className="font-handwritten text-2xl font-bold text-amber-900 dark:text-amber-200">
                Canaan Hardware & Supply
              </h2>
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
            className="inline-flex items-center gap-2 bg-stone-200 hover:bg-stone-300 dark:bg-[#0b131e] dark:hover:bg-sky-950 text-stone-800 dark:text-stone-100 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-xs border border-stone-300 dark:border-sky-800/60"
          >
            <Navigation className="w-4 h-4" />
            <span>Directions to Canaan Hardware</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

      </section>

      {/* Sammie's Homestead Socials */}
      <section className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-8 rounded-3xl border-2 border-sky-500/80 dark:border-sky-500/80 shadow-md space-y-4 text-left">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-3 py-0.5 rounded-full border border-sky-300/50">
            Follow The Homestead Online
          </span>
          <h2 className="font-handwritten text-3xl font-bold text-sky-900 dark:text-sky-200 mt-1">
            Connect with Sammie Across Socials
          </h2>
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
            className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0b131e] border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 transition-all duration-200 shadow-sm group cursor-pointer block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 shadow-xs">
                <YoutubeIcon className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/50 px-2 py-0.5 rounded-md border border-sky-300/50">
                Videos
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition block">
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
            className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0b131e] border-2 border-emerald-500/50 dark:border-emerald-500/60 hover:border-emerald-400 transition-all duration-200 shadow-sm group cursor-pointer block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 shadow-xs text-base">
                📸
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-300/50">
                Photos
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition block">
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
            className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0b131e] border-2 border-sky-500/50 dark:border-sky-500/60 hover:border-sky-400 transition-all duration-200 shadow-sm group cursor-pointer block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-base shadow-xs">
                🎵
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/50 px-2 py-0.5 rounded-md border border-sky-300/50">
                Shorts
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-sky-600 transition block">
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
            className="p-4 rounded-2xl bg-stone-50 dark:bg-[#0b131e] border-2 border-amber-500/50 dark:border-amber-500/60 hover:border-amber-400 transition-all duration-200 shadow-sm group cursor-pointer block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 text-base shadow-xs">
                💬
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-300/50">
                Community
              </span>
            </div>
            <span className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 transition block">
              Reddit
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
              u/Sammiesimpleliving ↗
            </span>
          </a>
        </div>
      </section>

      {/* Direct Link to Homepage Comprehensive FAQ */}
      <section className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-7 rounded-3xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <span className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex-shrink-0">
            <HelpCircle className="w-6 h-6" />
          </span>
          <div>
            <h2 className="font-handwritten text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-300">
              Looking for Common Farm Stand FAQs?
            </h2>
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
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition text-xs sm:text-sm whitespace-nowrap cursor-pointer flex-shrink-0 active:scale-95"
        >
          <span>View All FAQs on Home Page →</span>
        </button>
      </section>
    </main>
  </div>
);
};

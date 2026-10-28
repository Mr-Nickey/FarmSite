import React from 'react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-10 flex-grow max-w-4xl space-y-12">
      <SEO
        title="About Us | Flocking Reeds Farm & Homestead (Grafton, NH)"
        description="Meet Sammie & Nicky Reed. Married 15 years, operating our 100% no-kill family homestead and 24/7 honor stand with 60+ pasture-raised chickens & quail in Grafton, NH."
        canonicalUrl="https://flockingreeds.farm/about"
        ogImage="https://flockingreeds.farm/images/sammie-chicks.webp"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Flocking Reeds Farm",
          "description": "Meet Sammie & Nicky Reed. Married 15 years, operating our 100% no-kill family homestead and 24/7 honor stand in Grafton, NH.",
          "url": "https://flockingreeds.farm/about",
          "mainEntity": {
            "@type": "Farm",
            "name": "Flocking Reeds Farm",
            "founder": [
              { "@type": "Person", "name": "Sammie Reed" },
              { "@type": "Person", "name": "Nicky Reed" }
            ],
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
      <header className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/60 px-3.5 py-1 rounded-full">
          The Flocking Reeds Family
        </span>
        <h1 className="font-handwritten text-5xl sm:text-6xl font-bold text-[#2E4A35] dark:text-green-400 mt-2 mb-3">
          Meet the Flock & Our Story
        </h1>
        <p className="text-base sm:text-lg text-[#5D4037] dark:text-gray-300">
          We’re Sammie & Nicky Reed. Married 15 years, cultivating a simple, honest life in the woods of Grafton, NH.
        </p>
      </header>

      {/* Section 1: The Story & How It Started */}
      <section className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-[#8D6E63] dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative transform -rotate-1 hover:rotate-0 transition duration-500 p-2 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-stone-200 dark:border-gray-700 max-w-sm">
              <img
                src="/images/canoe-sign.webp"
                alt="Iconic canoe sign crafted by Nicky"
                loading="lazy"
                decoding="async"
                className="rounded-xl w-full h-72 object-cover"
              />
              <p className="text-center font-handwritten text-xs text-stone-600 dark:text-stone-400 mt-2">
                Our first stand sign, rescued and hand-painted from a neighbor's old canoe.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 space-y-3.5 text-left">
            <span className="text-xs font-bold uppercase text-stone-500 dark:text-stone-400">
              Our Journey
            </span>
            <h2 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#3E2723] dark:text-yellow-400">
              From Struggle to Simplicity
            </h2>
            <p className="text-sm text-stone-700 dark:text-gray-300 leading-relaxed">
              Our journey hasn't been a smooth paved road. In 2019, life took an unexpected turn when Sammie became disabled with epilepsy and neurological health challenges. Nicky stepped away from conventional 9-to-5 employment to become her full-time caregiver.
            </p>
            <p className="text-sm text-stone-700 dark:text-gray-300 leading-relaxed">
              Rather than fighting the rat race, we decided to ground ourselves in the land. We started small, building from salvaged materials and caring for our animals. Today, our homestead has grown to <strong>over 60+ pasture-raised chickens</strong> and an expanding flock of Coturnix quail that we began with just 5 birds (4 hens and 1 rooster) to breed and hatch right here on the farm!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Division of Labor (Sammie & Nicky) */}
      <section className="bg-white/80 dark:bg-gray-800/80 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-stone-200 dark:border-gray-700">
        <h2 className="font-handwritten text-4xl text-center mb-8 text-[#2E4A35] dark:text-green-400 font-bold">
          Who Does What?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sammie */}
          <div className="flex flex-col items-center text-center p-4 bg-stone-50 dark:bg-gray-900/50 rounded-2xl border border-stone-200 dark:border-gray-700 space-y-3">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-gray-700">
              <img
                src="/images/sammie-chicks.webp"
                alt="Sammie feeding the flock"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#3E2723] dark:text-white">Sammie</h3>
              <p className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">
                The Heart & Animal Manager
              </p>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-gray-300 leading-relaxed max-w-sm">
              Sammie handles morning feedings, collects fresh eggs, cares for our quail and bunnies, and paints custom egg cartons. She films our daily life on her phone and edits every YouTube video to share with our online community.
            </p>
          </div>

          {/* Nicky */}
          <div className="flex flex-col items-center text-center p-4 bg-stone-50 dark:bg-gray-900/50 rounded-2xl border border-stone-200 dark:border-gray-700 space-y-3">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-gray-700">
              <img
                src="/images/nicky-goose.webp"
                alt="Nicky hanging out with the geese"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-[#3E2723] dark:text-white">Nicky</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                The Builder & Tech
              </p>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-gray-300 leading-relaxed max-w-sm">
              Nicky is the muscle, carpenter, and caregiver. He builds coops from upcycled pallets and trailers, clears woodland runs, stocks the stand, and coded this website. When something needs building or fixing, Nicky is on it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The 3 Core Homestead Pillars (Preserved from the former blog posts) */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/60 px-3 py-1 rounded-full">
            Our Homestead Values
          </span>
          <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400 mt-1">
            How We Raise Our Animals
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            We hold ourselves to ethical standards that put the welfare of our animals first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-[#FEF9E7] dark:bg-gray-800 p-6 rounded-2xl shadow-md border-2 border-stone-200 dark:border-gray-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center font-bold text-xl">
              ❤️
            </div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
              100% No-Kill Homestead
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Every single animal on our farm has a guaranteed home for life. When our hens age past their prime egg-laying years, they do not get culled. They retire peacefully, enjoying sunbaths and treats for the rest of their natural lives.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FEF9E7] dark:bg-gray-800 p-6 rounded-2xl shadow-md border-2 border-stone-200 dark:border-gray-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/60 text-green-700 flex items-center justify-center font-bold text-xl">
              🌿
            </div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
              Pasture-Raised & Protected
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Our birds have access to large outdoor covered yards with fresh New Hampshire air, natural foraging, and clean pine shavings. Our quail enjoy dedicated sand baths and fresh forage to keep them healthy and thriving.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FEF9E7] dark:bg-gray-800 p-6 rounded-2xl shadow-md border-2 border-stone-200 dark:border-gray-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 flex items-center justify-center font-bold text-xl">
              🔨
            </div>
            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">
              Upcycled Ingenuity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              We repurpose what others discard. From turning an old vintage camper into our main chicken coop, to building our stand sign from a fiberglass canoe, we craft a resilient, sustainable homestead without unnecessary waste.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Real Photo Gallery of Our Animal Friends */}
      <section className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-stone-200 dark:border-gray-700 space-y-6">
        <div className="text-center">
          <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#2E4A35] dark:text-green-400">
            Meet the Residents
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            Snapshots straight from our coops, pens, and pastures in Grafton, NH.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Camper Coop */}
          <div className="rounded-xl overflow-hidden shadow border border-stone-200 dark:border-gray-700 group">
            <img
              src="/assets/aistudio/PXL_20260917_132453213_8e87d5b5.jpg"
              alt="Vintage Catalina camper converted into chicken coop"
              loading="lazy"
              decoding="async"
              className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-2 bg-white dark:bg-gray-900 text-[11px] font-bold text-center text-stone-700 dark:text-stone-300">
              The Camper Coop
            </div>
          </div>

          {/* Coturnix Quail */}
          <div className="rounded-xl overflow-hidden shadow border border-stone-200 dark:border-gray-700 group">
            <img
              src="/assets/aistudio/PXL_20260917_133046258_1f146885.jpg"
              alt="Close-up of Japanese Coturnix Quail"
              loading="lazy"
              decoding="async"
              className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-2 bg-white dark:bg-gray-900 text-[11px] font-bold text-center text-stone-700 dark:text-stone-300">
              Coturnix Quail
            </div>
          </div>

          {/* Geese */}
          <div className="rounded-xl overflow-hidden shadow border border-stone-200 dark:border-gray-700 group">
            <img
              src="/assets/aistudio/PXL_20260917_132612817_ed22ad06.jpg"
              alt="Farm geese roaming together"
              loading="lazy"
              decoding="async"
              className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-2 bg-white dark:bg-gray-900 text-[11px] font-bold text-center text-stone-700 dark:text-stone-300">
              Our Watchful Geese
            </div>
          </div>

          {/* Bunnies */}
          <div className="rounded-xl overflow-hidden shadow border border-stone-200 dark:border-gray-700 group">
            <img
              src="/assets/aistudio/PXL_20260811_202438351_75faae4a.jpg"
              alt="Grey rabbit relaxing in hay"
              loading="lazy"
              decoding="async"
              className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="p-2 bg-white dark:bg-gray-900 text-[11px] font-bold text-center text-stone-700 dark:text-stone-300">
              Homestead Bunnies
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Community Roots, Canaan Hardware & Pay-What-You-Can Promise */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canaan Hardware */}
        <div className="bg-[#FEF9E7] dark:bg-gray-800 p-6 sm:p-7 rounded-3xl shadow-lg border-2 border-amber-300 dark:border-amber-800 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
              Also in Canaan, NH
            </span>
            <h3 className="font-handwritten text-3xl font-bold text-[#2E4A35] dark:text-yellow-200">
              Eggs at Canaan Hardware Store
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              In addition to our roadside stand, we sell our farm fresh eggs with <strong>Canaan Hardware Store</strong> in Canaan, NH! They are great, helpful local folks where we buy our coop building materials, hardware, and farm feed.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Almost all proceeds from our eggs go right back to Canaan Hardware to keep our flock fed and happy. From there, they help strengthen the local community. We are proud to build a healthier, happier community one carton at a time!
            </p>
          </div>
          <div className="pt-2 border-t border-amber-200 dark:border-amber-900/60 text-xs font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <span>📍</span> Pick up a carton when you visit Canaan Hardware in Canaan, NH!
          </div>
        </div>

        {/* Pay-What-You-Can Community Promise */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-7 rounded-3xl shadow-lg border-2 border-emerald-300 dark:border-emerald-800 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Community First
            </span>
            <h3 className="font-handwritten text-3xl font-bold text-emerald-900 dark:text-emerald-300">
              Our "Pay What You Can" Promise
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              We understand times are rough, groceries are expensive, and not everyone has easy access to healthy protein.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              If you or your family are in need and can't afford the regular cost of eggs, please feel free to stop by our 24/7 honor stand, grab a dozen fresh eggs, and <strong>leave whatever you can afford — even a dollar in pennies</strong>. Nobody in our neighborhood should go hungry. We are here to help our community.
            </p>
          </div>
          <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <span>💛</span> Always available at our 24/7 honor stand, 441 Millbrook Rd.
          </div>
        </div>
      </section>

      {/* Section 6: YouTube Promotion Banner */}
      <section className="text-center bg-red-50 dark:bg-red-950/20 p-8 rounded-3xl border-2 border-red-200 dark:border-red-900 shadow-xl space-y-4">
        <h3 className="font-handwritten text-4xl sm:text-5xl font-bold text-red-700 dark:text-red-400">
          Catch the Action on YouTube!
        </h3>
        <p className="text-sm sm:text-base text-stone-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
          Instead of keeping up with blog posts, we document all our farm antics, builds, and daily chores live on video. Subscribe to join our homestead family!
        </p>
        <a
          href="https://www.youtube.com/@sammiessimpleliving"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg py-3.5 px-8 rounded-full shadow-xl transform transition hover:scale-105 cursor-pointer"
        >
          <YoutubeIcon className="w-6 h-6" />
          <span>Subscribe to @sammiessimpleliving</span>
        </a>
      </section>
    </main>
  );
};

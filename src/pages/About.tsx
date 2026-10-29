import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { YoutubeIcon } from '../components/YoutubeIcon';
import { SEO } from '../components/SEO';
import { HeroBanner } from '../components/HeroBanner';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
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

      {/* Unified Hero Banner */}
      <HeroBanner
        bgImage="/assets/aistudio/PXL_20260529_141145648.MP_765d679f.jpg"
        bgAlt="Watchful farm geese at Flocking Reeds Farm in Grafton, NH"
        badgeText="The Flocking Reeds Family"
        title="Meet the Flock & Our Story"
        subtitle="We're Sammie & Nicky Reed. Married 15 years, cultivating a simple, honest life in the woods of Grafton, NH."
      />

      <main className="container mx-auto px-4 pt-2 sm:pt-4 pb-12 flex-grow max-w-4xl space-y-10 sm:space-y-12">

      {/* Section 1: The Story & How It Started */}
      <section className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-emerald-500/5">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative transform -rotate-1 hover:rotate-0 transition duration-500 p-2 bg-stone-50 dark:bg-[#0b131e] shadow-lg rounded-2xl border-2 border-emerald-500/50 dark:border-emerald-500/60 max-w-sm">
              <img
                src="/images/canoe-sign.webp"
                alt="Iconic canoe sign crafted by Nicky"
                loading="lazy"
                decoding="async"
                className="rounded-xl w-full h-72 object-cover"
              />
              <p className="text-center font-handwritten text-xs text-stone-600 dark:text-stone-400 mt-2">
                Our first farmstand sign, rescued and hand-painted from a neighbor's old canoe.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 space-y-3.5 text-left">
            <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
              Our Journey
            </span>
            <h2 className="font-handwritten text-3xl sm:text-4xl font-bold text-emerald-900 dark:text-emerald-300">
              From Struggle to Simplicity
            </h2>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Our journey hasn't been a smooth paved road. In 2019, life took an unexpected turn when Sammie became disabled with epilepsy and neurological health challenges. Nicky stepped away from conventional 9-to-5 employment to become her full-time caregiver.
            </p>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Rather than fighting the rat race, we decided to ground ourselves in the land. We started small, building from salvaged materials and caring for our animals. Today, our homestead has grown to <strong>over 60+ pasture-raised chickens</strong> and an expanding flock of Coturnix quail that we began with just 5 birds (4 hens and 1 rooster) to breed and hatch right here on the farm!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Division of Labor (Sammie & Nicky) */}
      <section className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-emerald-500/80 dark:border-emerald-500/80 shadow-emerald-500/5">
        <h2 className="font-handwritten text-4xl text-center mb-8 text-emerald-800 dark:text-emerald-300 font-bold">
          Who Does What?
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sammie */}
          <div className="flex flex-col items-center text-center p-5 bg-stone-50 dark:bg-[#0b131e] rounded-2xl border-2 border-emerald-500/50 dark:border-emerald-500/60 space-y-3">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-500/60">
              <img
                src="/images/sammie-chicks.webp"
                alt="Sammie feeding the flock"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-emerald-900 dark:text-emerald-300">Sammie</h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">
                The Heart & Animal Manager
              </p>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-sm">
              Sammie handles morning feedings, collects fresh eggs, cares for our quail and bunnies, and paints custom egg cartons. She films our daily life on her phone and edits every YouTube video to share with our online community.
            </p>
          </div>

          {/* Nicky */}
          <div className="flex flex-col items-center text-center p-5 bg-stone-50 dark:bg-[#0b131e] rounded-2xl border-2 border-sky-500/50 dark:border-sky-500/60 space-y-3">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md border-2 border-sky-500/60">
              <img
                src="/images/nicky-goose.webp"
                alt="Nicky hanging out with the geese"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-sky-900 dark:text-sky-300">Nicky</h3>
              <p className="text-xs text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                The Builder & Tech
              </p>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-sm">
              Nicky is the muscle, carpenter, and caregiver. He builds coops from upcycled pallets and trailers, clears woodland runs, stocks the farmstand, and coded this website. When something needs building or fixing, Nicky is on it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The 3 Core Homestead Pillars */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300/50">
            Our Homestead Values
          </span>
          <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-emerald-800 dark:text-emerald-300 mt-1">
            How We Raise Our Animals
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
            We hold ourselves to ethical standards that put the welfare of our animals first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white/95 dark:bg-[#132232]/95 p-6 rounded-2xl shadow-md border-2 border-emerald-500/50 dark:border-emerald-500/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 flex items-center justify-center font-bold text-xl">
              ❤️
            </div>
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-200">
              100% No-Kill Homestead
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Every single animal on our farm has a guaranteed home for life. When our hens age past their prime egg-laying years, they do not get culled. They retire peacefully, enjoying sunbaths and treats for the rest of their natural lives.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white/95 dark:bg-[#132232]/95 p-6 rounded-2xl shadow-md border-2 border-emerald-500/50 dark:border-emerald-500/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 flex items-center justify-center font-bold text-xl">
              🌿
            </div>
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-200">
              Pasture-Raised & Protected
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Our birds have access to large outdoor covered yards with fresh New Hampshire air, natural foraging, and clean pine shavings. Our quail enjoy dedicated sand baths and fresh forage to keep them healthy and thriving.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white/95 dark:bg-[#132232]/95 p-6 rounded-2xl shadow-md border-2 border-emerald-500/50 dark:border-emerald-500/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 flex items-center justify-center font-bold text-xl">
              🔨
            </div>
            <h3 className="font-bold text-lg text-emerald-900 dark:text-emerald-200">
              Upcycled Ingenuity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              We repurpose what others discard. From turning an old vintage camper into our chicken & quail coop, to building our farmstand sign from a fiberglass canoe, we craft a resilient, sustainable homestead without unnecessary waste.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Real Photo Gallery & Resident Stories */}
      <ResidentGallerySection />

      {/* Section 5: Community Roots, Canaan Hardware & Pay-What-You-Can Promise */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canaan Hardware */}
        <div className="bg-amber-50/90 dark:bg-amber-950/30 p-6 sm:p-7 rounded-3xl shadow-lg border-2 border-amber-500/60 dark:border-amber-500/70 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-300/50">
              Also in Canaan, NH
            </span>
            <h3 className="font-handwritten text-3xl font-bold text-amber-900 dark:text-amber-200">
              Eggs at Canaan Hardware Store
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              In addition to our roadside farmstand, we sell our farm fresh eggs with <strong>Canaan Hardware Store</strong> in Canaan, NH! They are great, helpful local folks where we buy our coop building materials, hardware, and farm feed.
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
        <div className="bg-emerald-50/90 dark:bg-emerald-950/40 p-6 sm:p-7 rounded-3xl shadow-lg border-2 border-emerald-500/60 dark:border-emerald-500/70 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300/50">
              Community First
            </span>
            <h3 className="font-handwritten text-3xl font-bold text-emerald-900 dark:text-emerald-200">
              Our "Pay What You Can" Promise
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              We understand times are rough, groceries are expensive, and not everyone has easy access to healthy protein.
            </p>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              If you or your family are in need and can't afford the regular cost of eggs, please feel free to stop by our 24/7 honor farmstand, grab a dozen fresh eggs, and <strong>leave whatever you can afford — even a dollar in pennies</strong>. Nobody in our neighborhood should go hungry. We are here to help our community.
            </p>
          </div>
          <div className="pt-2 border-t border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <span>💛</span> Always available at our 24/7 farmstand, 441 Millbrook Rd.
          </div>
        </div>
      </section>

      {/* Section 6: YouTube Promotion Banner */}
      <section className="text-center bg-white/95 dark:bg-[#132232]/95 p-8 rounded-3xl border-2 border-sky-500/80 dark:border-sky-500/80 shadow-xl space-y-4">
        <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-sky-800 dark:text-sky-300">
          Catch the Action on YouTube!
        </h2>
        <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 max-w-xl mx-auto leading-relaxed">
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
  </div>
);
};

/* Resident Data List - Harmonized Category Pill Badges, Titles & Authentic Homestead Stories */
const RESIDENTS_DATA = [
  {
    id: 'camper-coop',
    title: 'The Vintage Camper Coop',
    tag: 'Upcycled Coop Build',
    img: '/assets/aistudio/PXL_20260917_132453213_8e87d5b5.jpg',
    alt: 'Vintage Catalina camper converted into a warm chicken coop and recovery ward',
    story: 'Repurposed from an old vintage Catalina camper trailer, this insulated coop serves as the cozy winter home for our bantam chickens and Coturnix quail! It also doubles as our dedicated recovery ward for injured hens — including three sweet girls with a heavy limp in their step who receive extra TLC, deep pine shavings, and a peaceful place to rest.'
  },
  {
    id: 'main-coop-flock',
    title: 'Protected Main Coop Flock',
    tag: 'The Laying Flock',
    img: '/assets/aistudio/PXL_20260406_132637436_17af7e99.jpg',
    alt: 'Pasture-raised laying hens eating and drinking inside the main wooden coop',
    story: 'Our main wooden coop houses a vibrant mix of over 60 pasture-raised hens — from the very first chickens we ever raised to our newest layers! They spend their days foraging naturally and are watched over by our head rooster, carrying on the legacy of several brave roosters who have protected the flock over the years.'
  },
  {
    id: 'coturnix-quail',
    title: 'Nutella, Toast & The Quail',
    tag: 'Coturnix Quail',
    img: '/assets/aistudio/PXL_20260917_133046258_1f146885.jpg',
    alt: 'Close-up of Japanese Coturnix Quail Nutella in clean pine shavings',
    story: 'Our Coturnix quail flock started with five named birds that we breed and hatch right here on the homestead! Pictured here is Nutella — a feisty little hen who prefers her own private quarters away from the others — while our handsome rooster, Toast, looks after the rest of the covey.'
  },
  {
    id: 'white-geese',
    title: 'Hecate the Embden Goose',
    tag: 'Waterfowl Guardian',
    img: '/assets/aistudio/PXL_20260529_141145648.MP_765d679f.jpg',
    alt: 'White Embden guardian goose Hecate standing watch over the farmyard',
    story: 'Meet Hecate, our proud male Embden guardian goose! He is fiercely devoted to his mommy (Sammie) and suspicious of just about everyone else. With his booming honk and watchful eye, Hecate is our loudest barnyard alarm system and keeps constant guard over the flock.'
  },
  {
    id: 'pasture-goose',
    title: 'Persephone the Sebastopol',
    tag: 'Pasture Waterfowl',
    img: '/assets/aistudio/PXL_20260529_141207855.MP_0157eeec.jpg',
    alt: 'Persephone the curly-feathered Sebastopol farm goose',
    story: 'Named after the Greek goddess, Persephone is our gentle, curly-feathered Sebastopol goose and Hecate\'s devoted mate! The two patrol the pasture side by side, and we are excited to pair them together to hatch future goslings here on the farm.'
  },
  {
    id: 'barn-cat',
    title: 'Belladonna the Barn Cat',
    tag: 'Homestead Mouser',
    img: '/assets/aistudio/PXL_20261007_161533335_8fe70700.jpg',
    alt: 'Belladonna the tuxedo farm cat resting in autumn leaves',
    story: 'Belladonna is the newest addition to our homestead cat family! Named after the nightshade plant, she earns her full name — Belladonna Nightshade Reed — whenever she is getting into mischief. Spirited, curious, and full of spice, her name fits her personality to a tee!'
  },
  {
    id: 'aussie-guardian',
    title: 'Gemma the Mini Aussie',
    tag: 'Farm Dog & Companion',
    img: '/assets/aistudio/PXL_20261007_161441565.MP_01ab5372.jpg',
    alt: 'Gemma the Mini Australian Shepherd resting by the firewood stack in autumn',
    story: 'Sweet Gemma is our loyal Miniature Australian Shepherd! While her full-grown Aussie brother takes on the heavy livestock guardian duties around the perimeter, Gemma stays right by our side during daily chores as the ultimate homestead companion.'
  },
  {
    id: 'homestead-bunnies',
    title: 'Jolene the Homestead Bunny',
    tag: 'Homestead Rabbits',
    img: '/assets/aistudio/PXL_20260811_202438351_75faae4a.jpg',
    alt: 'Jolene the grey homestead rabbit relaxing in fresh hay',
    story: 'Meet Jolene, our expressive and chatty homestead rabbit! She can act a little grumpy and loves to "talk" with funny little grunts, but she is endlessly cuddly and affectionate once she knows you. She spends her days munching fresh hay and carrots while watching the chickens go by.'
  }
];

/* Component: ResidentGallerySection with Resident Spotlight Modal / Lightbox */
const ResidentGallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + RESIDENTS_DATA.length) % RESIDENTS_DATA.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % RESIDENTS_DATA.length
    );
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation & Esc key handler
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll when modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  const activeResident = selectedIndex !== null ? RESIDENTS_DATA[selectedIndex] : null;

  return (
    <section className="bg-white/95 dark:bg-[#132232]/95 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-emerald-500/80 dark:border-emerald-500/80 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border-b border-emerald-100 dark:border-emerald-900/50 pb-4">
        <div>
          <h2 className="font-handwritten text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 justify-center sm:justify-start">
            <span>Meet the Residents & Guardians</span>
            <Sparkles className="w-6 h-6 text-amber-500 hidden sm:inline" />
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
            Click any resident photo card below to open their full personal story & photo spotlight!
          </p>
        </div>
      </div>

      {/* Uniform 4-Column Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {RESIDENTS_DATA.map((resident, idx) => (
          <div
            key={resident.id}
            onClick={() => setSelectedIndex(idx)}
            className="group relative rounded-2xl overflow-hidden shadow-md border-2 border-emerald-500/50 dark:border-emerald-500/60 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col bg-stone-50/80 dark:bg-[#0b131e]/80 cursor-pointer transform hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-48 sm:h-52">
              <img
                src={resident.img}
                alt={resident.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:from-black/90 transition duration-300" />

              {/* Category Tag Badge */}
              <span className="absolute top-2.5 left-2.5 bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40 shadow">
                {resident.tag}
              </span>

              {/* Animal Title Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white font-bold text-base drop-shadow-md">
                {resident.title}
              </div>
            </div>

            {/* Bottom Interactive Action Prompt */}
            <div className="w-full px-3 py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 group-hover:bg-emerald-500/20 dark:bg-emerald-950/40 dark:group-hover:bg-emerald-900/60 transition flex items-center justify-between border-t border-emerald-500/30">
              <span className="flex items-center gap-1.5">
                <span>✨ Read Story & View Photo</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resident Spotlight Modal / Lightbox Popup */}
      {activeResident && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-stone-900/95 dark:bg-[#132232] text-stone-100 rounded-3xl border-2 border-emerald-500/80 shadow-2xl flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white hover:bg-emerald-600 transition cursor-pointer border border-white/10 shadow-lg"
              title="Close Spotlight (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Top: High-Impact Photo View */}
            <div className="md:w-1/2 bg-black/60 flex items-center justify-center p-4 relative min-h-[240px] sm:min-h-[320px]">
              <img
                src={activeResident.img}
                alt={activeResident.alt}
                loading="lazy"
                decoding="async"
                className="w-full max-h-[380px] object-contain rounded-2xl shadow-xl border border-emerald-500/30"
              />
              <span className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                📸 Flocking Reeds Farm Photo
              </span>
            </div>

            {/* Right/Bottom: Story & Details */}
            <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <span className="inline-block bg-emerald-950/90 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
                  {activeResident.tag}
                </span>
                <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-emerald-300 leading-tight">
                  {activeResident.title}
                </h3>

                <div className="p-4 rounded-2xl bg-stone-900/60 dark:bg-[#0b131e]/80 border border-emerald-500/30 text-stone-200 text-xs sm:text-sm leading-relaxed space-y-2">
                  <p className="whitespace-pre-line">{activeResident.story}</p>
                </div>
              </div>

              {/* Modal Bottom Navigation Controls */}
              <div className="pt-4 border-t border-emerald-500/30 flex items-center justify-between gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition border border-emerald-500/40 cursor-pointer"
                  title="Previous Resident (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <span className="text-xs font-bold text-stone-400 tracking-wider">
                  {selectedIndex + 1} of {RESIDENTS_DATA.length}
                </span>

                <button
                  onClick={handleNext}
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition border border-emerald-500/40 cursor-pointer"
                  title="Next Resident (Right Arrow)"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


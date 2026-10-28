import React from 'react';
import { useFarm } from '../context/FarmContext';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Privacy: React.FC = () => {
  const { setCurrentPage } = useFarm();

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl text-stone-800 dark:text-stone-200">
      <SEO
        title="Privacy Policy | Flocking Reeds Farm"
        description="Privacy policy and data handling summary for Flocking Reeds Farm in Grafton, NH. We do not sell data or track visitors."
        canonicalUrl="https://flockingreeds.farm/privacy"
      />

      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-farm-green dark:text-green-400 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="bg-[#FEF9E7] dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border-4 border-stone-300 dark:border-gray-700 space-y-6 text-left">
        <div className="flex items-center gap-3 border-b border-stone-200 dark:border-gray-700 pb-4">
          <ShieldCheck className="w-8 h-8 text-farm-green dark:text-green-400 flex-shrink-0" />
          <div>
            <h1 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Flocking Reeds Farm • Grafton, NH • Last updated: October 2026
            </p>
          </div>
        </div>

        <section className="space-y-2 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-handwritten text-[#3E2723] dark:text-yellow-400">
            Zero Data Monetization
          </h2>
          <p>
            Flocking Reeds Farm is an independent family homestead in Grafton, NH. We do not sell, rent, trade, or share visitor data or email addresses with third parties under any circumstances.
          </p>
        </section>

        <section className="space-y-2 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-handwritten text-[#3E2723] dark:text-yellow-400">
            Contact Form Submissions
          </h2>
          <p>
            When you send a message through our Contact page, your name, email, topic, and message are securely submitted via Web3Forms directly to Nicky & Sammie's farm email inbox (support@flockingreeds.farm). This info is exclusively used to answer your question.
          </p>
        </section>

        <section className="space-y-2 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-handwritten text-[#3E2723] dark:text-yellow-400">
            Honor Stand & Payment Processing Privacy
          </h2>
          <p>
            Cash payments at our Millbrook Road honor stand are completely anonymous. Digital payments and eGift card purchases via Square, Venmo, Cash App, or PayPal are processed securely directly by those payment providers under their privacy policies.
          </p>
        </section>

        <section className="space-y-2 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-handwritten text-[#3E2723] dark:text-yellow-400">
            Contact Us
          </h2>
          <p>
            If you have any questions about this privacy policy, text Nicky at <strong>(603) 729-3568</strong> or email <strong>support@flockingreeds.farm</strong> or <strong>nicky@flockingreeds.farm</strong>.
          </p>
        </section>
      </div>
    </main>
  );
};

import React from 'react';
import { useFarm } from '../context/FarmContext';
import { ArrowLeft, CheckCircle, ShieldAlert, AlertTriangle, Heart } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Terms: React.FC = () => {
  const { setCurrentPage } = useFarm();

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl text-stone-800 dark:text-stone-200">
      <SEO
        title="Terms of Service & Stand Guidelines | Flocking Reeds Farm"
        description="Terms of service, no-refunds policy, property liability waiver, and roadside honor stand guidelines for Flocking Reeds Farm in Grafton, NH."
        canonicalUrl="https://flockingreeds.farm/tos"
      />

      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-farm-green dark:text-green-400 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="bg-[#FEF9E7] dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border-4 border-stone-300 dark:border-gray-700 space-y-6 text-left">
        <div className="flex items-center gap-3 border-b border-stone-200 dark:border-gray-700 pb-4">
          <CheckCircle className="w-8 h-8 text-farm-green dark:text-green-400 flex-shrink-0" />
          <div>
            <h1 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2E4A35] dark:text-green-400">
              Terms of Service & Property Policy
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Flocking Reeds Farm • 441 Millbrook Rd, Grafton, NH 03240 • Last updated: October 2026
            </p>
          </div>
        </div>

        {/* 1. All Sales & Donations Are 100% Final (No Refunds) */}
        <section className="bg-amber-50/80 dark:bg-amber-950/40 p-4 sm:p-5 rounded-2xl border-2 border-amber-300 dark:border-amber-800/60 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0" />
            <h2 className="text-lg font-bold font-handwritten text-stone-900 dark:text-yellow-200">
              Strict No-Refunds Policy (All Sales & Donations Are 100% Final)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            All purchases (chicken eggs, quail eggs, baked goods, crafts, eGift cards) and digital tips/donations sent via Square, Venmo, Cash App, or PayPal are <strong>100% final and strictly non-refundable</strong>.
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic">
            As a small family homestead living paycheck-to-paycheck, incoming funds are immediately used within days to purchase poultry grain feed, clean pine shavings, and farm upkeep. Please confirm items are in the stand cooler before making digital payments. Unmemoed transfers via Venmo, Cash App, or PayPal default to direct, non-refundable homestead tips.
          </p>
        </section>

        {/* 2. Property Liability Waiver & Hold Harmless */}
        <section className="bg-red-50/80 dark:bg-red-950/30 p-4 sm:p-5 rounded-2xl border-2 border-red-200 dark:border-red-900/50 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <h2 className="text-lg font-bold font-handwritten text-red-900 dark:text-red-300">
              Property Visit Liability Waiver & Hold Harmless
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            When entering the driveway or visiting our roadside honor stand at 441 Millbrook Rd in Grafton, NH, you enter and remain on the property <strong>strictly at your own risk</strong>.
          </p>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Flocking Reeds Farm, its owners (Nicky & Sammie Reed), and operators assume <strong>zero liability</strong> for any slip-and-fall accidents, personal injuries, trips, vehicle or property damage, weather-related hazards (gravel, mud, ice, snow, unpaved surfaces), or animal interactions while on the premises. Please watch your step and exercise care when pulling into the driveway.
          </p>
        </section>

        {/* 3. Roadside Honor System */}
        <section className="space-y-2 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-handwritten text-[#3E2723] dark:text-yellow-400">
            24/7 Roadside Honor Farmstand Guidelines
          </h2>
          <p>
            Our farmstand is open 24/7 on an honor system built on community trust. Please close all insulated cooler lids securely after taking your eggs to protect them from weather and wildlife. Drop exact cash into the locked metal honor box or use Square, Venmo, Cash App, or PayPal.
          </p>
        </section>

        {/* 4. Farm-Fresh Agricultural Products & Egg Care */}
        <section className="space-y-2 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-handwritten text-[#3E2723] dark:text-yellow-400">
            Unwashed Agricultural Egg Products
          </h2>
          <p>
            Our chicken and Coturnix quail eggs are unwashed farm-fresh eggs with their protective natural bloom intact. Look at the handwritten collection date on the inside carton lid. Only wash eggs right before cooking with warm running water (never soak in cold water). Refrigerate upon washing and cook thoroughly.
          </p>
        </section>

        {/* 5. Contact Info */}
        <div className="pt-4 border-t border-stone-200 dark:border-gray-700 text-xs text-stone-500 dark:text-stone-400">
          For questions regarding these terms, text Nicky directly at <strong>(603) 729-3568</strong> or email <strong>support@flockingreeds.farm</strong>.
        </div>
      </div>
    </main>
  );
};

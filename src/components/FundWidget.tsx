import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sparkles, Heart, CreditCard, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SquareDonations } from '../types';

export const FundWidget: React.FC = () => {
  const { squareData } = useFarm();

  const donations: SquareDonations = squareData?.donations || {
    campaignName: "2026 Homestead Feed & Bedding Fund",
    totalRaised: 1133.00,
    goal: 2500.00,
    transactionCount: 14,
    currency: "USD",
    recentSupporters: [
      {
        id: "tx-14",
        name: "Homestead Supporter",
        amount: 200.00,
        date: "2026-03-24",
        note: "Feed and flock winter bedding support"
      },
      {
        id: "tx-13",
        name: "Local NH Neighbor",
        amount: 100.00,
        date: "2026-03-20",
        note: "For the hard-working laying hens"
      },
      {
        id: "tx-12",
        name: "YouTube Channel Fan",
        amount: 100.00,
        date: "2026-03-12",
        note: "Love Sammie's videos, keep going!"
      },
      {
        id: "tx-11",
        name: "Stand Visitor",
        amount: 50.00,
        date: "2026-03-05",
        note: "Best fresh eggs in Grafton"
      }
    ]
  };

  const percentComplete = Math.min(Math.round((donations.totalRaised / donations.goal) * 100), 100);

  return (
    <div className="bg-[#FEF9E7] dark:bg-gray-800 rounded-3xl p-6 sm:p-7 border-4 border-amber-400/80 dark:border-amber-600/70 shadow-xl space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-amber-200 dark:border-gray-700 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-200 dark:bg-amber-950 px-3 py-1 rounded-full">
            🌾 Community Homestead Fund
          </span>
          <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-[#2E4A35] dark:text-yellow-100 mt-1">
            {donations.campaignName}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
            Helps feed 60+ pasture-raised hens and quail, purchase fresh cedar/pine bedding, and maintain predator-proof coops through harsh New England seasons.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-900/80 px-4 py-2.5 rounded-2xl border border-amber-200 dark:border-gray-700 shadow-xs flex items-center gap-2 flex-shrink-0">
          <Users className="w-4 h-4 text-amber-700 dark:text-yellow-400" />
          <div className="text-left">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block uppercase font-bold">Supporters</span>
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{donations.transactionCount} Contributions</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Amount Stats */}
      <div className="bg-white/90 dark:bg-gray-900/70 p-5 rounded-2xl border border-amber-200 dark:border-gray-700 space-y-3">
        <div className="flex flex-wrap justify-between items-baseline gap-2">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-yellow-400 font-mono">
              ${donations.totalRaised.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 ml-1.5">
              raised of ${donations.goal.toLocaleString('en-US', { minimumFractionDigits: 2 })} goal
            </span>
          </div>
          <span className="font-bold text-xs sm:text-sm text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full">
            {percentComplete}% Funded
          </span>
        </div>

        {/* Progress bar track */}
        <div className="w-full h-4 bg-stone-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-green-500 rounded-full transition-all duration-1000 ease-out shadow-xs"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <span>Every dollar goes directly into bags of non-GMO layer feed & pine shavings from Canaan Hardware & Supply.</span>
        </p>
      </div>

      {/* Recent Supporters List */}
      <div className="space-y-2.5">
        <h4 className="font-handwritten text-xl font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>Recent Community Backers:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {donations.recentSupporters.map((supporter) => (
            <div
              key={supporter.id}
              className="p-3 rounded-xl bg-white/80 dark:bg-gray-900/50 border border-stone-200 dark:border-gray-700 text-xs space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {supporter.name}
                </span>
                <span className="font-mono font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/70 px-2 py-0.5 rounded">
                  +${supporter.amount.toFixed(2)}
                </span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 italic text-[11px]">
                "{supporter.note}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Donation CTA Button (Directs to Square with notice of other options below) */}
      <div className="pt-2">
        <a
          href="https://square.link/u/uIosE4M7"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-col items-center justify-center p-4 rounded-2xl bg-[#FACC15] hover:bg-yellow-400 text-stone-900 font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-center cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-black">
            <CreditCard className="w-5 h-5 flex-shrink-0" />
            <span>Click Here to Donate Using Square</span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
            Supports Apple Pay, Google Pay, Cash App Pay & Afterpay
          </span>
          <span className="text-[11px] text-stone-700 italic mt-0.5 font-normal">
            (💡 Other payment options listed below)
          </span>
        </a>
      </div>
    </div>
  );
};

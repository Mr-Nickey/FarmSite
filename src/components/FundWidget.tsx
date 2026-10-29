import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Sparkles, Heart, CreditCard, Users, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { SquareDonations } from '../types';

export const FundWidget: React.FC = () => {
  const { squareData } = useFarm();

  const donations: SquareDonations = squareData?.donations || {
    campaignName: "2026 Winter Preparedness & Predator-Proofing Fund",
    totalRaised: 1420.00,
    goal: 3000.00,
    transactionCount: 18,
    currency: "USD",
    recentSupporters: [
      {
        id: "tx-18",
        name: "Community Flock Supporter",
        amount: 200.00,
        date: "2026-10-24",
        note: "Hardware cloth & mink predator-proofing"
      },
      {
        id: "tx-17",
        name: "Local NH Neighbor",
        amount: 100.00,
        date: "2026-10-20",
        note: "Stay warm and safe before the first snowfall!"
      },
      {
        id: "tx-16",
        name: "YouTube Channel Fan",
        amount: 100.00,
        date: "2026-10-12",
        note: "For winter feed and pine shavings for the coops"
      },
      {
        id: "tx-15",
        name: "Stand Visitor",
        amount: 50.00,
        date: "2026-10-05",
        note: "Coop repair fund & winter flock care"
      }
    ]
  };

  const percentComplete = Math.min(Math.round((donations.totalRaised / donations.goal) * 100), 100);

  return (
    <div className="bg-white/95 dark:bg-[#132232]/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-500/80 dark:border-amber-500/80 shadow-xl shadow-amber-500/5 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-amber-200 dark:border-amber-900/60 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-300/50">
            🌾 2026 Winter Preparedness Fund
          </span>
          <h3 className="font-handwritten text-3xl sm:text-4xl font-bold text-amber-900 dark:text-amber-200 mt-1">
            {donations.campaignName}
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-2 leading-relaxed">
            <strong>The Backstory:</strong> Earlier this season, a mink broke into our big wooden main coop and tragically took 8 of our sweet laying hens. Devastated, we immediately used our savings and community support to purchase heavy-duty 1/2-inch hardware cloth, secure latches, and reinforced coop framing. Now, as our first New Hampshire snowfall approaches, every dollar helps complete coop winter-proofing, buy fresh pine shavings, and stock non-GMO layer grain for our 60+ pasture-raised birds!
          </p>
        </div>

        <div className="bg-stone-50 dark:bg-[#0b131e] px-4 py-2.5 rounded-2xl border-2 border-amber-500/50 dark:border-amber-500/60 shadow-xs flex items-center gap-2 flex-shrink-0">
          <Users className="w-4 h-4 text-amber-700 dark:text-amber-300" />
          <div className="text-left">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 block uppercase font-bold">Supporters</span>
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{donations.transactionCount} Contributions</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Amount Stats */}
      <div className="bg-stone-50 dark:bg-[#0b131e] p-5 rounded-2xl border-2 border-amber-500/50 dark:border-amber-500/60 space-y-3">
        <div className="flex flex-wrap justify-between items-baseline gap-2">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-amber-300 font-mono">
              ${donations.totalRaised.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 ml-1.5">
              raised of ${donations.goal.toLocaleString('en-US', { minimumFractionDigits: 2 })} goal
            </span>
          </div>
          <span className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300/50">
            {percentComplete}% Funded
          </span>
        </div>

        {/* Progress bar track */}
        <div className="w-full h-4 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden shadow-inner p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-xs"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
              className="p-3 rounded-xl bg-white dark:bg-[#0b131e] border-2 border-amber-500/40 dark:border-amber-500/50 text-xs space-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {supporter.name}
                </span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
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

      {/* Primary Donation CTA Button */}
      <div className="pt-2 space-y-3">
        <a
          href="https://square.link/u/uIosE4M7"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-900 font-extrabold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 text-center cursor-pointer border-2 border-amber-500/80"
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

        {/* Donation Reflection Timeframe Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-500/60 dark:border-amber-500/70 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5 shadow-2xs">
          <Clock className="w-4 h-4 text-amber-800 dark:text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-left">
            <span className="font-bold text-amber-900 dark:text-amber-200 block">
              ⏳ Note on Donation Tracker Updates:
            </span>
            <p className="text-[11px] sm:text-xs text-amber-900/90 dark:text-amber-200/90 leading-snug">
              Online donations (Square, Venmo, Cash App, PayPal) and honor box cash are manually synced once daily. Please allow <strong>24–48 hours</strong> for your support to reflect on the website progress bar and community backer list. Thank you so much for your patience and support!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

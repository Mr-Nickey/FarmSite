import React from 'react';

interface HeroBannerProps {
  bgImage: string;
  bgAlt: string;
  badgeText: string;
  title: string;
  subtitle: string;
  logoUrl?: string;
  logoAlt?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  bgImage,
  bgAlt,
  badgeText,
  title,
  subtitle,
  logoUrl,
  logoAlt,
}) => {
  return (
    <div className="relative w-full max-h-[380px] sm:max-h-[420px] min-h-[260px] sm:min-h-[320px] flex flex-col justify-center items-center text-center px-4 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 overflow-hidden">
      {/* Background Image with Scrim Overlay & Bottom Fade Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={bgAlt}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
        {/* High-contrast dark gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        
        {/* Bottom vertical gradient fade dissolving into light/dark page background */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#f4f7f4] dark:from-[#0b131e] via-[#f4f7f4]/75 dark:via-[#0b131e]/75 to-transparent pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {logoUrl && (
          <img
            src={logoUrl}
            alt={logoAlt || 'Flocking Reeds Farm Logo - Grafton, NH'}
            fetchPriority="high"
            decoding="async"
            className="w-24 sm:w-32 md:w-36 drop-shadow-2xl mb-2 sm:mb-3 hover:scale-105 transition duration-500 bg-white/20 rounded-full p-2 sm:p-3 backdrop-blur-sm border-2 border-white/40"
          />
        )}

        <span className="text-amber-300 font-semibold text-[11px] sm:text-xs uppercase tracking-widest bg-black/60 backdrop-blur-xs px-3.5 py-1 rounded-full mb-2 border border-amber-300/40 shadow-sm">
          {badgeText}
        </span>

        <h1 className="font-handwritten text-3xl sm:text-5xl md:text-6xl font-bold text-emerald-400 mb-1.5 sm:mb-2 drop-shadow-lg leading-tight">
          {title}
        </h1>

        <p className="text-xs sm:text-base md:text-lg text-sky-100 font-medium drop-shadow-md max-w-2xl leading-snug sm:leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

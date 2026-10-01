import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { VENUE, PARKING } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const DirectionsSection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 64,
    scale: 0.94,
    blur: 9,
    start: 'top 90%',
    end: 'top 45%',
  });

  const isIOS = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /iP(hone|od|ad)/.test(navigator.userAgent);
  }, []);

  const getNavigationUrl = (lat: number, lng: number) => {
    if (isIOS) {
      return `maps://maps.apple.com/?daddr=${lat},${lng}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  return (
    <section className="w-full px-6 py-14 flex flex-col items-center bg-white">
      <div ref={revealRef} className="w-full max-w-md flex flex-col items-center gap-5">
        {/* Eyebrow */}
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8c3e20]">
          Dojazd
        </span>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          {/* 1. Navigate to Venue */}
          <a
            href={getNavigationUrl(VENUE.lat, VENUE.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-[18px] bg-[#b8552f] hover:bg-[#8c3e20] active:scale-[0.98] text-white px-5 py-4 flex items-center justify-between transition-all shadow-sm"
          >
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-bold">Nawiguj do restauracji</span>
              <span className="text-[12.5px] text-white/75 mt-0.5">{VENUE.name}</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
          </a>

          {/* 2. Navigate to Parking */}
          <a
            href={getNavigationUrl(PARKING.lat, PARKING.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-[18px] bg-white border border-[#211d1a24] hover:bg-neutral-50 active:scale-[0.98] text-[#211d1a] px-5 py-4 flex items-center justify-between transition-all"
          >
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-bold">Nawiguj na parking</span>
              <span className="text-[12.5px] text-[#8a8172] mt-0.5">{PARKING.name}</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#8a8172] shrink-0 stroke-[2.5]" />
          </a>
        </div>

        {/* Tip text */}
        <p className="text-[14px] leading-relaxed text-[#8a8172] text-center max-w-sm mt-1">
          {PARKING.tip}
        </p>
      </div>
    </section>
  );
};

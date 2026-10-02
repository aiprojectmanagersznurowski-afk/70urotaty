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

  const getNavigationUrl = (destination: string) => {
    const encoded = encodeURIComponent(destination);
    if (isIOS) {
      return `maps://maps.apple.com/?daddr=${encoded}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
  };

  return (
    <section className="w-full px-4 sm:px-6 py-14 flex flex-col items-center bg-white">
      <div ref={revealRef} className="w-full max-w-[500px] sm:max-w-xl flex flex-col items-center gap-5">
        {/* Eyebrow */}
        <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta-deep)]">
          Dojazd
        </span>

        {/* Navigation Button */}
        <div className="w-full flex flex-col gap-3">
          <a
            href={getNavigationUrl(VENUE.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-[20px] bg-[var(--color-terracotta)] hover:opacity-95 active:scale-[0.98] text-white px-6 py-4 flex items-center justify-between transition-all shadow-sm"
          >
            <div className="flex flex-col text-left">
              <span className="text-[16px] sm:text-[17px] font-bold">Nawiguj do restauracji</span>
              <span className="text-[13.5px] text-white/80 mt-0.5">{VENUE.address}</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
          </a>
        </div>

        {/* Tip text */}
        <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[var(--color-muted)] text-center max-w-md mt-1">
          {PARKING.tip}
        </p>
      </div>
    </section>
  );
};

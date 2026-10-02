import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PHOTOS } from '../config';

export const FullWidthImageSection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 90,
    scale: 0.92,
    blur: 12,
    start: 'top 95%',
    end: 'top 30%',
    scrub: 0.5,
  });

  return (
    <section className="w-full overflow-hidden bg-white">
      <div ref={revealRef} className="relative w-full">
        <img
          src={PHOTOS.hero}
          alt="Stanisław z rodziną"
          loading="lazy"
          className="w-full h-[80svh] object-cover object-[22%_center] sm:object-center"
        />
        {/* Delikatna poświata po prawej (desktop) / u góry (mobile) dla czytelności tekstu */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/10 to-transparent sm:bg-gradient-to-l sm:from-white/60 sm:via-white/15 sm:to-transparent" />
        <div className="absolute inset-x-0 top-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-1/2 flex items-start sm:items-center justify-end px-5 pt-8 sm:px-10 lg:px-16 sm:pt-0">
          <p className="font-display uppercase font-extrabold text-right leading-[1.05] tracking-[0.06em] text-[clamp(24px,6.8vw,60px)] max-w-[15ch] sm:max-w-[14ch] text-[var(--color-ink)] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
            Nie mogę się doczekać, jak zobaczę nas wszystkich{' '}
            <span className="text-[var(--color-terracotta)]">przy jednym stole</span>
          </p>
        </div>
      </div>
    </section>
  );
};

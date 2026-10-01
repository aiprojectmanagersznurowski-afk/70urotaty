import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENT, VENUE, PHOTOS } from '../config';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        autoAlpha: 0.1,
        scale: 0.92,
        y: -36,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[calc(100svh-50px)] flex flex-col justify-between items-center px-4 sm:px-6 pt-3 pb-5 overflow-hidden bg-white select-none"
    >
      {/* 1. Eyebrow bar */}
      <div className="w-full max-w-[500px] sm:max-w-xl flex items-center justify-between anim-rise-eyebrow text-[11px] sm:text-[12.5px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase px-1">
        <span className="text-[var(--color-terracotta-deep)] shrink-0">{EVENT.eventType}</span>
        <span className="text-[var(--color-muted)] shrink-0">
          {VENUE.shortName.replace('Restauracja ', '')}<span className="hidden sm:inline"> • Wierzbna</span>
        </span>
      </div>

      {/* 2. Main Center Hero Content (wider + enlarged typography + asymmetric photo positioning) */}
      <div
        ref={contentRef}
        className="w-full max-w-[500px] sm:max-w-xl flex flex-col items-center my-auto py-1"
      >
        {/* Photo: enlarged +40%, shifted lower & to the left so "Zapraszam na" starts at 50% */}
        <div className="w-full flex justify-start pl-0 mb-[-55px] sm:mb-[-70px] relative z-10 pointer-events-none">
          <div className="relative w-[230px] sm:w-[280px] h-[215px] sm:h-[260px] -translate-x-10 sm:-translate-x-14">
            {/* Dynamic theme warm glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(closest-side, var(--theme-glow, rgba(194, 142, 58, 0.45)) 0%, transparent 75%)',
                filter: 'blur(28px)',
                opacity: 0.6,
                transform: 'scale(1.2)',
              }}
            />
            {/* Cutout portrait with cake and candles */}
            <img
              src={PHOTOS.portrait}
              alt={`${EVENT.hostName} z tortem urodzinowym`}
              className="w-full h-full object-contain anim-portrait-in relative z-10 drop-shadow-md"
            />
          </div>
        </div>

        {/* Text Group: "Zapraszam na" starts at 50% of the photo height! */}
        <div className="relative z-20 w-full flex flex-col items-center text-center">
          {/* "ZAPRASZAM NA" - enlarged +40% with wider tracking and clean shadow */}
          <span className="font-display text-[18px] sm:text-[21px] uppercase tracking-[0.28em] font-extrabold text-[var(--color-muted)] mb-0.5 anim-reveal-intro drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
            Zapraszam na
          </span>

          {/* Hand-drawn geometric SVG digits for 70 - enlarged +40% and widened */}
          <div className="flex items-center justify-center gap-2.5 my-0.5">
            {/* Digit 7 */}
            <div className="anim-pop-num-1">
              <svg
                viewBox="0 0 84 128"
                className="w-[62px] h-[104px] sm:w-[76px] sm:h-[128px]"
                aria-hidden="true"
              >
                <path
                  d="M 12 14 H 72 L 28 122"
                  fill="none"
                  stroke="var(--theme-num-1, var(--color-ink))"
                  strokeWidth="16"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>

            {/* Digit 0 */}
            <div className="anim-pop-num-2">
              <svg
                viewBox="0 0 84 128"
                className="w-[62px] h-[104px] sm:w-[76px] sm:h-[128px]"
                aria-hidden="true"
              >
                <rect
                  x="14"
                  y="14"
                  width="56"
                  height="100"
                  rx="28"
                  fill="none"
                  stroke="var(--theme-num-2, var(--color-terracotta))"
                  strokeWidth="16"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </div>

          {/* Title: URODZINY STANISŁAWA - enlarged +40%, stacked on mobile for perfect responsiveness */}
          <h1 className="font-display text-[44px] xs:text-[50px] sm:text-[66px] font-extrabold uppercase leading-[0.88] tracking-wide mt-1 mb-3 anim-reveal-title flex flex-col sm:flex-row items-center justify-center sm:gap-3">
            <span className="text-[var(--color-ink)]">Urodziny</span>
            <span className="text-[var(--color-terracotta)]">{EVENT.hostFirstNameGen}</span>
          </h1>

          {/* Line - widened */}
          <div className="w-16 h-[3px] rounded-full bg-[var(--color-terracotta)] mb-3 anim-grow-line origin-center" />

          {/* Date line - enlarged +40% */}
          <p className="text-[15.5px] sm:text-[17.5px] leading-relaxed text-[var(--color-muted)] max-w-[340px] anim-rise-date">
            {EVENT.dateLabel}, {EVENT.weekdayLabel}, godz.{' '}
            <strong className="font-bold text-[var(--color-ink)]">{EVENT.timeLabel}</strong>
          </p>
        </div>
      </div>

      {/* 3. Bottom Scroll Indicator */}
      <div className="anim-scroll-cue flex flex-col items-center gap-1.5 pb-2 text-[var(--color-muted)]">
        <span className="text-[12px] font-bold uppercase tracking-[0.18em]">
          Przewiń
        </span>
        <svg
          className="w-4 h-4 stroke-[var(--color-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

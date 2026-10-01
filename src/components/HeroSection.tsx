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
      className="relative w-full min-h-svh flex flex-col justify-between items-center px-6 pt-7 pb-6 overflow-hidden bg-white select-none"
    >
      {/* 1. Eyebrow bar */}
      <div className="w-full max-w-md flex items-center justify-between anim-rise-eyebrow text-[11px] font-bold tracking-[0.14em] uppercase">
        <span className="text-[#8c3e20]">{EVENT.eventType}</span>
        <span className="text-[#8a8172]">{VENUE.shortName}</span>
      </div>

      {/* 2. Main Center Hero Content */}
      <div
        ref={contentRef}
        className="w-full max-w-md flex flex-col items-center text-center my-auto py-4"
      >
        {/* Portrait with soft mask & terracotta blur underlay */}
        <div className="relative w-[132px] h-[152px] mb-5 flex items-center justify-center">
          {/* Underlying warm glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(closest-side, #b8552f 0%, transparent 72%)',
              filter: 'blur(34px)',
              opacity: 0.55,
              transform: 'scale(1.35)',
            }}
          />
          {/* Cutout portrait with soft radial mask */}
          <img
            src={PHOTOS.portrait}
            alt={EVENT.hostName}
            className="w-full h-full object-cover object-top portrait-soft-mask anim-portrait-in relative z-10"
          />
        </div>

        {/* Eyebrow intro: "ZAPRASZAM NA" */}
        <span className="font-['Big_Shoulders_Display'] text-[13px] uppercase tracking-[0.3em] font-extrabold text-[#8a8172] mb-1.5 anim-reveal-intro">
          Zapraszam na
        </span>

        {/* Hand-drawn geometric SVG digits for 70 */}
        <div className="flex items-center justify-center gap-2 my-1">
          {/* Digit 7 - Ink */}
          <div className="anim-pop-num-1">
            <svg
              viewBox="0 0 76 128"
              className="w-[52px] h-[88px] sm:w-[58px] sm:h-[98px]"
              aria-hidden="true"
            >
              <path
                d="M 12 14 H 64 L 24 122"
                fill="none"
                stroke="#211d1a"
                strokeWidth="16"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>

          {/* Digit 0 - Terracotta */}
          <div className="anim-pop-num-2">
            <svg
              viewBox="0 0 76 128"
              className="w-[52px] h-[88px] sm:w-[58px] sm:h-[98px]"
              aria-hidden="true"
            >
              <rect
                x="14"
                y="14"
                width="48"
                height="100"
                rx="24"
                fill="none"
                stroke="#b8552f"
                strokeWidth="16"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>

        {/* Title: URODZINY STANISŁAWA */}
        <h1 className="font-['Big_Shoulders_Display'] text-[42px] sm:text-[48px] font-extrabold uppercase leading-[0.88] tracking-tight mt-1 mb-3.5 anim-reveal-title">
          <span className="text-[#211d1a]">Urodziny </span>
          <span className="text-[#b8552f]">{EVENT.hostFirstNameGen}</span>
        </h1>

        {/* Terracotta line */}
        <div className="w-14 h-[3px] rounded-full bg-[#b8552f] mb-3.5 anim-grow-line origin-center" />

        {/* Date line */}
        <p className="text-[13.5px] leading-relaxed text-[#8a8172] max-w-[240px] anim-rise-date">
          {EVENT.dateLabel}, {EVENT.weekdayLabel}, godz.{' '}
          <strong className="font-bold text-[#211d1a]">{EVENT.timeLabel}</strong>
        </p>
      </div>

      {/* 3. Bottom Scroll Indicator */}
      <div className="anim-scroll-cue flex flex-col items-center gap-1.5 pb-2 text-[#8a8172]">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
          Przewiń
        </span>
        <svg
          className="w-4 h-4 stroke-[#8a8172]"
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

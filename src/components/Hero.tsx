import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        numberRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2 }
      )
        .fromTo(
          portraitRef.current,
          { scale: 0.92, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 1.4 },
          '-=0.8'
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0 },
          '-=0.7'
        );

      // ScrollTrigger fade out & parallax on scroll
      if (heroRef.current) {
        gsap.to(portraitRef.current, {
          y: 70,
          scale: 0.95,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 40%',
            scrub: true,
          },
        });

        gsap.to(contentRef.current, {
          y: -40,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'center center',
            end: 'bottom 30%',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDetails = () => {
    document.getElementById('szczegoly')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[96vh] w-full flex flex-col items-center justify-between pt-24 pb-8 px-4 overflow-hidden"
    >
      {/* Tuscan Background Ambience: Subtle Warm Radial and Vignette */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[680px] h-[340px] sm:h-[540px] md:h-[680px] bg-gradient-to-b from-[#DEC283]/20 via-[#C5A059]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#254436]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-10 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-2xl" />
      </div>

      {/* Decorative Jubilee Badge Top */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-3 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFECE6]/80 border border-[#C5A059]/30 text-[#254436] text-xs uppercase tracking-[0.2em] font-medium shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Wielki Jubileusz 70-lecia</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
        </div>
      </div>

      {/* Centerpiece: Father's Cutout Portrait with Grand Stylized "70" */}
      <div className="relative w-full max-w-md my-auto flex flex-col items-center justify-center pt-2">
        {/* Giant Stylized 70 in Background with Golden Outline / Soft Glow */}
        <div
          ref={numberRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-85"
        >
          <span className="font-display text-[190px] sm:text-[240px] md:text-[280px] font-extrabold text-transparent tracking-tighter leading-none"
                style={{
                  WebkitTextStroke: '2.5px rgba(197, 160, 89, 0.5)',
                  textShadow: '0 0 50px rgba(222, 194, 131, 0.35)',
                }}>
            70
          </span>
        </div>

        {/* Jubilee Laurel Ornament Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-95 opacity-40">
          <div className="w-[310px] sm:w-[360px] h-[310px] sm:h-[360px] rounded-full border border-dashed border-[#C5A059]/60" />
        </div>

        {/* Father's Portrait (Background Removed) */}
        <div
          ref={portraitRef}
          className="relative z-10 flex flex-col items-center justify-end h-[360px] sm:h-[430px] md:h-[470px] w-full max-w-[340px] sm:max-w-[400px]"
        >
          <img
            src={siteConfig.media.heroPortrait}
            alt={siteConfig.event.title}
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_30px_rgba(30,28,26,0.22)] select-none filter contrast-[1.03]"
            loading="eager"
          />

          {/* Soft Bottom Gradient to melt seamlessly into the warm page background */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Main Title, Subtitle, Details & CTA */}
      <div
        ref={contentRef}
        className="w-full max-w-xl mx-auto flex flex-col items-center text-center space-y-4 z-20 mt-1"
      >
        <div className="space-y-1.5">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1C1A] tracking-tight leading-tight">
            Jubileusz 70. Urodzin{' '}
            <span className="gold-text-gradient block sm:inline font-extrabold">
              Taty Stanisława
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#254436]/90 font-medium max-w-md mx-auto">
            „{siteConfig.event.subtitle}”
          </p>
        </div>

        {/* Quick Venue & Date pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#1E1C1A]/80 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#1E1C1A]/10 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-semibold text-[#1E1C1A]">
              {siteConfig.event.date.dayOfWeek}, {siteConfig.event.date.displayDate}
            </span>
            <span className="text-[#254436] font-medium">godz. {siteConfig.event.date.startTime}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#1E1C1A]/10 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{siteConfig.event.location.name}</span>
            <span className="text-stone-400">•</span>
            <span className="font-medium text-[#254436]">{siteConfig.event.location.city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
          <button
            onClick={scrollToRSVP}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#254436] hover:bg-[#193126] text-[#FAF8F5] font-semibold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group border border-[#C5A059]/40"
          >
            <span>Potwierdź obecność</span>
            <span className="text-[#C5A059] group-hover:translate-x-0.5 transition-transform">→</span>
          </button>

          <button
            onClick={scrollToDetails}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#FFFFFF] hover:bg-[#EFECE6] text-[#1E1C1A] border border-[#1E1C1A]/15 font-medium text-sm transition-all duration-300 shadow-sm"
          >
            Zobacz szczegóły
          </button>
        </div>

        {/* Scroll down prompt */}
        <div className="pt-2 flex flex-col items-center text-stone-400">
          <ChevronDown className="w-5 h-5 animate-bounce text-[#C5A059]" />
        </div>
      </div>
    </section>
  );
};

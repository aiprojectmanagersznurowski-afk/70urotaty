import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export const CinematicBreak: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current && containerRef.current) {
        // Parallax and smooth scale reveal
        gsap.fromTo(
          imageRef.current,
          {
            scale: 1.15,
            filter: 'blur(6px)',
          },
          {
            scale: 1.0,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );

        // Quote fade in & rise
        if (quoteRef.current) {
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full my-12 overflow-hidden bg-[#0A131F]"
    >
      {/* Cinematic Full-width visual container */}
      <div className="relative h-[420px] sm:h-[520px] md:h-[600px] w-full flex items-center justify-center">
        {/* Parallax Image */}
        <img
          ref={imageRef}
          src={siteConfig.media.cinematicBreak.src}
          alt="Jubileusz 70 Taty Stanisława - Kinowy kadr"
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform brightness-[0.75] contrast-[1.06]"
          loading="lazy"
        />

        {/* Cinematic Vignette and Marine Blue Tint Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/90 via-transparent to-[#0A131F]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[#0E2646]/30 mix-blend-multiply pointer-events-none" />

        {/* Centered Golden Quote */}
        <div
          ref={quoteRef}
          className="relative z-10 max-w-xl mx-auto px-6 text-center text-[#F7F9FC] space-y-4"
        >
          <span className="font-display text-5xl sm:text-6xl text-[#E5C582] block leading-none select-none opacity-85">
            “
          </span>
          <p className="font-display italic text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide leading-snug drop-shadow-md text-[#FFFFFF]">
            {siteConfig.media.cinematicBreak.quote}
          </p>
          <div className="w-12 h-0.5 bg-[#C89D52] mx-auto opacity-75" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E5C582] font-bold">
            {siteConfig.media.cinematicBreak.author}
          </p>
        </div>
      </div>
    </section>
  );
};

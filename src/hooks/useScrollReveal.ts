import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealOptions {
  y?: number;
  scale?: number;
  blur?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T | null>(null);

  const {
    y = 64,
    scale = 0.94,
    blur = 9,
    start = 'top 90%',
    end = 'top 45%',
    scrub = 0.5,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(el, { autoAlpha: 1, y: 0, scale: 1, filter: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y,
          scale,
          filter: `blur(${blur}px)`,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [y, scale, blur, start, end, scrub]);

  return ref;
}

export default useScrollReveal;

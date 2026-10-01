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
      <div ref={revealRef} className="w-full">
        <img
          src={PHOTOS.hero}
          alt="Stanisław z rodziną"
          loading="lazy"
          className="w-full h-[80svh] object-cover object-center"
        />
      </div>
    </section>
  );
};

import React from 'react';
import { PHOTOS } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const GallerySection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    scale: 0.97,
    blur: 6,
    start: 'top 90%',
    end: 'top 45%',
  });

  return (
    <section className="w-full px-3 py-10 flex flex-col items-center bg-white">
      <div
        ref={revealRef}
        className="w-full max-w-md grid grid-cols-2 gap-2"
      >
        {PHOTOS.gallery.map((photo, index) => (
          <div
            key={index}
            className={`rounded-[18px] overflow-hidden bg-neutral-100 ${
              photo.wide ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

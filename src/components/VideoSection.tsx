import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const YOUTUBE_ID = 'wGfDYsa7xSU';
const START_SECONDS = 11 * 60 + 52; // 11:52

export const VideoSection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    start: 'top 90%',
    end: 'top 50%',
    scrub: 0.5,
  });
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Podłącz obserwator widoczności do tego samego elementu, na którym działa scroll-reveal
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Łączymy ref ze scroll-reveal z własnym refem do obserwacji widoczności
  const setRefs = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    if (typeof revealRef === 'object' && revealRef) {
      (revealRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div ref={setRefs} className="w-full aspect-video bg-black/5">
        {shouldLoad && (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?start=${START_SECONDS}&autoplay=1&mute=1&rel=0&playsinline=1`}
            title="Film ze wspomnieniami"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
};

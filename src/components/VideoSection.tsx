import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const YOUTUBE_ID = 'wGfDYsa7xSU';
const START_SECONDS = 11 * 60 + 49; // 11:49

export const VideoSection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    start: 'top 90%',
    end: 'top 50%',
    scrub: 0.5,
  });

  return (
    <section className="w-full overflow-hidden bg-white">
      <div ref={revealRef} className="w-full aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?start=${START_SECONDS}`}
          title="Film ze wspomnieniami"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
};

import React from 'react';
import { KIDS } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const KidsSection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 64,
    scale: 0.94,
    blur: 9,
    start: 'top 90%',
    end: 'top 45%',
  });

  return (
    <section className="w-full px-6 py-8 flex flex-col items-center bg-white">
      <div
        ref={revealRef}
        className="w-full max-w-md rounded-[24px] bg-[#e8dcb8]/40 p-6 flex flex-col items-start gap-3"
      >
        {/* Emoji Badge */}
        <div className="w-10 h-10 rounded-full bg-[#e8dcb8]/70 flex items-center justify-center text-lg select-none">
          🧸
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold text-[#1e1a17]">
          Dla najmłodszych
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-[#1e1a17]/80">
          {KIDS.text}
        </p>

        {/* Link */}
        {KIDS.link && (
          <a
            href={KIDS.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] font-bold text-[#8a3516] hover:text-[#c85b28] underline underline-offset-2 transition-colors inline-flex items-center gap-1"
          >
            Zobacz kącik dla dzieci →
          </a>
        )}
      </div>
    </section>
  );
};

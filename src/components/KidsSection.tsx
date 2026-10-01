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
    <section className="w-full px-4 sm:px-6 py-8 flex flex-col items-center bg-white">
      <div
        ref={revealRef}
        className="w-full max-w-[500px] sm:max-w-xl rounded-[26px] bg-[var(--color-khaki)] p-6 sm:p-7 flex flex-col items-start gap-3 shadow-sm border border-[var(--color-line)]"
      >
        {/* Emoji Badge */}
        <div className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xl select-none shadow-xs">
          🧸
        </div>

        {/* Title */}
        <h3 className="text-[18px] sm:text-[20px] font-bold text-[var(--color-ink)]">
          Dla najmłodszych
        </h3>

        {/* Description */}
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--color-ink)]/85">
          {KIDS.text}
        </p>

        {/* Link */}
        {KIDS.link && (
          <a
            href={KIDS.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] sm:text-[14.5px] font-bold text-[var(--color-terracotta-deep)] hover:text-[var(--color-terracotta)] underline underline-offset-2 transition-colors inline-flex items-center gap-1 mt-1"
          >
            Zobacz kącik dla dzieci →
          </a>
        )}
      </div>
    </section>
  );
};

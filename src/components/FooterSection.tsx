import React from 'react';
import { VENUE } from '../config';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full px-6 pt-12 pb-24 safe-pb flex flex-col items-center justify-center text-center gap-2.5 bg-white">
      <a
        href={VENUE.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[14px] sm:text-[15px] font-semibold text-[var(--color-muted)] hover:text-[var(--color-terracotta)] underline underline-offset-4 transition-colors"
      >
        {VENUE.name} →
      </a>
      <span className="font-display text-[16px] sm:text-[18px] font-extrabold uppercase tracking-[0.22em] text-[var(--color-muted)] mt-1">
        Do zobaczenia
      </span>
    </footer>
  );
};

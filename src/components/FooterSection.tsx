import React from 'react';
import { VENUE } from '../config';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full px-6 pt-12 pb-24 safe-pb flex flex-col items-center justify-center text-center gap-2 bg-white">
      <a
        href={VENUE.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12.5px] font-semibold text-[#8a8172] hover:text-[#b8552f] underline underline-offset-4 transition-colors"
      >
        {VENUE.name} →
      </a>
      <span className="font-['Big_Shoulders_Display'] text-[13px] font-extrabold uppercase tracking-[0.2em] text-[#8a8172] mt-1">
        Do zobaczenia
      </span>
    </footer>
  );
};

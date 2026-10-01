import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { siteConfig } from '../config/site';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1E1C1A] text-[#FAF8F5] pt-14 pb-12 px-4 border-t border-[#C5A059]/20 relative overflow-hidden">
      {/* Decorative top gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-60" />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Jubilee Crest Monogram */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 rounded-full border-2 border-[#C5A059] flex items-center justify-center bg-[#254436] text-[#FAF8F5] font-display text-2xl font-bold shadow-lg tuscan-gold-glow">
            70
          </div>
          <span className="font-display text-lg tracking-widest uppercase font-semibold text-[#FAF8F5]">
            {siteConfig.event.celebrantFullName}
          </span>
        </div>

        {/* Closing Warm Message */}
        <div className="text-stone-400 text-xs max-w-sm space-y-1.5 pt-2">
          <p className="flex items-center justify-center gap-1.5 text-stone-300 font-medium">
            <span>Czekamy na Ciebie z otwartymi ramionami</span>
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
          </p>
          <p className="text-[11px] text-stone-500">
            Restauracja & Pizzeria Toscana • ul. Spokojna 3, Wierzbna
          </p>
        </div>

        {/* Back to top */}
        <div className="pt-2">
          <button
            onClick={scrollToTop}
            aria-label="Wróć na górę strony"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white text-xs font-medium transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#DEC283]" />
            <span>Wróć na początek</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

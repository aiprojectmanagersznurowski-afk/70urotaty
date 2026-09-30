import React from 'react';
import { Wine, Heart, Trees } from 'lucide-react';
import { siteConfig } from '../config/site';

export const Atmosphere: React.FC = () => {
  return (
    <section id="atmosfera" className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
          Klimat Spotkania
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-semibold">
          Toskańskie Biesiadowanie & Rodzina
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2 opacity-60" />
      </div>

      <div className="relative bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#1E1C1A]/10 tuscan-card-shadow space-y-8">
        {/* Intro text */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <p className="font-serif italic text-lg sm:text-xl text-[#254436]">
            „Włosi mawiają, że przy stole nikt się nie starzeje.”
          </p>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Ten jubileusz to przede wszystkim święto bliskości, wdzięczności i radości z bycia razem.
            Zamiast oficjalnych przemówień i sztywnej etykiety, pragniemy stworzyć atmosferę ciepłej,
            włoskiej biesiady, w której każdy – bez względu na wiek – poczuje się wspaniale.
          </p>
        </div>

        {/* 3 Aesthetic Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          {/* Pillar 1 */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#1E1C1A]/10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#254436]/10 flex items-center justify-center text-[#254436]">
              <Wine className="w-6 h-6 text-[#9B772F]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1E1C1A]">
              Wykwintny Obiad & Wino
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Autentyczne toskańskie smaki, aromatyczne dania obiadowe, wyborne wino oraz tradycyjne włoskie desery.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#1E1C1A]/10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059]">
              <Heart className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1E1C1A]">
              Trzy Pokolenia
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Spotkanie dzieci, wnuków, rodzeństwa i przyjaciół. Czas na serdeczne rozmowy, wspomnienia i anegdoty.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#1E1C1A]/10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#254436]/10 flex items-center justify-center text-[#254436]">
              <Trees className="w-6 h-6 text-[#254436]" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#1E1C1A]">
              Ogród & Dzieci
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Lokal oferuje zielony ogród, taras i bezpieczną przestrzeń dla dzieci, by najmłodsi mogli swobodnie się bawić.
            </p>
          </div>
        </div>

        {/* Warm Closing Note */}
        <div className="border-t border-[#1E1C1A]/10 pt-6 text-center">
          <p className="text-xs sm:text-sm text-stone-600">
            {siteConfig.event.location.atmosphereNote}
          </p>
        </div>
      </div>
    </section>
  );
};

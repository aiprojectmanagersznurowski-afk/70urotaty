import React from 'react';
import { Wine, Heart, Trees } from 'lucide-react';
import { siteConfig } from '../config/site';

export const Atmosphere: React.FC = () => {
  return (
    <section id="atmosfera" className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C89D52]">
          Klimat Spotkania
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#0E2646] font-bold tracking-tight">
          Toskańskie Biesiadowanie & Rodzina
        </h2>
        <div className="w-16 h-0.5 bg-[#C89D52] mx-auto mt-2 opacity-70" />
      </div>

      <div className="relative bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#0E2646]/10 tuscan-card-shadow space-y-8">
        {/* Intro text */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <p className="font-display italic text-lg sm:text-xl text-[#0E2646] font-semibold">
            „Włosi mawiają, że przy stole nikt się nie starzeje.”
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Ten jubileusz to przede wszystkim święto bliskości, wdzięczności i radości z bycia razem.
            Zamiast oficjalnych przemówień i sztywnej etykiety, pragniemy stworzyć atmosferę ciepłej,
            włoskiej biesiady, w której każdy – bez względu na wiek – poczuje się wspaniale.
          </p>
        </div>

        {/* 3 Aesthetic Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          {/* Pillar 1 */}
          <div className="bg-[#F7F9FC] rounded-2xl p-5 border border-[#0E2646]/10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#0E2646]/10 flex items-center justify-center text-[#0E2646]">
              <Wine className="w-6 h-6 text-[#C89D52]" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0A131F]">
              Wykwintny Obiad & Wino
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Autentyczne toskańskie smaki, aromatyczne dania obiadowe, wyborne wino oraz tradycyjne włoskie desery.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#F7F9FC] rounded-2xl p-5 border border-[#0E2646]/10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#C89D52]/15 flex items-center justify-center text-[#C89D52]">
              <Heart className="w-6 h-6 text-[#C89D52]" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0A131F]">
              Trzy Pokolenia
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Spotkanie dzieci, wnuków, rodzeństwa i przyjaciół. Czas na serdeczne rozmowy, wspomnienia i anegdoty.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#F7F9FC] rounded-2xl p-5 border border-[#0E2646]/10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#0E2646]/10 flex items-center justify-center text-[#0E2646]">
              <Trees className="w-6 h-6 text-[#0E2646]" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0A131F]">
              Ogród & Dzieci
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lokal oferuje zielony ogród, taras i bezpieczną przestrzeń dla dzieci, by najmłodsi mogli swobodnie się bawić.
            </p>
          </div>
        </div>

        {/* Warm Closing Note */}
        <div className="border-t border-[#0E2646]/10 pt-6 text-center">
          <p className="text-xs sm:text-sm text-slate-600">
            {siteConfig.event.location.atmosphereNote}
          </p>
        </div>
      </div>
    </section>
  );
};

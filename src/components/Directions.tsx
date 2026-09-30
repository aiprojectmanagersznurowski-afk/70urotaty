import React, { useState } from 'react';
import { Navigation, Car, MapPin, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site';

export const Directions: React.FC = () => {
  const [showParkingModal, setShowParkingModal] = useState<boolean>(false);

  return (
    <section id="dojazd" className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
          Wskazówki dla Gości
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] font-semibold">
          Dojazd & Parking
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2 opacity-60" />
      </div>

      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#1E1C1A]/10 tuscan-card-shadow space-y-6">
        {/* Map Preview Card & Destination Summary */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1E1C1A]/10 bg-[#FAF8F5] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#254436]">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Restauracja & Pizzeria Toscana</span>
              </div>
              <p className="text-stone-800 font-semibold text-lg">
                ul. Spokojna 3, 58-130 Wierzbna
              </p>
              <p className="text-stone-500 text-xs sm:text-sm">
                woj. dolnośląskie (blisko Świdnicy, Żarowa i Wrocławia)
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#254436]/10 text-[#254436] font-semibold text-xs border border-[#254436]/20">
                Współrzędne GPS gotowe
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Main Navigation Button */}
          <a
            href={siteConfig.event.location.navigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#254436] hover:bg-[#193126] text-[#FAF8F5] font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg border border-[#C5A059]/40 group"
          >
            <Navigation className="w-4 h-4 text-[#C5A059] group-hover:rotate-12 transition-transform" />
            <span>Nawiguj do Restauracji</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059] opacity-80" />
          </a>

          {/* Parking Info Button */}
          <button
            onClick={() => setShowParkingModal(!showParkingModal)}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#EFECE6] hover:bg-[#E2DDD3] text-[#1E1C1A] font-semibold text-sm transition-all duration-300 border border-[#1E1C1A]/10 shadow-sm"
          >
            <Car className="w-4 h-4 text-[#254436]" />
            <span>Parking przy lokalu</span>
            <Info className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>

        {/* Parking Details Panel (Toggleable / Expandable) */}
        {showParkingModal && (
          <div className="rounded-2xl bg-[#FAF8F5] p-5 border border-[#C5A059]/40 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 font-semibold text-sm text-[#254436]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Szczegóły parkingu na posesji lokalu:</span>
            </div>
            <p className="text-stone-700 text-sm leading-relaxed">
              {siteConfig.event.location.parkingDetails}
            </p>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
              <li>Miejsca parkingowe są w pełni bezpłatne dla naszych gości.</li>
              <li>Wjazd odbywa się bezpośrednio z ulicy Spokojnej pod sam lokal.</li>
              <li>Wygodny, utwardzony plac manewrowy z bezpiecznym wyjściem do restauracji.</li>
            </ul>
          </div>
        )}

        {/* Warm Logistical Advice for Guests */}
        <div className="rounded-2xl bg-[#EFECE6]/50 p-4 sm:p-5 border border-[#1E1C1A]/5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm">💡</span>
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <span className="font-bold text-[#1E1C1A] block">Wskazówka dojazdu:</span>
            Wierzbna leży zaledwie kilka minut od Świdnicy i drogi krajowej nr 35. Restauracja Toscana znajduje się w cichej, urokliwej części miejscowości, a ulica Spokojna gwarantuje bezproblemowy i bezstresowy dojazd.
          </div>
        </div>
      </div>
    </section>
  );
};

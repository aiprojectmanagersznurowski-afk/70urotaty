import React, { useState } from 'react';
import { Navigation, Car, MapPin, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site';

export const Directions: React.FC = () => {
  const [showParkingModal, setShowParkingModal] = useState<boolean>(false);

  return (
    <section id="dojazd" className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C89D52]">
          Wskazówki dla Gości
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#0E2646] font-bold tracking-tight">
          Dojazd & Parking
        </h2>
        <div className="w-16 h-0.5 bg-[#C89D52] mx-auto mt-2 opacity-70" />
      </div>

      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#0E2646]/10 tuscan-card-shadow space-y-6">
        {/* Map Preview Card & Destination Summary */}
        <div className="relative rounded-2xl overflow-hidden border border-[#0E2646]/10 bg-[#F7F9FC] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E2646]">
                <MapPin className="w-4 h-4 text-[#C89D52]" />
                <span>Restauracja & Pizzeria Toscana</span>
              </div>
              <p className="text-slate-900 font-bold text-lg">
                ul. Spokojna 3, 58-130 Wierzbna
              </p>
              <p className="text-slate-500 text-xs sm:text-sm">
                woj. dolnośląskie (blisko Świdnicy, Żarowa i Wrocławia)
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0E2646]/10 text-[#0E2646] font-bold text-xs border border-[#0E2646]/20">
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
            className="btn-modern-dark flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold group cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#E5C582] group-hover:rotate-12 transition-transform" />
            <span>Nawiguj do Restauracji</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E5C582] opacity-80" />
          </a>

          {/* Parking Info Button */}
          <button
            onClick={() => setShowParkingModal(!showParkingModal)}
            className="btn-modern-light flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
          >
            <Car className="w-4 h-4 text-[#0E2646]" />
            <span>Parking przy lokalu</span>
            <Info className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Parking Details Panel (Toggleable / Expandable) */}
        {showParkingModal && (
          <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-[#C89D52]/40 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0E2646]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Szczegóły parkingu na posesji lokalu:</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {siteConfig.event.location.parkingDetails}
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Miejsca parkingowe są w pełni bezpłatne dla naszych gości.</li>
              <li>Wjazd odbywa się bezpośrednio z ulicy Spokojnej pod sam lokal.</li>
              <li>Wygodny, utwardzony plac manewrowy z bezpiecznym wyjściem do restauracji.</li>
            </ul>
          </div>
        )}

        {/* Warm Logistical Advice for Guests */}
        <div className="rounded-2xl bg-[#F3ECE0]/60 p-4 sm:p-5 border border-[#0E2646]/5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C89D52]/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm">💡</span>
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-[#0A131F] block">Wskazówka dojazdu:</span>
            Wierzbna leży zaledwie kilka minut od Świdnicy i drogi krajowej nr 35. Restauracja Toscana znajduje się w cichej, urokliwej części miejscowości, a ulica Spokojna gwarantuje bezproblemowy i bezstresowy dojazd.
          </div>
        </div>
      </div>
    </section>
  );
};

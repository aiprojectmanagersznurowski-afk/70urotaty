import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, Check, Sparkles } from 'lucide-react';
import { siteConfig, getGoogleCalendarUrl, downloadIcsFile } from '../config/site';

export const EventDetails: React.FC = () => {
  const [downloadedIcs, setDownloadedIcs] = useState<boolean>(false);

  const handleAppleCalendar = () => {
    downloadIcsFile();
    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  return (
    <section id="szczegoly" className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C89D52]">
          Logistyka i Harmonogram
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#0E2646] font-bold tracking-tight">
          Kiedy i Gdzie
        </h2>
        <div className="w-16 h-0.5 bg-[#C89D52] mx-auto mt-2 opacity-70" />
      </div>

      {/* Main Luxury Card */}
      <div className="relative bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#0E2646]/10 tuscan-card-shadow overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#C89D52]/15 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#0E2646]/10">
          {/* Column 1: Date & Time */}
          <div className="space-y-6 pt-2 md:pt-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E2646]/10 flex items-center justify-center shrink-0 border border-[#0E2646]/15">
                <Calendar className="w-6 h-6 text-[#0E2646]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider text-[#C89D52] font-bold">
                  Data Spotkania
                </h3>
                <p className="font-display text-2xl text-[#0A131F] font-bold">
                  {siteConfig.event.date.dayOfWeek}
                </p>
                <p className="text-slate-600 font-medium text-base">
                  {siteConfig.event.date.displayDate} r.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C89D52]/15 flex items-center justify-center shrink-0 border border-[#C89D52]/30">
                <Clock className="w-6 h-6 text-[#9A6E24]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider text-[#C89D52] font-bold">
                  Czas Trwania
                </h3>
                <p className="font-display text-2xl text-[#0A131F] font-bold">
                  {siteConfig.event.date.startTime} – {siteConfig.event.date.endTime}
                </p>
                <p className="text-slate-600 text-sm">
                  Uroczysty obiad o 16:30, po nim toskańskie biesiadowanie i deser
                </p>
              </div>
            </div>

            {/* Calendar Buttons */}
            <div className="pt-2 space-y-2.5">
              <p className="text-xs text-slate-500 font-semibold">Zapisz termin w kalendarzu:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleAppleCalendar}
                  className="btn-modern-light flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {downloadedIcs ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Pobrano (.ics)</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm">🍏</span>
                      <span>Apple Calendar</span>
                    </>
                  )}
                </button>

                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modern-light flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4 text-[#0E2646]" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Venue & Location */}
          <div className="space-y-6 pt-6 md:pt-0 md:pl-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0E2646] flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-[#E5C582]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider text-[#C89D52] font-bold">
                  Miejsce Uroczystości
                </h3>
                <p className="font-display text-2xl text-[#0A131F] font-bold leading-tight">
                  {siteConfig.event.location.name}
                </p>
                <p className="text-slate-600 text-sm">
                  {siteConfig.event.location.subname}
                </p>
              </div>
            </div>

            <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-[#0E2646]/10 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0E2646] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C89D52]" />
                <span>Dokładny Adres</span>
              </div>
              <p className="text-slate-800 font-semibold text-base">
                {siteConfig.event.location.address}
              </p>
              <p className="text-slate-600 text-sm">
                {siteConfig.event.location.postalCode} {siteConfig.event.location.city}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={siteConfig.event.location.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0E2646] hover:text-[#1A4476] font-bold underline underline-offset-4"
                >
                  <span>Profil lokalu na Facebooku</span>
                  <ExternalLink className="w-3 h-3 text-[#C89D52]" />
                </a>
              </div>
            </div>

            {/* Highlights tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#F3ECE0] text-slate-700 text-xs font-semibold">
                🍷 Toskańskie specjały
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F3ECE0] text-slate-700 text-xs font-semibold">
                🚗 Bezpłatny parking na posesji
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F3ECE0] text-slate-700 text-xs font-semibold">
                🌿 Ogród & taras
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

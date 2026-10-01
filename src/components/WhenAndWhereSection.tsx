import React from 'react';
import { Calendar, MapPin, Footprints } from 'lucide-react';
import { EVENT, VENUE, AFTER } from '../config';
import { downloadIcsFile, getGoogleCalendarUrl } from '../lib/calendar';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const WhenAndWhereSection: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 64,
    scale: 0.94,
    blur: 9,
    start: 'top 90%',
    end: 'top 45%',
  });

  return (
    <section className="w-full px-6 py-14 flex flex-col items-center bg-white">
      <div ref={revealRef} className="w-full max-w-md flex flex-col items-center gap-5">
        {/* Eyebrow */}
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8c3e20]">
          Kiedy i gdzie
        </span>

        {/* Card */}
        <div className="w-full rounded-[24px] border border-[#211d1a24] bg-white p-6 flex flex-col gap-4">
          {/* Row 1: Calendar */}
          <div className="flex items-start gap-3.5 pb-4 border-b border-[#211d1a24]">
            <div className="w-9 h-9 rounded-xl bg-[#b8552f]/10 text-[#b8552f] flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#211d1a]">
                {EVENT.dateLabel} · {EVENT.weekdayLabel}
              </span>
              <span className="text-[12px] text-[#8a8172] mt-0.5 leading-relaxed">
                Start o {EVENT.timeLabel} · {EVENT.durationLabel}
              </span>
            </div>
          </div>

          {/* Row 2: Location */}
          <div className="flex items-start gap-3.5 pb-4 border-b border-[#211d1a24]">
            <div className="w-9 h-9 rounded-xl bg-[#b8552f]/10 text-[#b8552f] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#211d1a]">
                {VENUE.name}
              </span>
              <span className="text-[12px] text-[#8a8172] mt-0.5 leading-relaxed">
                {VENUE.address}
              </span>
            </div>
          </div>

          {/* Row 3: After */}
          <div className="flex items-start gap-3.5 pt-0.5">
            <div className="w-9 h-9 rounded-xl bg-[#b8552f]/10 text-[#b8552f] flex items-center justify-center shrink-0 mt-0.5">
              <Footprints className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#211d1a]">
                {AFTER.title}
              </span>
              <span className="text-[12px] text-[#8a8172] mt-0.5 leading-relaxed">
                {AFTER.text}
              </span>
            </div>
          </div>
        </div>

        {/* Calendar Add Buttons */}
        <div className="w-full flex flex-col items-center gap-2 pt-1">
          <div className="w-full grid grid-cols-2 gap-2.5">
            {/* Apple Calendar (.ics) */}
            <button
              onClick={downloadIcsFile}
              className="w-full rounded-[14px] border border-[#211d1a24] bg-white hover:bg-neutral-50 active:scale-[0.98] py-3 px-3 flex items-center justify-center gap-2 text-[13px] font-bold text-[#211d1a] transition-all"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170" aria-hidden="true">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.85-11.75-14.42-6.52-10.29-11.51-21.75-14.97-34.39-3.46-12.64-5.19-24.36-5.19-35.16 0-14.53 3.69-26.68 11.07-36.46 7.38-9.78 16.73-14.77 28.05-14.98 5.48 0 11.56 1.41 18.23 4.25 6.67 2.83 10.98 4.3 12.92 4.41 1.73 0 6.24-1.58 13.53-4.75 7.29-3.17 13.43-4.52 18.42-4.04 14.19 1.14 25.13 6.63 32.83 16.48-12.63 7.64-18.83 18.17-18.61 31.59.22 10.45 4.25 19.34 12.08 26.68 7.84 7.34 17.29 11.45 28.37 12.33-2.12 6.53-4.8 13.06-8.03 19.59zM119.22 31.95c0-7.83 2.88-15.11 8.65-21.84 5.76-6.73 12.87-10.45 21.32-11.16.22 1.06.32 2.12.32 3.18 0 7.84-2.99 15.34-8.97 22.48-5.98 7.15-13.15 11.08-21.52 11.79-.11-1.38-.2-2.73-.2-4.45z"/>
              </svg>
              <span>Apple</span>
            </button>

            {/* Android / Google Calendar */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-[14px] border border-[#211d1a24] bg-white hover:bg-neutral-50 active:scale-[0.98] py-3 px-3 flex items-center justify-center gap-2 text-[13px] font-bold text-[#211d1a] transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.43 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.57 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google</span>
            </a>
          </div>
          <span className="text-[11.5px] text-[#8a8172]">
            Dodaj do kalendarza, żeby nie zapomnieć
          </span>
        </div>
      </div>
    </section>
  );
};

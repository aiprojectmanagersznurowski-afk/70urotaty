import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { EVENT, RSVP_ENDPOINT } from '../config';
import { downloadIcsFile, getGoogleCalendarUrl } from '../lib/calendar';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const RsvpSection: React.FC = () => {
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [name, setName] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 64,
    scale: 0.94,
    blur: 9,
    start: 'top 90%',
    end: 'top 45%',
  });

  const firstName = name.trim().split(' ')[0] || 'Gościu';
  const isFormValid = attending !== null && name.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: name.trim(),
      attending: attending === 'yes' ? 'yes' : 'no',
      adults: attending === 'yes' ? adults : 0,
      kids: attending === 'yes' ? kids : 0,
      note: note.trim(),
      submittedAt: new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' }),
    };

    // Store in localStorage as instant backup
    try {
      const existing = JSON.parse(localStorage.getItem('rsvp_submissions_70') || '[]');
      existing.push(payload);
      localStorage.setItem('rsvp_submissions_70', JSON.stringify(existing));
    } catch {
      // ignore local storage errors
    }

    try {
      await fetch(RSVP_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });

      setIsSuccess(true);
    } catch (err) {
      console.warn('Submission to Google Apps Script failed:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fixed burst particles configuration
  const burstParticles = [
    { dx: '-65px', dy: '-70px', delay: '0.02s' },
    { dx: '70px', dy: '-60px', delay: '0.04s' },
    { dx: '-85px', dy: '15px', delay: '0.06s' },
    { dx: '80px', dy: '25px', delay: '0.03s' },
    { dx: '-45px', dy: '80px', delay: '0.05s' },
    { dx: '55px', dy: '75px', delay: '0.01s' },
    { dx: '0px', dy: '-85px', delay: '0.07s' },
    { dx: '-30px', dy: '-80px', delay: '0.08s' },
    { dx: '35px', dy: '-75px', delay: '0.03s' },
    { dx: '-80px', dy: '-25px', delay: '0.09s' },
    { dx: '75px', dy: '-20px', delay: '0.05s' },
    { dx: '-70px', dy: '55px', delay: '0.04s' },
    { dx: '65px', dy: '60px', delay: '0.06s' },
    { dx: '0px', dy: '85px', delay: '0.02s' },
  ];

  return (
    <section className="w-full px-4 sm:px-6 py-14 flex flex-col items-center bg-white" id="rsvp">
      <div ref={revealRef} className="w-full max-w-[500px] sm:max-w-xl flex flex-col items-center gap-5">
        {/* Eyebrow - enlarged */}
        <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta-deep)]">
          Potwierdź obecność
        </span>

        {/* Heading - enlarged */}
        <h2 className="font-display text-[34px] sm:text-[42px] font-extrabold uppercase tracking-wide text-[var(--color-ink)] text-center -mt-1 leading-tight">
          Będziesz z nami?
        </h2>

        {/* Form or Success State */}
        {!isSuccess ? (
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-[26px] border border-[var(--color-line)] bg-white p-6 sm:p-7 flex flex-col gap-4 shadow-sm"
          >
            {/* 1. Attending Segment Choice */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending('yes')}
                className={`py-4 px-3 rounded-[16px] text-[15px] sm:text-[16px] font-bold transition-all active:scale-[0.98] ${
                  attending === 'yes'
                    ? 'bg-[var(--color-terracotta)] text-white shadow-sm'
                    : 'bg-white border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-neutral-50'
                }`}
              >
                Będę 🎉
              </button>

              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`py-4 px-3 rounded-[16px] text-[15px] sm:text-[16px] font-bold transition-all active:scale-[0.98] ${
                  attending === 'no'
                    ? 'bg-[var(--color-terracotta)] text-white shadow-sm'
                    : 'bg-white border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-neutral-50'
                }`}
              >
                Nie dam rady
              </button>
            </div>

            {/* 2. Full Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rsvp-name" className="text-[13.5px] font-bold text-[var(--color-ink)]">
                Imię i nazwisko
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. Ciocia Basia"
                className="w-full rounded-[14px] border border-[var(--color-line)] bg-white px-4 py-3.5 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-terracotta)] focus:outline-none transition-colors"
              />
            </div>

            {/* 3. Steppers for Adults & Kids (only when 'yes') */}
            {attending === 'yes' && (
              <div className="grid grid-cols-2 gap-3 pt-1 transition-all">
                {/* Adults Stepper */}
                <div className="flex flex-col gap-1.5 p-3.5 rounded-[16px] border border-[var(--color-line)] bg-white">
                  <span className="text-[13px] font-bold text-[var(--color-ink)]">Dorośli</span>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      disabled={adults <= 1}
                      aria-label="Mniej: Dorośli"
                      className="w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-transform"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-[16px] font-bold text-[var(--color-ink)]">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      aria-label="Więcej: Dorośli"
                      className="w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] active:scale-90 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Kids Stepper */}
                <div className="flex flex-col gap-1.5 p-3.5 rounded-[16px] border border-[var(--color-line)] bg-white">
                  <span className="text-[13px] font-bold text-[var(--color-ink)]">Dzieci</span>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      type="button"
                      onClick={() => setKids((prev) => Math.max(0, prev - 1))}
                      disabled={kids <= 0}
                      aria-label="Mniej: Dzieci"
                      className="w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-transform"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-[16px] font-bold text-[var(--color-ink)]">{kids}</span>
                    <button
                      type="button"
                      onClick={() => setKids((prev) => prev + 1)}
                      aria-label="Więcej: Dzieci"
                      className="w-8 h-8 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-ink)] active:scale-90 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Notes textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="rsvp-notes" className="text-[13.5px] font-bold text-[var(--color-ink)]">
                Uwagi <span className="font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
              </label>
              <textarea
                id="rsvp-notes"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="np. dieta, alergie"
                className="w-full rounded-[14px] border border-[var(--color-line)] bg-white px-4 py-3 text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-terracotta)] focus:outline-none resize-none transition-colors"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-[13px] text-[var(--color-terracotta)] leading-snug">
                {errorMessage}
              </p>
            )}

            {/* 5. Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full rounded-[16px] bg-[var(--color-ink)] hover:bg-[var(--color-terracotta)] disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] text-white py-4 px-4 text-[15.5px] font-bold transition-all mt-1 shadow-sm"
            >
              {isSubmitting ? 'Wysyłanie…' : 'Wyślij odpowiedź'}
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div className="w-full rounded-[26px] border border-[var(--color-line)] bg-white p-8 flex flex-col items-center text-center gap-5 shadow-sm relative overflow-hidden">
            {/* Checkmark badge with particle burst */}
            <div className="relative flex items-center justify-center my-3">
              {/* Confetti Particles */}
              {burstParticles.map((p, i) => (
                <span
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full pointer-events-none anim-success-burst"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'var(--color-terracotta)' : 'var(--color-khaki-deep)',
                    '--dx': p.dx,
                    '--dy': p.dy,
                    animationDelay: p.delay,
                  } as React.CSSProperties}
                />
              ))}

              {/* Checkmark bubble */}
              <div className="w-16 h-16 rounded-full bg-[var(--color-terracotta)] text-white flex items-center justify-center anim-success-pop shadow-md z-10">
                <svg
                  className="w-8 h-8 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Display headline */}
            <h3 className="font-display text-[30px] sm:text-[34px] font-extrabold uppercase tracking-wide text-[var(--color-ink)] leading-tight max-w-sm">
              {attending === 'yes'
                ? `Dzięki, ${firstName}! Do zobaczenia ${EVENT.dateLabel} 🎉`
                : `Dzięki za informację, ${firstName}. Będzie nam Ciebie brakować!`}
            </h3>

            {/* Subtext */}
            <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[var(--color-muted)] max-w-sm">
              {attending === 'yes'
                ? 'Twoja odpowiedź została zapisana. Nie możemy się doczekać wspólnego świętowania!'
                : 'Dziękujemy za odpowiedź. Będziemy myślami z Tobą!'}
            </p>

            {/* Add to calendar options for attending guests */}
            {attending === 'yes' && (
              <div className="w-full flex flex-col items-center gap-2 pt-2">
                <div className="w-full grid grid-cols-2 gap-3">
                  <button
                    onClick={downloadIcsFile}
                    className="w-full rounded-[14px] border border-[var(--color-line)] bg-white hover:bg-neutral-50 active:scale-[0.98] py-3 px-3 flex items-center justify-center gap-2 text-[13.5px] font-bold text-[var(--color-ink)] transition-all shadow-sm"
                  >
                    <span>Apple</span>
                  </button>
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-[14px] border border-[var(--color-line)] bg-white hover:bg-neutral-50 active:scale-[0.98] py-3 px-3 flex items-center justify-center gap-2 text-[13.5px] font-bold text-[var(--color-ink)] transition-all shadow-sm"
                  >
                    <span>Google</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

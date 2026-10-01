import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Check, X, Users, Sparkles, Send, RefreshCw, Heart, Calendar } from 'lucide-react';
import { siteConfig } from '../config/site';

interface FormData {
  name: string;
  attending: boolean;
  adults: number;
  children: number;
  notes: string;
}

export const RsvpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    attending: true,
    adults: 2,
    children: 0,
    notes: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load existing submission from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rsvp_tata_70_submission');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setSubmitted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#C89D52', '#E5C582', '#0E2646', '#38BDF8', '#FFFFFF'],
      });
    } catch {
      // ignore if blocked
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Prosimy o podanie imienia i nazwiska.');
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      attending: formData.attending ? 'TAK' : 'NIE',
      adults: formData.attending ? formData.adults : 0,
      children: formData.attending ? formData.children : 0,
      notes: formData.notes.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const webhookUrl = siteConfig.event.rsvp.webhookUrl;
      const isPlaceholder = webhookUrl.includes('YOUR_SCRIPT_ID');

      if (!isPlaceholder) {
        // Send to Google Apps Script webhook
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script redirects
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Mock network delay for demo
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Persist in localStorage
      localStorage.setItem('rsvp_tata_70_submission', JSON.stringify(formData));
      setSubmitted(true);

      if (formData.attending) {
        triggerConfetti();
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      // Even if network fails, fallback to local storage
      localStorage.setItem('rsvp_tata_70_submission', JSON.stringify(formData));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('rsvp_tata_70_submission');
    setSubmitted(false);
  };

  return (
    <section id="rsvp" className="w-full max-w-2xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C89D52]">
          Potwierdzenie Obecności
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#0E2646] font-bold tracking-tight">
          Czy będziesz z nami?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Uprzejmie prosimy o potwierdzenie do{' '}
          <strong className="text-[#0E2646] font-bold">
            {siteConfig.event.rsvp.deadlineDisplay}
          </strong>
        </p>
        <div className="w-16 h-0.5 bg-[#C89D52] mx-auto mt-2 opacity-70" />
      </div>

      <div className="relative bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#0E2646]/10 tuscan-card-shadow overflow-hidden">
        {submitted ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-400">
            <div className="w-16 h-16 rounded-full bg-[#0E2646]/10 border border-[#0E2646]/20 flex items-center justify-center mx-auto text-[#0E2646]">
              {formData.attending ? (
                <Sparkles className="w-8 h-8 text-[#C89D52] animate-pulse" />
              ) : (
                <Heart className="w-8 h-8 text-slate-500" />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-[#0A131F] font-bold">
                {formData.attending
                  ? 'Cudownie! Czekamy na Ciebie!'
                  : 'Dziękujemy za wiadomość'}
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                {formData.attending ? (
                  <>
                    Dziękujemy, <strong className="text-[#0A131F]">{formData.name}</strong>! Twoja obecność sprawi Jubilatowi Stanisławowi ogromną radość.
                    Do zobaczenia w Restauracji Toscana!
                  </>
                ) : (
                  <>
                    Dziękujemy za odpowiedź, <strong className="text-[#0A131F]">{formData.name}</strong>. Choć będziemy tęsknić, z pewnością wzniesiemy za Ciebie serdeczny toast!
                  </>
                )}
              </p>
            </div>

            {formData.attending && (
              <div className="rounded-2xl bg-[#F7F9FC] p-4 border border-[#0E2646]/10 max-w-sm mx-auto text-xs text-slate-700 space-y-1.5 text-left">
                <div className="font-bold text-[#0E2646] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C89D52]" />
                  <span>Podsumowanie zgłoszenia:</span>
                </div>
                <p>• Liczba osób dorosłych: <strong>{formData.adults}</strong></p>
                {formData.children > 0 && (
                  <p>• Liczba dzieci: <strong>{formData.children}</strong></p>
                )}
                {formData.notes && (
                  <p className="pt-1 italic text-slate-500">Uwagi: „{formData.notes}”</p>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0A131F] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Zmień swoją odpowiedź</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORM STATE */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Toggle (Attending / Declining) */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-600">
                Twoja obecność:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: true })}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                    formData.attending
                      ? 'bg-[#0E2646] text-[#FFFFFF] border-[#0E2646] shadow-md'
                      : 'bg-[#F7F9FC] text-slate-700 border-[#0E2646]/15 hover:bg-[#F3ECE0]'
                  }`}
                >
                  <Check className={`w-4 h-4 ${formData.attending ? 'text-[#E5C582]' : 'text-slate-400'}`} />
                  <span>Będę z radością 🥂</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: false })}
                  className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                    !formData.attending
                      ? 'bg-slate-800 text-[#FFFFFF] border-slate-800 shadow-md'
                      : 'bg-[#F7F9FC] text-slate-700 border-[#0E2646]/15 hover:bg-[#F3ECE0]'
                  }`}
                >
                  <X className={`w-4 h-4 ${!formData.attending ? 'text-slate-300' : 'text-slate-400'}`} />
                  <span>Niestety nie dam rady</span>
                </button>
              </div>
            </div>

            {/* Guest Name & Surname */}
            <div className="space-y-1.5">
              <label htmlFor="guest-name" className="block text-xs uppercase tracking-wider font-bold text-slate-700">
                Imię i Nazwisko gościa (lub pary / rodziny) *
              </label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder="np. Anna i Jan Kowalscy"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F7F9FC] border border-[#0E2646]/15 focus:border-[#C89D52] focus:outline-none focus:ring-2 focus:ring-[#C89D52]/20 text-sm text-[#0A131F] placeholder:text-slate-400 transition-all"
              />
            </div>

            {/* Number of Guests (Only if attending) */}
            {formData.attending && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
                {/* Adults Counter */}
                <div className="space-y-1.5 bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#0E2646]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#0E2646]" />
                      <span>Dorośli</span>
                    </span>
                    <span className="font-display font-bold text-lg text-[#0E2646]">
                      {formData.adults}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                      className="flex-1 py-1.5 rounded-lg bg-white border border-[#0E2646]/15 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                      className="flex-1 py-1.5 rounded-lg bg-white border border-[#0E2646]/15 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div className="space-y-1.5 bg-[#F7F9FC] p-3.5 rounded-2xl border border-[#0E2646]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1.5">
                      <span>Dzieci</span>
                    </span>
                    <span className="font-display font-bold text-lg text-[#0E2646]">
                      {formData.children}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                      className="flex-1 py-1.5 rounded-lg bg-white border border-[#0E2646]/15 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                      className="flex-1 py-1.5 rounded-lg bg-white border border-[#0E2646]/15 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Special Requests / Notes */}
            <div className="space-y-1.5">
              <label htmlFor="notes" className="block text-xs uppercase tracking-wider font-bold text-slate-700">
                Wiadomość dla Jubilata lub uwagi (diety, alergie, życzenia)
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="np. Dieta wegetariańska, bezglutenowa, serdeczne życzenia..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F7F9FC] border border-[#0E2646]/15 focus:border-[#C89D52] focus:outline-none focus:ring-2 focus:ring-[#C89D52]/20 text-sm text-[#0A131F] placeholder:text-slate-400 transition-all resize-none"
              />
            </div>

            {/* Error prompt */}
            {errorMessage && (
              <p className="text-xs text-rose-600 font-semibold">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-modern-gold w-full py-4 rounded-2xl text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#071324]" />
                  <span>Wysyłanie odpowiedzi...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#071324]" />
                  <span>
                    {formData.attending
                      ? 'Wyślij potwierdzenie obecności'
                      : 'Przekaż informację'}
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

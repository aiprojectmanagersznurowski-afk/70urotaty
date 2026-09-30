import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Image as ImageIcon, CheckCircle, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#1E1C1A]/10 shadow-sm py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram / Brand */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 text-left group transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center bg-[#254436] text-[#FAF8F5] font-serif text-sm font-bold shadow-sm">
            70
          </div>
          <div>
            <span className="font-serif text-sm font-semibold tracking-wider text-[#1E1C1A] block leading-none">
              TATA 70
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#C5A059] font-medium">
              Toscana Wierzbna
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('szczegoly')}
            className="text-xs uppercase tracking-wider font-medium text-[#1E1C1A]/75 hover:text-[#254436] transition-colors"
          >
            Kiedy i Gdzie
          </button>
          <button
            onClick={() => scrollToSection('dojazd')}
            className="text-xs uppercase tracking-wider font-medium text-[#1E1C1A]/75 hover:text-[#254436] transition-colors"
          >
            Dojazd & Parking
          </button>
          <button
            onClick={() => scrollToSection('atmosfera')}
            className="text-xs uppercase tracking-wider font-medium text-[#1E1C1A]/75 hover:text-[#254436] transition-colors"
          >
            Atmosfera
          </button>
          <button
            onClick={() => scrollToSection('galeria')}
            className="text-xs uppercase tracking-wider font-medium text-[#1E1C1A]/75 hover:text-[#254436] transition-colors"
          >
            Wspomnienia
          </button>

          <button
            onClick={() => scrollToSection('rsvp')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#254436] text-[#FAF8F5] border border-[#C5A059]/40 hover:bg-[#193126] transition-all shadow-sm hover:shadow"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            Potwierdź obecność
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => scrollToSection('rsvp')}
            className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#254436] text-[#FAF8F5] border border-[#C5A059]/30"
          >
            RSVP
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-[#1E1C1A] hover:bg-stone-200/50 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#1E1C1A]/10 px-4 pt-3 pb-5 shadow-lg space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollToSection('szczegoly')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#1E1C1A] hover:bg-[#EFECE6]"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>Kiedy i Gdzie</span>
          </button>
          <button
            onClick={() => scrollToSection('dojazd')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#1E1C1A] hover:bg-[#EFECE6]"
          >
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>Dojazd & Parking</span>
          </button>
          <button
            onClick={() => scrollToSection('atmosfera')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#1E1C1A] hover:bg-[#EFECE6]"
          >
            <span className="text-[#C5A059] text-base leading-none">🌿</span>
            <span>Toskańska Atmosfera</span>
          </button>
          <button
            onClick={() => scrollToSection('galeria')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#1E1C1A] hover:bg-[#EFECE6]"
          >
            <ImageIcon className="w-4 h-4 text-[#C5A059]" />
            <span>Galeria Wspomnień</span>
          </button>
          <button
            onClick={() => scrollToSection('rsvp')}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#254436] text-[#FAF8F5] font-semibold text-sm shadow-md"
          >
            <CheckCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Potwierdź obecność (RSVP)</span>
          </button>
        </div>
      )}
    </header>
  );
};

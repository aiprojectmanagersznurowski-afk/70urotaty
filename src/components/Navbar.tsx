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
          ? 'bg-[#F7F9FC]/90 backdrop-blur-md border-b border-[#0E2646]/10 shadow-sm py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram / Brand */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full border border-[#C89D52] flex items-center justify-center bg-[#0E2646] text-[#FFFFFF] font-display text-sm font-bold shadow-sm">
            70
          </div>
          <div>
            <span className="font-display text-sm font-bold tracking-wider text-[#0A131F] block leading-none">
              TATA STANISŁAW
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#C89D52] font-semibold">
              Toscana Wierzbna
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('szczegoly')}
            className="text-xs uppercase tracking-wider font-semibold text-[#0A131F]/75 hover:text-[#0E2646] transition-colors cursor-pointer"
          >
            Kiedy i Gdzie
          </button>
          <button
            onClick={() => scrollToSection('dojazd')}
            className="text-xs uppercase tracking-wider font-semibold text-[#0A131F]/75 hover:text-[#0E2646] transition-colors cursor-pointer"
          >
            Dojazd & Parking
          </button>
          <button
            onClick={() => scrollToSection('atmosfera')}
            className="text-xs uppercase tracking-wider font-semibold text-[#0A131F]/75 hover:text-[#0E2646] transition-colors cursor-pointer"
          >
            Atmosfera
          </button>
          <button
            onClick={() => scrollToSection('galeria')}
            className="text-xs uppercase tracking-wider font-semibold text-[#0A131F]/75 hover:text-[#0E2646] transition-colors cursor-pointer"
          >
            Wspomnienia
          </button>

          <button
            onClick={() => scrollToSection('rsvp')}
            className="btn-modern-dark inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#E5C582]" />
            <span>Potwierdź obecność</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => scrollToSection('rsvp')}
            className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#0E2646] text-[#FFFFFF] border border-[#C89D52]/40"
          >
            RSVP
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md text-[#0A131F] hover:bg-slate-200/50 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F9FC] border-b border-[#0E2646]/10 px-4 pt-3 pb-5 shadow-lg space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollToSection('szczegoly')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#0A131F] hover:bg-[#F3ECE0]"
          >
            <Calendar className="w-4 h-4 text-[#C89D52]" />
            <span>Kiedy i Gdzie</span>
          </button>
          <button
            onClick={() => scrollToSection('dojazd')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#0A131F] hover:bg-[#F3ECE0]"
          >
            <MapPin className="w-4 h-4 text-[#C89D52]" />
            <span>Dojazd & Parking</span>
          </button>
          <button
            onClick={() => scrollToSection('atmosfera')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#0A131F] hover:bg-[#F3ECE0]"
          >
            <span className="text-[#C89D52] text-base leading-none">🌿</span>
            <span>Toskańska Atmosfera</span>
          </button>
          <button
            onClick={() => scrollToSection('galeria')}
            className="flex items-center gap-3 w-full text-left py-2 px-2 rounded-lg text-sm text-[#0A131F] hover:bg-[#F3ECE0]"
          >
            <ImageIcon className="w-4 h-4 text-[#C89D52]" />
            <span>Galeria Wspomnień</span>
          </button>
          <button
            onClick={() => scrollToSection('rsvp')}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0E2646] text-[#FFFFFF] font-semibold text-sm shadow-md"
          >
            <CheckCircle className="w-4 h-4 text-[#E5C582]" />
            <span>Potwierdź obecność (RSVP)</span>
          </button>
        </div>
      )}
    </header>
  );
};

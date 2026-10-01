import React from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { AudioPlayer } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { FullWidthImageSection } from './components/FullWidthImageSection';
import { WhenAndWhereSection } from './components/WhenAndWhereSection';
import { DirectionsSection } from './components/DirectionsSection';
import { KidsSection } from './components/KidsSection';
import { RsvpSection } from './components/RsvpSection';
import { GallerySection } from './components/GallerySection';
import { FooterSection } from './components/FooterSection';

export const App: React.FC = () => {
  return (
    <div className="w-full min-h-svh bg-white text-[var(--color-ink)] flex flex-col items-center">
      {/* Przełącznik stylów u góry strony (Opcja 2 domyślna, Opcja 3) */}
      <header className="w-full sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[var(--color-line)]/40 transition-colors">
        <ThemeSwitcher />
      </header>

      {/* 1. Odtwarzacz muzyki (pływający przycisk w prawym dolnym rogu) */}
      <AudioPlayer />

      {/* Główna kolumna treści (mobile-first, wycentrowana na desktopie) */}
      <main className="w-full flex flex-col items-center">
        {/* 2. Hero (intro, pełny ekran) */}
        <HeroSection />

        {/* 3. Zdjęcie pełnej szerokości */}
        <FullWidthImageSection />

        {/* 4. Kiedy i gdzie + dodaj do kalendarza */}
        <WhenAndWhereSection />

        {/* 5. Dojazd (nawigacja) */}
        <DirectionsSection />

        {/* 6. Dla najmłodszych */}
        <KidsSection />

        {/* 7. RSVP (formularz z Google Sheets) */}
        <RsvpSection />

        {/* 8. Galeria zdjęć */}
        <GallerySection />
      </main>

      {/* 9. Stopka */}
      <FooterSection />
    </div>
  );
};

export default App;

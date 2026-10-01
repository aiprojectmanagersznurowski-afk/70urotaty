import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PHOTOS } from '../config';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const revealRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    scale: 0.97,
    blur: 6,
    start: 'top 90%',
    end: 'top 45%',
  });

  const isOpen = selectedIndex !== null;
  const currentPhoto = selectedIndex !== null ? PHOTOS.gallery[selectedIndex] : null;

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + PHOTOS.gallery.length) % PHOTOS.gallery.length;
    });
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % PHOTOS.gallery.length;
    });
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold: 45px
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <section className="w-full px-4 sm:px-6 py-14 flex flex-col items-center bg-white" id="galeria">
      {/* Eyebrow */}
      <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--color-terracotta-deep)] mb-4">
        Wspomnienia i chwile
      </span>

      {/* Grid of photos - broadened & responsive */}
      <div
        ref={revealRef}
        className="w-full max-w-[500px] sm:max-w-xl grid grid-cols-2 gap-2.5 sm:gap-3"
      >
        {PHOTOS.gallery.map((photo, index) => (
          <div
            key={index}
            onClick={() => handleOpen(index)}
            role="button"
            tabIndex={0}
            aria-label={`Powiększ zdjęcie: ${photo.alt}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleOpen(index);
            }}
            className={`group relative rounded-[18px] overflow-hidden bg-neutral-100 cursor-pointer select-none active:scale-[0.98] transition-transform ${
              photo.wide ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {/* Subtle hover icon overlay */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-[#1e1a17] flex items-center justify-center shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd galerii"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-300 animate-[reveal_0.25s_ease-out]"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl flex items-center justify-between z-10 pt-2"
          >
            <span className="text-white/80 text-[13px] font-medium tracking-wide">
              {selectedIndex + 1} / {PHOTOS.gallery.length}
            </span>

            <button
              onClick={handleClose}
              aria-label="Zamknij galerię"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Center Image Container with Navigation Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl flex-1 flex items-center justify-center my-3 px-2"
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-1 sm:left-3 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Main Picture */}
            <img
              key={currentPhoto.src}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="max-h-[68vh] sm:max-h-[74vh] max-w-[92vw] object-contain rounded-xl shadow-2xl select-none animate-[portrait-in_0.3s_cubic-bezier(0.2,0.9,0.25,1)]"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Następne zdjęcie"
              className="absolute right-1 sm:right-3 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Bottom Bar: Caption & Thumbnails */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl flex flex-col items-center gap-3 pb-2 z-10"
          >
            {/* Alt text / Caption pill */}
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-[13px] text-white/95 text-center shadow-lg">
              {currentPhoto.alt}
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
              {PHOTOS.gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-9 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === selectedIndex
                      ? 'border-[var(--color-terracotta)] scale-105 opacity-100 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

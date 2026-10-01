import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { siteConfig, type GalleryImage } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const images = siteConfig.media.gallery;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.gallery-item');
        
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 40,
              scale: 0.94,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="galeria" ref={galleryRef} className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-xs uppercase tracking-[0.22em] font-bold text-[#C89D52]">
          Siedem Dekad Historii
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-[#0E2646] font-bold tracking-tight">
          Chwile i Wspomnienia
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Wspólne podróże, rodzinne spotkania i chwile, które na zawsze pozostają w sercu.
        </p>
        <div className="w-16 h-0.5 bg-[#C89D52] mx-auto mt-2 opacity-70" />
      </div>

      {/* Collage Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
      >
        {images.map((img: GalleryImage, idx: number) => {
          const isFeatured = img.featured || idx === 0 || idx === 6;
          return (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className={`gallery-item group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0E2646]/5 border border-[#0E2646]/10 shadow-sm hover:shadow-xl transition-all duration-300 ${
                isFeatured ? 'sm:col-span-2 md:col-span-2 h-72 sm:h-80' : 'h-64 sm:h-80'
              }`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A131F]/90 via-[#0A131F]/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              {/* Title & Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-[#FFFFFF] transform transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#FFFFFF] drop-shadow-sm">
                    {img.title}
                  </h3>
                  <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-[#E5C582]" />
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#0A131F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Zamknij"
            className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFFFF] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFFFF] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            aria-label="Następne zdjęcie"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFFFF] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={images[selectedImageIndex].src}
              alt={images[selectedImageIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="text-center mt-4 text-[#FFFFFF] space-y-1 max-w-md">
              <h4 className="font-display font-bold text-lg text-[#E5C582]">
                {images[selectedImageIndex].title}
              </h4>
              <p className="text-xs text-slate-300">
                {images[selectedImageIndex].caption}
              </p>
              <p className="text-[11px] text-slate-400">
                {selectedImageIndex + 1} z {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

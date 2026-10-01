import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Sparkles, Heart, ChevronDown, CheckCircle2, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  celebrantName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
}

export function CinematicLandingHero({
  celebrantName = "TATA 70",
  tagline1 = "Siedem Dekad Pięknych Chwil,",
  tagline2 = "Jubileusz Taty Stanisława.",
  cardHeading = "Jubileusz 70. Urodzin Taty Stanisława",
  cardDescription,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Interactive view mode between cutout portrait and sun-drenched beach panorama
  const [photoMode, setPhotoMode] = useState<"cutout" | "panorama">("cutout");

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.8) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && showcaseRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(showcaseRef.current, {
            rotationY: xVal * 9,
            rotationX: -yVal * 9,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Cinematic GSAP Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 50, scale: 0.9, filter: "blur(18px)", rotationX: -15 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: 120, autoAlpha: 0 });
      gsap.set([".card-left-text", ".card-right-text", ".floating-badge", ".photo-showcase-box"], { autoAlpha: 0 });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-track", { duration: 1.4, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.2, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.9")
        .to(".main-card", { duration: 1.3, y: 0, autoAlpha: 1, ease: "power3.out" }, "-=0.8")
        .fromTo(
          ".photo-showcase-box",
          { y: 80, scale: 0.88, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out" },
          "-=0.9"
        )
        .fromTo(
          ".floating-badge",
          { y: 60, autoAlpha: 0, scale: 0.75 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1.1, stagger: 0.15, ease: "back.out(1.4)" },
          "-=1.1"
        )
        .fromTo(
          ".card-left-text",
          { x: -40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
          "-=1.0"
        )
        .fromTo(
          ".card-right-text",
          { x: 40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToRSVP = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDetails = () => {
    document.getElementById("szczegoly")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full min-h-[96vh] lg:min-h-screen overflow-hidden flex flex-col items-center justify-center pt-20 pb-12 px-3 sm:px-6 bg-[#F7F9FC] text-[#0A131F]",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      {/* 1. Cinematic Environment Overlays */}
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-45" aria-hidden="true" />

      {/* Radiant Coastal Sky & Sun Halo matching IMG_9176.jpg */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[650px] md:w-[850px] h-[380px] sm:h-[650px] md:h-[850px] bg-gradient-to-b from-[#38BDF8]/15 via-[#C89D52]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-5 w-80 h-80 bg-[#0E2646]/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* 2. Top Header Presentation (Intro Typography) */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-6 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#C89D52]/30 text-[#0E2646] text-[11px] sm:text-xs uppercase tracking-[0.22em] font-bold shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C89D52]" />
          <span>Wielki Jubileusz 70-lecia</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C89D52]" />
        </div>

        <h2 className="text-track text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0E2646] leading-none mb-1">
          {tagline1}
        </h2>
        <h1 className="text-days text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight gold-text-gradient leading-tight">
          {tagline2}
        </h1>
      </div>

      {/* 3. FOREGROUND LAYER: The Physical Deep Mediterranean Card from visuals.md */}
      <div className="relative z-20 w-full max-w-5xl flex items-center justify-center">
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card w-full rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 relative overflow-hidden"
        >
          {/* Dynamic Light Sheen reacting to mouse position */}
          <div className="card-sheen" aria-hidden="true" />

          {/* Golden top hairline border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5C582]/80 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: Event Details & Tactile Actions */}
            <div className="card-left-text lg:col-span-4 flex flex-col justify-center text-center lg:text-left space-y-4 order-2 lg:order-1">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E5C582] block">
                  Uroczysty Obiad & Biesiada
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight leading-snug">
                  {cardHeading}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                  {cardDescription || siteConfig.event.subtitle}
                </p>
              </div>

              {/* Event Time & Location Pill in Card */}
              <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1.5 text-left text-xs text-slate-200">
                <div className="flex items-center gap-2 text-[#E5C582] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#E5C582]" />
                  <span>{siteConfig.event.date.dayOfWeek}, {siteConfig.event.date.displayDate} r. • godz. {siteConfig.event.date.startTime}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{siteConfig.event.location.name} • {siteConfig.event.location.city}</span>
                </div>
              </div>

              {/* Tactile Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <button
                  onClick={scrollToRSVP}
                  className="btn-modern-gold px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#071324]" />
                  <span>Potwierdź obecność</span>
                </button>

                <button
                  onClick={scrollToDetails}
                  className="btn-modern-light px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0E2646]" />
                  <span>Kiedy, gdzie & dojazd</span>
                </button>
              </div>
            </div>

            {/* CENTER COLUMN: 3D Photo Showcase with Father's Portrait & Interactive Tilt */}
            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
              <div
                ref={showcaseRef}
                className="photo-showcase-box relative w-full max-w-[340px] sm:max-w-[370px] flex items-center justify-center will-change-transform transform-style-3d py-2"
              >
                {/* Golden Radial Halo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#C89D52]/20 via-[#38BDF8]/15 to-transparent rounded-3xl blur-2xl -z-10" />

                {/* Main 3D Card Display */}
                <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-black/40 shadow-2xl backdrop-blur-md">
                  
                  {/* Photo Switcher Pill on Top of Image */}
                  <div className="absolute top-3 left-3 z-30 flex items-center bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/15 text-[10px]">
                    <button
                      onClick={() => setPhotoMode("cutout")}
                      className={cn(
                        "px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer",
                        photoMode === "cutout"
                          ? "bg-[#C89D52] text-[#071324] font-bold shadow-sm"
                          : "text-slate-300 hover:text-white"
                      )}
                    >
                      Portret
                    </button>
                    <button
                      onClick={() => setPhotoMode("panorama")}
                      className={cn(
                        "px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer",
                        photoMode === "panorama"
                          ? "bg-[#C89D52] text-[#071324] font-bold shadow-sm"
                          : "text-slate-300 hover:text-white"
                      )}
                    >
                      Kadr Plaża
                    </button>
                  </div>

                  {/* Image Display */}
                  <div className="relative h-[340px] sm:h-[400px] w-full flex items-end justify-center overflow-hidden bg-[#0A182B]">
                    {photoMode === "cutout" ? (
                      <div className="relative w-full h-full flex items-end justify-center">
                        {/* Sun-drenched Mediterranean horizon backdrop */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2E6DA4] via-[#5295C9] to-[#C89D52]/40 opacity-70" />
                        
                        {/* Stylized 70 in Background of cutout */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-40">
                          <span
                            className="font-display text-[150px] font-extrabold text-transparent leading-none"
                            style={{
                              WebkitTextStroke: "2px rgba(255, 255, 255, 0.6)",
                              textShadow: "0 0 40px rgba(200, 157, 82, 0.4)",
                            }}
                          >
                            70
                          </span>
                        </div>

                        {/* Father's cutout portrait */}
                        <img
                          src="/photos/tata-beach-cutout.png"
                          alt="Stanisław Sznurowski"
                          className="relative z-10 h-[92%] w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] contrast-[1.04]"
                          loading="eager"
                        />
                      </div>
                    ) : (
                      /* Full Panoramic Beach Photo from IMG_9176.jpg */
                      <img
                        src="/photos/tata-beach-panorama.jpg"
                        alt="Stanisław Sznurowski na plaży"
                        className="w-full h-full object-cover object-top brightness-[0.98] contrast-[1.03]"
                        loading="eager"
                      />
                    )}

                    {/* Bottom Vignette */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#06101D] via-[#06101D]/70 to-transparent pointer-events-none z-20" />
                  </div>

                  {/* Name badge below image */}
                  <div className="p-3 bg-[#06101D]/90 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#E5C582] font-bold block">
                        Jubilat
                      </span>
                      <span className="font-display text-white font-bold text-sm tracking-wide">
                        Stanisław Sznurowski
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#C89D52] flex items-center justify-center bg-[#0E2646] text-[#E5C582] font-display font-bold text-xs shadow-sm">
                      70
                    </div>
                  </div>
                </div>

                {/* Floating Tactile Badges from visuals.md */}
                <div className="floating-badge absolute -top-3 -left-3 sm:-left-6 floating-ui-badge rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 z-30 border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C89D52]/40 to-[#0E2646] flex items-center justify-center border border-[#E5C582]/40 shadow-inner">
                    <span className="text-sm">🥂</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold tracking-tight">70. Urodziny</p>
                    <p className="text-[#E5C582] text-[10px] font-medium">Wielki Jubileusz</p>
                  </div>
                </div>

                <div className="floating-badge absolute -bottom-3 -right-3 sm:-right-6 floating-ui-badge rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 z-30 border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38BDF8]/40 to-[#0E2646] flex items-center justify-center border border-[#38BDF8]/40 shadow-inner">
                    <span className="text-sm">🌿</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold tracking-tight">Restauracja Toscana</p>
                    <p className="text-sky-200 text-[10px] font-medium">Wierzbna • Dolny Śląsk</p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Brand Name 70 & Stats Widget */}
            <div className="card-right-text lg:col-span-3 flex flex-col justify-center items-center lg:items-end text-center lg:text-right space-y-4 order-3">
              <div className="w-full">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#E5C582] font-bold block mb-1">
                  1956 – 2026
                </span>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-card-silver-matte leading-none">
                  {celebrantName}
                </h2>
              </div>

              {/* Widget Depth card from visuals.md */}
              <div className="w-full max-w-xs bg-white/5 rounded-2xl p-3.5 border border-white/10 text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                    Goście & Rodzina
                  </span>
                  <Heart className="w-3.5 h-3.5 text-[#E5C582] fill-[#E5C582]" />
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  <p className="flex items-center justify-between">
                    <span>Trzy pokolenia:</span>
                    <strong className="text-white">Przy jednym stole</strong>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Klimat:</span>
                    <strong className="text-[#E5C582]">Toskańska biesiada</strong>
                  </p>
                  <p className="flex items-center justify-between">
                    <span>Parking & Ogród:</span>
                    <strong className="text-emerald-400">Bezpłatny na posesji</strong>
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                Wspólnie świętujemy 70 lat pełnych podróży, uśmiechu i niezwykłych wspomnień.
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="pt-6 flex flex-col items-center text-slate-400 z-10">
        <button
          onClick={scrollToDetails}
          className="flex flex-col items-center gap-1 hover:text-[#0E2646] transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#0E2646]/70">
            Przewiń w dół
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#C89D52]" />
        </button>
      </div>
    </section>
  );
}
export default CinematicLandingHero;

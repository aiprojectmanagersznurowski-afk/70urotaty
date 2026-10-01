# Prompt: minimalistyczne zaproszenie urodzinowe (one-page, mobile-first)

> Skopiuj całość poniżej do Claude / Cursor / v0 / Lovable. Uzupełnij pola w sekcji **0. DANE**, resztę zostaw.

---

Zbuduj jednostronicowe, **minimalistyczne** zaproszenie urodzinowe jako stronę WWW (mobile-first, gotowe do wrzucenia na Netlify). Ma wyglądać jak elegancka, „redakcyjna” kartka: dużo bieli, jeden kolor akcentowy, mocna typografia, zero zbędnych dekoracji. Cały ruch na stronie ma być subtelny (blur → ostrość, lekki wjazd z dołu) — nic nie skacze ani nie miga.

## 0. DANE (uzupełnij)

Trzymaj wszystkie dane w jednym pliku `src/config.ts`, żeby dało się łatwo podmienić:

```ts
export const EVENT = {
  hostName: "Michał",            // mianownik
  hostFirstNameGen: "Michała",   // dopełniacz – do nagłówka „URODZINY MICHAŁA”
  age: 41,
  eventType: "Rodzinny obiad",   // eyebrow w lewym górnym rogu
  dateLabel: "18.10.2026",
  weekdayLabel: "niedziela",
  timeLabel: "13:00",
  durationLabel: "ok. 13:00–16:00",
  startUTC: "2026-10-18T11:00:00Z",
  endUTC:   "2026-10-18T14:00:00Z",
};
export const VENUE = {
  name: "Restauracja Orzo Wrocław", shortName: "Orzo Wrocław",
  address: "…", website: "https://…", lat: 51.1106, lng: 17.0386,
};
export const PARKING = { name: "Parking podziemny, Plac Nowy Targ", lat: 51.1109, lng: 17.0384,
  tip: "Zalecam parking podziemny przy Placu Nowy Targ — tuż obok restauracji." };
export const AFTER = { title: "Po obiedzie: spacer", text: "Po obiedzie wybierzemy się na spacer po Ostrowie Tumskim — kilka kroków od restauracji." };
export const KIDS = { text: "Restauracja ma kącik zabaw dla dzieci, więc najmłodsi goście na pewno się nie nudzą.", link: "https://…" };
export const MUSIC = { title: "Easy", artist: "The Commodores", src: "/audio/song.mp3" }; // własny plik audio
export const RSVP_ENDPOINT = "https://script.google.com/macros/s/…/exec"; // Google Apps Script → Google Sheets
export const PHOTOS = { portrait: "/img/portrait.png", hero: "/img/hero.jpg", gallery: [ /* {src, alt, wide?} */ ] };
```

## 1. Stack

- **Vite + React + TypeScript + Tailwind CSS v4** (tokeny w `@theme`).
- **GSAP + ScrollTrigger** – wyłącznie do animacji sterowanych scrollem (`scrub`).
- Animacje wejścia hero – **czyste CSS keyframes** (bez JS).
- Fonty z Google Fonts: **Big Shoulders Display** (800, display, wąski kondensowany) + **Manrope** (400/600/700/800, tekst).
- Bez backendu: RSVP leci `fetch` POST do Google Apps Script.
- Favicony (32px, 180px apple-touch-icon), `<title>`: „41. urodziny Michała”, OG image do podglądu w WhatsAppie/Messengerze.

## 2. Design system (minimalizm)

Tokeny kolorów (dokładnie te):

| token | wartość | użycie |
|---|---|---|
| `--color-bg` / `--color-paper` | `#ffffff` | tło, karty |
| `--color-ink` | `#211d1a` | tekst główny, cyfra „4” |
| `--color-muted` | `#8a8172` | tekst pomocniczy |
| `--color-terracotta` | `#b8552f` | **jedyny akcent**: cyfra „1”, imię, kreska, główny CTA |
| `--color-terracotta-deep` | `#8c3e20` | eyebrows (małe nagłówki sekcji), linki |
| `--color-khaki` | `#d8ccac` (używaj ~30–40% krycia jako tło) | karta „Dla najmłodszych” |
| `--color-khaki-deep` | `#b7a87c` | drugi kolor cząsteczek w animacji sukcesu |
| `--color-line` | `#211d1a24` (ink ~14%) | obramowania kart i inputów |

Zasady:
- Tło zawsze białe, brak gradientów tła, brak cieni (poza delikatnym `shadow-sm` przycisku muzyki).
- **Eyebrow** (nagłówek sekcji): 11px, bold, UPPERCASE, `letter-spacing: .18em`, kolor terracotta-deep, wyśrodkowany.
- **Nagłówki display**: Big Shoulders Display, extrabold, uppercase, `leading: .86–1.1`, `tracking-tight`.
- **Tekst**: Manrope 13–15px, `leading-relaxed`, muted dla opisów.
- **Karty**: `rounded-[24px]`, `border border-line`, `bg-paper`, `p-6`, `max-w-md`, wyśrodkowane.
- **Przyciski**: `rounded-[13–18px]`, `py-3/4`, bold 13–15px; feedback dotyku `active:scale-[0.98]` (bez hoverów-fajerwerków).
- Sekcje: `px-6 py-14`, kolumna `flex flex-col items-center gap-5/6`.
- Ikony: proste liniowe SVG 24×24, `stroke-width: 2`, `stroke-linecap: round` (kalendarz, pinezka, spacer, strzałka ↗).
- Uwzględnij `env(safe-area-inset-*)` (iPhone notch / home bar), `min-h-svh`, `-webkit-font-smoothing: antialiased`, `html { scroll-behavior: smooth }`.
- **`prefers-reduced-motion: reduce`** → wyłącz wszystkie animacje i ScrollTriggery, treść od razu widoczna.

## 3. Kolejność sekcji

1. Odtwarzacz muzyki (pływający przycisk)
2. Hero (intro)
3. Zdjęcie pełnej szerokości
4. Kiedy i gdzie + dodaj do kalendarza
5. Dojazd (nawigacja)
6. Dla najmłodszych
7. RSVP (formularz → ekran sukcesu)
8. Galeria zdjęć
9. Stopka

---

### 3.1 Muzyka w tle

- `<audio loop preload="auto">`, `volume = 0.55`.
- Przy montowaniu spróbuj `play()`; przeglądarki zwykle blokują autoplay, więc dodaj jednorazowe listenery (`pointerdown`, `touchstart`, `scroll`, `keydown`, `{ once: true, passive: true }`) – przy pierwszej interakcji odpal muzykę.
- Pływający okrągły przycisk w prawym dolnym rogu (`fixed`, ~40px, `rounded-full`, `bg-paper/80 backdrop-blur`, `border-line`, `shadow-sm`, `active:scale-90`, padding na safe-area).
- Ikona: głośnik z falami (gra) / głośnik z „X” (wyciszone lub jeszcze nie gra). Klik: jeśli pauza → play, w innym wypadku toggle `muted`. `aria-label`: „Włącz muzykę” / „Wycisz muzykę”.

### 3.2 Hero (pełny ekran, `min-h-svh`)

Układ od góry:
- **Pasek eyebrow**: lewo „RODZINNY OBIAD” (terracotta-deep), prawo nazwa lokalu (muted); 11px, bold, uppercase, `tracking .14em`.
- **Portret** (~132×152px) wyśrodkowany:
  - zdjęcie (najlepiej wycięte tło / PNG) z **miękką maską** `mask-image: radial-gradient(66% 72% at 50% 42%, #000 38%, transparent 100%)` – krawędzie rozpływają się w biel, bez ramki i bez okręgu;
  - pod spodem **poświata**: div z `radial-gradient(closest-side, var(--color-terracotta) 0%, transparent 72%)`, `filter: blur(34px)`, `opacity: .55`, `transform: scale(1.35)`.
- „ZAPRASZAM NA” – Big Shoulders, małe (~13px), uppercase, szeroki tracking (~.3em), muted.
- **Wiek jako ręcznie rysowane SVG** (nie font!) – każda cyfra osobnym `<svg>`, kreska `stroke-width 16`, `stroke-linecap: square`:
  - „4”: `viewBox 0 0 86 128`, ścieżki `M60 6 L14 82 H64` + `M64 6 V122`, kolor **ink**;
  - „1”: `viewBox 0 0 60 128`, ścieżka `M12 26 L34 6 V122`, kolor **terracotta**.
  - (dla innego wieku narysuj analogiczne cyfry tym samym grubym, geometrycznym stylem; pierwsza cyfra ink, druga terracotta).
- **„URODZINY MICHAŁA”** – Big Shoulders 42px (48px od `sm`), extrabold, uppercase, `leading .86`; słowo „urodziny” ink, imię terracotta.
- **Kreska**: 56×3px, `rounded-full`, terracotta.
- **Data**: „18.10.2026, niedziela, godz. **13:00**” – 13.5px, muted, godzina pogrubiona w ink, `max-w-[240px]`.
- Na dole: **„PRZEWIŃ”** (11px, tracking .18em, muted) + strzałka w dół (SVG `M12 5v14M5 12l7 7 7-7`).

**Choreografia wejścia (CSS)** – easing `cubic-bezier(.2,.8,.2,1)`, wszystko `forwards`, start `opacity:0`:

| element | animacja | czas | delay |
|---|---|---|---|
| portret | `portrait-in`: opacity 0→1, blur 4px→0, scale .92→1 (`cubic-bezier(.2,.9,.25,1)`) | 1s | 0.05s |
| eyebrow | `rise`: translateY 8px→0 + fade | 0.7s | 0.15s |
| „Zapraszam na” | `reveal`: blur 6px→0 + fade | 0.8s | 0.5s |
| cyfra 1 | `pop-num`: translateY 40px + scale .9 → 0/1, opacity pełna w 70% (`cubic-bezier(.25,1.1,.4,1)` – lekki overshoot) | 0.85s | 0.85s |
| cyfra 2 | `pop-num` | 0.85s | 1.0s |
| „Urodziny Michała” | `reveal` | 0.8s | 1.55s |
| kreska | `grow`: scaleX 0→1 od środka (`cubic-bezier(.3,1.4,.4,1)` – sprężynka) | 0.6s | 1.95s |
| data | `rise` | 0.7s | 2.1s |
| „Przewiń” | `rise` 0.6s @3.3s, potem nieskończone `bob` (translateY 0→6px→0, 1.8s ease-in-out) od 4.1s | | |

**Wyjście przy scrollu (GSAP)**: cała zawartość hero przy przewijaniu od `top top` do `bottom top` przechodzi do `autoAlpha .1, scale .92, y -36, blur(6px)`, `ease: none`, `scrub: .5`. Efekt: zaproszenie „odpływa w głąb” i rozmywa się.

### 3.3 Reużywalny hook `useScrollReveal(opts)`

Każda kolejna sekcja wjeżdża tym samym efektem (spójność = minimalizm):
`gsap.fromTo(el, {autoAlpha:0, y, scale, filter:`blur(${blur}px)`}, {autoAlpha:1, y:0, scale:1, filter:'blur(0px)', ease:'none', scrollTrigger:{trigger:el, start, end, scrub:.5}})`.
Domyślnie: `y 64, scale .94, blur 9, start "top 90%", end "top 45%"`. Sprzątanie przez `gsap.context().revert()`. Pomiń przy reduced-motion.

### 3.4 Zdjęcie pełnej szerokości

Jedno duże, emocjonalne zdjęcie (np. z rodzicami): `h-[80svh] w-full object-cover`, bez zaokrągleń, `loading="lazy"`. Reveal: `y 90, scale .92, blur 12, start "top 95%", end "top 30%"` – zdjęcie „wyostrza się” podczas przewijania.

### 3.5 Kiedy i gdzie

Eyebrow „KIEDY I GDZIE”, karta z 3 wierszami oddzielonymi cienką linią (`border-line`). Wiersz = kwadratowa ikonka (~36px, `rounded-xl`, tło terracotta ~8–10%, ikona terracotta) + tytuł (14px bold ink) + podtytuł (12px muted):
1. kalendarz – „18.10.2026 · niedziela” / „Start o 13:00 · ok. 13:00–16:00”
2. pinezka – nazwa restauracji
3. spacer (ikona chodzącej postaci) – „Po obiedzie: spacer” / opis

Pod spodem siatka 2 kolumny – **dodaj do kalendarza**:
- **„ Apple”** (logo Apple SVG) – generuje w locie plik `.ics` (VCALENDAR/VEVENT z `DTSTART/DTEND` w UTC, `SUMMARY`, `DESCRIPTION`, `LOCATION`, linie łączone `\r\n`), Blob `text/calendar`, pobranie jako `41-urodziny-michala.ics`, `revokeObjectURL` po 4s.
- **„Android / Google”** (kolorowe „G”) – link `https://calendar.google.com/calendar/render?action=TEMPLATE&text=…&dates=YYYYMMDDTHHMMSSZ/…&details=…&location=…`, `target=_blank`.
- Mały podpis 11.5px muted: „Dodaj do kalendarza, żeby nie zapomnieć”.

### 3.6 Dojazd

Eyebrow „DOJAZD”, dwa duże przyciski-linki (pełna szerokość `max-w-md`, tekst do lewej, ikona ↗ do prawej):
- **„Nawiguj do restauracji”** – wypełniony terracotta, biały tekst, podtytuł `text-white/75` z nazwą lokalu, `rounded-[18px] px-5 py-4`.
- **„Nawiguj na parking”** – wersja outline (biały, `border-line`, ink).
- Link wykrywa platformę: iOS (`/iP(hone|od|ad)/`) → `maps.apple.com/?daddr=lat,lng`, reszta → `https://www.google.com/maps/dir/?api=1&destination=lat,lng`.
- Pod przyciskami krótka wskazówka o parkingu (14px, muted).

### 3.7 Dla najmłodszych

Pojedyncza karta w tle khaki (≈35%), `rounded-[24px]`, bez obramowania: okrągła ikonka-emoji 🧸 na jaśniejszym khaki, tytuł „Dla najmłodszych” (bold), opis 13px `text-ink/80`, link „Zobacz kącik dla dzieci →” (12.5px bold terracotta-deep, podkreślenie `underline-offset-2`).

### 3.8 RSVP

Eyebrow „POTWIERDŹ OBECNOŚĆ” + nagłówek display 28px „BĘDZIESZ Z NAMI?”. Karta-formularz:
- **Dwa przyciski-wybory** (segment): „Będę 🎉” / „Nie dam rady”. Aktywny = wypełniony terracotta z białym tekstem; nieaktywny = biały z `border-line`.
- **Imię i nazwisko** (placeholder „np. Ciocia Basia”) – wymagane, min. 2 znaki.
- Tylko gdy „Będę”: dwa **steppery** obok siebie – „Dorośli” (domyślnie 2, min 1) i „Dzieci” (domyślnie 0, min 0); okrągłe przyciski − / + (28px, `aria-label` „Mniej/Więcej: Dorośli”), wartość pośrodku. Pojawienie się – płynnie (fade/height).
- **Uwagi (opcjonalnie)** – textarea 2 wiersze, placeholder „np. dieta, alergie”.
- Inputy: `rounded-[13px] border-line bg-bg px-4 py-3`, focus = obramowanie terracotta, bez glow.
- **„Wyślij odpowiedź”** – pełna szerokość, ink (lub terracotta), biały tekst; `disabled` dopóki brak wyboru i imienia; w trakcie: „Wysyłanie…”.
- Wysyłka: `fetch(RSVP_ENDPOINT, { method:"POST", headers:{"Content-Type":"text/plain;charset=utf-8"}, body: JSON.stringify({ name, attending:"yes"|"no", adults, kids, note, submittedAt }) })` – `text/plain` celowo, żeby ominąć preflight CORS w Google Apps Script. Przy „no” wysyłaj `adults:0, kids:0`.
- Błąd: mała czerwonawa notka „Coś poszło nie tak. Spróbuj jeszcze raz albo napisz bezpośrednio do Michała.”
- Dołącz **kod Google Apps Script** (`doPost(e)` → `JSON.parse(e.postData.contents)` → `appendRow` do arkusza z kolumnami: data, imię, obecność, dorośli, dzieci, uwagi) + instrukcję wdrożenia jako Web App (dostęp: „Każdy”).

**Ekran sukcesu** (zastępuje formularz):
- Okrągły terracotta znaczek z białym ✓ (SVG `M5 13l4 4L19 7`, stroke 3) – animacja `success-pop`: scale 0 + rotate(−15°) → 1/0°.
- **Wybuch konfetti z ~12–16 kropek** (8px, `rounded-full`), naprzemiennie terracotta / khaki-deep, każda z losowym `--dx/--dy` (±60–90px) i delay; `success-burst`: translate(0)→translate(var(--dx),var(--dy)) + scale 1→0, 0.8s `cubic-bezier(.15,.7,.3,1)`.
- Nagłówek display 26px: przy „tak” → „Dzięki, {imię}! Do zobaczenia 18.10.2026 🎉”; przy „nie” → „Dzięki za informację, {imię}. Będzie nam Ciebie brakować!” (imię = pierwszy wyraz z pola).
- Przy „tak” dodatkowo dwa przyciski kalendarza (Apple / Google) jak wyżej.

### 3.9 Galeria

Siatka `grid-cols-2 gap-2`, `px-3`, kafelki `aspect-square rounded-[18px] overflow-hidden object-cover`, ostatnie zdjęcie `wide: true` → `col-span-2 aspect-[16/10]`. Zdjęcia z życia solenizanta (rodzina, góry, przyjaciele), każde z opisowym `alt`, `loading="lazy"`. Cała siatka wjeżdża `useScrollReveal({ y:40, scale:.97, blur:6 })`.

### 3.10 Stopka

Wyśrodkowane: link „Restauracja Orzo Wrocław →” (12.5px semibold muted, underline) i pod nim „DO ZOBACZENIA” (Big Shoulders 13px, uppercase, tracking .2em, muted). Dużo pustej przestrzeni pod spodem (`pb` + safe-area).

## 4. Wymagania jakościowe

- Wygląda idealnie na 375–430px szerokości; na desktopie kolumna treści wyśrodkowana (`max-w-md`/`max-w-xl`), nic się nie rozciąga.
- Lighthouse: obrazy w WebP/AVIF, skompresowane (≤200 KB każde), portret w PNG z przezroczystością.
- Dostępność: kontrast tekstu muted na bieli ≥ 4.5:1 dla tekstu ≥ 14px, focus-visible na wszystkich kontrolkach, `lang="pl"`, `alt` na każdym zdjęciu.
- Żadnych bibliotek UI (shadcn, MUI) – czysty Tailwind.
- Całość tekstów po polsku, ciepły, osobisty ton (pierwsza osoba: „Zapraszam”, „Zalecam”).

## 5. Oddaj

1. Kompletny projekt (pliki: `config.ts`, `App.tsx`, komponenty sekcji, `index.css` z `@theme` i keyframes, `useScrollReveal.ts`, `calendar.ts`).
2. Kod Google Apps Script + instrukcję podpięcia do Google Sheets.
3. Instrukcję deployu na Netlify (`npm run build`, folder `dist`).

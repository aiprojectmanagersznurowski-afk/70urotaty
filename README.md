# ✉️ Minimalistyczne Zaproszenie Urodzinowe – 70. Urodziny Stanisława

Jednostronicowe, minimalistyczne zaproszenie urodzinowe (one-page, mobile-first) zaprojektowane jak elegancka, „redakcyjna” kartka: czysta biel, jeden mocny akcent terakoty, geometryczna typografia displayowa i subtelny ruch sterowany scrollem (GSAP ScrollTrigger).

---

## 📋 Spis treści
1. [Struktura projektu](#struktura-projektu)
2. [Konfiguracja danych (`src/config.ts`)](#konfiguracja-danych)
3. [Podpięcie pod Arkusz Google Sheets (Instrukcja Krok po Kroku)](#podpięcie-pod-arkusz-google-sheets)
4. [Instrukcja wdrożenia na Netlify](#instrukcja-wdrożenia-na-netlify)
5. [Uruchomienie lokalne](#uruchomienie-lokalne)

---

## 🏛️ Struktura projektu

- `src/config.ts` – jedno źródło prawdy: solenizant, wiek (70), data (24.10.2026), lokalizacja (Restauracja & Pizzeria Toscana, Wierzbna), zdjęcia i endpoint RSVP.
- `src/App.tsx` – główny komponent montujący sekcje w zdefiniowanej kolejności:
  1. `AudioPlayer` – pływający przycisk muzyki z odblokowaniem dźwięku przy pierwszym geście.
  2. `HeroSection` – pełnoekranowe intro z portretem w miękkiej masce, ręcznie rysowanymi cyframi SVG „70” i animacją wyjścia GSAP scrub.
  3. `FullWidthImageSection` – duże zdjęcie o pełnej szerokości wyostrzające się przy scrollu.
  4. `WhenAndWhereSection` – data, godzina, lokalizacja oraz generatory kalendarza (Apple `.ics` / Google Calendar).
  5. `DirectionsSection` – bezpośrednia nawigacja do lokalu i na parking z detekcją iOS / Android.
  6. `KidsSection` – karta kącika dziecięcego w subtelnym khaki.
  7. `RsvpSection` – formularz z przełącznikiem obecności, stepperami i animowanym ekranem sukcesu (konfetti w terakocie i khaki).
  8. `GallerySection` – siatka zdjęć z życia solenizanta z dużym kafelkiem panoramicznym.
  9. `FooterSection` – minimalistyczna stopka z linkiem do restauracji.
- `src/index.css` – tokeny `@theme`, typografia (Big Shoulders Display + Manrope), keyframes CSS i wsparcie `prefers-reduced-motion`.
- `src/useScrollReveal.ts` – reużywalny hook GSAP + ScrollTrigger (`y, scale, blur, scrub`).
- `src/calendar.ts` – pobieranie pliku `.ics` dla Apple i tworzenie linku do Google Calendar.
- `google-apps-script.js` – gotowy kod backendu do wklejenia w Google Apps Script.

---

## ⚙️ Konfiguracja danych

Wszystkie dane znajdują się w [src/config.ts](src/config.ts):

```typescript
export const EVENT = {
  hostName: "Stanisław",
  hostFirstNameGen: "Stanisława",
  age: 70,
  eventType: "Rodzinny obiad",
  dateLabel: "24.10.2026",
  weekdayLabel: "sobota",
  timeLabel: "16:00",
  durationLabel: "ok. 16:00–21:00",
  startUTC: "2026-10-24T14:00:00Z",
  endUTC:   "2026-10-24T19:00:00Z",
};
```

---

## 📊 Podpięcie pod Arkusz Google Sheets

Odpowiedzi gości są skonfigurowane do zapisu w dedykowanym arkuszu:
👉 **[Arkusz Google RSVP](https://docs.google.com/spreadsheets/d/1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8/edit?usp=sharing)**

### Jak uruchomić zapis do arkusza w 2 minuty:
1. Otwórz arkusz: https://docs.google.com/spreadsheets/d/1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8/edit
2. W górnym menu kliknij: **Rozszerzenia** (Extensions) → **Apps Script**.
3. Otwórz plik `google-apps-script.js` z tego projektu, skopiuj całą jego zawartość i wklej do edytora Apps Script (zastępując `function myFunction() {}`).
4. Kliknij ikonę dyskietki (**Zapisz** / `Cmd+S`).
5. W prawym górnym rogu kliknij niebieski przycisk **Wdróż** (Deploy) → **Nowe wdrożenie** (New deployment).
6. Kliknij ikonę koła zębatego obok „Wybierz typ” i wskaż **Aplikacja internetowa** (Web app).
7. Wypełnij:
   - **Opis:** `RSVP 70 Stanisław`
   - **Wykonaj jako:** `Ja (<Twój email>)`
   - **Kto ma dostęp:** `Każdy` (**Anyone**) — *to gwarantuje, że goście wyślą zgłoszenie bez logowania*.
8. Kliknij **Wdróż** i zatwierdź uprawnienia do edycji arkusza.
9. Skopiuj wygenerowany **Adres URL aplikacji internetowej** (kończący się na `/exec`).
10. Wklej ten adres w [src/config.ts](src/config.ts) jako `RSVP_ENDPOINT`:
    ```typescript
    export const RSVP_ENDPOINT = "https://script.google.com/macros/s/TWÓJ_ID/exec";
    ```
11. Zapisz plik i zdeployuj stronę. Odpowiedzi od razu zaczną pojawiać się w arkuszu!

> **Zabezpieczenie:** Strona posiada wbudowaną kopię zapasową odpowiedzi w `localStorage`, więc nawet przy problemach z siecią żadne zgłoszenie nie przepadnie.

---

## 🚀 Instrukcja wdrożenia na Netlify

Projekt jest w 100% zoptymalizowany pod kątem darmowego hostingu na Netlify (statyczny build Vite).

### Metoda 1: Przez Git (Zalecana)
1. Zaloguj się na [Netlify](https://app.netlify.com/).
2. Kliknij **Add new site** → **Import an existing project**.
3. Wybierz dostawcę **GitHub** i wskaż repozytorium:
   `https://github.com/aiprojectmanagersznurowski-afk/70urotaty`
4. Netlify automatycznie uzupełni:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Kliknij **Deploy site**. Strona zostanie zbudowana i opublikowana pod bezpłatną domeną (np. `twoja-nazwa.netlify.app`).

### Metoda 2: Przeciągnij i upuść (Netlify Drop)
1. Uruchom w terminalu:
   ```bash
   npm run build
   ```
2. Wejdź na [Netlify Drop](https://app.netlify.com/drop).
3. Przeciągnij i upuść folder `dist` z projektu do okna przeglądarki. Strona będzie online w 10 sekund!

---

## 💻 Uruchomienie lokalne

```bash
# Instalacja paczek
npm install

# Start lokalnego serwera Vite
npm run dev

# Kompilacja i sprawdzenie typów
npm run build
```

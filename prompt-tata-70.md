# PROMPT: Generator Zaproszenia Webowego na 70. Urodziny Taty (Mobile-First Web App)

Skopiuj i wklej poniższy prompt do agenta AI / asystenta kodowania (np. Claude, Cursor, Antigravity, Gemini), aby wygenerować aplikację:

---

```markdown
Jesteś doświadczonym Senior Frontend Developerem i Creative Designerem specjalizującym się w luksusowych, kinowych mikro-stronach mobilnych. Twoim zadaniem jest stworzenie nowoczesnej, interaktywnej, jednostronicowej aplikacji webowej (mobile-first), pełniącej rolę eleganckiego zaproszenia na 70. urodziny mojego taty.

Aplikacja musi zachować wszystkie kluczowe funkcjonalności wcześniejszego zaproszenia urodzinowego (nawigacja, kalendarze, formularz RSVP ze skryptem Google Sheets, muzyka w tle, galeria zdjęć z kinowym scrollem), ale zyskać zupełnie NOWY, szlachetny charakter wizualny i toskański klimat dopasowany do jubileuszu 70-lecia i wybranego lokalu.

---

### 1. DANE BAZOWE I LOGISTYKA:
- **Okazja:** 70. Urodziny Taty [Imię Taty - wstaw zmienną w konfiguracji, np. "70. Urodziny Taty / Zygmunta"]
- **Format wydarzenia:** Uroczysty obiad i toskańskie biesiadowanie w gronie najbliższych
- **Godzina:** 16:00 (datę wstaw jako placeholder w formacie DD.MM.RRRR, np. 24.10.2026, sobota)
- **Czas trwania:** ok. 16:00 – 21:00
- **Miejsce:** Restauracja & Pizzeria Toscana
- **Adres:** ul. Spokojna 3, 58-130 Wierzbna
- **Profil lokalu (Facebook):** https://www.facebook.com/toscanawierzbna/?locale=pl_PL
- **Link do Google Maps (Restauracja):** https://www.google.com/maps/place//data=!4m2!3m1!1s0x470fb2711f54a96f:0x3e6d97571543e5ce?sa=X&ved=1t:8290&ictx=111
- **Link nawigacji bezpośredniej:** https://www.google.com/maps/search/?api=1&query=Restauracja+Toscana+Spokojna+3+Wierzbna
- **Parking:** Bezpłatny parking na posesji restauracji (ten sam adres / bezpośredni wjazd)
- **Kącik / udogodnienia:** Restauracja przyjazna rodzinom, z ogrodem i przestrzenią dla najmłodszych

---

### 2. ZDJĘCIA DO WYKORZYSTANIA (Katalog: `photo tato`):
Ścieżka do zdjęć: `/Users/michalsznurowski/Developemnt/RSVP 41 uro/photo tato/`
- **Hero / Ekran powitalny:** `IMG_9176 copy Background Removed.png` (zdjęcie portretowe z usuniętym tłem — umieść je centralnie z miękkim gradientem przenikającym w tło i elegancką oprawą jubileuszową).
- **Kinowy przerywnik w pełnej szerokości (Scroll Reveal):** `IMG_5236.JPG` (pełnowymiarowe zdjęcie wjeżdżające z płynnym efektem blur/scale podczas przewijania).
- **Galeria wspomnień ("Chwile i Wspomnienia"):**
  - `IMG_2800.JPG`
  - `20201108_115158.JPG`
  - `20191012_134804.JPG`
  - `20200307_144548.JPG`
  - `20190421_105604.JPG`
  - `IMG_0422.JPG`
  - `IMG_9176.jpg`

---

### 3. PALETA KOLORÓW I STYL WIZUALNY:
Zamiast miejskiego minimalizmu i terakoty, zaprojektuj styl **„Tuscan Prestige & Golden Jubilee”** (ciepły, szlachetny, włoski minimalizm z dostojnym złotym akcentem):
- **Tło bazowe (`--color-bg`, `--color-paper`):** Ciepły krem / alabaster / papier czerpany (`#FAF8F5` oraz `#FFFFFF` dla kart).
- **Główny tekst (`--color-ink`):** Głębokie toskańskie espresso / ciepły heban (`#1E1C1A`).
- **Kolor wiodący (`--color-cypress` / akcent):** Głęboka cyprysowa zieleń oliwna (`#254436` / `#2D5042`) – symbol toskańskiej natury, spokoju i szlachetności.
- **Kolor jubileuszowy (`--color-gold`):** Satynowe, ciepłe złoto / mosiądz (`#C5A059` / `#D4AF37`) – użyte ze smakiem przy rocznicy "70", dividerach i akcentach.
- **Odcień pomocniczy (`--color-sand`):** Ciepły piasek toskański (`#EFECE6` / `#E2DDD3`).
- **Subtelne obramowania (`--color-line`):** `#1E1C1A18`.
- **Typografia:**
  - Nagłówki i akcenty jubileuszowe: Szlachetny krój szeryfowy (np. `Playfair Display`, `Cormorant Garamond` lub `Cinzel`).
  - Treść, etykiety i formularz: Nowoczesny, czysty i bardzo czytelny `Plus Jakarta Sans` lub `Manrope`.

---

### 4. MODYFIKACJA WIZUALIZACJI I RÓŻNICE WZGLĘDEM POPRZEDNIEJ WERSJI:
1. **Hero / Intro:**
   - Wykorzystaj zdjęcie taty bez tła (`IMG_9176 copy Background Removed.png`).
   - Nadaj dostojny charakter jubileuszu 70-lecia: stylizowana cyfra **70** z subtelnym złotym obrysem / cieniem w tle, pod spodem elegancki napis szeryfowy: *„Jubileusz 70. Urodzin Taty”*.
   - Miękkie wejście i wygaszanie hero przy scrollu (GSAP / scroll-driven fade out).
2. **Karta informacyjna "Kiedy i Gdzie":**
   - Elegancka, zaokrąglona karta na tle toskańskiego kremu ze złotymi/oliwkowymi ikonami i mikroliniami.
   - Sekcja z linkiem do lokalu oraz bezpośrednimi przyciskami:
     - 🍏 **Dodaj do Apple Calendar** (plik `.ics` generowany on-the-fly)
     - 📅 **Dodaj do Google Calendar** (precyzyjny link z godzinami, adresem i opisem)
3. **Sekcja Dojazdu i Nawigacji:**
   - Przycisk główny: *"Nawiguj do Restauracji Toscana"* (kolor głębokiej zieleni cyprysowej ze złotym akcentem).
   - Przycisk dodatkowy: *"Parking przy lokalu"* (bezpłatny, wygodny wjazd bezpośrednio z ul. Spokojnej).
   - Krótka, ciepła wskazówka logistyczna dla gości.
4. **Sekcja Atmosfery & Rodziny (zamiast technicznego kącika dla dzieci):**
   - Ciepła notatka o toskańskim klimacie spotkania, wspólnym świętowaniu, obiedzie, winie i przestrzeni przyjaznej zarówno dorosłym, jak i najmłodszym (ogród, kącik).
5. **Formularz RSVP (Potwierdzenie obecności):**
   - Elegancki przełącznik: *"Będę z radością 🥂"* / *"Niestety nie dam rady"*.
   - Pola: Imię i nazwisko gościa, selektor liczby osób dorosłych i dzieci, opcjonalne uwagi (diety, alergie, życzenia).
   - Integracja z Webhookiem Google Apps Script (zapis do Google Sheets).
   - Animowany stan sukcesu (ciepłe podziękowanie i potwierdzenie).
6. **Kinowa Galeria Wspomnień:**
   - Układ kafelkowy / collage prezentujący wybrane zdjęcia z życia taty, rodziny i wspólnych wypraw.
   - Płynny wjazd kafelków z efektem kinowym (`scrub` powiązany ze scrollem – blur, scale, opacity).
7. **Muzyka w tle:**
   - Dyskretny utwór w tle tworzący ciepły, toskański nastrój (np. włoska klasyka, Dean Martin, Andrea Bocelli lub spokojny jazz).
   - Automatyczny start przy pierwszej interakcji użytkownika (tap/scroll) + subtelny, pływający przycisk wyciszenia/odtwarzania (mute/unmute) w rogu ekranu.

---

### 5. ARCHITEKTURA TECHNICZNA I WYMOGI JAKOŚCIOWE:
- **Stack:** Vite + React + TypeScript + Tailwind CSS (v4) + GSAP (ScrollTrigger).
- **Architektura Config-First:** Wszystkie dane (daty, adresy, linki, współrzędne, imiona, teksty, endpoint RSVP) muszą znajdować się w jednym pliku `src/config/site.ts`, co pozwala zmienić dowolny parametr bez dotykania komponentów.
- **Mobile-First UX:** Idealnie zoptymalizowane pod ekrany smartfonów (iPhone / Android) z uwzględnieniem `safe-area-inset`.
- **OpenGraph & Ikony:** Przygotowane meta-tagi w `index.html` pod podgląd linku w komunikatorach (WhatsApp, Messenger, iMessage, SMS) z eleganckim tytułem i zdjęciem taty.
- **Dostępność i Animacje:** Obsługa `prefers-reduced-motion` dla osób preferujących brak dynamicznych efektów.

---

### 6. REPOZYTORIUM I WDROŻENIE (DEPLOYMENT):
- **Adres zdalnego repozytorium GitHub:** `https://github.com/aiprojectmanagersznurowski-afk/70urotaty`
- **Konfiguracja Git:**
  - Zainicjalizuj repozytorium git, podepnij remote: `git remote add origin https://github.com/aiprojectmanagersznurowski-afk/70urotaty.git`
  - Przygotuj plik `.gitignore` (node_modules, dist, .env, itp.)
  - Skonfiguruj gałąź `main` i wypchnij kod: `git push -u origin main`
- **Wdrożenie (Hosting / Netlify):**
  - Projekt ma być skonfigurowany pod automatyczny deploy z repozytorium GitHub na **Netlify** (lub Vercel).
  - Dodaj plik `netlify.toml` w głównym katalogu projektu z konfiguracją:
    ```toml
    [build]
      command = "npm run build"
      publish = "dist"

    [[headers]]
      for = "/*"
      [headers.values]
        X-Robots-Tag = "noindex, nofollow"
    ```
  - Zadbaj o nagłówek `noindex` (prywatność zaproszenia – strona nie powinna być indeksowana przez Google).
  - W pliku `README.md` umieść czytelną instrukcję krok po kroku:
    1. Jak uruchomić projekt lokalnie (`npm install`, `npm run dev`)
    2. Jak zrobić build produkcyjny (`npm run build`)
    3. Jak podpiąć repo `aiprojectmanagersznurowski-afk/70urotaty` w panelu Netlify / Vercel
    4. Jak wdrożyć webhook Google Apps Script do RSVP (krok po kroku) i podmienić URL w `site.ts`.
```

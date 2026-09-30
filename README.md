# 🥂 Jubileusz 70. Urodzin Taty (Toscana Wierzbna)

Nowoczesna, luksusowa i interaktywna jednostronicowa aplikacja webowa (Mobile-First) pełniąca rolę zaproszenia na 70. urodziny Taty. Zaprojektowana w szlachetnym toskańskim stylu wizualnym **„Tuscan Prestige & Golden Jubilee”**.

---

## 🌟 Główne Funkcjonalności

- **Hero / Intro:** Portret Jubilata z usuniętym tłem, stylizowana cyfra „70” ze złotym akcentem oraz kinowy efekt wygaszania (GSAP ScrollTrigger).
- **Kiedy i Gdzie:** Karta harmonogramu z bezpośrednim pobieraniem pliku `.ics` dla Apple Calendar oraz linkiem web intent do Google Calendar.
- **Dojazd & Nawigacja:** Bezpośrednie wywołanie nawigacji Google Maps do Restauracji Toscana oraz instrukcja bezpłatnego parkingu na posesji.
- **Toskańska Atmosfera & Rodzina:** Sekcja celebrująca włoskie smaki, biesiadowanie, rodzinne więzi i przestrzeń przyjazną dla dzieci (ogród, kącik).
- **Kinowy Przerywnik:** Pełnoekranowy scroll-reveal (`IMG_5236.JPG`) z toskańskim mottem.
- **Galeria Wspomnień:** Kolaż fotografii rodzinnych z interaktywnym podglądem pełnoekranowym (Lightbox).
- **Formularz RSVP:** Elegancki wybór obecności, licznik gości, integracja z arkuszem Google Sheets i wystrzał złotego konfetti.
- **Muzyka w Tle:** Dyskretna toskańska melodia gitarowa uruchamiana automatycznie po pierwszej interakcji (z pływającym widgetem wyciszenia/odtwarzania).
- **Architektura Config-First:** Wszystkie dane (daty, adresy, linki, teksty, endpointy) zgromadzone w jednym pliku `src/config/site.ts`.

---

## 🚀 1. Uruchomienie Lokalne

Wymagany jest Node.js (wersja 18+ lub 20+).

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:5173`.

---

## 📦 2. Build Produkcyjny

Aby przetestować lub wygenerować wersję produkcyjną:

```bash
npm run build
```

Pliki gotowe do wdrożenia znajdą się w katalogu `dist/`.

---

## ☁️ 3. Wdrożenie na Netlify / Vercel

Repozytorium GitHub:
👉 `https://github.com/aiprojectmanagersznurowski-afk/70urotaty`

### Wdrożenie na Netlify:
1. Zaloguj się na [Netlify](https://app.netlify.com/).
2. Kliknij **Add new site** → **Import an existing project**.
3. Wybierz **GitHub** i wskaż repozytorium `aiprojectmanagersznurowski-afk/70urotaty`.
4. Netlify automatycznie wykryje ustawienia z pliku `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Kliknij **Deploy site**.
6. Strona posiada wbudowany nagłówek `X-Robots-Tag: noindex, nofollow`, dzięki czemu nie będzie indeksowana przez wyszukiwarki.

---

## 📝 4. Konfiguracja Formularza RSVP (Google Sheets Webhook)

Aby odpowiedzi gości zapisywały się automatycznie w Twoim arkuszu Google:

### Krok 1: Utwórz Arkusz Google
1. Wejdź na [Google Sheets](https://sheets.new) i utwórz nowy arkusz, np. `RSVP 70 Urodziny Taty`.
2. W pierwszym wierszu (nagłówki) wpisz:
   - Kolumna A: `Data zgłoszenia`
   - Kolumna B: `Imię i Nazwisko`
   - Kolumna C: `Obecność`
   - Kolumna D: `Dorośli`
   - Kolumna E: `Dzieci`
   - Kolumna F: `Wiadomość / Uwagi / Diety`

### Krok 2: Utwórz Google Apps Script
1. W arkuszu wybierz z górnego menu: **Rozszerzenia** (Extensions) → **Apps Script**.
2. Usuń domyślny kod i wklej poniższy skrypt:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.attending || '',
      data.adults || 0,
      data.children || 0,
      data.notes || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

### Krok 3: Wdróż jako aplikację internetową (Web App)
1. Kliknij niebieski przycisk **Wdróż** (Deploy) w prawym górnym rogu → **Nowe wdrożenie** (New deployment).
2. Jako typ wybierz: **Aplikacja internetowa** (Web app).
3. Ustaw:
   - **Opis:** `RSVP Webhook`
   - **Wykonaj jako:** `Ja` (Twoje konto Google)
   - **Kto ma dostęp:** `Każdy` (Anyone) – *kluczowe, aby goście mogli wysłać formularz bez logowania!*
4. Kliknij **Wdróż** i zaakceptuj uprawnienia.
5. Skopiuj wygenerowany **Adres URL aplikacji internetowej** (kończący się na `/exec`).

### Krok 4: Podmień URL w kodzie
Otwórz plik [src/config/site.ts](src/config/site.ts) i wklej skopiowany URL:

```typescript
rsvp: {
  deadlineDisplay: "10 października 2026 r.",
  webhookUrl: "TUTAJ_WKLEJ_SKOPIOWANY_URL_GOOGLE_APPS_SCRIPT",
  // ...
}
```

Zapisz plik, zrób commit i push – gotowe!

---

## 🎨 Paleta Barw „Tuscan Prestige & Golden Jubilee”

- **Krem toskański:** `#FAF8F5`
- **Głębokie espresso:** `#1E1C1A`
- **Zieleń cyprysowa:** `#254436`
- **Złoto jubileuszowe:** `#C5A059` / `#DEC283`
- **Ciepły piasek:** `#EFECE6`

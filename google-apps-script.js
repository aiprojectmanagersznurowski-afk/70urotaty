/**
 * Skrypt Google Apps Script do obsługi formularza RSVP
 * Arkusz Google: https://docs.google.com/spreadsheets/d/1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8/edit
 *
 * INSTRUKCJA WDROŻENIA W 2 MINUTY:
 * 1. Otwórz arkusz kalkulacyjny:
 *    https://docs.google.com/spreadsheets/d/1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8/edit
 * 2. W menu górnym kliknij: Rozszerzenia (Extensions) -> Apps Script.
 * 3. Skasuj istniejący kod w edytorze i wklej poniższy kod w całości.
 * 4. Zapisz projekt (ikona dyskietki lub Ctrl+S / Cmd+S).
 * 5. W prawym górnym rogu kliknij: Wdróż (Deploy) -> Nowe wdrożenie (New deployment).
 * 6. Kliknij ikonę koła zębatego (Wybierz typ) -> Aplikacja internetowa (Web app).
 * 7. Ustaw pola:
 *    - Opis: RSVP 70 Urodziny Stanisława
 *    - Wykonaj jako: Ja (twój adres e-mail)
 *    - Kto ma dostęp: Każdy (Anyone) <--- BARDZO WAŻNE!
 * 8. Kliknij "Wdróż" (Deploy), autoryzuj dostęp przy pierwszym razie.
 * 9. Skopiuj wygenerowany adres URL aplikacji internetowej (kończący się na /exec).
 * 10. Wklej ten URL w pliku `src/config.ts` pod klucz `RSVP_ENDPOINT`.
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById("1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8");
    var sheet = ss.getActiveSheet();

    // Dodanie wiersza nagłówkowego, jeśli arkusz jest jeszcze pusty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data zgłoszenia",
        "Imię i nazwisko",
        "Obecność",
        "Dorośli",
        "Dzieci",
        "Uwagi / Dieta"
      ]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#f4efe8");
    }

    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var submittedAt = data.submittedAt || new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
    var name = data.name || "";
    var attending = data.attending === "yes" ? "TAK" : "NIE";
    var adults = data.attending === "yes" ? Number(data.adults || 0) : 0;
    var kids = data.attending === "yes" ? Number(data.kids || 0) : 0;
    var note = data.note || "";

    sheet.appendRow([
      submittedAt,
      name,
      attending,
      adults,
      kids,
      note
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Odpowiedź została pomyślnie zapisana w arkuszu."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Endpoint RSVP 70. Urodziny Stanisława działa poprawnie. Wyślij zapytanie POST.");
}

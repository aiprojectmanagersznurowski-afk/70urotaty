export const EVENT = {
  hostName: "Stanisław",            // mianownik
  hostFirstNameGen: "Stanisława",   // dopełniacz – do nagłówka „URODZINY STANISŁAWA”
  age: 70,
  eventType: "Rodzinny obiad",      // eyebrow w lewym górnym rogu
  dateLabel: "24.10.2026",
  weekdayLabel: "sobota",
  timeLabel: "16:00",
  durationLabel: "ok. 16:00–21:00",
  startUTC: "2026-10-24T14:00:00Z",
  endUTC:   "2026-10-24T19:00:00Z",
};

export const VENUE = {
  name: "Restauracja & Pizzeria Toscana",
  shortName: "Restauracja Toscana",
  address: "Spokojna 3, 58-130 Wierzbna",
  website: "https://www.facebook.com/toscanawierzbna/?locale=pl_PL",
  lat: 50.8997,
  lng: 16.5360,
};

export const PARKING = {
  name: "Bezpłatny parking na terenie lokalu",
  lat: 50.8997,
  lng: 16.5360,
  tip: "Wygodny, przestronny parking bezpośrednio przy posesji restauracji (wjazd od ul. Spokojnej).",
};

export const AFTER = {
  title: "Po obiedzie: wspólne chwile",
  text: "Po obiedzie zapraszam na toast, wyśmienite desery, włoską kawę oraz rozmowy i wspomnienia w ciepłym gronie.",
};

export const KIDS = {
  text: "Restauracja ma kącik zabaw dla dzieci oraz bezpieczną przestrzeń w ogrodzie, więc najmłodsi goście na pewno się nie nudzą.",
  link: "https://www.facebook.com/toscanawierzbna/?locale=pl_PL",
};

export const MUSIC = {
  title: "Toskański Poranek",
  artist: "Acoustic Serenada",
  src: "/audio/toscan-ambient.mp3",
};

export const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8/edit?usp=sharing";
export const GOOGLE_SHEET_ID = "1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8";
export const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwPzRSVP70TatoWebservice/exec";

export interface GalleryPhoto {
  src: string;
  alt: string;
  wide?: boolean;
}

export const PHOTOS = {
  portrait: "/photos/tata-portrait-upper.png",
  hero: "/photos/IMG_9176.jpg",
  gallery: [
    { src: "/photos/IMG_5236.JPG", alt: "W gronie najbliższych przy wspólnym stole" },
    { src: "/photos/IMG_2800.JPG", alt: "Uśmiechnięty Stanisław w podróży" },
    { src: "/photos/20201108_115158.JPG", alt: "Jesienny spacer i chwila wytchnienia" },
    { src: "/photos/20191012_134804.JPG", alt: "Rodzinne chwile i spotkania" },
    { src: "/photos/IMG_9245.jpg", alt: "Wspomnienia z wakacyjnych wyjazdów" },
    { src: "/photos/IMG_9207.jpg", alt: "Radość i pogoda ducha" },
    { src: "/photos/tata-beach-panorama.jpg", alt: "Słoneczny dzień nad morzem i klify", wide: true },
  ] as GalleryPhoto[],
};

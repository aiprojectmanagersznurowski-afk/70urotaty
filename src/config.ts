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
  title: "I Don't Want to Miss a Thing",
  artist: "Aerosmith",
  src: "/audio/aerosmith-miss-a-thing.mp3",
};

export const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8/edit?usp=sharing";
export const GOOGLE_SHEET_ID = "1ouOYi-DBtntQ-BPmBS3rd2_OeT3_UgWMGgnHh93klw8";
export const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwAUoygUAheuX0qAy9Avo5Tn3aqQdgEohGl8RoTmHEeg2nKSe8x-IJs5JxC8eADaWIS/exec";

export interface GalleryPhoto {
  src: string;
  alt: string;
  wide?: boolean;
}

export const PHOTOS = {
  portrait: "/photos/tata-portrait-upper.png",
  hero: "/photos/IMG_9176.jpg",
  gallery: [
    { src: "/photos/gallery/g01.jpg", alt: "Zdjęcie 1" },
    { src: "/photos/gallery/g02.jpg", alt: "Zdjęcie 2" },
    { src: "/photos/gallery/g03.jpg", alt: "Zdjęcie 3" },
    { src: "/photos/gallery/g04.jpg", alt: "Zdjęcie 4" },
    { src: "/photos/gallery/g05.jpg", alt: "Zdjęcie 5" },
    { src: "/photos/gallery/g06.jpg", alt: "Zdjęcie 6" },
    { src: "/photos/gallery/g07.jpg", alt: "Zdjęcie 7" },
    { src: "/photos/gallery/g08.jpg", alt: "Zdjęcie 8" },
    { src: "/photos/gallery/g09.jpg", alt: "Zdjęcie 9" },
    { src: "/photos/gallery/g10.jpg", alt: "Zdjęcie 10" },
    { src: "/photos/gallery/g11.jpg", alt: "Zdjęcie 11" },
    { src: "/photos/gallery/g12.jpg", alt: "Zdjęcie 12" },
    { src: "/photos/gallery/g13.jpg", alt: "Zdjęcie 13" },
    { src: "/photos/gallery/g14.jpg", alt: "Zdjęcie 14" },
    { src: "/photos/gallery/g15.jpg", alt: "Zdjęcie 15" },
    { src: "/photos/gallery/g16.jpg", alt: "Zdjęcie 16" },
    { src: "/photos/gallery/g17.jpg", alt: "Zdjęcie 17" },
    { src: "/photos/gallery/g18.jpg", alt: "Zdjęcie 18" },
    { src: "/photos/gallery/g19.jpg", alt: "Zdjęcie 19" },
    { src: "/photos/gallery/g20.jpg", alt: "Zdjęcie 20" },
    { src: "/photos/gallery/g21.jpg", alt: "Zdjęcie 21" },
    { src: "/photos/gallery/g22.jpg", alt: "Zdjęcie 22" },
    { src: "/photos/gallery/g23.jpg", alt: "Zdjęcie 23" },
    { src: "/photos/gallery/g24.jpg", alt: "Zdjęcie 24" },
  ] as GalleryPhoto[],
};

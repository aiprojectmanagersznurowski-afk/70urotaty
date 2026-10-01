export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  caption: string;
  year?: string;
  featured?: boolean;
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  event: {
    celebrantName: string; // e.g. "Taty" or "Zygmunta"
    celebrantFullName: string; // e.g. "Zygmunt"
    age: number;
    title: string;
    subtitle: string;
    tagline: string;
    type: string;
    date: {
      displayDate: string; // "24.10.2026"
      dayOfWeek: string; // "Sobota"
      startTime: string; // "16:00"
      endTime: string; // "21:00"
      isoStart: string; // "2026-10-24T16:00:00"
      isoEnd: string; // "2026-10-24T21:00:00"
      icsStart: string; // "20261024T140000Z" (UTC approx or local float)
      icsEnd: string; // "20261024T190000Z"
    };
    location: {
      name: string;
      subname: string;
      address: string;
      city: string;
      postalCode: string;
      fullAddress: string;
      facebookUrl: string;
      mapsUrl: string;
      navigationUrl: string;
      parkingInfo: string;
      parkingDetails: string;
      atmosphereNote: string;
      familyFriendlyNote: string;
    };
    rsvp: {
      deadlineDisplay: string; // "10 października 2026 r."
      webhookUrl: string;
      contactPersons: {
        name: string;
        role: string;
        phone: string;
        formattedPhone: string;
      }[];
    };
  };
  media: {
    heroPortrait: string;
    cinematicBreak: {
      src: string;
      quote: string;
      author: string;
    };
    gallery: GalleryImage[];
    audio: {
      trackTitle: string;
      artist: string;
      src: string;
      defaultVolume: number;
    };
  };
}

export const siteConfig: SiteConfig = {
  meta: {
    title: "Jubileusz 70. Urodzin Taty Stanisława | Zaproszenie",
    description: "Serdecznie zapraszamy na uroczysty obiad i toskańskie biesiadowanie z okazji 70. Urodzin Taty Stanisława w Restauracji Toscana w Wierzbnej.",
    ogImage: "/photos/gallery-7.jpg",
  },
  event: {
    celebrantName: "Stanisława",
    celebrantFullName: "Stanisław Sznurowski",
    age: 70,
    title: "Jubileusz 70. Urodzin Taty Stanisława",
    subtitle: "Uroczysty obiad & toskańskie biesiadowanie w gronie najbliższych",
    tagline: "Siedem dekad pięknych historii, podróży i rodzinnego ciepła",
    type: "Uroczysty obiad i toskańskie biesiadowanie",
    date: {
      displayDate: "24.10.2026",
      dayOfWeek: "Sobota",
      startTime: "16:00",
      endTime: "21:00",
      isoStart: "2026-10-24T16:00:00",
      isoEnd: "2026-10-24T21:00:00",
      icsStart: "20261024T140000Z",
      icsEnd: "20261024T190000Z",
    },
    location: {
      name: "Restauracja & Pizzeria Toscana",
      subname: "Włoski klimat, gościnność i serce na talerzu",
      address: "ul. Spokojna 3",
      city: "Wierzbna",
      postalCode: "58-130",
      fullAddress: "ul. Spokojna 3, 58-130 Wierzbna",
      facebookUrl: "https://www.facebook.com/toscanawierzbna/?locale=pl_PL",
      mapsUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x470fb2711f54a96f:0x3e6d97571543e5ce?sa=X&ved=1t:8290&ictx=111",
      navigationUrl: "https://www.google.com/maps/search/?api=1&query=Restauracja+Toscana+Spokojna+3+Wierzbna",
      parkingInfo: "Bezpłatny parking na terenie lokalu",
      parkingDetails: "Wygodny, przestronny parking bezpośrednio przy posesji restauracji (wjazd od ul. Spokojnej).",
      atmosphereNote: "Toskańskie smaki, wyborne wino, aromat ziół i przede wszystkim bezcenny czas spędzony razem przy wspólnym stole.",
      familyFriendlyNote: "Lokal jest przyjazny całym rodzinom. Dzieci mają do dyspozycji bezpieczną przestrzeń, ogród oraz kącik zabawy.",
    },
    rsvp: {
      deadlineDisplay: "10 października 2026 r.",
      webhookUrl: "https://script.google.com/macros/s/AKfycbx_YOUR_SCRIPT_ID_HERE/exec",
      contactPersons: [
        {
          name: "Michał Sznurowski",
          role: "W razie pytań organizacyjnych",
          phone: "+48600000000",
          formattedPhone: "+48 600 000 000",
        },
      ],
    },
  },
  media: {
    heroPortrait: "/photos/tata-hero-portrait.png",
    cinematicBreak: {
      src: "/photos/cinematic-break.jpg",
      quote: "„Najpiękniejsze chwile w życiu to te, którymi dzielimy się przy jednym stole.”",
      author: "Toskańskie przysłowie",
    },
    gallery: [
      {
        id: "moment-1",
        src: "/photos/gallery-1.jpg",
        title: "W gronie najbliższych",
        caption: "Wspólne chwile, uśmiech i bezcenne rozmowy.",
        featured: true,
      },
      {
        id: "moment-2",
        src: "/photos/gallery-2.jpg",
        title: "Spacer i spokój",
        caption: "Niezapomniane wyprawy i radość codzienności.",
      },
      {
        id: "moment-3",
        src: "/photos/gallery-3.jpg",
        title: "Złota jesień",
        caption: "Ciepłe popołudnia pełne rodzinnego ciepła.",
      },
      {
        id: "moment-4",
        src: "/photos/gallery-4.jpg",
        title: "Świętowanie i tradycja",
        caption: "Dobre chwile, które łączą pokolenia.",
      },
      {
        id: "moment-5",
        src: "/photos/gallery-5.jpg",
        title: "Radosne spotkania",
        caption: "Każdy rok to nowa piękna karta wspomnień.",
      },
      {
        id: "moment-6",
        src: "/photos/gallery-6.jpg",
        title: "Uśmiech Jubilata",
        caption: "Pogoda ducha, którą zaraża wszystkich dookoła.",
      },
      {
        id: "moment-7",
        src: "/photos/gallery-7.jpg",
        title: "Portret 70-lecia",
        caption: "Dostojny jubileusz pełen wdzięczności i miłości.",
        featured: true,
      },
      {
        id: "moment-8",
        src: "/photos/gallery-8.jpg",
        title: "Wspólna droga",
        caption: "Czas spędzony razem to najpiękniejszy dar.",
      },
    ],
    audio: {
      trackTitle: "Toskański Poranek & Spokojny Jazz",
      artist: "Włoska Serenada Akustyczna",
      src: "/audio/toscan-ambient.mp3",
      defaultVolume: 0.35,
    },
  },
};

/**
 * Generate Google Calendar Web Intent Link
 */
export function getGoogleCalendarUrl(): string {
  const { event } = siteConfig;
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(
    `${event.subtitle}\n\nSerdecznie zapraszamy do wspólnego świętowania 70. Urodzin Taty!\nMiejsce: ${event.location.name}\nAdres: ${event.location.fullAddress}\nParking: ${event.location.parkingInfo}`
  );
  const location = encodeURIComponent(`${event.location.name}, ${event.location.fullAddress}`);
  
  // Google Calendar dates format: YYYYMMDDTHHmmssZ/YYYYMMDDTHHmmssZ
  const dates = `${event.date.icsStart}/${event.date.icsEnd}`;
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Generate and trigger download of Apple / Universal iCal (.ics) file
 */
export function downloadIcsFile(): void {
  const { event } = siteConfig;
  
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jubileusz 70 Urodzin Taty//PL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:jubileusz-70-tato-${Date.now()}@toscana-wierzbna.pl`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART:${event.date.icsStart}`,
    `DTEND:${event.date.icsEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.subtitle} - ${event.location.name}\\nAdres: ${event.location.fullAddress}`,
    `LOCATION:${event.location.name}, ${event.location.fullAddress}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Przypomnienie o Jubileuszu 70. Urodzin Taty",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "70-urodziny-taty-zaproszenie.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

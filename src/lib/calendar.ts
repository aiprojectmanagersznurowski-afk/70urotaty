import { EVENT, VENUE, PARKING } from '../config';

export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent(`70. Urodziny ${EVENT.hostFirstNameGen}`);
  const details = encodeURIComponent(
    `Serdecznie zapraszam na rodzinny obiad z okazji 70. urodzin!\n\nMiejsce: ${VENUE.name}\nAdres: ${VENUE.address}\nParking: ${PARKING.tip}`
  );
  const location = encodeURIComponent(`${VENUE.name}, ${VENUE.address}`);
  
  // Format UTC dates: 20261024T140000Z
  const start = EVENT.startUTC.replace(/[-:]/g, '');
  const end = EVENT.endUTC.replace(/[-:]/g, '');
  const dates = `${start}/${end}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const start = EVENT.startUTC.replace(/[-:]/g, '');
  const end = EVENT.endUTC.replace(/[-:]/g, '');
  const now = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//70 Urodziny Stanislawa//PL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:70-urodziny-stanislawa-${Date.now()}@urodzinystanislawa.pl`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:70. Urodziny ${EVENT.hostFirstNameGen}`,
    `DESCRIPTION:Serdecznie zapraszam na uroczysty obiad z okazji 70. urodzin w ${VENUE.name}. Adres: ${VENUE.address}`,
    `LOCATION:${VENUE.name}\\, ${VENUE.address}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Przypomnienie: 70. Urodziny ${EVENT.hostFirstNameGen}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const icsContent = icsLines.join('\r\n');
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `70-urodziny-${EVENT.hostName.toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 4000);
}

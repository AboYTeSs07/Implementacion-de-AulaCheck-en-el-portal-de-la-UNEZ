import { Subject } from '../types/portal';

export function downloadScheduleIcs(subjects: Subject[], studentName: string): void {
  const dayToIcsMap: Record<string, string> = {
    Lunes: 'MO',
    Martes: 'TU',
    Miércoles: 'WE',
    Jueves: 'TH',
    Viernes: 'FR',
    Sábado: 'SA',
  };

  // Base week in August/September 2026: Monday Aug 31, 2026
  const dayOffset: Record<string, number> = {
    Lunes: 31,
    Martes: 1,
    Miércoles: 2,
    Jueves: 3,
    Viernes: 4,
    Sábado: 5,
  };

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//UNEZ//Portal AulaCheck ISC 7-N//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Horario ISC 7-N - ${studentName}`,
    'X-WR-TIMEZONE:America/Monterrey',
  ];

  subjects.forEach((subject) => {
    subject.slots.forEach((slot, slotIndex) => {
      const byDay = dayToIcsMap[slot.day] || 'MO';
      const monthStr = slot.day === 'Lunes' ? '08' : '09';
      const dayOfMonth = (dayOffset[slot.day] || 31).toString().padStart(2, '0');

      const startTotalMins = slot.startHour * 60 + slot.startMinute;
      const endTotalMins = startTotalMins + slot.durationMinutes;

      const startH = Math.floor(startTotalMins / 60).toString().padStart(2, '0');
      const startM = (startTotalMins % 60).toString().padStart(2, '0');
      const endH = Math.floor(endTotalMins / 60).toString().padStart(2, '0');
      const endM = (endTotalMins % 60).toString().padStart(2, '0');

      const dtStart = `2026${monthStr}${dayOfMonth}T${startH}${startM}00`;
      const dtEnd = `2026${monthStr}${dayOfMonth}T${endH}${endM}00`;
      const uid = `unez-${subject.code}-${byDay}-${slot.blockCode || slotIndex}@unez.edu.mx`;

      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `SUMMARY:${subject.name} (${slot.blockCode || subject.code})`,
        `DESCRIPTION:Docente: ${subject.professor.name}\\nGrupo: ${subject.group}\\nModalidad: ${slot.modality}`,
        `LOCATION:${slot.classroom} - ${slot.building}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `RRULE:FREQ=WEEKLY;UNTIL=20261201T235959Z;BYDAY=${byDay}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      );
    });
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Horario_UNEZ_ISC_7N.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

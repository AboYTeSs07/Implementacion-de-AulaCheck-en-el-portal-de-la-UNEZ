import React from 'react';
import { Subject, DayOfWeek, TimeSlot } from '../../types/portal';
import { NIGHT_BLOCKS } from '../../data/mockData';
import { MapPin, User, Info, Clock } from 'lucide-react';

interface WeeklyGridProps {
  subjects: Subject[];
  showSaturday: boolean;
  searchTerm: string;
  onSelectCourse: (subject: Subject, slot?: TimeSlot) => void;
}

export const WeeklyGrid: React.FC<WeeklyGridProps> = ({
  subjects,
  showSaturday,
  searchTerm,
  onSelectCourse,
}) => {
  const days: DayOfWeek[] = showSaturday
    ? ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  // Flatten all slots with subject reference
  const allEvents = subjects.flatMap((sub) =>
    sub.slots.map((slot) => ({
      ...slot,
      subject: sub,
    }))
  );

  // Filter check
  const isMatch = (event: (typeof allEvents)[0]) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      event.subject.name.toLowerCase().includes(term) ||
      event.subject.code.toLowerCase().includes(term) ||
      event.classroom.toLowerCase().includes(term) ||
      event.subject.professor.name.toLowerCase().includes(term) ||
      event.building.toLowerCase().includes(term)
    );
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      
      {/* Legend & Instructions */}
      <div className="px-5 py-3 bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold text-slate-800 dark:text-slate-100">
            Horario Oficial ISC 7-N (Edificio 700):
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-red-600" />
            <span>715 Sala de Cómputo 1 (Piso 2)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
            <span>Salón 741 (Piso 5)</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>Haz clic en cualquier bloque para ver detalles de la materia y docente</span>
        </div>
      </div>

      {/* Block-Based Timetable Grid (Matches official UNEZ N1-N6 sheet!) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
              <th className="py-3 px-3 w-36 border-r border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                  <span>Bloque Nocturno</span>
                </div>
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="py-3 px-3 text-center border-r border-slate-200 dark:border-slate-800 last:border-r-0"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {NIGHT_BLOCKS.map((blk) => (
              <tr key={blk.code} className="align-top">
                {/* Block Time Label */}
                <td className="py-3 px-3 border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 font-mono">
                  <span className="text-sm font-extrabold text-red-700 dark:text-amber-400 block">
                    {blk.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block tabular-nums">
                    {blk.startTime} - {blk.endTime}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {blk.durationMinutes} min
                  </span>
                </td>

                {/* Day Cells */}
                {days.map((day) => {
                  const matchingEvent = allEvents.find(
                    (ev) => ev.day === day && ev.blockCode === blk.code
                  );

                  if (!matchingEvent) {
                    return (
                      <td
                        key={`${blk.code}-${day}`}
                        className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-r-0 bg-white dark:bg-[#0c101a]"
                      >
                        <div className="min-h-[82px] rounded-lg border border-dashed border-slate-100 dark:border-slate-800/70 flex items-center justify-center text-[10px] text-slate-300 dark:text-slate-700">
                          {day === 'Miércoles' ? 'Día libre' : '—'}
                        </div>
                      </td>
                    );
                  }

                  const matched = isMatch(matchingEvent);
                  const isLab = matchingEvent.classroom.includes('715');

                  return (
                    <td
                      key={`${blk.code}-${day}`}
                      className="p-2 border-r border-slate-200 dark:border-slate-800 last:border-r-0 bg-white dark:bg-[#0c101a]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onSelectCourse(matchingEvent.subject, matchingEvent)
                        }
                        className={`w-full text-left rounded-lg p-2.5 border transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between gap-1.5 min-h-[82px] ${
                          matchingEvent.subject.colorTheme.bg
                        } ${matchingEvent.subject.colorTheme.border} ${
                          matched ? 'opacity-100' : 'opacity-25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 text-[10px]">
                          <span
                            className={`font-mono font-bold px-1.5 py-0.5 rounded-xs flex items-center gap-1 ${
                              isLab
                                ? 'bg-red-700 text-white'
                                : 'bg-amber-500 text-slate-950'
                            }`}
                          >
                            <MapPin className="w-2.5 h-2.5 shrink-0" />
                            <span>{isLab ? '715 Lab 1' : '741 (P5)'}</span>
                          </span>
                          <span className="font-mono text-slate-500 dark:text-slate-400">
                            {matchingEvent.building.includes('Piso 2') ? 'Piso 2' : 'Piso 5'}
                          </span>
                        </div>

                        <h4
                          className={`text-xs font-bold leading-snug line-clamp-2 ${matchingEvent.subject.colorTheme.text}`}
                        >
                          {matchingEvent.subject.name}
                        </h4>

                        <div className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300 truncate">
                          <User className="w-3 h-3 shrink-0 opacity-75" />
                          <span className="truncate">
                            {matchingEvent.subject.professor.teacherNumber
                              ? `${matchingEvent.subject.professor.teacherNumber}. `
                              : ''}
                            {matchingEvent.subject.professor.name}
                          </span>
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Notes */}
      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <span>
          Universidad Emiliano Zapata · José Benítez 1521, Topo Chico, Monterrey, NL · Grupo ISC 7-N
        </span>
        <span className="font-mono">Vigencia: 29/08/2026 - 01/12/2026</span>
      </div>
    </div>
  );
};

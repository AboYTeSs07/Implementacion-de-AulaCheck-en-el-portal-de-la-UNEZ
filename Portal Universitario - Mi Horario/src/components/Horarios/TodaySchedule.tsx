import React, { useState } from 'react';
import { Subject, DayOfWeek, TimeSlot } from '../../types/portal';
import {
  MapPin,
  User,
  Navigation,
  CheckCircle,
  Calendar,
} from 'lucide-react';

interface TodayScheduleProps {
  subjects: Subject[];
  onSelectCourse: (subject: Subject, slot?: TimeSlot) => void;
}

const WEEKDAYS: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const TodaySchedule: React.FC<TodayScheduleProps> = ({
  subjects,
  onSelectCourse,
}) => {
  const getTodaySpanish = (): DayOfWeek => {
    const dayIndex = new Date().getDay();
    const map: Record<number, DayOfWeek> = {
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
    };
    return map[dayIndex] || 'Lunes';
  };

  const [activeDay, setActiveDay] = useState<DayOfWeek>(getTodaySpanish());

  // Find all sessions on activeDay sorted chronologically by hour and minute
  const dayClasses = subjects
    .flatMap((sub) =>
      sub.slots
        .filter((s) => s.day === activeDay)
        .map((matchSlot) => ({
          subject: sub,
          slot: matchSlot,
        }))
    )
    .sort(
      (a, b) =>
        a.slot.startHour * 60 +
        a.slot.startMinute -
        (b.slot.startHour * 60 + b.slot.startMinute)
    );

  return (
    <div className="space-y-4">
      {/* Day Selector Tabs */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-4 flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
            Agenda Diaria ISC 7-N:
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto">
          {WEEKDAYS.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeDay === day
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Highlight Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-900 to-black dark:from-red-950 dark:via-[#1a0a0d] dark:to-black text-white rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 border border-red-700/40">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            Resumen para el día {activeDay}
          </span>
          <h3 className="text-lg font-bold mt-0.5 text-white">
            {dayClasses.length > 0
              ? `Tienes ${dayClasses.length} bloques de clase hoy (Edificio 700)`
              : `Sin clases programadas el día ${activeDay} (Día Libre)`}
          </h3>
          <p className="text-xs text-slate-200 mt-1 max-w-xl">
            {dayClasses.length > 0
              ? `Inicio: ${dayClasses[0].slot.startTime} hrs (${dayClasses[0].slot.blockCode}) · Fin: ${dayClasses[dayClasses.length - 1].slot.endTime} hrs (${dayClasses[dayClasses.length - 1].slot.blockCode}).`
              : 'Miércoles libre en el turno nocturno de ISC 7-N. Aprovecha para adelantar proyectos o consultar salones en pisos bajos.'}
          </p>
        </div>

        {dayClasses.length > 0 && (
          <div className="p-3 bg-black/40 dark:bg-black/60 rounded-lg border border-red-500/30 text-right shrink-0">
            <span className="text-[11px] text-amber-300 block font-medium">
              Primer bloque del día
            </span>
            <span className="text-sm font-bold font-mono text-white block mt-0.5">
              {dayClasses[0].slot.startTime} hrs · {dayClasses[0].slot.classroom}
            </span>
          </div>
        )}
      </div>

      {/* Timeline of Classes */}
      {dayClasses.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-2">
          <CheckCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            No tienes clases este {activeDay}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Puedes revisar disponibilidad de espacios en el Plano del Piso o visitar la Biblioteca en el Piso 2 del Edificio 900.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dayClasses.map(({ subject, slot }, idx) => (
            <div
              key={`${subject.id}-${slot.blockCode}-${idx}`}
              onClick={() => onSelectCourse(subject, slot)}
              className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-red-400 dark:hover:border-red-600 hover:shadow-md transition-all p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left: Time & Block */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-24 text-center py-2 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-extrabold font-mono text-red-700 dark:text-amber-400 block">
                    {slot.blockCode || 'Bloque'}
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-900 dark:text-white block">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                      {subject.code}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${subject.colorTheme.badgeBg}`}
                    >
                      {slot.modality}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {subject.name}
                  </h4>
                </div>
              </div>

              {/* Middle: Location & Professor */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {slot.classroom}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                      {slot.building}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {subject.professor.teacherNumber
                        ? `${subject.professor.teacherNumber}. `
                        : ''}
                      {subject.professor.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block">
                      {subject.professor.office}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Quick action */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-lg transition-colors border border-red-200 dark:border-red-900/60"
                >
                  Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campus Reference */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-red-600 dark:text-amber-400 shrink-0" />
          <span>
            Recuerda que tus cambios de piso en el <strong>Edificio 700</strong> alternan entre el <strong>Piso 2 (715 Sala de Cómputo 1)</strong> y el <strong>Piso 5 (Salón 741)</strong>. Usa la pestaña «Plano del Piso» para ubicar cada salón.
          </span>
        </div>
      </div>
    </div>
  );
};

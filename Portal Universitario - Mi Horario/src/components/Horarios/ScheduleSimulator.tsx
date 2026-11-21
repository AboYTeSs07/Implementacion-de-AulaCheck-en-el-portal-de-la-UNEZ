import React, { useState } from 'react';
import { Subject, TimeSlot } from '../../types/portal';
import { mockElectives } from '../../data/mockData';
import {
  SlidersHorizontal,
  Plus,
  AlertTriangle,
  RotateCcw,
  Clock,
  Check,
} from 'lucide-react';

interface ScheduleSimulatorProps {
  baseSubjects: Subject[];
}

export const ScheduleSimulator: React.FC<ScheduleSimulatorProps> = ({
  baseSubjects,
}) => {
  const [selectedElectives, setSelectedElectives] = useState<string[]>([]);
  const [disabledBaseIds, setDisabledBaseIds] = useState<string[]>([]);

  // Calculate current active simulated subjects
  const activeBaseSubjects = baseSubjects.filter(
    (s) => !disabledBaseIds.includes(s.id)
  );

  const activeElectives = mockElectives.filter((e) =>
    selectedElectives.includes(e.id)
  );

  // Compute total credits
  const baseCredits = activeBaseSubjects.reduce((acc, s) => acc + s.credits, 0);
  const electiveCredits = activeElectives.reduce((acc, e) => acc + e.credits, 0);
  const totalSimulatedCredits = baseCredits + electiveCredits;
  const MAX_CREDITS = 46;

  // Collision detection between all active slots
  interface ActiveSlot {
    sourceName: string;
    sourceCode: string;
    isElective: boolean;
    slot: TimeSlot;
  }

  const allActiveSlots: ActiveSlot[] = [
    ...activeBaseSubjects.flatMap((s) =>
      s.slots.map((slot) => ({
        sourceName: s.name,
        sourceCode: s.code,
        isElective: false,
        slot,
      }))
    ),
    ...activeElectives.flatMap((e) =>
      e.slots.map((slot) => ({
        sourceName: e.name,
        sourceCode: e.code,
        isElective: true,
        slot,
      }))
    ),
  ];

  // Check overlaps
  interface Conflict {
    courseA: string;
    courseB: string;
    day: string;
    timeA: string;
    timeB: string;
  }

  const conflicts: Conflict[] = [];

  for (let i = 0; i < allActiveSlots.length; i++) {
    for (let j = i + 1; j < allActiveSlots.length; j++) {
      const a = allActiveSlots[i];
      const b = allActiveSlots[j];

      if (a.slot.day === b.slot.day) {
        const startA = a.slot.startHour * 60 + a.slot.startMinute;
        const endA = startA + a.slot.durationMinutes;
        const startB = b.slot.startHour * 60 + b.slot.startMinute;
        const endB = startB + b.slot.durationMinutes;

        // Overlap condition
        if (Math.max(startA, startB) < Math.min(endA, endB)) {
          conflicts.push({
            courseA: a.sourceName,
            courseB: b.sourceName,
            day: a.slot.day,
            timeA: `${a.slot.startTime} - ${a.slot.endTime}`,
            timeB: `${b.slot.startTime} - ${b.slot.endTime}`,
          });
        }
      }
    }
  }

  const toggleElective = (id: string) => {
    setSelectedElectives((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBaseSubject = (id: string) => {
    setDisabledBaseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetSimulation = () => {
    setSelectedElectives([]);
    setDisabledBaseIds([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner explaining the simulation tool */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-300">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Simulador de Ajustes de Horario y Altas Proyectadas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Prueba agregar optativas o dar de baja materias para verificar colisiones horarias antes del periodo de altas y bajas escolares.
              </p>
            </div>
          </div>

          <button
            onClick={resetSimulation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Horario Oficial</span>
          </button>
        </div>

        {/* Credit Budget Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Créditos Simulados
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-xl font-bold font-mono ${
                totalSimulatedCredits > MAX_CREDITS ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
              }`}>
                {totalSimulatedCredits}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                / {MAX_CREDITS} máx autorizados
              </span>
            </div>
            {totalSimulatedCredits > MAX_CREDITS && (
              <span className="text-[11px] text-red-600 dark:text-red-400 font-semibold block mt-1">
                ⚠️ Excede el límite de créditos permitido por semestre.
              </span>
            )}
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Materias en Simulación
            </span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {activeBaseSubjects.length + activeElectives.length} materias
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
              {activeBaseSubjects.length} obligatorias + {activeElectives.length} optativas
            </span>
          </div>

          <div className={`p-3 rounded-lg border ${
            conflicts.length > 0
              ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-300'
              : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-300'
          }`}>
            <span className="text-[11px] font-bold block">
              Detección de Traslapes
            </span>
            <div className="text-xl font-bold font-mono mt-1">
              {conflicts.length > 0 ? `${conflicts.length} conflicto(s)` : '0 traslapes'}
            </div>
            <span className="text-[11px] block mt-1">
              {conflicts.length > 0
                ? 'Se detectaron materias en la misma franja horaria.'
                : 'Horario totalmente viable sin colisiones.'}
            </span>
          </div>
        </div>

        {/* Conflict Alerts Banner */}
        {conflicts.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 space-y-2">
            <div className="flex items-center gap-2 text-red-900 dark:text-red-300 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Conflictos detectados en el simulador:</span>
            </div>
            <ul className="space-y-1 text-xs text-red-800 dark:text-red-300">
              {conflicts.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold">·</span>
                  <span>
                    El <strong>{c.day}</strong> colisionan <strong>{c.courseA}</strong> ({c.timeA}) y <strong>{c.courseB}</strong> ({c.timeB}).
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Two Column Layout: Enrolled Subjects vs Available Electives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Column 1: Current Enrolled Subjects (Allow toggling) */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Materias Oficiales del Semestre
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Desmarca para simular baja temporal
            </span>
          </div>

          <div className="space-y-2">
            {baseSubjects.map((sub) => {
              const isDisabled = disabledBaseIds.includes(sub.id);
              return (
                <div
                  key={sub.id}
                  className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                    isDisabled
                      ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-50'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={!isDisabled}
                      onChange={() => toggleBaseSubject(sub.id)}
                      className="mt-1 rounded-sm border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 cursor-pointer bg-white dark:bg-slate-800"
                    />
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {sub.code} · {sub.credits} créditos
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {sub.name}
                      </h5>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {sub.slots.map((s) => `${s.day} ${s.startTime}-${s.endTime}`).join(' | ')}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-sm shrink-0">
                    {sub.group}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Available Electives & Options */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Catálogo de Optativas Disponibles
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Periodo 2026-1
            </span>
          </div>

          <div className="space-y-3">
            {mockElectives.map((elec) => {
              const isSelected = selectedElectives.includes(elec.id);

              return (
                <div
                  key={elec.id}
                  className={`p-3.5 rounded-lg border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/60 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 ring-1 ring-amber-300 dark:ring-amber-700'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.2 rounded-xs border border-amber-300 dark:border-amber-700/60">
                          {elec.code}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          NRC {elec.nrc}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.2 rounded-xs">
                          {elec.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">
                          {elec.credits} créditos
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                        {elec.name}
                      </h5>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 block mt-0.5">
                        Profesor: {elec.professor}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleElective(elec.id)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors shrink-0 flex items-center gap-1 ${
                        isSelected
                          ? 'bg-red-700 text-amber-300 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Agregada</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Simular Alta</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2 flex-wrap">
                    <Clock className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    <span>
                      {elec.slots.map((s) => `${s.day} ${s.startTime}-${s.endTime} (${s.classroom})`).join(' · ')}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

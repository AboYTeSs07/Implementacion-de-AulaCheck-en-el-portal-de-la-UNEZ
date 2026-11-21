import React from 'react';
import {
  Monitor,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';
import { StudentProfile } from '../../types/portal';

interface ReinscripcionesPanelProps {
  student: StudentProfile;
  onHide: () => void;
  onGoToSchedule: () => void;
}

export const ReinscripcionesPanel: React.FC<ReinscripcionesPanelProps> = ({
  student,
  onHide,
  onGoToSchedule,
}) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 bg-slate-50/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Módulo de Reinscripciones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proceso desplegable de asignación de turnos y requisitos del ciclo
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onHide}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
        >
          <ChevronUp className="w-4 h-4 text-red-600 dark:text-amber-400" />
          <span>Ocultar Reinscripciones</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Turn status card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider block">
                Turno y Cita de Inscripción Asignada
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {student.reinscriptionDate}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Turno asignado por orden de promedio general ({student.cumulativeAverage.toFixed(2)} pts) dentro del percentil superior (Top 5%).
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Prerequisite checklist */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
            Estatus de Requisitos para el Periodo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pago de cuota semestral y seguro escolar</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800 shrink-0">
                Validado
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Encuesta de evaluación docente al 100%</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800 shrink-0">
                Completada
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dictamen de salud y carnet médico</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800 shrink-0">
                Vigente
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Prerrequisitos seriados del 6° tetramestre</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800 shrink-0">
                100% Acreditados
              </span>
            </div>
          </div>
        </div>

        {/* Academic capacity info + Action */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <span className="block font-medium">Capacidad de carga académica:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                Hasta {student.maxCreditsPerPeriod} créditos autorizados
              </span>
            </div>
            <div>
              <span className="block font-medium">Condición académica:</span>
              <span className="font-bold text-amber-800 dark:text-amber-400 text-sm">
                Alumno {student.regularStatus}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToSchedule}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors shadow-2xs shrink-0"
          >
            <span>Abrir Mi Horario en AulaCheck</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Monitor, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../../types/portal';

interface ReinscripcionesModalProps {
  student: StudentProfile;
  onClose: () => void;
  onGoToSchedule: () => void;
}

export const ReinscripcionesModal: React.FC<ReinscripcionesModalProps> = ({
  student,
  onClose,
  onGoToSchedule,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Módulo de Reinscripciones
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proceso de asignación de turnos y selección de materias
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Turn status card */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
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
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Prerequisite checklist */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
              Estatus de Requisitos para el Periodo
            </h3>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Pago de cuota semestral y seguro escolar</span>
                </div>
                <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">Validado</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Encuesta de evaluación docente al 100%</span>
                </div>
                <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">Completada</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Dictamen de salud y carnet médico universitario</span>
                </div>
                <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">Vigente</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Prerrequisitos seriados del 5° semestre</span>
                </div>
                <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">100% Acreditados</span>
              </div>
            </div>
          </div>

          {/* Academic capacity info */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="block font-medium">Capacidad de carga académica:</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">Hasta 46 créditos autorizados</span>
            </div>
            <div className="text-right">
              <span className="block font-medium">Condición académica:</span>
              <span className="font-bold text-amber-800 dark:text-amber-400 text-sm">Alumno Regular</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Cerrar
          </button>

          <button
            onClick={() => {
              onClose();
              onGoToSchedule();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 rounded-lg transition-colors shadow-2xs"
          >
            <span>Ver Mi Horario Asignado</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

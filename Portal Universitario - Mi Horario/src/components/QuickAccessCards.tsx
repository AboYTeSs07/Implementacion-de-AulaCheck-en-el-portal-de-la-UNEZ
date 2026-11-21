import React from 'react';
import { ChevronUp, ChevronDown, CreditCard, Monitor, CheckSquare, Building2 } from 'lucide-react';
import { StudentProfile } from '../types/portal';

export type ActiveModule = 'calificaciones' | 'pagos' | 'reinscripciones' | 'aulacheck';

interface QuickAccessCardsProps {
  student: StudentProfile;
  activeModule: ActiveModule | null;
  onSelectModule: (module: ActiveModule) => void;
  freeRoomsCount: number;
  totalRoomsCount: number;
}

export const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({
  student,
  activeModule,
  onSelectModule,
  freeRoomsCount,
  totalRoomsCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Inicio
        </h1>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Haz clic en cualquier módulo para desplegar o contraer su información debajo
        </div>
      </div>

      {/* Grid of the 4 Portal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Mis Calificaciones */}
        <div
          onClick={() => onSelectModule('calificaciones')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectModule('calificaciones');
            }
          }}
          className={`relative bg-white dark:bg-[#111827] rounded-xl p-5 border transition-all cursor-pointer select-none text-left flex flex-col justify-between min-h-[142px] ${
            activeModule === 'calificaciones'
              ? 'border-red-600 ring-2 ring-red-600/30 shadow-md bg-red-50/10 dark:bg-red-950/20 dark:border-red-500'
              : 'border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="text-red-600 dark:text-red-400">
              <CheckSquare className="w-8 h-8 stroke-[1.8]" />
            </div>
            <span
              className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 text-amber-300 flex items-center justify-center shadow-xs transition-transform"
              aria-label="Desplegar o contraer calificaciones"
            >
              {activeModule === 'calificaciones' ? (
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              )}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Mis Calificaciones
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Promedio Acumulado{' '}
              <span className="font-bold text-slate-900 dark:text-amber-400 font-mono tabular-nums">
                {student.cumulativeAverage.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* 2. Conceptos por pagar */}
        <div
          onClick={() => onSelectModule('pagos')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectModule('pagos');
            }
          }}
          className={`relative bg-white dark:bg-[#111827] rounded-xl p-5 border transition-all cursor-pointer select-none text-left flex flex-col justify-between min-h-[142px] ${
            activeModule === 'pagos'
              ? 'border-amber-500 ring-2 ring-amber-500/30 shadow-md bg-amber-50/10 dark:bg-amber-950/20 dark:border-amber-500'
              : 'border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="text-amber-500 dark:text-amber-400">
              <CreditCard className="w-8 h-8 stroke-[1.8]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-[#d32f2f] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs font-mono tabular-nums whitespace-nowrap">
                Pendiente ${student.debtAmount.toFixed(0)}
              </span>
              <span
                className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 text-amber-300 flex items-center justify-center shadow-xs shrink-0"
                aria-label="Desplegar o contraer conceptos por pagar"
              >
                {activeModule === 'pagos' ? (
                  <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                )}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight font-mono tabular-nums">
              ${student.debtAmount.toFixed(2)}
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
              Conceptos por pagar
            </p>
          </div>
        </div>

        {/* 3. Reinscripciones */}
        <div
          onClick={() => onSelectModule('reinscripciones')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectModule('reinscripciones');
            }
          }}
          className={`relative bg-white dark:bg-[#111827] rounded-xl p-5 border transition-all cursor-pointer select-none text-left flex flex-col justify-between min-h-[142px] ${
            activeModule === 'reinscripciones'
              ? 'border-yellow-500 ring-2 ring-yellow-500/30 shadow-md bg-yellow-50/10 dark:bg-yellow-950/20 dark:border-yellow-500'
              : 'border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="text-amber-500 dark:text-amber-400">
              <Monitor className="w-8 h-8 stroke-[1.8]" />
            </div>
            <span
              className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 text-amber-300 flex items-center justify-center shadow-xs transition-transform"
              aria-label="Desplegar o contraer reinscripciones"
            >
              {activeModule === 'reinscripciones' ? (
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              )}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Reinscripciones
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-400 font-semibold mt-0.5">
              Turno asignado · Alumno Regular
            </p>
          </div>
        </div>

        {/* 4. AulaCheck */}
        <div
          onClick={() => onSelectModule('aulacheck')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectModule('aulacheck');
            }
          }}
          className={`relative bg-white dark:bg-[#111827] rounded-xl p-5 border transition-all cursor-pointer select-none text-left flex flex-col justify-between min-h-[142px] ${
            activeModule === 'aulacheck'
              ? 'border-red-600 ring-2 ring-red-600/40 shadow-md bg-red-50/25 dark:bg-red-950/30 dark:border-red-500'
              : 'border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="text-red-700 dark:text-red-400">
              <Building2 className="w-8 h-8 stroke-[1.8]" />
            </div>
            <span
              className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 text-amber-300 flex items-center justify-center shadow-xs transition-transform"
              aria-label="Desplegar o contraer AulaCheck"
            >
              {activeModule === 'aulacheck' ? (
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              )}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AulaCheck
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono tabular-nums">
              {freeRoomsCount} libres de {totalRoomsCount} aulas · Horarios
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

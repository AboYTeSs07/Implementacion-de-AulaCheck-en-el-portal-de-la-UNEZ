import React from 'react';
import {
  CalendarDays,
  ListFilter,
  Clock,
  SlidersHorizontal,
  Printer,
  Download,
  AlertTriangle,
} from 'lucide-react';

export type ScheduleView = 'semanal' | 'lista' | 'hoy' | 'simulador';

interface ScheduleHeaderProps {
  currentView: ScheduleView;
  onViewChange: (view: ScheduleView) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showSaturday: boolean;
  onToggleSaturday: () => void;
  onOpenPrintModal: () => void;
  onDownloadIcs: () => void;
  totalCredits: number;
  totalSubjects: number;
  totalHoursPerWeek: number;
  hasClashes?: boolean;
}

export const ScheduleHeader: React.FC<ScheduleHeaderProps> = ({
  currentView,
  onViewChange,
  searchTerm,
  onSearchChange,
  showSaturday,
  onToggleSaturday,
  onOpenPrintModal,
  onDownloadIcs,
  totalCredits,
  totalSubjects,
  totalHoursPerWeek,
  hasClashes = false,
}) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-5 space-y-4 transition-colors">
      
      {/* Top row: Title & Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Mi Horario de Clases
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-red-300 border border-red-300 dark:border-red-800">
              Inscripción Definitiva
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Semestre Enero - Junio 2026 · Plan de Estudios ISC-2020 · Modalidad Presencial
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onDownloadIcs}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
            title="Descargar archivo .ics para Google Calendar, Apple o Outlook"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Sincronizar Calendario (.ics)</span>
          </button>

          <button
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 rounded-lg transition-colors shadow-2xs border border-red-800 dark:border-red-700"
            title="Generar e imprimir comprobante oficial con código de validación"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Comprobante Oficial</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Materias Inscritas</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{totalSubjects} asignaturas</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Carga Académica</span>
          <span className="text-lg font-bold text-slate-900 dark:text-amber-400 font-mono">{totalCredits} créditos</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Horas Semanales</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{totalHoursPerWeek} hrs / sem</span>
        </div>
        <div className={`p-2.5 rounded-lg border ${
          hasClashes
            ? 'bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800 text-red-900 dark:text-red-300'
            : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-300'
        }`}>
          <span className="text-[11px] font-medium block">
            {hasClashes ? 'Conflicto de Horario' : 'Compatibilidad'}
          </span>
          <span className="text-lg font-bold font-mono">
            {hasClashes ? '¡Traslape detectado!' : '100% Sin traslapes'}
          </span>
        </div>
      </div>

      {/* View Switcher & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-slate-800 rounded-lg shrink-0 overflow-x-auto">
          <button
            onClick={() => onViewChange('semanal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
              currentView === 'semanal'
                ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Vista Semanal (Cuadrícula)</span>
          </button>

          <button
            onClick={() => onViewChange('lista')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
              currentView === 'lista'
                ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Lista de Materias</span>
          </button>

          <button
            onClick={() => onViewChange('hoy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
              currentView === 'hoy'
                ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Agenda de Hoy</span>
          </button>

          <button
            onClick={() => onViewChange('simulador')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
              currentView === 'simulador'
                ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Simulador de Ajustes</span>
            <span className="ml-1 text-[9px] uppercase px-1 py-0.2 rounded-xs bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200 font-bold">
              Nuevo
            </span>
          </button>
        </div>

        {/* Right Search & Saturday toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Buscar materia, aula o docente..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-500 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <ListFilter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
          </div>

          {currentView === 'semanal' && (
            <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none whitespace-nowrap">
              <input
                type="checkbox"
                checked={showSaturday}
                onChange={onToggleSaturday}
                className="rounded-sm border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500 bg-white dark:bg-slate-800"
              />
              <span>Incluir Sábado</span>
            </label>
          )}
        </div>

      </div>

    </div>
  );
};

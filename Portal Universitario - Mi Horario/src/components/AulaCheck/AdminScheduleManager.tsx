import React, { useMemo, useRef, useState } from 'react';
import {
  Classroom,
  DayOfWeek,
  ScheduleEntry,
} from '../../types/portal';
import { NIGHT_BLOCKS } from '../../data/mockData';
import {
  SCHOOL_DAYS,
  detectScheduleOverlaps,
  exportSchedulesToCsv,
  exportSchedulesToJson,
} from '../../data/nightlySchedules';
import {
  downloadExcelTemplate,
  exportSchedulesToExcel,
  parseAndValidateExcelFile,
  ExcelImportAnalysis,
} from '../../utils/excelSchedules';
import {
  Database,
  Download,
  FileSpreadsheet,
  PlusCircle,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Layers,
  DoorOpen,
  CalendarDays,
  User,
  Sparkles,
  Upload,
  FileDown,
  X,
} from 'lucide-react';

interface AdminScheduleManagerProps {
  scheduleEntries: ScheduleEntry[];
  classrooms: Classroom[];
  selectedDay: DayOfWeek;
  onDayChange: (day: DayOfWeek) => void;
  onAddScheduleEntry: (entry: Omit<ScheduleEntry, 'id'>) => void;
  onDeleteScheduleEntry: (id: string) => void;
  onImportScheduleEntries: (
    entries: Omit<ScheduleEntry, 'id'>[],
    mode: 'append' | 'replace'
  ) => void;
}

const SUBJECT_PALETTES = [
  'bg-red-50/90 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-950 dark:text-red-100',
  'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100',
  'bg-slate-100/90 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100',
  'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100',
  'bg-sky-50/90 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-950 dark:text-sky-100',
  'bg-orange-50/90 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-100',
];

function getColorForSubject(subjectName: string): string {
  let hash = 0;
  for (let i = 0; i < subjectName.length; i++) {
    hash = (hash * 31 + subjectName.charCodeAt(i)) >>> 0;
  }
  return SUBJECT_PALETTES[hash % SUBJECT_PALETTES.length];
}

export const AdminScheduleManager: React.FC<AdminScheduleManagerProps> = ({
  scheduleEntries,
  classrooms,
  selectedDay,
  onDayChange,
  onAddScheduleEntry,
  onDeleteScheduleEntry,
  onImportScheduleEntries,
}) => {
  const [viewMode, setViewMode] = useState<'grupo' | 'salon'>('grupo');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [excelAnalysis, setExcelAnalysis] = useState<ExcelImportAnalysis | null>(
    null
  );
  const [excelError, setExcelError] = useState<string>('');
  const [importBannerMsg, setImportBannerMsg] = useState<string>('');

  const uniqueGroups = useMemo(() => {
    return Array.from(new Set(scheduleEntries.map((e) => e.group))).sort((a, b) =>
      a.localeCompare(b, 'es')
    );
  }, [scheduleEntries]);

  const academicClassrooms = useMemo(() => {
    return classrooms
      .filter((c) => c.type !== 'Oficina / Área Administrativa' && c.type !== 'Servicio / Área Común')
      .sort((a, b) => a.code.localeCompare(b.code, 'es', { numeric: true }));
  }, [classrooms]);

  const [selectedGroup, setSelectedGroup] = useState<string>('IISC 7-N1');
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>('741');

  // Ensure selectedGroup falls back gracefully if deleted
  const activeGroup = uniqueGroups.includes(selectedGroup)
    ? selectedGroup
    : uniqueGroups[0] || '';

  const activeRoomCode = academicClassrooms.some((r) => r.code === selectedRoomCode)
    ? selectedRoomCode
    : academicClassrooms[0]?.code || '';

  // Overlap audit across ALL entries
  const overlapReport = useMemo(
    () => detectScheduleOverlaps(scheduleEntries),
    [scheduleEntries]
  );

  const overlappedEntryIds = useMemo(() => {
    const ids = new Set<string>();
    [
      ...overlapReport.roomOverlaps,
      ...overlapReport.professorOverlaps,
      ...overlapReport.groupOverlaps,
    ].forEach((ov) => ov.entries.forEach((e) => ids.add(e.id)));
    return ids;
  }, [overlapReport]);

  // Add Schedule Form State
  const [formGroup, setFormGroup] = useState<string>('IISC 7-N1');
  const [formDay, setFormDay] = useState<DayOfWeek>(selectedDay);
  const [formBlock, setFormBlock] = useState<string>('N6');
  const [formRoom, setFormRoom] = useState<string>('741');
  const [formSubject, setFormSubject] = useState<string>('');
  const [formProfessor, setFormProfessor] = useState<string>('');
  const [formFeedback, setFormFeedback] = useState<{
    type: 'success' | 'info';
    text: string;
  } | null>(null);

  // Real-time conflict preview for form inputs
  const formConflicts = useMemo(() => {
    const conflicts: string[] = [];
    const targetRoom = formRoom.trim();
    const targetGroup = formGroup.trim();
    const targetProf = formProfessor.trim();

    for (const e of scheduleEntries) {
      if (e.day !== formDay || e.blockCode !== formBlock) continue;
      if (targetRoom && e.classroomCode.trim() === targetRoom) {
        conflicts.push(
          `Salón ${targetRoom} ya está ocupado en ${formDay} ${formBlock} por ${e.group} (${e.subjectName}).`
        );
      }
      if (targetGroup && e.group.trim().toLowerCase() === targetGroup.toLowerCase()) {
        conflicts.push(
          `El grupo ${e.group} ya tiene clase en ${formDay} ${formBlock} (${e.subjectName}, Salón ${e.classroomCode}).`
        );
      }
      if (
        targetProf &&
        targetProf.toLowerCase() !== 'propuesta' &&
        targetProf.toLowerCase() !== 'sin asignar' &&
        e.professor.trim().toLowerCase() === targetProf.toLowerCase()
      ) {
        conflicts.push(
          `El docente "${e.professor}" ya imparte clase en ${formDay} ${formBlock} (${e.group}, Salón ${e.classroomCode}).`
        );
      }
    }
    return conflicts;
  }, [scheduleEntries, formDay, formBlock, formRoom, formGroup, formProfessor]);

  const handleQuickPrefillFromCell = (day: DayOfWeek, blockCode: string) => {
    setFormDay(day);
    setFormBlock(blockCode);
    if (viewMode === 'grupo' && activeGroup) {
      setFormGroup(activeGroup);
    } else if (viewMode === 'salon' && activeRoomCode) {
      setFormRoom(activeRoomCode);
    }
    setFormFeedback({
      type: 'info',
      text: `Formulario preparado para ${day} en bloque ${blockCode}. Completa materia y docente abajo.`,
    });
    const el = document.getElementById('admin-add-schedule-form');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formGroup.trim() || !formRoom.trim() || !formSubject.trim()) return;

    onAddScheduleEntry({
      group: formGroup.trim(),
      day: formDay,
      blockCode: formBlock,
      classroomCode: formRoom.trim(),
      subjectName: formSubject.trim(),
      professor: formProfessor.trim() || 'Propuesta',
    });

    if (viewMode === 'grupo') setSelectedGroup(formGroup.trim());
    if (viewMode === 'salon') setSelectedRoomCode(formRoom.trim());

    setFormFeedback({
      type: 'success',
      text: `Horario agregado: ${formSubject.trim()} (${formGroup.trim()}) en salón ${formRoom.trim()} · ${formDay} ${formBlock}.`,
    });
    setFormSubject('');
  };

  const handleDeleteWithFeedback = (entry: ScheduleEntry) => {
    onDeleteScheduleEntry(entry.id);
    setFormFeedback({
      type: 'info',
      text: `Eliminado: ${entry.subjectName} (${entry.group} · ${entry.day} ${entry.blockCode} · Salón ${entry.classroomCode}).`,
    });
  };

  const filteredMatrixEntries = useMemo(() => {
    if (viewMode === 'grupo') {
      return scheduleEntries.filter((e) => e.group === activeGroup);
    }
    return scheduleEntries.filter((e) => e.classroomCode === activeRoomCode);
  }, [scheduleEntries, viewMode, activeGroup, activeRoomCode]);

  const selectedRoomMeta = academicClassrooms.find(
    (c) => c.code === activeRoomCode
  );

  const validRoomCodes = useMemo(
    () => academicClassrooms.map((c) => c.code),
    [academicClassrooms]
  );

  const handleSelectExcelFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExcelError('');
    setImportBannerMsg('');
    try {
      const analysis = await parseAndValidateExcelFile(
        file,
        scheduleEntries,
        validRoomCodes
      );
      if (analysis.totalRows === 0) {
        setExcelError(
          'El archivo no contiene filas de horarios. Descarga la plantilla Excel para usar el formato correcto.'
        );
        setExcelAnalysis(null);
      } else {
        setExcelAnalysis(analysis);
      }
    } catch {
      setExcelError(
        'No se pudo leer el archivo. Verifica que sea un Excel (.xlsx / .xls) o CSV válido.'
      );
      setExcelAnalysis(null);
    } finally {
      e.target.value = '';
    }
  };

  const handleConfirmExcelImport = (
    strategy: 'clean-append' | 'replace-valid'
  ) => {
    if (!excelAnalysis) return;
    if (strategy === 'clean-append') {
      const cleanEntries = excelAnalysis.validRows
        .filter(
          (r) =>
            r.internalConflicts.length === 0 && r.existingConflicts.length === 0
        )
        .map((r) => r.entry);
      if (cleanEntries.length === 0) return;
      onImportScheduleEntries(cleanEntries, 'append');
      setImportBannerMsg(
        `Se importaron ${cleanEntries.length} bloques limpios desde "${excelAnalysis.fileName}" sin generar traslapos.`
      );
      setExcelAnalysis(null);
    } else {
      const allValid = excelAnalysis.validRows.map((r) => r.entry);
      if (allValid.length === 0) return;
      onImportScheduleEntries(allValid, 'replace');
      setImportBannerMsg(
        `Se reemplazó el tablero completo con ${allValid.length} bloques desde "${excelAnalysis.fileName}".`
      );
      setExcelAnalysis(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Admin Header Banner + Export & KPIs */}
      <div className="bg-gradient-to-r from-black via-[#1c0a0e] to-red-950 text-white rounded-xl border border-red-800/70 p-5 shadow-md space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Administrador (Control Escolar) · Gestión de Horarios</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Administración Central de Horarios Nocturnos (UNEZ)
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Visualiza la semana completa por grupo o por salón, importa y valida horarios hechos en Excel a distancia sin traslapos, o exporta la base en Excel, CSV y JSON.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => exportSchedulesToExcel(scheduleEntries)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black transition-colors shadow-xs whitespace-nowrap"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exportar Excel (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={() => exportSchedulesToCsv(scheduleEntries)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors shadow-xs whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>

            <button
              type="button"
              onClick={() => exportSchedulesToJson(scheduleEntries)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-red-700 hover:bg-red-600 text-white border border-red-500 transition-colors shadow-xs whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>BD (.json)</span>
            </button>
          </div>
        </div>

        {/* Admin Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">
              Bloques Registrados
            </span>
            <span className="text-xl font-extrabold font-mono text-white tabular-nums">
              {scheduleEntries.length}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">
              Grupos Activos
            </span>
            <span className="text-xl font-extrabold font-mono text-amber-300 tabular-nums">
              {uniqueGroups.length} grupos
            </span>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-300 block">
              Día Activo en Mapa
            </span>
            <span className="text-xl font-extrabold text-white">
              {selectedDay}
            </span>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              overlapReport.totalCount === 0
                ? 'bg-emerald-950/50 border-emerald-500/40'
                : 'bg-red-900/60 border-amber-400'
            }`}
          >
            <span className="text-[11px] text-slate-200 block">
              Auditoría de Traslapos
            </span>
            <span className="text-xl font-extrabold font-mono tabular-nums flex items-center gap-1.5">
              {overlapReport.totalCount === 0 ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300">0 traslapos</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-300" />
                  <span className="text-amber-300">
                    {overlapReport.totalCount} detectado(s)
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 1.5. Excel Remote Import & Ready-to-Use Template (Control Escolar) */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Importar Horarios desde Excel (Trabajo Remoto · Control Escolar)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl">
                Si preparaste horarios en Excel fuera de oficina, descarga la plantilla con el formato oficial y súbela aquí. El sistema revisa errores y traslapos antes de aplicar cambios.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => downloadExcelTemplate(validRoomCodes)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 transition-colors whitespace-nowrap"
            >
              <FileDown className="w-4 h-4 text-red-700 dark:text-amber-400" />
              <span>Descargar Plantilla Excel (.xlsx)</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleSelectExcelFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-red-700 hover:bg-red-800 text-amber-300 transition-colors shadow-xs whitespace-nowrap"
            >
              <Upload className="w-4 h-4" />
              <span>Subir Archivo Excel / CSV</span>
            </button>
          </div>
        </div>

        {excelError && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-xs font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{excelError}</span>
          </div>
        )}

        {importBannerMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{importBannerMsg}</span>
          </div>
        )}

        {/* Staging Preview & Pre-Upload Conflict Control */}
        {excelAnalysis && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-800 space-y-3 text-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Revisión previa: {excelAnalysis.fileName} (Hoja «{excelAnalysis.sheetName}»)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Verifica que no haya conflictos antes de confirmar la subida al portal.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setExcelAnalysis(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white"
                aria-label="Cerrar vista previa de Excel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  Filas Leídas
                </span>
                <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white">
                  {excelAnalysis.totalRows}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block">
                  Listas sin Traslapos
                </span>
                <span className="text-base font-extrabold font-mono text-emerald-900 dark:text-emerald-200">
                  {excelAnalysis.cleanRowsCount}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
                <span className="text-[10px] text-amber-900 dark:text-amber-300 block">
                  Con Traslapo Detectado
                </span>
                <span className="text-base font-extrabold font-mono text-amber-950 dark:text-amber-200">
                  {excelAnalysis.conflictRowsCount}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800">
                <span className="text-[10px] text-red-800 dark:text-red-300 block">
                  Errores de Formato
                </span>
                <span className="text-base font-extrabold font-mono text-red-900 dark:text-red-200">
                  {excelAnalysis.invalidRows.length}
                </span>
              </div>
            </div>

            {excelAnalysis.invalidRows.length > 0 && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 space-y-1 max-h-36 overflow-y-auto">
                <span className="font-bold text-red-800 dark:text-red-300 block">
                  Filas omitidas por formato incompleto/inválido:
                </span>
                {excelAnalysis.invalidRows.map((inv) => (
                  <div key={inv.rowNumber} className="text-[11px] text-red-900 dark:text-red-200">
                    Fila {inv.rowNumber} ({inv.rawSummary}): {inv.reason}
                  </div>
                ))}
              </div>
            )}

            {excelAnalysis.conflictRowsCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-1 max-h-40 overflow-y-auto">
                <span className="font-bold text-amber-950 dark:text-amber-300 block">
                  Conflictos encontrados durante la revisión del Excel:
                </span>
                {excelAnalysis.validRows
                  .filter(
                    (r) =>
                      r.internalConflicts.length > 0 ||
                      r.existingConflicts.length > 0
                  )
                  .map((r) => (
                    <div
                      key={r.rowNumber}
                      className="text-[11px] text-amber-950 dark:text-amber-200"
                    >
                      <strong>
                        Fila {r.rowNumber} ({r.entry.group} · {r.entry.day} {r.entry.blockCode} · Salón {r.entry.classroomCode}):
                      </strong>{' '}
                      {[...r.internalConflicts, ...r.existingConflicts].join(' | ')}
                    </div>
                  ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setExcelAnalysis(null)}
                className="px-3 py-1.5 rounded-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={excelAnalysis.cleanRowsCount === 0}
                onClick={() => handleConfirmExcelImport('clean-append')}
                className="px-3.5 py-1.5 rounded-lg font-bold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
              >
                Agregar {excelAnalysis.cleanRowsCount} filas limpias (Sin traslapos)
              </button>

              <button
                type="button"
                disabled={excelAnalysis.validRows.length === 0}
                onClick={() => handleConfirmExcelImport('replace-valid')}
                className="px-3.5 py-1.5 rounded-lg font-bold bg-red-700 hover:bg-red-800 disabled:opacity-40 disabled:cursor-not-allowed text-amber-300 transition-colors"
                title="Sustituye todos los horarios actuales por las filas válidas de este Excel"
              >
                Reemplazar todo con este Excel ({excelAnalysis.validRows.length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Visual Timetable Matrix (Por Grupo / Por Salón) */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Matrix Controls */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('grupo')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  viewMode === 'grupo'
                    ? 'bg-red-700 text-amber-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Vista por Grupo ({uniqueGroups.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('salon')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  viewMode === 'salon'
                    ? 'bg-red-700 text-amber-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <DoorOpen className="w-3.5 h-3.5" />
                <span>Vista por Salón</span>
              </button>
            </div>

            {viewMode === 'grupo' ? (
              <select
                aria-label="Seleccionar grupo a visualizar"
                value={activeGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value);
                  setFormGroup(e.target.value);
                }}
                className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                {uniqueGroups.map((g) => {
                  const count = scheduleEntries.filter((e) => e.group === g).length;
                  return (
                    <option key={g} value={g}>
                      {g} ({count} hrs/sem)
                    </option>
                  );
                })}
              </select>
            ) : (
              <select
                aria-label="Seleccionar salón a visualizar"
                value={activeRoomCode}
                onChange={(e) => {
                  setSelectedRoomCode(e.target.value);
                  setFormRoom(e.target.value);
                }}
                className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                {academicClassrooms.map((room) => {
                  const count = scheduleEntries.filter(
                    (e) => e.classroomCode === room.code
                  ).length;
                  return (
                    <option key={room.id} value={room.code}>
                      Salón {room.code} · Edif. {room.buildingCode} ({room.floorLabel}) · {count} hrs
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2 flex-wrap">
            {viewMode === 'salon' && selectedRoomMeta && (
              <span className="font-semibold text-red-700 dark:text-amber-400">
                {selectedRoomMeta.name} · {selectedRoomMeta.building}
              </span>
            )}
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Haz clic en un día para sincronizarlo o usa «+» en celdas vacías para agregar clase.
            </span>
          </div>
        </div>

        {/* Visual Weekly Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 w-32 font-bold text-slate-700 dark:text-slate-200">
                  Bloque Nocturno
                </th>
                {SCHOOL_DAYS.map((day) => {
                  const isActiveDay = day === selectedDay;
                  return (
                    <th key={day} className="py-2 px-2.5 text-center">
                      <button
                        type="button"
                        onClick={() => onDayChange(day)}
                        className={`w-full py-1 px-2 rounded-md font-bold transition-colors flex items-center justify-center gap-1.5 ${
                          isActiveDay
                            ? 'bg-red-700 text-amber-300 shadow-2xs'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                        title={`Cambiar día activo del portal a ${day}`}
                      >
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>{day}</span>
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {NIGHT_BLOCKS.map((blk) => (
                <tr key={blk.code} className="align-top">
                  <td className="p-3 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800">
                    <div className="font-mono font-extrabold text-slate-900 dark:text-white">
                      {blk.code}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {blk.startTime} – {blk.endTime}
                    </div>
                  </td>

                  {SCHOOL_DAYS.map((day) => {
                    const cellEntries = filteredMatrixEntries.filter(
                      (e) => e.day === day && e.blockCode === blk.code
                    );
                    const isActiveDay = day === selectedDay;

                    return (
                      <td
                        key={`${blk.code}-${day}`}
                        className={`p-2 border-r last:border-r-0 border-slate-100 dark:border-slate-800/80 min-w-[140px] ${
                          isActiveDay
                            ? 'bg-amber-50/35 dark:bg-amber-950/10'
                            : ''
                        }`}
                      >
                        {cellEntries.length === 0 ? (
                          <button
                            type="button"
                            onClick={() => handleQuickPrefillFromCell(day, blk.code)}
                            className="w-full h-16 rounded-lg border border-dashed border-slate-200 dark:border-slate-700/80 hover:border-red-400 dark:hover:border-amber-500 text-slate-400 hover:text-red-700 dark:hover:text-amber-400 flex flex-col items-center justify-center gap-0.5 text-[11px] transition-colors group"
                          >
                            <PlusCircle className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                            <span>Libre · Agregar</span>
                          </button>
                        ) : (
                          <div className="space-y-1.5">
                            {cellEntries.map((entry) => {
                              const hasOverlap = overlappedEntryIds.has(entry.id);
                              const palette = getColorForSubject(entry.subjectName);

                              return (
                                <div
                                  key={entry.id}
                                  className={`p-2 rounded-lg border text-[11px] space-y-1 relative transition-shadow hover:shadow-sm ${
                                    hasOverlap
                                      ? 'bg-red-100 dark:bg-red-950/80 border-red-600 ring-1 ring-red-500 text-red-950 dark:text-red-100'
                                      : palette
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-1">
                                    <span className="font-mono font-extrabold px-1.5 py-0.5 rounded-sm bg-black/10 dark:bg-white/10 text-[10px]">
                                      {viewMode === 'grupo'
                                        ? `Salón ${entry.classroomCode}`
                                        : entry.group}
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteWithFeedback(entry)}
                                      className="p-1 rounded-sm text-red-700 dark:text-red-300 hover:bg-red-200/80 dark:hover:bg-red-900/80 transition-colors shrink-0"
                                      title="Eliminar este horario"
                                      aria-label={`Eliminar ${entry.subjectName}`}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <p
                                    className="font-bold leading-snug line-clamp-2"
                                    title={entry.subjectName}
                                  >
                                    {entry.subjectName}
                                  </p>

                                  <p className="text-[10px] opacity-85 flex items-center gap-1 line-clamp-1" title={entry.professor}>
                                    <User className="w-2.5 h-2.5 shrink-0" />
                                    <span className="truncate">{entry.professor}</span>
                                  </p>

                                  {hasOverlap && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-700 dark:text-amber-300">
                                      <AlertTriangle className="w-3 h-3" />
                                      Traslapo
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Add Schedule Form + Live Overlap Pre-Check */}
      <div
        id="admin-add-schedule-form"
        className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4"
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-amber-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Agregar Nuevo Bloque de Horario
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                El cambio actualiza inmediatamente los salones libres en el Plano del Piso, el Buscador y la exportación de base de datos.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleCreateSchedule}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs items-end"
        >
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Grupo:
            </label>
            <input
              type="text"
              list="admin-groups-datalist"
              required
              value={formGroup}
              onChange={(e) => setFormGroup(e.target.value)}
              placeholder="Ej. IISC 7-N1"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
            />
            <datalist id="admin-groups-datalist">
              {uniqueGroups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Día:
            </label>
            <select
              value={formDay}
              onChange={(e) => setFormDay(e.target.value as DayOfWeek)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
            >
              {SCHOOL_DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Bloque:
            </label>
            <select
              value={formBlock}
              onChange={(e) => setFormBlock(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
            >
              {NIGHT_BLOCKS.map((blk) => (
                <option key={blk.code} value={blk.code}>
                  {blk.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Salón:
            </label>
            <select
              value={formRoom}
              onChange={(e) => setFormRoom(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
            >
              {academicClassrooms.map((room) => (
                <option key={room.id} value={room.code}>
                  {room.code} · Edif. {room.buildingCode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Materia:
            </label>
            <input
              type="text"
              required
              value={formSubject}
              onChange={(e) => setFormSubject(e.target.value)}
              placeholder="Ej. Taller de Redes IISC 7"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Docente:
            </label>
            <input
              type="text"
              value={formProfessor}
              onChange={(e) => setFormProfessor(e.target.value)}
              placeholder="Ej. 469. Nallely Suarez"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-6 flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-xs">
              {formConflicts.length === 0 ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Sin conflictos: {formRoom} / {formGroup || 'grupo'} disponible en {formDay} {formBlock}.
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>
                    Atención: se detectó {formConflicts.length} posible traslapo con estos datos.
                  </span>
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                formConflicts.length > 0
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-red-700 hover:bg-red-800 text-amber-300'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {formConflicts.length > 0
                  ? 'Agregar (Generará Traslapo)'
                  : 'Agregar Horario'}
              </span>
            </button>
          </div>
        </form>

        {formConflicts.length > 0 && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
            {formConflicts.map((msg, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>{msg}</span>
              </div>
            ))}
          </div>
        )}

        {formFeedback && (
          <div
            className={`p-3 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
              formFeedback.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{formFeedback.text}</span>
          </div>
        )}
      </div>

      {/* 4. Overlap Audit Panel */}
      <div
        className={`rounded-xl border p-5 space-y-3 ${
          overlapReport.totalCount === 0
            ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
            : 'bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-800'
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {overlapReport.totalCount === 0 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-700 dark:text-amber-400" />
            )}
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Verificador Automático de Traslapos (Salones, Docentes y Grupos)
            </h4>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-sm bg-white/80 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            {overlapReport.roomOverlaps.length} salón ·{' '}
            {overlapReport.professorOverlaps.length} docente ·{' '}
            {overlapReport.groupOverlaps.length} grupo
          </span>
        </div>

        {overlapReport.totalCount === 0 ? (
          <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
            Todos los <strong>{scheduleEntries.length}</strong> bloques cargados de los <strong>{uniqueGroups.length}</strong> grupos del turno nocturno están libres de empalmes en salones, docentes y horarios de grupo.
          </p>
        ) : (
          <div className="space-y-2">
            {[
              ...overlapReport.roomOverlaps,
              ...overlapReport.professorOverlaps,
              ...overlapReport.groupOverlaps,
            ].map((ov, idx) => (
              <div
                key={`${ov.kind}-${ov.day}-${ov.blockCode}-${ov.keyLabel}-${idx}`}
                className="p-3 rounded-lg bg-white dark:bg-[#111827] border border-red-300 dark:border-red-800 text-xs space-y-2"
              >
                <div className="font-bold text-red-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>
                    Traslapo de {ov.kind === 'salon' ? 'Salón' : ov.kind === 'docente' ? 'Docente' : 'Grupo'} ({ov.keyLabel}) · {ov.day} {ov.blockCode}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ov.entries.map((e) => (
                    <div
                      key={e.id}
                      className="p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {e.group} · Salón {e.classroomCode}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                          {e.subjectName} · {e.professor}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteWithFeedback(e)}
                        className="p-1.5 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 rounded-md shrink-0"
                        title="Eliminar este registro para resolver traslapo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

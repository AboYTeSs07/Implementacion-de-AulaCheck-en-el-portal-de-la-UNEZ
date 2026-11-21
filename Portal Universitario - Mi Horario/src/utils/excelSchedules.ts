import * as XLSX from 'xlsx';
import { DayOfWeek, ScheduleEntry } from '../types/portal';
import { NIGHT_BLOCKS } from '../data/mockData';

const VALID_DAYS_MAP: Record<string, DayOfWeek> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  miércoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  sábado: 'Sábado',
};

const VALID_BLOCKS = new Set(NIGHT_BLOCKS.map((b) => b.code));

export interface ParsedExcelRow {
  rowNumber: number;
  entry: Omit<ScheduleEntry, 'id'>;
  internalConflicts: string[];
  existingConflicts: string[];
  warnings: string[];
}

export interface InvalidExcelRow {
  rowNumber: number;
  rawSummary: string;
  reason: string;
}

export interface ExcelImportAnalysis {
  fileName: string;
  sheetName: string;
  totalRows: number;
  validRows: ParsedExcelRow[];
  invalidRows: InvalidExcelRow[];
  cleanRowsCount: number;
  conflictRowsCount: number;
}

function normalizeHeaderKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

function getField(row: Record<string, unknown>, candidates: string[]): string {
  for (const rawKey of Object.keys(row)) {
    const norm = normalizeHeaderKey(rawKey);
    if (candidates.includes(norm)) {
      const val = row[rawKey];
      return val === undefined || val === null ? '' : String(val).trim();
    }
  }
  return '';
}

function normalizeDay(raw: string): DayOfWeek | null {
  const key = raw.trim().toLowerCase();
  return VALID_DAYS_MAP[key] || null;
}

function normalizeBlock(raw: string): string | null {
  const upper = raw.trim().toUpperCase();
  if (VALID_BLOCKS.has(upper)) return upper;
  const matchTime = NIGHT_BLOCKS.find(
    (b) => upper.startsWith(b.startTime) || upper.includes(b.code)
  );
  return matchTime ? matchTime.code : null;
}

export function downloadExcelTemplate(validRoomCodes: string[]): void {
  const wb = XLSX.utils.book_new();

  // Sheet 1: Ready-to-fill Horarios template
  const templateData = [
    {
      Grupo: 'IISC 7-N1',
      Dia: 'Viernes',
      Bloque: 'N6',
      Salon: '741',
      Materia: 'Ejemplo - Taller de Integración',
      Docente: '469. Nallely Suarez Melquiadez',
    },
    {
      Grupo: 'LRI 6-N',
      Dia: 'Jueves',
      Bloque: 'N1',
      Salon: '853',
      Materia: 'Ejemplo - Seminario de Caso',
      Docente: '519. Hernández Ordoñez Saira Yamileth',
    },
  ];
  const wsHorarios = XLSX.utils.json_to_sheet(templateData, {
    header: ['Grupo', 'Dia', 'Bloque', 'Salon', 'Materia', 'Docente'],
  });
  wsHorarios['!cols'] = [
    { wch: 14 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 42 },
    { wch: 38 },
  ];
  XLSX.utils.book_append_sheet(wb, wsHorarios, 'Horarios');

  // Sheet 2: Allowed values & instructions for remote Control Escolar staff
  const instructionsData = [
    {
      Campo: 'Grupo',
      Regla_Formato: 'Nombre exacto del grupo (ej. IISC 7-N1, LRI 6-N, CPA 8-N)',
      Ejemplo: 'IISC 7-N1',
    },
    {
      Campo: 'Dia',
      Regla_Formato: 'Lunes, Martes, Miércoles, Jueves o Viernes',
      Ejemplo: 'Lunes',
    },
    {
      Campo: 'Bloque',
      Regla_Formato: 'N1 (18:00-18:40), N2 (18:40-19:20), N3 (19:20-20:00), N4 (20:00-20:40), N5 (20:40-21:10), N6 (21:10-21:50)',
      Ejemplo: 'N1',
    },
    {
      Campo: 'Salon',
      Regla_Formato: `Salones válidos: ${validRoomCodes.join(', ')}`,
      Ejemplo: '741',
    },
    {
      Campo: 'Materia',
      Regla_Formato: 'Nombre de la asignatura (obligatorio)',
      Ejemplo: 'Programación Web',
    },
    {
      Campo: 'Docente',
      Regla_Formato: 'Número y nombre completo del docente (o "Propuesta" si está pendiente)',
      Ejemplo: '469. Nallely Suarez Melquiadez',
    },
  ];
  const wsGuide = XLSX.utils.json_to_sheet(instructionsData);
  wsGuide['!cols'] = [{ wch: 12 }, { wch: 78 }, { wch: 34 }];
  XLSX.utils.book_append_sheet(wb, wsGuide, 'Instrucciones_Formato');

  XLSX.writeFile(wb, 'Plantilla_Horarios_UNEZ.xlsx');
}

export function exportSchedulesToExcel(entries: ScheduleEntry[]): void {
  const wb = XLSX.utils.book_new();
  const rows = entries.map((e) => ({
    ID: e.id,
    Grupo: e.group,
    Dia: e.day,
    Bloque: e.blockCode,
    Salon: e.classroomCode,
    Materia: e.subjectName,
    Docente: e.professor,
  }));
  const ws = XLSX.utils.json_to_sheet(rows, {
    header: ['ID', 'Grupo', 'Dia', 'Bloque', 'Salon', 'Materia', 'Docente'],
  });
  ws['!cols'] = [
    { wch: 14 },
    { wch: 14 },
    { wch: 12 },
    { wch: 10 },
    { wch: 10 },
    { wch: 48 },
    { wch: 38 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, 'Horarios');
  XLSX.writeFile(
    wb,
    `Horarios_Turno_Nocturno_UNEZ_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

export async function parseAndValidateExcelFile(
  file: File,
  existingEntries: ScheduleEntry[],
  validRoomCodes: string[]
): Promise<ExcelImportAnalysis> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });

  const sheetName =
    workbook.SheetNames.find(
      (n) => normalizeHeaderKey(n) === 'horarios'
    ) || workbook.SheetNames[0];

  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: '',
  });

  const validRoomSet = new Set(validRoomCodes.map((c) => c.trim()));
  const validRows: ParsedExcelRow[] = [];
  const invalidRows: InvalidExcelRow[] = [];

  rawRows.forEach((raw, idx) => {
    const rowNumber = idx + 2; // 1-indexed + header row
    const group = getField(raw, ['grupo', 'group']);
    const dayRaw = getField(raw, ['dia', 'day', 'dia_semana']);
    const blockRaw = getField(raw, ['bloque', 'block', 'hora', 'horario']);
    const classroomCode = getField(raw, ['salon', 'aula', 'classroom', 'espacio']);
    const subjectName = getField(raw, ['materia', 'asignatura', 'subject']);
    const professor =
      getField(raw, ['docente', 'maestro', 'profesor', 'professor']) || 'Propuesta';

    // Skip completely empty trailing rows
    if (!group && !dayRaw && !blockRaw && !classroomCode && !subjectName) {
      return;
    }

    const errors: string[] = [];
    if (!group) errors.push('Falta Grupo');
    const day = normalizeDay(dayRaw);
    if (!day) errors.push(`Día inválido ("${dayRaw || 'vacío'}")`);
    const blockCode = normalizeBlock(blockRaw);
    if (!blockCode) errors.push(`Bloque inválido ("${blockRaw || 'vacío'}", usa N1–N6)`);
    if (!classroomCode) errors.push('Falta Salón');
    if (!subjectName) errors.push('Falta Materia');

    if (errors.length > 0 || !day || !blockCode) {
      invalidRows.push({
        rowNumber,
        rawSummary: `${group || 'Sin grupo'} · ${dayRaw || '?'} ${blockRaw || '?'} · Salón ${classroomCode || '?'}`,
        reason: errors.join('; '),
      });
      return;
    }

    const warnings: string[] = [];
    if (!validRoomSet.has(classroomCode)) {
      warnings.push(
        `El salón "${classroomCode}" no está en el catálogo actual del plano (se cargará el registro pero no aparecerá en el mapa hasta dar de alta el salón).`
      );
    }

    const entry: Omit<ScheduleEntry, 'id'> = {
      group,
      day,
      blockCode,
      classroomCode,
      subjectName,
      professor,
    };

    const existingConflicts: string[] = [];
    const profLower = professor.trim().toLowerCase();
    const isRealProf =
      profLower !== '' && profLower !== 'propuesta' && profLower !== 'sin asignar';

    for (const ex of existingEntries) {
      if (ex.day !== day || ex.blockCode !== blockCode) continue;
      if (ex.classroomCode.trim() === classroomCode.trim()) {
        existingConflicts.push(
          `Choque de salón con sistema actual: ${classroomCode} ocupado por ${ex.group} (${ex.subjectName})`
        );
      }
      if (ex.group.trim().toLowerCase() === group.trim().toLowerCase()) {
        existingConflicts.push(
          `Choque de grupo con sistema actual: ${group} ya tiene ${ex.subjectName} en salón ${ex.classroomCode}`
        );
      }
      if (isRealProf && ex.professor.trim().toLowerCase() === profLower) {
        existingConflicts.push(
          `Choque de docente con sistema actual: ${professor} ya da clase a ${ex.group} (salón ${ex.classroomCode})`
        );
      }
    }

    validRows.push({
      rowNumber,
      entry,
      internalConflicts: [],
      existingConflicts,
      warnings,
    });
  });

  // Check conflicts among rows inside the uploaded Excel file itself
  for (let i = 0; i < validRows.length; i++) {
    for (let j = i + 1; j < validRows.length; j++) {
      const a = validRows[i];
      const b = validRows[j];
      if (a.entry.day !== b.entry.day || a.entry.blockCode !== b.entry.blockCode) {
        continue;
      }
      if (a.entry.classroomCode.trim() === b.entry.classroomCode.trim()) {
        a.internalConflicts.push(
          `Empalme interno en Excel (fila ${b.rowNumber}): mismo salón ${a.entry.classroomCode}`
        );
        b.internalConflicts.push(
          `Empalme interno en Excel (fila ${a.rowNumber}): mismo salón ${a.entry.classroomCode}`
        );
      }
      if (a.entry.group.trim().toLowerCase() === b.entry.group.trim().toLowerCase()) {
        a.internalConflicts.push(
          `Empalme interno en Excel (fila ${b.rowNumber}): mismo grupo ${a.entry.group}`
        );
        b.internalConflicts.push(
          `Empalme interno en Excel (fila ${a.rowNumber}): mismo grupo ${a.entry.group}`
        );
      }
      const profA = a.entry.professor.trim().toLowerCase();
      const profB = b.entry.professor.trim().toLowerCase();
      if (
        profA &&
        profA !== 'propuesta' &&
        profA !== 'sin asignar' &&
        profA === profB
      ) {
        a.internalConflicts.push(
          `Empalme interno en Excel (fila ${b.rowNumber}): mismo docente ${a.entry.professor}`
        );
        b.internalConflicts.push(
          `Empalme interno en Excel (fila ${a.rowNumber}): mismo docente ${a.entry.professor}`
        );
      }
    }
  }

  const cleanRowsCount = validRows.filter(
    (r) => r.internalConflicts.length === 0 && r.existingConflicts.length === 0
  ).length;

  return {
    fileName: file.name,
    sheetName,
    totalRows: validRows.length + invalidRows.length,
    validRows,
    invalidRows,
    cleanRowsCount,
    conflictRowsCount: validRows.length - cleanRowsCount,
  };
}

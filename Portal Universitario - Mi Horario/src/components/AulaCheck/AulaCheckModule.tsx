import React, { useState } from 'react';
import {
  Classroom,
  ClassroomStatus,
  AulaCheckRole,
  PrefecturaLogEntry,
  Subject,
  TimeSlot,
  StudentProfile,
  BuildingMetadata,
  TeacherRoomRequest,
  ElevatorUnit,
  DayOfWeek,
  ScheduleEntry,
} from '../../types/portal';
import { NIGHT_BLOCKS } from '../../data/mockData';
import { SCHOOL_DAYS, detectScheduleOverlaps } from '../../data/nightlySchedules';
import { FloorPlanView } from './FloorPlanView';
import { SpacesGridView } from './SpacesGridView';
import { FreeRoomsFinder } from './FreeRoomsFinder';
import { SensorsSimulationView } from './SensorsSimulationView';
import { PrefecturaLogView } from './PrefecturaLogView';
import { AdminScheduleManager } from './AdminScheduleManager';
import { ClassroomDetailModal } from './ClassroomDetailModal';
import { WeeklyGrid } from '../Horarios/WeeklyGrid';
import { TodaySchedule } from '../Horarios/TodaySchedule';
import { SubjectsList } from '../Horarios/SubjectsList';
import {
  Building2,
  Footprints,
  CalendarDays,
  ShieldCheck,
  Search,
  Clock,
  Printer,
  Download,
  UserCheck,
  GraduationCap,
  Briefcase,
  Map,
  Radio,
  Database,
} from 'lucide-react';

export type AulaCheckTab =
  | 'plano'
  | 'espacios'
  | 'libres'
  | 'sensores'
  | 'mi-horario'
  | 'prefectura'
  | 'admin';

export type PersonalScheduleSubView = 'semanal' | 'hoy' | 'materias';

interface AulaCheckModuleProps {
  student: StudentProfile;
  buildings: BuildingMetadata[];
  classrooms: Classroom[];
  elevators: ElevatorUnit[];
  prefecturaLogs: PrefecturaLogEntry[];
  teacherRequests: TeacherRoomRequest[];
  subjects: Subject[];
  scheduleEntries: ScheduleEntry[];
  selectedDay: DayOfWeek;
  onDayChange: (day: DayOfWeek) => void;
  selectedBlockCode: string;
  onBlockCodeChange: (blockCode: string) => void;
  simulatedClock: string;
  onSimulatedClockChange: (clock: string) => void;
  onUpdateClassroomStatus: (
    classroomId: string,
    blockCode: string,
    newStatus: ClassroomStatus,
    observation: string
  ) => void;
  onToggleElevatorStatus: (elevatorId: string) => void;
  onSubmitTeacherRequest: (params: {
    classroom: Classroom;
    blockCode: string;
    actionType: 'Reservar' | 'Liberar';
    professorName: string;
    reason: string;
    minutesBeforeClass: number;
    meetsTwentyMinRule: boolean;
  }) => void;
  onReviewTeacherRequest: (
    requestId: string,
    decision: 'Aprobada' | 'Rechazada'
  ) => void;
  onSimulateSensorSweep: () => void;
  onToggleRoomPresence: (classroomId: string) => void;
  onAddScheduleEntry: (entry: Omit<ScheduleEntry, 'id'>) => void;
  onDeleteScheduleEntry: (id: string) => void;
  onImportScheduleEntries: (
    entries: Omit<ScheduleEntry, 'id'>[],
    mode: 'append' | 'replace'
  ) => void;
  onSelectCourse: (subject: Subject, slot?: TimeSlot) => void;
  onOpenPrintModal: () => void;
  onDownloadIcs: () => void;
}

const SIMULATED_CLOCK_OPTIONS = [
  { value: '17:30', label: '17:30 hrs (30 min antes de N1)' },
  { value: '17:45', label: '17:45 hrs (15 min antes de N1)' },
  { value: '18:10', label: '18:10 hrs (30 min antes de N2)' },
  { value: '18:55', label: '18:55 hrs (25 min antes de N3)' },
  { value: '19:35', label: '19:35 hrs (25 min antes de N4)' },
  { value: '20:15', label: '20:15 hrs (25 min antes de N5)' },
];

export const AulaCheckModule: React.FC<AulaCheckModuleProps> = ({
  student,
  buildings,
  classrooms,
  elevators,
  prefecturaLogs,
  teacherRequests,
  subjects,
  scheduleEntries,
  selectedDay,
  onDayChange,
  selectedBlockCode,
  onBlockCodeChange,
  simulatedClock,
  onSimulatedClockChange,
  onUpdateClassroomStatus,
  onToggleElevatorStatus,
  onSubmitTeacherRequest,
  onReviewTeacherRequest,
  onSimulateSensorSweep,
  onToggleRoomPresence,
  onAddScheduleEntry,
  onDeleteScheduleEntry,
  onImportScheduleEntries,
  onSelectCourse,
  onOpenPrintModal,
  onDownloadIcs,
}) => {
  const [activeTab, setActiveTab] = useState<AulaCheckTab>('plano');
  const [role, setRole] = useState<AulaCheckRole>('estudiante');
  const [personalSubView, setPersonalSubView] =
    useState<PersonalScheduleSubView>('semanal');
  const [showSaturday, setShowSaturday] = useState<boolean>(false);

  // Filters for spaces
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [buildingFilter, setBuildingFilter] = useState<string>('ALL');
  const [floorFilter, setFloorFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Selected classroom modal
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);
  const selectedClassroom =
    classrooms.find((c) => c.id === selectedClassroomId) || null;

  const selectedBlock =
    NIGHT_BLOCKS.find((b) => b.code === selectedBlockCode) || NIGHT_BLOCKS[0];

  // Live KPI metrics for selected block
  const academicRooms = classrooms.filter(
    (r) => r.hourlySchedule[selectedBlock.code]?.status !== 'Administrativo'
  );
  const freeRooms = academicRooms.filter(
    (r) => r.hourlySchedule[selectedBlock.code]?.status === 'Libre'
  );
  const freeLowerFloors = freeRooms.filter((r) => r.floor <= 2);
  const occupiedRooms = academicRooms.filter(
    (r) => r.hourlySchedule[selectedBlock.code]?.status === 'Ocupado'
  );
  const otherRooms = academicRooms.filter((r) => {
    const st = r.hourlySchedule[selectedBlock.code]?.status;
    return st === 'Reservado' || st === 'Mantenimiento';
  });

  const pendingRequestsCount = teacherRequests.filter(
    (r) => r.approvalStatus === 'Pendiente'
  ).length;
  const maintenanceElevators = elevators.filter(
    (e) => e.status === 'Mantenimiento'
  );
  const overlapCount = detectScheduleOverlaps(scheduleEntries).totalCount;

  // Filtered classrooms
  const filteredClassrooms = classrooms.filter((room) => {
    const session = room.hourlySchedule[selectedBlock.code];

    if (buildingFilter !== 'ALL' && room.buildingCode !== buildingFilter) {
      return false;
    }

    if (floorFilter === 'LOW' && room.floor > 2) {
      return false;
    } else if (
      floorFilter !== 'ALL' &&
      floorFilter !== 'LOW' &&
      room.floor !== Number(floorFilter)
    ) {
      return false;
    }

    if (statusFilter !== 'ALL' && session?.status !== statusFilter) {
      return false;
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchCode = room.code.toLowerCase().includes(term);
      const matchName = room.name.toLowerCase().includes(term);
      const matchBuilding = room.building.toLowerCase().includes(term);
      const matchSubject = session?.subjectName?.toLowerCase().includes(term);
      const matchProf = session?.professor?.toLowerCase().includes(term);
      if (
        !matchCode &&
        !matchName &&
        !matchBuilding &&
        !matchSubject &&
        !matchProf
      ) {
        return false;
      }
    }

    return true;
  });

  const handleRoleSwitch = (newRole: AulaCheckRole) => {
    setRole(newRole);
    if (newRole === 'prefectura') {
      if (activeTab === 'mi-horario' || activeTab === 'admin') {
        setActiveTab('prefectura');
      }
    } else if (newRole === 'administrador') {
      setActiveTab('admin');
    } else if (activeTab === 'admin') {
      setActiveTab('plano');
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Header & Role / Block Controls */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs p-5 space-y-4 transition-colors">
        
        {/* Top Row: Title + Role Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                AulaCheck · Universidad Emiliano Zapata
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-amber-300 border border-red-200 dark:border-red-800">
                Turno Nocturno (N1–N6)
              </span>
              {maintenanceElevators.length > 0 && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-amber-100 text-amber-950 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  Aviso: {maintenanceElevators.map((e) => `${e.buildingCode}-${e.label}`).join(', ')} en Mantenimiento
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Edificios 800, 700 y 900 · Ubica salones libres en el plano del piso antes de subir escaleras o hacer fila en elevadores.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
              Vista de rol:
            </span>
            <div className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => handleRoleSwitch('estudiante')}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all whitespace-nowrap min-w-0 ${
                  role === 'estudiante'
                    ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Estudiante</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSwitch('docente')}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all whitespace-nowrap min-w-0 ${
                  role === 'docente'
                    ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Docente</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSwitch('prefectura')}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all whitespace-nowrap min-w-0 ${
                  role === 'prefectura'
                    ? 'bg-red-700 text-amber-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Prefectura</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSwitch('administrador')}
                className={`inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all whitespace-nowrap min-w-0 ${
                  role === 'administrador'
                    ? 'bg-black text-amber-300 border border-amber-400/60 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Administrador</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 sm:p-3.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70 flex flex-col justify-between gap-2 min-w-0">
            <span className="text-[11px] font-semibold text-emerald-900 dark:text-emerald-300 leading-snug">
              Aulas Libres ({selectedDay} · {selectedBlock.code} · {selectedBlock.startTime})
            </span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 dark:text-emerald-200 font-mono tabular-nums leading-none">
                {freeRooms.length}
              </span>
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                disponibles
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70 flex flex-col justify-between gap-2 min-w-0">
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 leading-snug">
              Pisos Bajos (P1–P2)
            </span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-950 dark:text-amber-200 font-mono tabular-nums leading-none">
                {freeLowerFloors.length}
              </span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                acceso rápido
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-2 min-w-0">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-snug">
              Salones Ocupados
            </span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums leading-none">
                {occupiedRooms.length}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                en clase
              </span>
            </div>
          </div>

          <div className="p-3 sm:p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-2 min-w-0">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-snug">
              Solicitudes y Mantenimiento
            </span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums leading-tight">
                {pendingRequestsCount} pend. · {otherRooms.length} esp.
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs + Block / Clock Selectors */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Main AulaCheck Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-slate-800 rounded-lg overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('plano')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'plano'
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Plano del Piso</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('espacios')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'espacios'
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Espacios por Edificio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('libres')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'libres'
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Aulas Libres Ahora</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sensores')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'sensores'
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Sensores (Simulación)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('mi-horario')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'mi-horario'
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Mi Horario {student.currentSemester}-{student.group}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prefectura')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'prefectura'
                  ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rondín de Prefectura</span>
              {pendingRequestsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-mono">
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            {role === 'administrador' && (
              <button
                type="button"
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'admin'
                    ? 'bg-black text-amber-300 border border-amber-400/50 shadow-xs'
                    : 'text-slate-700 dark:text-amber-300 hover:text-black dark:hover:text-amber-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Gestión Visual (Admin)</span>
                {overlapCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-mono">
                    {overlapCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Right Controls: Day + Night Block + Simulated Clock or Export */}
          {activeTab === 'mi-horario' ? (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={onDownloadIcs}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Calendario (.ics)</span>
              </button>
              <button
                type="button"
                onClick={onOpenPrintModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg border border-red-800 transition-colors whitespace-nowrap"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Comprobante</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full xl:w-auto min-w-0">
              <div className="w-full sm:w-auto min-w-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                <CalendarDays className="w-3.5 h-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">
                  Día:
                </span>
                <select
                  aria-label="Seleccionar día de la semana"
                  value={selectedDay}
                  onChange={(e) => onDayChange(e.target.value as DayOfWeek)}
                  className="bg-transparent font-bold text-slate-900 dark:text-white focus:outline-hidden cursor-pointer min-w-0 flex-1 w-full sm:w-auto"
                >
                  {SCHOOL_DAYS.map((day) => (
                    <option key={day} value={day} className="dark:bg-slate-900">
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-auto min-w-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                <Clock className="w-3.5 h-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">
                  Bloque:
                </span>
                <select
                  aria-label="Seleccionar bloque horario"
                  value={selectedBlockCode}
                  onChange={(e) => onBlockCodeChange(e.target.value)}
                  className="bg-transparent font-mono font-bold text-slate-900 dark:text-white focus:outline-hidden cursor-pointer min-w-0 flex-1 w-full sm:w-auto truncate"
                >
                  {NIGHT_BLOCKS.map((blk) => (
                    <option key={blk.code} value={blk.code} className="dark:bg-slate-900">
                      {blk.label}
                    </option>
                  ))}
                </select>
              </div>

              {role === 'docente' && (
                <div className="w-full sm:w-auto min-w-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg text-xs">
                  <span className="text-amber-900 dark:text-amber-300 font-semibold shrink-0 whitespace-nowrap">
                    Reloj:
                  </span>
                  <select
                    aria-label="Reloj simulado para regla de 20 minutos"
                    value={simulatedClock}
                    onChange={(e) => onSimulatedClockChange(e.target.value)}
                    className="bg-transparent font-mono font-bold text-amber-950 dark:text-amber-200 focus:outline-hidden cursor-pointer min-w-0 flex-1 w-full sm:w-auto truncate text-[11px] sm:text-xs"
                  >
                    {SIMULATED_CLOCK_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="dark:bg-slate-900">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Secondary Filter Bar for Spaces & Free Rooms */}
        {(activeTab === 'espacios' || activeTab === 'libres') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar salón (ej. 715, 741, 802, 921)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <select
              aria-label="Filtrar por edificio"
              value={buildingFilter}
              onChange={(e) => setBuildingFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-medium"
            >
              <option value="ALL">Todos los edificios (800, 700, 900)</option>
              <option value="800">Edificio 800</option>
              <option value="700">Edificio 700</option>
              <option value="900">Edificio 900</option>
            </select>

            <select
              aria-label="Filtrar por piso"
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-medium"
            >
              <option value="ALL">Todos los pisos (P1 – P7)</option>
              <option value="LOW">Solo pisos bajos (P1 – P2)</option>
              <option value="1">Piso 1 (Planta Baja)</option>
              <option value="2">Piso 2</option>
              <option value="3">Piso 3</option>
              <option value="4">Piso 4</option>
              <option value="5">Piso 5</option>
              <option value="6">Piso 6</option>
              <option value="7">Piso 7</option>
            </select>

            {activeTab === 'espacios' ? (
              <select
                aria-label="Filtrar por estado"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-medium"
              >
                <option value="ALL">Todos los estados</option>
                <option value="Libre">Solo Libres</option>
                <option value="Ocupado">Solo Ocupados</option>
                <option value="Reservado">Solo Reservados</option>
                <option value="Mantenimiento">En Mantenimiento</option>
                <option value="Administrativo">Oficinas / Áreas Comunes</option>
              </select>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setBuildingFilter('ALL');
                  setFloorFilter('ALL');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-semibold transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Active Tab Body */}
      {activeTab === 'plano' && (
        <FloorPlanView
          buildings={buildings}
          classrooms={classrooms}
          elevators={elevators}
          role={role}
          selectedBlock={selectedBlock}
          onSelectClassroom={(room) => setSelectedClassroomId(room.id)}
          onToggleElevatorStatus={onToggleElevatorStatus}
        />
      )}

      {activeTab === 'espacios' && (
        <SpacesGridView
          classrooms={filteredClassrooms}
          selectedBlock={selectedBlock}
          role={role}
          onSelectClassroom={(room) => setSelectedClassroomId(room.id)}
          onQuickStatusChange={(roomId, newStatus) =>
            onUpdateClassroomStatus(
              roomId,
              selectedBlock.code,
              newStatus,
              'Actualizado rápido desde vista de pisos (Prefectura).'
            )
          }
          onQuickRequestReserve={(room) => setSelectedClassroomId(room.id)}
        />
      )}

      {activeTab === 'libres' && (
        <FreeRoomsFinder
          classrooms={filteredClassrooms}
          selectedBlock={selectedBlock}
          role={role}
          onSelectClassroom={(room) => setSelectedClassroomId(room.id)}
          onQuickRequestReserve={(room) => setSelectedClassroomId(room.id)}
        />
      )}

      {activeTab === 'sensores' && (
        <SensorsSimulationView
          classrooms={classrooms}
          selectedBlock={selectedBlock}
          role={role}
          onSimulateSensorSweep={onSimulateSensorSweep}
          onToggleRoomPresence={onToggleRoomPresence}
          onConfirmFreeFromSensor={(roomId) =>
            onUpdateClassroomStatus(
              roomId,
              selectedBlock.code,
              'Libre',
              'Liberado por Prefectura tras lectura de sensor con 0 personas.'
            )
          }
          onSelectClassroom={(room) => setSelectedClassroomId(room.id)}
        />
      )}

      {activeTab === 'mi-horario' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setPersonalSubView('semanal')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  personalSubView === 'semanal'
                    ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Cuadrícula Semanal (N1–N6)
              </button>
              <button
                type="button"
                onClick={() => setPersonalSubView('hoy')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  personalSubView === 'hoy'
                    ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Agenda del Día
              </button>
              <button
                type="button"
                onClick={() => setPersonalSubView('materias')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                  personalSubView === 'materias'
                    ? 'bg-white dark:bg-slate-900 text-red-700 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Lista de Materias
              </button>
            </div>

            {personalSubView === 'semanal' && (
              <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showSaturday}
                  onChange={() => setShowSaturday((prev) => !prev)}
                  className="rounded-sm border-slate-300 dark:border-slate-700 text-red-600 focus:ring-red-500"
                />
                <span>Incluir Sábado</span>
              </label>
            )}
          </div>

          {personalSubView === 'semanal' && (
            <WeeklyGrid
              subjects={subjects}
              showSaturday={showSaturday}
              searchTerm={searchTerm}
              onSelectCourse={onSelectCourse}
            />
          )}

          {personalSubView === 'hoy' && (
            <TodaySchedule
              subjects={subjects}
              onSelectCourse={onSelectCourse}
            />
          )}

          {personalSubView === 'materias' && (
            <SubjectsList
              subjects={subjects}
              searchTerm={searchTerm}
              onSelectCourse={onSelectCourse}
            />
          )}
        </div>
      )}

      {activeTab === 'prefectura' && (
        <PrefecturaLogView
          classrooms={classrooms}
          elevators={elevators}
          logs={prefecturaLogs}
          teacherRequests={teacherRequests}
          selectedBlock={selectedBlock}
          role={role}
          onUpdateClassroomStatus={onUpdateClassroomStatus}
          onToggleElevatorStatus={onToggleElevatorStatus}
          onReviewTeacherRequest={onReviewTeacherRequest}
        />
      )}

      {activeTab === 'admin' && role === 'administrador' && (
        <AdminScheduleManager
          scheduleEntries={scheduleEntries}
          classrooms={classrooms}
          selectedDay={selectedDay}
          onDayChange={onDayChange}
          onAddScheduleEntry={onAddScheduleEntry}
          onDeleteScheduleEntry={onDeleteScheduleEntry}
          onImportScheduleEntries={onImportScheduleEntries}
        />
      )}

      {/* Classroom Hourly Detail Modal */}
      {selectedClassroom && (
        <ClassroomDetailModal
          classroom={selectedClassroom}
          selectedBlock={selectedBlock}
          simulatedClock={simulatedClock}
          role={role}
          onClose={() => setSelectedClassroomId(null)}
          onUpdateBlockStatus={onUpdateClassroomStatus}
          onSubmitTeacherRequest={onSubmitTeacherRequest}
        />
      )}
    </div>
  );
};

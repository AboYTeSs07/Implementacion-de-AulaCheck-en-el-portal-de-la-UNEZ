export type DayOfWeek = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

export type AulaCheckRole = 'estudiante' | 'docente' | 'prefectura' | 'administrador';

export type ClassroomStatus = 'Libre' | 'Ocupado' | 'Reservado' | 'Mantenimiento' | 'Administrativo';

export type SpaceType =
  | 'Aula Teórica'
  | 'Lab. Cómputo'
  | 'Auditorio'
  | 'Oficina / Área Administrativa'
  | 'Servicio / Área Común';

export interface TimeSlot {
  day: DayOfWeek;
  blockCode?: string; // e.g. "N1", "N2"
  startTime: string;  // "18:00"
  endTime: string;    // "18:40"
  startHour: number;  // 18
  startMinute: number; // 0
  durationMinutes: number; // 40 or 30
  classroom: string;
  building: string;
  modality: 'Presencial' | 'Laboratorio' | 'Híbrida' | 'Virtual';
}

export interface Subject {
  id: string;
  code: string;
  nrc: string;
  name: string;
  group: string;
  credits: number;
  semester: number;
  professor: {
    name: string;
    teacherNumber?: string;
    email: string;
    office: string;
    title: string;
    rating: number;
  };
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    accent: string;
  };
  slots: TimeSlot[];
  syllabusTopics: string[];
  evaluationCriteria: { label: string; percentage: number }[];
  attendancePercentage: number;
  virtualClassUrl?: string;
  notes?: string;
}

export interface ElectiveOption {
  id: string;
  code: string;
  nrc: string;
  name: string;
  group: string;
  credits: number;
  professor: string;
  slots: TimeSlot[];
  category: 'Optativa' | 'Especialidad' | 'Extracurricular';
}

export interface AcademicPeriodRecord {
  carrera: string;
  ciclo: string;
  periodo: string;
  grado: number;
  grupo: string;
  estado: 'Habilitado' | 'Pendiente' | 'Baja';
}

export interface StudentProfile {
  name: string;
  matricula: string;
  program: string;
  faculty: string;
  campus: string;
  address: string;
  currentSemester: number;
  period: string;
  cycle: string;
  group: string;
  university: string;
  motto: string;
  cumulativeAverage: number;
  periodAverage: number;
  earnedCredits: number;
  totalCredits: number;
  maxCreditsPerPeriod: number;
  regularStatus: 'Regular' | 'Irregular' | 'Condicional';
  reinscriptionDate: string;
  debtAmount: number;
  status: 'Habilitado' | 'Suspendido' | 'En revisión';
  avatarUrl?: string;
  academicHistory: AcademicPeriodRecord[];
}

export interface NightBlockDefinition {
  code: string;     // "N1" .. "N6"
  label: string;    // "N1 (18:00 - 18:40)"
  startTime: string;
  endTime: string;
  startMinutesFromMidnight: number; // 18*60 = 1080
  durationMinutes: number;
}

export interface ClassroomHourSession {
  blockCode: string; // "N1" .. "N6" or "M1" etc.
  status: ClassroomStatus;
  subjectName?: string;
  subjectCode?: string;
  group?: string;
  professor?: string;
  note?: string;
  isOpenService?: boolean;
}

export interface SensorTelemetry {
  sensorId: string;
  online: boolean;
  motionDetected: boolean;
  estimatedPeople: number;
  temperatureC: number;
  lastUpdated: string;
}

export interface Classroom {
  id: string;
  code: string;         // e.g. "715", "741", "801", "921"
  name: string;         // e.g. "715 Sala de Cómputo 1"
  building: string;     // e.g. "Edificio 700"
  buildingCode: '800' | '700' | '900';
  floor: number;        // 1 = Planta Baja (Piso 1), 2 = Piso 2, ..., 7 = Piso 7
  floorLabel: string;   // "Piso 1 (Planta Baja)", "Piso 2", etc.
  wing: 'Izquierda' | 'Derecha' | 'Centro';
  type: SpaceType;
  capacity: number;
  equipment: string[];
  accessNote: string;
  lastVerifiedBy: string;
  lastVerifiedAt: string;
  prefecturaObservation?: string;
  serviceScheduleLabel?: string;
  isMeetingPoint?: boolean;
  hourlySchedule: Record<string, ClassroomHourSession>; // keys: "N1".."N6"
  sensor: SensorTelemetry;
}

export type ElevatorStatus = 'Operativo' | 'Mantenimiento';

export interface ElevatorUnit {
  id: string; // e.g. "800-E1", "800-E2"
  label: string; // "E1", "E2"
  buildingCode: '800' | '700' | '900';
  status: ElevatorStatus;
  note?: string;
}

export interface BuildingMetadata {
  code: '800' | '700' | '900';
  name: string;
  shortTag: string;
  roleLabel: string;
  totalFloors: number;
  hasRooftop: boolean;
  elevatorsCount: number;
  elevatorStatus: string;
  hasRestroomsPerFloorNote: string;
  floorHighlights: { floorLabel: string; summary: string }[];
  description: string;
}

export interface TeacherRoomRequest {
  id: string;
  classroomId: string;
  classroomCode: string;
  building: string;
  floorLabel: string;
  blockCode: string;
  actionType: 'Reservar' | 'Liberar';
  professorName: string;
  reason: string;
  requestedAtTime: string; // e.g. "17:35 hrs"
  minutesBeforeClass: number;
  meetsTwentyMinRule: boolean;
  approvalStatus: 'Pendiente' | 'Aprobada' | 'Rechazada';
  reviewedBy?: string;
}

export interface PrefecturaLogEntry {
  id: string;
  timestamp: string;
  classroomCode: string;
  building: string;
  floorLabel: string;
  previousStatus: ClassroomStatus;
  newStatus: ClassroomStatus;
  verifiedBy: string;
  observation: string;
  blockChecked: string;
}

export interface ScheduleEntry {
  id: string;
  group: string;
  day: DayOfWeek;
  blockCode: string;
  classroomCode: string;
  subjectName: string;
  professor: string;
}

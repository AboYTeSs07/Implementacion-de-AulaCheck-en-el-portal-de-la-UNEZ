/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar, SidebarNavOption } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { StudentProfileBanner } from './components/StudentProfileBanner';
import { QuickAccessCards, ActiveModule } from './components/QuickAccessCards';
import { AulaCheckModule } from './components/AulaCheck/AulaCheckModule';
import { CourseDetailModal } from './components/Horarios/CourseDetailModal';
import { PrintScheduleModal } from './components/Horarios/PrintScheduleModal';
import {
  CalificacionesPanel,
  PagosPanel,
  ReinscripcionesPanel,
} from './components/InicioPanels';
import { NotificationsModal } from './components/Modals/NotificationsModal';
import { DatosAlumnoModal } from './components/Modals/DatosAlumnoModal';
import { NoticiasSection } from './components/NoticiasSection';

import {
  mockStudent,
  mockBuildings,
  mockSubjects,
  mockClassrooms,
  mockPrefecturaLogs,
  mockTeacherRequests,
  mockElevators,
  NIGHT_BLOCKS,
} from './data/mockData';
import { INITIAL_NIGHTLY_SCHEDULE_ENTRIES } from './data/nightlySchedules';
import {
  Subject,
  TimeSlot,
  Classroom,
  ClassroomStatus,
  ClassroomHourSession,
  PrefecturaLogEntry,
  TeacherRoomRequest,
  ElevatorUnit,
  DayOfWeek,
  ScheduleEntry,
  SensorTelemetry,
} from './types/portal';
import { downloadScheduleIcs } from './utils/icsExport';
import { GraduationCap } from 'lucide-react';

interface RoomSlotOverride {
  session: ClassroomHourSession;
  verifiedBy: string;
  verifiedAt: string;
  observation?: string;
}

export default function App() {
  const [student] = useState(mockStudent);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>(
    INITIAL_NIGHTLY_SCHEDULE_ENTRIES
  );
  const [roomOverrides, setRoomOverrides] = useState<
    Record<string, RoomSlotOverride>
  >({});
  const [sensorOverrides, setSensorOverrides] = useState<
    Record<string, Partial<SensorTelemetry>>
  >({});
  const [prefecturaLogs, setPrefecturaLogs] =
    useState<PrefecturaLogEntry[]>(mockPrefecturaLogs);
  const [teacherRequests, setTeacherRequests] =
    useState<TeacherRoomRequest[]>(mockTeacherRequests);
  const [elevators, setElevators] = useState<ElevatorUnit[]>(mockElevators);

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Lunes');
  const [selectedBlockCode, setSelectedBlockCode] = useState<string>('N1');
  const [simulatedClock, setSimulatedClock] = useState<string>('17:30');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Septiembre-Diciembre');

  // Compute live classrooms from PDF/Admin nightly schedules + day + overrides
  const classrooms: Classroom[] = useMemo(() => {
    const dayMatches = scheduleEntries.filter((e) => e.day === selectedDay);

    return mockClassrooms.map((baseRoom) => {
      const updatedSchedule: Record<string, ClassroomHourSession> = {
        ...baseRoom.hourlySchedule,
      };
      let lastVerifiedBy = baseRoom.lastVerifiedBy;
      let lastVerifiedAt = baseRoom.lastVerifiedAt;
      let prefecturaObservation = baseRoom.prefecturaObservation;

      for (const blk of NIGHT_BLOCKS) {
        const baseSlot = baseRoom.hourlySchedule[blk.code];
        if (baseSlot?.status === 'Administrativo') {
          continue;
        }

        const overrideKey = `${baseRoom.id}::${selectedDay}::${blk.code}`;
        const override = roomOverrides[overrideKey];

        if (override) {
          updatedSchedule[blk.code] = override.session;
          if (blk.code === selectedBlockCode) {
            lastVerifiedBy = override.verifiedBy;
            lastVerifiedAt = override.verifiedAt;
            prefecturaObservation = override.observation;
          }
        } else {
          const matchingClasses = dayMatches.filter(
            (e) =>
              e.classroomCode.trim() === baseRoom.code.trim() &&
              e.blockCode === blk.code
          );

          if (matchingClasses.length === 1) {
            const cls = matchingClasses[0];
            updatedSchedule[blk.code] = {
              blockCode: blk.code,
              status: 'Ocupado',
              subjectName: cls.subjectName,
              group: cls.group,
              professor: cls.professor,
            };
          } else if (matchingClasses.length > 1) {
            updatedSchedule[blk.code] = {
              blockCode: blk.code,
              status: 'Ocupado',
              subjectName: matchingClasses.map((m) => m.subjectName).join(' / '),
              group: matchingClasses.map((m) => m.group).join(' + '),
              professor: matchingClasses.map((m) => m.professor).join(' / '),
              note: 'Traslapo de horario detectado en este bloque.',
            };
          } else {
            updatedSchedule[blk.code] = {
              blockCode: blk.code,
              status: 'Libre',
            };
          }
        }
      }

      const activeStatus = updatedSchedule[selectedBlockCode]?.status || 'Libre';
      const defaultSensorPeople =
        activeStatus === 'Ocupado' ? 22 : activeStatus === 'Reservado' ? 12 : 0;
      const sensorPatch = sensorOverrides[baseRoom.id];

      const computedSensor: SensorTelemetry = sensorPatch
        ? { ...baseRoom.sensor, ...sensorPatch }
        : {
            ...baseRoom.sensor,
            motionDetected: defaultSensorPeople > 0,
            estimatedPeople: defaultSensorPeople,
            temperatureC: defaultSensorPeople > 10 ? 23 : 21,
          };

      return {
        ...baseRoom,
        lastVerifiedBy,
        lastVerifiedAt,
        prefecturaObservation,
        hourlySchedule: updatedSchedule,
        sensor: computedSensor,
      };
    });
  }, [scheduleEntries, selectedDay, selectedBlockCode, roomOverrides, sensorOverrides]);

  // Theme state: Blanco / Negro (Light / Dark)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portal_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('portal_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portal_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Sidebar navigation state
  const [activeSidebarNav, setActiveSidebarNav] = useState<SidebarNavOption>('inicio');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Active module defaults to 'aulacheck', can be collapsed to null or switched to any of the 4 cards
  const [activeModule, setActiveModule] = useState<ActiveModule | null>('aulacheck');

  // Modals (for secondary detail views)
  const [selectedCourse, setSelectedCourse] = useState<Subject | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>(undefined);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isDatosAlumnoOpen, setIsDatosAlumnoOpen] = useState<boolean>(false);

  const openModuleBelow = (module: ActiveModule) => {
    setActiveModule(module);
    setTimeout(() => {
      const el = document.getElementById('modulo-inicio-detalle');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleSelectSidebarNav = (nav: SidebarNavOption) => {
    setActiveSidebarNav(nav);
    if (nav === 'datos-alumno') {
      setIsDatosAlumnoOpen(true);
    } else if (nav === 'pagos') {
      openModuleBelow('pagos');
    } else if (nav === 'tickets') {
      alert('Módulo de Tickets de Soporte Escolar: En periodo ordinario.');
    } else if (nav === 'servicio-social') {
      alert('Servicio Social: 80% de créditos cubiertos. Cumples con el prerrequisito.');
    } else if (nav === 'desconexion') {
      if (confirm('¿Deseas cerrar tu sesión del portal institucional?')) {
        alert('Sesión finalizada de manera segura.');
      }
    }
  };

  const handleSelectModule = (module: ActiveModule) => {
    setActiveModule((prev) => {
      const next = prev === module ? null : module;
      if (next) {
        setTimeout(() => {
          const el = document.getElementById('modulo-inicio-detalle');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
      return next;
    });
  };

  const handleOpenCourseDetail = (subject: Subject, slot?: TimeSlot) => {
    setSelectedCourse(subject);
    setSelectedSlot(slot);
  };

  const handleSaveNotes = (subjectId: string, notes: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === subjectId ? { ...s, notes } : s))
    );
  };

  const handleDownloadIcs = () => {
    downloadScheduleIcs(subjects, student.name);
  };

  // Prefectura / Administrador physical round status update
  const handleUpdateClassroomStatus = (
    classroomId: string,
    blockCode: string,
    newStatus: ClassroomStatus,
    observation: string
  ) => {
    const targetRoom = classrooms.find((c) => c.id === classroomId);
    if (!targetRoom) return;

    const currentSlot = targetRoom.hourlySchedule[blockCode] || {
      blockCode,
      status: 'Libre' as ClassroomStatus,
    };
    const previousStatus = currentSlot.status;
    const overrideKey = `${classroomId}::${selectedDay}::${blockCode}`;

    setRoomOverrides((prev) => ({
      ...prev,
      [overrideKey]: {
        verifiedBy: 'Prefectura · Rondín Activo',
        verifiedAt: 'Justo ahora',
        observation,
        session: {
          ...currentSlot,
          status: newStatus,
          subjectName:
            newStatus === 'Libre'
              ? undefined
              : currentSlot.subjectName || 'Ocupación confirmada en sitio',
          note: observation,
        },
      },
    }));

    const newLog: PrefecturaLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: `Justo ahora (${selectedDay})`,
      classroomCode: targetRoom.code,
      building: targetRoom.building,
      floorLabel: targetRoom.floorLabel,
      previousStatus,
      newStatus,
      verifiedBy: 'Prefectura · Rondín Activo',
      observation: observation || 'Estado confirmado en recorrido físico.',
      blockChecked: blockCode,
    };

    setPrefecturaLogs((prev) => [newLog, ...prev]);
  };

  // Docente submits a reserve or release request (subject to 20-min rule + Prefectura approval)
  const handleSubmitTeacherRequest = (params: {
    classroom: Classroom;
    blockCode: string;
    actionType: 'Reservar' | 'Liberar';
    professorName: string;
    reason: string;
    minutesBeforeClass: number;
    meetsTwentyMinRule: boolean;
  }) => {
    const newReq: TeacherRoomRequest = {
      id: `req-${Date.now()}`,
      classroomId: params.classroom.id,
      classroomCode: params.classroom.code,
      building: params.classroom.building,
      floorLabel: params.classroom.floorLabel,
      blockCode: params.blockCode,
      actionType: params.actionType,
      professorName: params.professorName,
      reason: params.reason,
      requestedAtTime: `${simulatedClock} hrs`,
      minutesBeforeClass: params.minutesBeforeClass,
      meetsTwentyMinRule: params.meetsTwentyMinRule,
      approvalStatus: 'Pendiente',
    };

    setTeacherRequests((prev) => [newReq, ...prev]);
  };

  // Prefectura / Administrador approves or rejects a Docente request in real time
  const handleReviewTeacherRequest = (
    requestId: string,
    decision: 'Aprobada' | 'Rechazada'
  ) => {
    const targetReq = teacherRequests.find((r) => r.id === requestId);
    if (!targetReq || targetReq.approvalStatus !== 'Pendiente') return;

    setTeacherRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, approvalStatus: decision, reviewedBy: 'Prefectura UNEZ' }
          : req
      )
    );

    if (decision === 'Aprobada') {
      const targetStatus: ClassroomStatus =
        targetReq.actionType === 'Reservar' ? 'Reservado' : 'Libre';
      const targetRoom = classrooms.find((c) => c.id === targetReq.classroomId);
      const previousStatus =
        targetRoom?.hourlySchedule[targetReq.blockCode]?.status || 'Libre';
      const overrideKey = `${targetReq.classroomId}::${selectedDay}::${targetReq.blockCode}`;

      setRoomOverrides((prev) => ({
        ...prev,
        [overrideKey]: {
          verifiedBy: 'Prefectura · Solicitud Aprobada',
          verifiedAt: 'Justo ahora',
          observation: `${targetReq.actionType} autorizado a ${targetReq.professorName}`,
          session: {
            blockCode: targetReq.blockCode,
            status: targetStatus,
            subjectName:
              targetStatus === 'Reservado' ? targetReq.reason : undefined,
            professor:
              targetStatus === 'Reservado'
                ? targetReq.professorName
                : undefined,
            group:
              targetStatus === 'Reservado' ? 'Reserva Docente' : undefined,
            note: `Aprobado por Prefectura (${targetReq.minutesBeforeClass} min antes).`,
          },
        },
      }));

      const newLog: PrefecturaLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: `Justo ahora (${selectedDay})`,
        classroomCode: targetReq.classroomCode,
        building: targetReq.building,
        floorLabel: targetReq.floorLabel,
        previousStatus,
        newStatus: targetStatus,
        verifiedBy: 'Prefectura · Aprobación Docente',
        observation: `Aprobada solicitud de ${targetReq.actionType} (${targetReq.professorName}): ${targetReq.reason}`,
        blockChecked: targetReq.blockCode,
      };
      setPrefecturaLogs((prev) => [newLog, ...prev]);
    }
  };

  // Sensor simulation controls
  const handleSimulateSensorSweep = () => {
    const nextOverrides: Record<string, Partial<SensorTelemetry>> = {};
    for (const room of classrooms) {
      const st = room.hourlySchedule[selectedBlockCode]?.status || 'Libre';
      if (st === 'Administrativo') continue;
      const randomPeople =
        st === 'Ocupado'
          ? Math.random() > 0.18
            ? Math.floor(18 + Math.random() * 14)
            : 0
          : st === 'Reservado'
          ? Math.floor(8 + Math.random() * 10)
          : 0;
      nextOverrides[room.id] = {
        motionDetected: randomPeople > 0,
        estimatedPeople: randomPeople,
        temperatureC: randomPeople > 10 ? 23 : 21,
        lastUpdated: 'Justo ahora (Lectura simulada)',
      };
    }
    setSensorOverrides(nextOverrides);
  };

  const handleToggleRoomPresence = (classroomId: string) => {
    const room = classrooms.find((r) => r.id === classroomId);
    if (!room) return;
    const nextDetected = !room.sensor.motionDetected;
    setSensorOverrides((prev) => ({
      ...prev,
      [classroomId]: {
        motionDetected: nextDetected,
        estimatedPeople: nextDetected ? 22 : 0,
        temperatureC: nextDetected ? 23 : 21,
        lastUpdated: 'Justo ahora (Prueba manual)',
      },
    }));
  };

  // Admin: Add & Delete schedule entries
  const handleAddScheduleEntry = (entry: Omit<ScheduleEntry, 'id'>) => {
    const newEntry: ScheduleEntry = {
      ...entry,
      id: `sch-admin-${Date.now()}`,
    };
    setScheduleEntries((prev) => [...prev, newEntry]);

    const roomMeta = classrooms.find((r) => r.code === entry.classroomCode);
    const newLog: PrefecturaLogEntry = {
      id: `log-adm-add-${Date.now()}`,
      timestamp: `Justo ahora (${entry.day})`,
      classroomCode: entry.classroomCode,
      building: roomMeta?.building || 'Campus UNEZ',
      floorLabel: roomMeta?.floorLabel || 'Salón Académico',
      previousStatus: 'Libre',
      newStatus: 'Ocupado',
      verifiedBy: 'Administrador · Gestión de Horarios',
      observation: `Horario agregado: ${entry.subjectName} (${entry.group} · ${entry.professor})`,
      blockChecked: entry.blockCode,
    };
    setPrefecturaLogs((prev) => [newLog, ...prev]);
  };

  const handleDeleteScheduleEntry = (id: string) => {
    const target = scheduleEntries.find((e) => e.id === id);
    if (!target) return;
    setScheduleEntries((prev) => prev.filter((e) => e.id !== id));

    const roomMeta = classrooms.find((r) => r.code === target.classroomCode);
    const newLog: PrefecturaLogEntry = {
      id: `log-adm-del-${Date.now()}`,
      timestamp: `Justo ahora (${target.day})`,
      classroomCode: target.classroomCode,
      building: roomMeta?.building || 'Campus UNEZ',
      floorLabel: roomMeta?.floorLabel || 'Salón Académico',
      previousStatus: 'Ocupado',
      newStatus: 'Libre',
      verifiedBy: 'Administrador · Gestión de Horarios',
      observation: `Horario eliminado: ${target.subjectName} (${target.group})`,
      blockChecked: target.blockCode,
    };
    setPrefecturaLogs((prev) => [newLog, ...prev]);
  };

  const handleImportScheduleEntries = (
    entries: Omit<ScheduleEntry, 'id'>[],
    mode: 'append' | 'replace'
  ) => {
    const timestamp = Date.now();
    const mapped: ScheduleEntry[] = entries.map((e, idx) => ({
      ...e,
      id: `sch-xls-${timestamp}-${idx + 1}`,
    }));

    if (mode === 'replace') {
      setScheduleEntries(mapped);
    } else {
      setScheduleEntries((prev) => [...prev, ...mapped]);
    }

    const newLog: PrefecturaLogEntry = {
      id: `log-adm-imp-${timestamp}`,
      timestamp: 'Justo ahora',
      classroomCode: `${mapped.length} registros`,
      building: 'Control Escolar',
      floorLabel: 'Carga Masiva Excel',
      previousStatus: mode === 'replace' ? 'Ocupado' : 'Libre',
      newStatus: 'Ocupado',
      verifiedBy: 'Administrador · Control Escolar',
      observation:
        mode === 'replace'
          ? `Base de horarios reemplazada desde Excel (${mapped.length} bloques).`
          : `Agregados ${mapped.length} bloques desde archivo Excel sin traslapos.`,
      blockChecked: selectedBlockCode,
    };
    setPrefecturaLogs((prev) => [newLog, ...prev]);
  };

  // Prefectura toggles elevator status (Operativo <-> Mantenimiento)
  const handleToggleElevatorStatus = (elevatorId: string) => {
    const target = elevators.find((e) => e.id === elevatorId);
    if (!target) return;

    const nextStatus =
      target.status === 'Operativo' ? 'Mantenimiento' : 'Operativo';

    setElevators((prev) =>
      prev.map((elv) =>
        elv.id === elevatorId
          ? {
              ...elv,
              status: nextStatus,
              note:
                nextStatus === 'Mantenimiento'
                  ? 'Reportado en mantenimiento por Prefectura'
                  : 'Rehabilitado y operando con normalidad',
            }
          : elv
      )
    );

    const newLog: PrefecturaLogEntry = {
      id: `log-elv-${Date.now()}`,
      timestamp: 'Justo ahora',
      classroomCode: `${target.buildingCode}-${target.label}`,
      building: `Edificio ${target.buildingCode}`,
      floorLabel: 'Núcleo de Elevadores',
      previousStatus:
        target.status === 'Operativo' ? 'Libre' : 'Mantenimiento',
      newStatus: nextStatus === 'Operativo' ? 'Libre' : 'Mantenimiento',
      verifiedBy: 'Prefectura · Control de Elevadores',
      observation:
        nextStatus === 'Mantenimiento'
          ? `Elevador ${target.label} del Edificio ${target.buildingCode} puesto en Mantenimiento.`
          : `Elevador ${target.label} del Edificio ${target.buildingCode} reactivado a Operativo.`,
      blockChecked: selectedBlockCode,
    };
    setPrefecturaLogs((prev) => [newLog, ...prev]);
  };

  const academicRooms = classrooms.filter(
    (r) => r.hourlySchedule[selectedBlockCode]?.status !== 'Administrativo'
  );
  const freeRoomsCount = academicRooms.filter(
    (r) => r.hourlySchedule[selectedBlockCode]?.status === 'Libre'
  ).length;

  return (
    <div className="min-h-screen bg-[#c8102e] flex transition-colors">
      
      {/* 1. Official Red Sidebar with University Crest */}
      <Sidebar
        activeNav={activeSidebarNav}
        onSelectNav={handleSelectSidebarNav}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Workspace Canvas */}
      <div className="flex-1 min-w-0 bg-[#f4f6fa] dark:bg-[#0b0f19] md:rounded-l-3xl shadow-2xl flex flex-col overflow-hidden transition-colors">
        
        {/* Top Navbar */}
        <Navbar
          student={student}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 overflow-y-auto">
          
          {/* Official Student Profile Banner */}
          <section aria-label="Ficha del Alumno">
            <StudentProfileBanner
              student={student}
              onOpenReinscription={() => openModuleBelow('reinscripciones')}
              onOpenGrades={() => openModuleBelow('calificaciones')}
              onChangePhoto={() => setIsDatosAlumnoOpen(true)}
            />
          </section>

          {/* The 4 Reference Cards */}
          <section aria-label="Módulos de Inicio">
            <QuickAccessCards
              student={student}
              activeModule={activeModule}
              onSelectModule={handleSelectModule}
              freeRoomsCount={freeRoomsCount}
              totalRoomsCount={academicRooms.length}
            />
          </section>

          {/* Expanded Module Section Below Inicio Cards */}
          {activeModule && (
            <section
              id="modulo-inicio-detalle"
              className="space-y-4"
              aria-label="Detalle del Módulo Seleccionado"
            >
              {activeModule === 'calificaciones' && (
                <CalificacionesPanel
                  student={student}
                  onCollapse={() => setActiveModule(null)}
                />
              )}

              {activeModule === 'pagos' && (
                <PagosPanel
                  student={student}
                  onCollapse={() => setActiveModule(null)}
                />
              )}

              {activeModule === 'reinscripciones' && (
                <ReinscripcionesPanel
                  student={student}
                  onCollapse={() => setActiveModule(null)}
                  onGoToSchedule={() => openModuleBelow('aulacheck')}
                />
              )}

              {activeModule === 'aulacheck' && (
                <AulaCheckModule
                  student={student}
                  buildings={mockBuildings}
                  classrooms={classrooms}
                  elevators={elevators}
                  prefecturaLogs={prefecturaLogs}
                  teacherRequests={teacherRequests}
                  subjects={subjects}
                  scheduleEntries={scheduleEntries}
                  selectedDay={selectedDay}
                  onDayChange={setSelectedDay}
                  selectedBlockCode={selectedBlockCode}
                  onBlockCodeChange={setSelectedBlockCode}
                  simulatedClock={simulatedClock}
                  onSimulatedClockChange={setSimulatedClock}
                  onUpdateClassroomStatus={handleUpdateClassroomStatus}
                  onToggleElevatorStatus={handleToggleElevatorStatus}
                  onSubmitTeacherRequest={handleSubmitTeacherRequest}
                  onReviewTeacherRequest={handleReviewTeacherRequest}
                  onSimulateSensorSweep={handleSimulateSensorSweep}
                  onToggleRoomPresence={handleToggleRoomPresence}
                  onAddScheduleEntry={handleAddScheduleEntry}
                  onDeleteScheduleEntry={handleDeleteScheduleEntry}
                  onImportScheduleEntries={handleImportScheduleEntries}
                  onSelectCourse={handleOpenCourseDetail}
                  onOpenPrintModal={() => setIsPrintModalOpen(true)}
                  onDownloadIcs={handleDownloadIcs}
                />
              )}
            </section>
          )}

          {/* Noticias Section */}
          <section aria-label="Noticias y Comunicados">
            <NoticiasSection />
          </section>

        </main>

        {/* Institutional Footer */}
        <footer className="bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 py-4 px-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#c8102e]" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Universidad Emiliano Zapata · {student.address} · Módulo AulaCheck
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500 text-[11px]">
              <span className="hover:text-red-700 dark:hover:text-amber-400 cursor-pointer transition-colors">Reglamento Escolar</span>
              <span>·</span>
              <span className="hover:text-red-700 dark:hover:text-amber-400 cursor-pointer transition-colors">Calendario Escolar</span>
              <span>·</span>
              <span className="hover:text-red-700 dark:hover:text-amber-400 cursor-pointer transition-colors">Mesa de Ayuda</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Modals */}
      {selectedCourse && (
        <CourseDetailModal
          subject={selectedCourse}
          selectedSlot={selectedSlot}
          onClose={() => {
            setSelectedCourse(null);
            setSelectedSlot(undefined);
          }}
          onSaveNotes={handleSaveNotes}
        />
      )}

      {isPrintModalOpen && (
        <PrintScheduleModal
          student={student}
          subjects={subjects}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}

      {isDatosAlumnoOpen && (
        <DatosAlumnoModal
          student={student}
          onClose={() => setIsDatosAlumnoOpen(false)}
        />
      )}

    </div>
  );
}

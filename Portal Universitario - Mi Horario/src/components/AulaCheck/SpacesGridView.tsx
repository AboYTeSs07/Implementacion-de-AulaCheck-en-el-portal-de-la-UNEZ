import React from 'react';
import {
  Classroom,
  AulaCheckRole,
  ClassroomStatus,
  NightBlockDefinition,
} from '../../types/portal';
import { NIGHT_BLOCKS } from '../../data/mockData';
import {
  CheckCircle2,
  XCircle,
  Wrench,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Footprints,
  CalendarPlus,
  RefreshCw,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';

interface SpacesGridViewProps {
  classrooms: Classroom[];
  selectedBlock: NightBlockDefinition;
  role: AulaCheckRole;
  onSelectClassroom: (classroom: Classroom) => void;
  onQuickStatusChange: (classroomId: string, newStatus: ClassroomStatus) => void;
  onQuickRequestReserve: (classroom: Classroom) => void;
}

export const SpacesGridView: React.FC<SpacesGridViewProps> = ({
  classrooms,
  selectedBlock,
  role,
  onSelectClassroom,
  onQuickStatusChange,
  onQuickRequestReserve,
}) => {
  if (classrooms.length === 0) {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-10 text-center space-y-2">
        <MapPin className="w-9 h-9 text-slate-400 mx-auto" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          No se encontraron espacios con los filtros seleccionados
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Prueba limpiando el buscador o ampliando el filtro de edificio, piso o estado de disponibilidad.
        </p>
      </div>
    );
  }

  // Group classrooms by floor ascending (Piso 1 Planta Baja -> Piso 7)
  const groupedByFloor = classrooms.reduce<Record<number, Classroom[]>>((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {});

  const sortedFloors = Object.keys(groupedByFloor)
    .map(Number)
    .sort((a, b) => a - b);

  const getFloorTitle = (floor: number) => {
    if (floor === 1) return 'Piso 1 (Planta Baja)';
    return `Piso ${floor}`;
  };

  const getNextOccupiedInfo = (room: Classroom, currentBlockCode: string) => {
    const startIdx = NIGHT_BLOCKS.findIndex((b) => b.code === currentBlockCode);
    for (let i = startIdx + 1; i < NIGHT_BLOCKS.length; i++) {
      const blk = NIGHT_BLOCKS[i];
      const slot = room.hourlySchedule[blk.code];
      if (slot && slot.status !== 'Libre') {
        return `Libre hasta ${blk.startTime} hrs (${blk.code})`;
      }
    }
    return 'Libre hasta fin de turno (21:50 hrs)';
  };

  const renderStatusBadge = (status: ClassroomStatus) => {
    switch (status) {
      case 'Libre':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-sm border border-emerald-300 dark:border-emerald-800 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Libre</span>
          </span>
        );
      case 'Ocupado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-950/70 px-2 py-0.5 rounded-sm border border-red-300 dark:border-red-800 whitespace-nowrap">
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Ocupado</span>
          </span>
        );
      case 'Reservado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>Reservado</span>
          </span>
        );
      case 'Mantenimiento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-300 dark:border-slate-700 whitespace-nowrap">
            <Wrench className="w-3.5 h-3.5 shrink-0" />
            <span>Mantenimiento</span>
          </span>
        );
      case 'Administrativo':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-300 dark:border-slate-700 whitespace-nowrap">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span>Área / Oficina</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {sortedFloors.map((floor) => {
        const rooms = groupedByFloor[floor];
        const freeInFloor = rooms.filter(
          (r) => r.hourlySchedule[selectedBlock.code]?.status === 'Libre'
        ).length;
        const isLowerFloor = floor <= 2;

        return (
          <div key={floor} className="space-y-3">
            {/* Floor Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-800 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                  {floor === 1 ? 'P1' : `P${floor}`}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                    <span>{getFloorTitle(floor)}</span>
                    {isLowerFloor && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        <Footprints className="w-3.5 h-3.5" />
                        <span>Acceso rápido sin elevador</span>
                      </span>
                    )}
                  </h3>
                </div>
              </div>

              <div className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400">
                <strong
                  className={
                    freeInFloor > 0
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-red-700 dark:text-red-400'
                  }
                >
                  {freeInFloor}
                </strong>{' '}
                libres en bloque {selectedBlock.code} ({selectedBlock.startTime})
              </div>
            </div>

            {/* Classrooms Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {rooms.map((room) => {
                const session = room.hourlySchedule[selectedBlock.code] || {
                  blockCode: selectedBlock.code,
                  status: 'Libre' as ClassroomStatus,
                };
                const isAdminSpace = session.status === 'Administrativo';

                return (
                  <div
                    key={room.id}
                    onClick={() => onSelectClassroom(room)}
                    className={`bg-white dark:bg-[#111827] rounded-xl border transition-all cursor-pointer p-4 flex flex-col justify-between gap-3 hover:shadow-md ${
                      session.status === 'Libre'
                        ? 'border-emerald-300/90 dark:border-emerald-800/70 hover:border-emerald-500'
                        : session.status === 'Ocupado'
                        ? 'border-slate-200 dark:border-slate-800 hover:border-red-400'
                        : session.status === 'Administrativo'
                        ? 'border-slate-200 dark:border-slate-800 opacity-90'
                        : 'border-amber-300/80 dark:border-amber-800/70 hover:border-amber-500'
                    }`}
                  >
                    {/* Card Top: Code, Building, Status */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white">
                              {room.code}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              · {room.type}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                            <span>{room.building}</span>
                            {room.buildingCode === '900' && room.floor >= 3 && (
                              <span
                                className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-700 dark:text-red-400"
                                title="Edificio 900 sin elevador"
                              >
                                <AlertTriangle className="w-3 h-3" />
                                Sin elevador
                              </span>
                            )}
                          </p>
                        </div>

                        {renderStatusBadge(session.status)}
                      </div>

                      {/* Activity Box */}
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 text-xs space-y-1">
                        {session.status === 'Ocupado' ? (
                          <>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                {session.subjectName}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-red-700 dark:text-amber-400 shrink-0">
                                {session.group}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {session.subjectCode} · {session.professor}
                            </p>
                          </>
                        ) : session.status === 'Reservado' ? (
                          <>
                            <span className="font-bold text-amber-900 dark:text-amber-300 block line-clamp-1">
                              {session.subjectName || 'Reservación temporal docente'}
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {session.professor} · Grupo {session.group || 'Asesoría'}
                            </p>
                          </>
                        ) : session.status === 'Mantenimiento' ? (
                          <>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block">
                              Espacio en revisión técnica
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {session.note || 'Mantenimiento preventivo'}
                            </p>
                          </>
                        ) : session.status === 'Administrativo' ? (
                          <>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                                {room.name}
                              </span>
                              {room.isMeetingPoint && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-amber-600 text-white">
                                  Punto de reunión
                                </span>
                              )}
                            </div>
                            {room.serviceScheduleLabel ? (
                              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5 flex-wrap">
                                <span
                                  className={`font-bold px-1.5 py-0.5 rounded-sm text-[10px] ${
                                    session.isOpenService
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-500 text-white'
                                  }`}
                                >
                                  {session.isOpenService ? 'Abierto' : 'Cerrado'}
                                </span>
                                <span>{room.serviceScheduleLabel}</span>
                              </p>
                            ) : (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {room.accessNote}
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                              Disponible para clases, asesorías o estudio
                            </span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {getNextOccupiedInfo(room, selectedBlock.code)}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Equipment & Capacity */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                        <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {room.capacity > 0 ? `Cap. ${room.capacity} lugares` : 'Área común'}
                          </span>
                        </span>
                        <span className="truncate max-w-[180px]" title={room.equipment.join(', ')}>
                          {room.equipment.slice(0, 2).join(' · ')}
                        </span>
                      </div>
                    </div>

                    {/* Footer: Prefectura Verification + Role-specific Quick Actions */}
                    <div
                      className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-[11px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                        <span className="truncate">
                          {room.lastVerifiedBy} ({room.lastVerifiedAt})
                        </span>
                      </div>

                      {!isAdminSpace && (role === 'prefectura' || role === 'administrador') ? (
                        <button
                          type="button"
                          onClick={() =>
                            onQuickStatusChange(
                              room.id,
                              session.status === 'Libre' ? 'Ocupado' : 'Libre'
                            )
                          }
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-red-700 hover:bg-red-800 text-amber-300 transition-colors shrink-0 whitespace-nowrap"
                          title="Actualizar estado durante rondín físico"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>
                            {session.status === 'Libre' ? 'Marcar Ocupado' : 'Confirmar Libre'}
                          </span>
                        </button>
                      ) : !isAdminSpace && role === 'docente' ? (
                        <button
                          type="button"
                          onClick={() => onQuickRequestReserve(room)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-amber-600 hover:bg-amber-700 text-white transition-colors shrink-0 whitespace-nowrap"
                        >
                          <CalendarPlus className="w-3 h-3" />
                          <span>
                            {session.status === 'Libre' ? 'Solicitar Reserva' : 'Solicitar Liberar'}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSelectClassroom(room)}
                          className="text-[11px] font-bold text-red-700 dark:text-amber-400 hover:underline shrink-0 whitespace-nowrap"
                        >
                          Ver bloques N1–N6
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

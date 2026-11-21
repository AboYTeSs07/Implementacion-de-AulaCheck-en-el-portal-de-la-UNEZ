import React from 'react';
import {
  Classroom,
  AulaCheckRole,
  NightBlockDefinition,
} from '../../types/portal';
import { NIGHT_BLOCKS } from '../../data/mockData';
import {
  CheckCircle2,
  Footprints,
  Building2,
  Clock,
  Users,
  ArrowUpRight,
  CalendarPlus,
  AlertTriangle,
} from 'lucide-react';

interface FreeRoomsFinderProps {
  classrooms: Classroom[];
  selectedBlock: NightBlockDefinition;
  role: AulaCheckRole;
  onSelectClassroom: (classroom: Classroom) => void;
  onQuickRequestReserve: (classroom: Classroom) => void;
}

export const FreeRoomsFinder: React.FC<FreeRoomsFinderProps> = ({
  classrooms,
  selectedBlock,
  role,
  onSelectClassroom,
  onQuickRequestReserve,
}) => {
  // Filter only classrooms (not Administrativo) that are Libre in selectedBlock.
  // Prioritize lower floors AND buildings with elevators (700/800) before Edificio 900 high floors!
  const freeRooms = classrooms
    .filter((room) => room.hourlySchedule[selectedBlock.code]?.status === 'Libre')
    .sort((a, b) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
      // Prefer buildings with elevators on equal floor > 2
      const aNoElevPenalty = a.buildingCode === '900' && a.floor >= 3 ? 1 : 0;
      const bNoElevPenalty = b.buildingCode === '900' && b.floor >= 3 ? 1 : 0;
      if (aNoElevPenalty !== bNoElevPenalty) return aNoElevPenalty - bNoElevPenalty;
      return a.code.localeCompare(b.code);
    });

  const getFreeBlocksDuration = (room: Classroom, startBlockCode: string) => {
    const startIdx = NIGHT_BLOCKS.findIndex((b) => b.code === startBlockCode);
    let consecutiveBlocks = 0;
    let totalMinutes = 0;
    let lastEndTime = selectedBlock.endTime;

    for (let i = startIdx; i < NIGHT_BLOCKS.length; i++) {
      const blk = NIGHT_BLOCKS[i];
      if (room.hourlySchedule[blk.code]?.status === 'Libre') {
        consecutiveBlocks++;
        totalMinutes += blk.durationMinutes;
        lastEndTime = blk.endTime;
      } else {
        break;
      }
    }

    return {
      consecutiveBlocks,
      totalMinutes,
      untilLabel:
        startIdx + consecutiveBlocks >= NIGHT_BLOCKS.length
          ? 'hasta cierre (21:50 hrs)'
          : `hasta las ${lastEndTime} hrs`,
    };
  };

  const lowerFloorCount = freeRooms.filter((r) => r.floor <= 2).length;

  return (
    <div className="space-y-4">
      {/* Anti-Fatigue / Elevator Bypass Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-900 to-black dark:from-red-950 dark:via-[#1a0a0d] dark:to-black text-white rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 border border-red-700/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Footprints className="w-4 h-4" />
            <span>Prioridad de Pisos Bajos · Evitar Subir Sin Elevador</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            {freeRooms.length > 0
              ? `${freeRooms.length} aulas libres en ${selectedBlock.label} (${lowerFloorCount} en pisos P1–P2)`
              : `No hay aulas libres registradas en el bloque ${selectedBlock.label}`}
          </h3>
          <p className="text-xs text-slate-200 max-w-2xl">
            Ordenadas automáticamente desde <strong>Piso 1 (Planta Baja)</strong> hacia pisos superiores, dando prioridad a los edificios <strong>700 y 800</strong> sobre pisos altos del <strong>Edificio 900 (sin elevador)</strong>.
          </p>
        </div>

        {freeRooms.length > 0 && (
          <div className="p-3 bg-black/40 rounded-lg border border-amber-400/30 text-right shrink-0">
            <span className="text-[11px] text-amber-300 block font-medium">
              Opción con menor esfuerzo
            </span>
            <span className="text-sm font-bold font-mono text-white block mt-0.5">
              {freeRooms[0].code} · Edif. {freeRooms[0].buildingCode} · {freeRooms[0].floorLabel}
            </span>
          </div>
        )}
      </div>

      {/* Sorted List of Free Rooms */}
      {freeRooms.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-10 text-center space-y-2">
          <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Ocupación completa en el bloque {selectedBlock.label}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Selecciona otro bloque horario (N1–N6) en la parte superior para consultar disponibilidad.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {freeRooms.map((room, idx) => {
            const { consecutiveBlocks, totalMinutes, untilLabel } =
              getFreeBlocksDuration(room, selectedBlock.code);
            const isEasyAccess = room.floor <= 2;
            const isNoElevatorHigh = room.buildingCode === '900' && room.floor >= 3;

            return (
              <div
                key={room.id}
                onClick={() => onSelectClassroom(room)}
                className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-md transition-all p-4 sm:p-5 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left: Floor Priority & Room Identity */}
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 py-2 px-2 rounded-xl border text-center shrink-0 ${
                      isEasyAccess
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                        : isNoElevatorHigh
                        ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-300'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase block">Piso</span>
                    <span className="text-lg font-extrabold font-mono block leading-tight">
                      {room.floor === 1 ? 'P1' : `P${room.floor}`}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white">
                        {room.code}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-sm border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Libre</span>
                      </span>
                      {isNoElevatorHigh && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 dark:text-red-400">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Edificio 900 sin elevador</span>
                        </span>
                      )}
                      {idx === 0 && (
                        <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                          · Más accesible ahora
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {room.name} — {room.building}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {room.accessNote}
                    </p>
                  </div>
                </div>

                {/* Middle: Time Window & Specs */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block font-mono tabular-nums">
                        {consecutiveBlocks}{' '}
                        {consecutiveBlocks === 1 ? 'bloque' : 'bloques'} ({totalMinutes} min)
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        Disponible {untilLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block font-mono tabular-nums">
                        {room.capacity} lugares
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {room.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div
                  className="flex items-center gap-2 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {role === 'docente' && (
                    <button
                      type="button"
                      onClick={() => onQuickRequestReserve(room)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      <span>Solicitar Reserva</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectClassroom(room)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Ver Horario N1–N6</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

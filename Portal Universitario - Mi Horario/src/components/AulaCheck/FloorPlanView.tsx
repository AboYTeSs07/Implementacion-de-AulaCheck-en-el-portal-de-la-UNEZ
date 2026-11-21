import React, { useState, useEffect } from 'react';
import {
  Classroom,
  ClassroomStatus,
  BuildingMetadata,
  NightBlockDefinition,
  ElevatorUnit,
  AulaCheckRole,
} from '../../types/portal';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Wrench,
  Briefcase,
  ArrowUpDown,
  AlertTriangle,
  Footprints,
  Users,
  Radio,
  MapPin,
  Layers,
  Power,
  DoorOpen,
  Flag,
} from 'lucide-react';

interface FloorPlanViewProps {
  buildings: BuildingMetadata[];
  classrooms: Classroom[];
  elevators: ElevatorUnit[];
  role: AulaCheckRole;
  selectedBlock: NightBlockDefinition;
  onSelectClassroom: (classroom: Classroom) => void;
  onToggleElevatorStatus: (elevatorId: string) => void;
}

type BlueprintCell =
  | { kind: 'room'; code: string; shortTitle?: string }
  | { kind: 'utility'; label: string; icon: 'restroom' | 'stairs' };

interface FloorBlueprintLayout {
  topRow: BlueprintCell[];
  corridorSegments: {
    label: string;
    type: 'hallway' | 'elevators' | 'plaza' | 'note';
    roomCode?: string;
  }[];
}

function getFloorBlueprint(
  buildingCode: '800' | '700' | '900',
  floor: number
): FloorBlueprintLayout {
  if (buildingCode === '800') {
    switch (floor) {
      case 1:
        return {
          topRow: [
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '804' },
            { kind: 'room', code: '803' },
            { kind: 'room', code: '802' },
            { kind: 'room', code: '801' },
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '800-DIR', shortTitle: 'Dirección' },
            { kind: 'room', code: '805' },
            { kind: 'room', code: '806' },
          ],
          corridorSegments: [
            { label: 'Entrada del Pasillo →', type: 'hallway' },
            { label: 'E1 – E2', type: 'elevators' },
            {
              label: 'Plazoleta 800–700 · Punto de reunión',
              type: 'plaza',
              roomCode: '800-PLZ',
            },
          ],
        };
      case 2:
        return {
          topRow: [
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '814' },
            { kind: 'room', code: '813' },
            { kind: 'room', code: '812' },
            { kind: 'room', code: '811' },
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '800-PREF', shortTitle: 'Prefectura' },
            { kind: 'room', code: '800-OFI', shortTitle: 'Oficina' },
          ],
          corridorSegments: [
            { label: '← Pasillo Piso 2', type: 'hallway' },
            { label: 'E1 – E2', type: 'elevators' },
          ],
        };
      case 3:
        return {
          topRow: [
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '824' },
            { kind: 'room', code: '823' },
            { kind: 'room', code: '822' },
            { kind: 'room', code: '821' },
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '800-GYM', shortTitle: 'Gym y Medicina' },
          ],
          corridorSegments: [
            { label: '← Pasillo Piso 3', type: 'hallway' },
            { label: 'E1 – E2', type: 'elevators' },
          ],
        };
      case 4:
        return {
          topRow: [
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '834' },
            { kind: 'room', code: '833' },
            { kind: 'room', code: '832' },
            { kind: 'room', code: '831', shortTitle: '831 Dibujo' },
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '800-AUD', shortTitle: 'Auditorio - Bodega' },
          ],
          corridorSegments: [
            { label: '← Pasillo Piso 4', type: 'hallway' },
            { label: 'E1 – E2', type: 'elevators' },
          ],
        };
      case 5:
        return {
          topRow: [
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '844' },
            { kind: 'room', code: '843' },
            { kind: 'room', code: '842' },
            { kind: 'room', code: '841' },
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
          ],
          corridorSegments: [
            { label: '← Pasillo Piso 5', type: 'hallway' },
            { label: 'E1 – E2', type: 'elevators' },
          ],
        };
      case 6:
      default:
        return {
          topRow: [
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '853' },
            { kind: 'room', code: '852' },
            { kind: 'room', code: '851' },
            { kind: 'room', code: '800-AZO', shortTitle: 'AZOTEA' },
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
          ],
          corridorSegments: [
            { label: 'Pasillo Piso 6 (LRI) / Azotea', type: 'hallway' },
            { label: 'E1 – E2', type: 'elevators' },
          ],
        };
    }
  }

  if (buildingCode === '700') {
    switch (floor) {
      case 1:
        return {
          topRow: [
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '704', shortTitle: '704 Audiovisual' },
            { kind: 'room', code: '700-PSI', shortTitle: 'Psicología' },
            { kind: 'room', code: '700-ENF', shortTitle: 'Enfermería' },
            { kind: 'room', code: '700-TES', shortTitle: 'Tesorería' },
            { kind: 'room', code: '700-OFI', shortTitle: 'Oficinas' },
          ],
          corridorSegments: [
            { label: 'E1', type: 'elevators' },
            { label: '← Pasillo Entrada', type: 'hallway' },
          ],
        };
      case 2:
        return {
          topRow: [
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '700-BOD2', shortTitle: 'Bodega' },
            { kind: 'room', code: '700-MANTE', shortTitle: 'Sistemas y Mantenimiento (Mante)' },
            { kind: 'room', code: '716', shortTitle: '716 Cómputo 2' },
            { kind: 'room', code: '715', shortTitle: '715 Cómputo 1' },
            { kind: 'room', code: '714', shortTitle: '714 Cómputo' },
            { kind: 'room', code: '713' },
            { kind: 'room', code: '712' },
            { kind: 'room', code: '711', shortTitle: '711 Mecatrónica' },
          ],
          corridorSegments: [
            { label: 'E1', type: 'elevators' },
            { label: 'Pasillo Piso 2 →', type: 'hallway' },
          ],
        };
      case 3:
        return {
          topRow: [
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'utility', label: 'Baños', icon: 'restroom' },
            { kind: 'room', code: '726' },
            { kind: 'room', code: '725' },
            { kind: 'room', code: '724' },
            { kind: 'room', code: '723' },
            { kind: 'room', code: '722' },
            { kind: 'room', code: '721' },
          ],
          corridorSegments: [
            { label: 'E1', type: 'elevators' },
            { label: 'Pasillo Piso 3 →', type: 'hallway' },
          ],
        };
      case 4:
        return {
          topRow: [
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '737' },
            { kind: 'room', code: '736' },
            { kind: 'room', code: '735' },
            { kind: 'room', code: '734' },
            { kind: 'room', code: '733' },
            { kind: 'room', code: '732' },
            { kind: 'room', code: '731', shortTitle: 'Coordinación' },
          ],
          corridorSegments: [
            { label: 'E1', type: 'elevators' },
            { label: 'Pasillo Piso 4 →', type: 'hallway' },
          ],
        };
      case 5:
        return {
          topRow: [
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '700-BOD5', shortTitle: 'Bodega' },
            { kind: 'room', code: '746' },
            { kind: 'room', code: '745' },
            { kind: 'room', code: '744' },
            { kind: 'room', code: '743' },
            { kind: 'room', code: '742' },
            { kind: 'room', code: '741', shortTitle: '741 · Base ISC 7-N' },
          ],
          corridorSegments: [
            { label: 'E1', type: 'elevators' },
            { label: 'Pasillo Piso 5 →', type: 'hallway' },
          ],
        };
      case 6:
      default:
        return {
          topRow: [
            { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
            { kind: 'room', code: '700-AZO', shortTitle: 'AZOTEA Edif. 700' },
          ],
          corridorSegments: [
            {
              label: 'Sin elevador directo a Azotea · Subir por escaleras desde Piso 5',
              type: 'note',
            },
          ],
        };
    }
  }

  // Edificio 900 (Sin elevador)
  switch (floor) {
    case 1:
      return {
        topRow: [
          { kind: 'utility', label: 'Baños', icon: 'restroom' },
          { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
          { kind: 'room', code: '900-CAF', shortTitle: 'Cafetería' },
        ],
        corridorSegments: [
          { label: '← Pasillo PB', type: 'hallway' },
          { label: '← Pasillo de los 700', type: 'plaza' },
        ],
      };
    case 2:
      return {
        topRow: [
          { kind: 'utility', label: 'Baños', icon: 'restroom' },
          { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
          { kind: 'room', code: '900-BIB', shortTitle: 'Biblioteca' },
        ],
        corridorSegments: [
          { label: 'Pasillo Piso 2 · Acceso por escaleras', type: 'hallway' },
        ],
      };
    default: {
      const prefix = 90 + (floor - 1);
      return {
        topRow: [
          { kind: 'utility', label: 'Baños', icon: 'restroom' },
          { kind: 'utility', label: 'Escaleras', icon: 'stairs' },
          { kind: 'room', code: `${prefix}6` },
          { kind: 'room', code: `${prefix}5` },
          { kind: 'room', code: `${prefix}4` },
          { kind: 'room', code: `${prefix}3` },
          { kind: 'room', code: `${prefix}2` },
          { kind: 'room', code: `${prefix}1` },
        ],
        corridorSegments: [
          { label: `Pasillo Piso ${floor} →`, type: 'hallway' },
          { label: 'Sin elevador (solo escaleras)', type: 'note' },
        ],
      };
    }
  }
}

export const FloorPlanView: React.FC<FloorPlanViewProps> = ({
  buildings,
  classrooms,
  elevators,
  role,
  selectedBlock,
  onSelectClassroom,
  onToggleElevatorStatus,
}) => {
  const [selectedBuildingCode, setSelectedBuildingCode] = useState<'800' | '700' | '900'>('700');
  const [selectedFloor, setSelectedFloor] = useState<number>(2);

  const activeBuilding =
    buildings.find((b) => b.code === selectedBuildingCode) || buildings[0];

  const buildingRooms = classrooms.filter(
    (r) => r.buildingCode === selectedBuildingCode
  );
  const availableFloors = Array.from(
    new Set(buildingRooms.map((r) => r.floor))
  ).sort((a, b) => b - a);

  useEffect(() => {
    if (!availableFloors.includes(selectedFloor)) {
      setSelectedFloor(availableFloors[availableFloors.length - 1] || 1);
    }
  }, [selectedBuildingCode, availableFloors, selectedFloor]);

  const activeElevators = elevators.filter(
    (e) => e.buildingCode === selectedBuildingCode
  );
  const activeMaintenanceElevators = activeElevators.filter(
    (e) => e.status === 'Mantenimiento'
  );

  const blueprint = getFloorBlueprint(selectedBuildingCode, selectedFloor);

  const getFloorTitle = (bCode: '800' | '700' | '900', floorNum: number) => {
    if (floorNum === 1) return 'PB (Piso 1)';
    if (bCode === '800' && floorNum === 6) {
      return 'Piso 6 (851–853 / Azotea)';
    }
    if (bCode === '700' && floorNum === 6) {
      return 'Azotea (Piso 6)';
    }
    return `Piso ${floorNum}`;
  };

  const getStatusCardStyle = (status: ClassroomStatus, isMeetingPoint?: boolean) => {
    if (isMeetingPoint) {
      return 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700 hover:border-amber-600 text-amber-950 dark:text-amber-100';
    }
    switch (status) {
      case 'Libre':
        return 'bg-emerald-50/95 dark:bg-emerald-950/55 border-emerald-400 dark:border-emerald-700 hover:border-emerald-600 text-emerald-950 dark:text-emerald-100';
      case 'Ocupado':
        return 'bg-red-50/95 dark:bg-red-950/55 border-red-300 dark:border-red-800 hover:border-red-500 text-red-950 dark:text-red-100';
      case 'Reservado':
        return 'bg-amber-50/95 dark:bg-amber-950/55 border-amber-400 dark:border-amber-700 hover:border-amber-600 text-amber-950 dark:text-amber-100';
      case 'Mantenimiento':
        return 'bg-slate-200/90 dark:bg-slate-800 border-slate-400 dark:border-slate-600 hover:border-slate-500 text-slate-900 dark:text-slate-100';
      case 'Administrativo':
        return 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:border-slate-500 text-slate-800 dark:text-slate-200';
    }
  };

  const renderStatusIcon = (status: ClassroomStatus, isMeetingPoint?: boolean) => {
    if (isMeetingPoint) {
      return <Flag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />;
    }
    switch (status) {
      case 'Libre':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      case 'Ocupado':
        return <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />;
      case 'Reservado':
        return <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />;
      case 'Mantenimiento':
        return <Wrench className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 shrink-0" />;
      case 'Administrativo':
        return <Briefcase className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />;
    }
  };

  const renderBlueprintCell = (cell: BlueprintCell, idx: number) => {
    if (cell.kind === 'utility') {
      return (
        <div
          key={`util-${cell.label}-${idx}`}
          className="min-w-[82px] flex-1 p-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-900/70 flex flex-col items-center justify-center text-center gap-1 min-h-[118px]"
        >
          {cell.icon === 'stairs' ? (
            <Footprints className="w-4 h-4 text-slate-600 dark:text-amber-400" />
          ) : (
            <DoorOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          )}
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
            {cell.label}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            {cell.icon === 'stairs' ? 'Acceso vertical' : 'Sanitarios'}
          </span>
        </div>
      );
    }

    const room = buildingRooms.find((r) => r.code === cell.code);
    if (!room) {
      return (
        <div
          key={`missing-${cell.code}-${idx}`}
          className="min-w-[96px] flex-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-mono text-slate-500 min-h-[118px]"
        >
          {cell.shortTitle || cell.code}
        </div>
      );
    }

    const session = room.hourlySchedule[selectedBlock.code] || {
      blockCode: selectedBlock.code,
      status: 'Libre' as ClassroomStatus,
    };

    const isServiceWithSchedule =
      session.status === 'Administrativo' && Boolean(room.serviceScheduleLabel);

    return (
      <button
        key={room.id}
        type="button"
        onClick={() => onSelectClassroom(room)}
        className={`min-w-[104px] flex-1 text-left p-2.5 rounded-xl border-2 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between gap-2 min-h-[118px] ${getStatusCardStyle(
          session.status,
          room.isMeetingPoint
        )}`}
      >
        <div className="flex items-start justify-between gap-1">
          <span className="font-mono text-xs font-extrabold leading-tight">
            {cell.shortTitle || room.code}
          </span>
          {renderStatusIcon(session.status, room.isMeetingPoint)}
        </div>

        <div className="space-y-1">
          {room.isMeetingPoint && (
            <span className="inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-amber-600 text-white">
              Punto de reunión
            </span>
          )}

          {isServiceWithSchedule ? (
            <div className="space-y-0.5">
              <span
                className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                  session.isOpenService
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-500 text-white'
                }`}
              >
                {session.isOpenService ? 'Abierto' : 'Cerrado'}
              </span>
              <span className="text-[10px] font-medium leading-tight block opacity-90">
                {room.serviceScheduleLabel}
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-bold leading-tight line-clamp-2 block">
              {session.status === 'Libre'
                ? 'Libre ahora'
                : session.status === 'Administrativo'
                ? room.name
                : session.subjectName || session.status}
            </span>
          )}

          <div className="flex items-center justify-between text-[10px] opacity-80 font-mono pt-1 border-t border-black/10 dark:border-white/10">
            <span className="inline-flex items-center gap-0.5">
              <Users className="w-2.5 h-2.5" />
              {room.capacity > 0 ? room.capacity : 'Área'}
            </span>
            {room.sensor.online && (
              <span className="inline-flex items-center gap-0.5">
                <Radio className="w-2.5 h-2.5" />
                {room.sensor.estimatedPeople}p
              </span>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Clean Building Selector Cards (No extra subtitle or tags) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {buildings.map((bld) => {
          const isSelected = bld.code === selectedBuildingCode;
          const bldRooms = classrooms.filter((r) => r.buildingCode === bld.code);
          const freeCount = bldRooms.filter(
            (r) => r.hourlySchedule[selectedBlock.code]?.status === 'Libre'
          ).length;
          const bldElevators = elevators.filter((e) => e.buildingCode === bld.code);

          return (
            <button
              key={bld.code}
              type="button"
              onClick={() => setSelectedBuildingCode(bld.code)}
              className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-white dark:bg-[#111827] border-red-600 ring-2 ring-red-600/30 shadow-md'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-extrabold text-sm shrink-0 ${
                    isSelected
                      ? 'bg-red-700 text-amber-300 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {bld.code}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  {bld.name}
                </h3>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                {bldElevators.length === 0 ? (
                  <span className="font-bold inline-flex items-center gap-1 text-red-700 dark:text-red-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Sin elevador</span>
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    {bldElevators.map((elv) => (
                      <span
                        key={elv.id}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm font-mono font-bold text-[10px] border ${
                          elv.status === 'Operativo'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-700'
                        }`}
                      >
                        <span>{elv.label}</span>
                        <span>
                          {elv.status === 'Operativo' ? 'OK' : 'Mantenimiento'}
                        </span>
                      </span>
                    ))}
                  </div>
                )}

                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {freeCount} libres
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Compact Live Elevator Control Bar (Only elevators, no redundant summary prose) */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-red-700 dark:text-amber-400 shrink-0" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Elevadores · Edificio {activeBuilding.code}
            </h4>
          </div>

          {activeElevators.length === 0 ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-xs font-semibold text-red-900 dark:text-red-200">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-amber-400 shrink-0" />
              <span>Sin elevador disponible · Acceso únicamente por escaleras</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2.5">
              {activeElevators.map((elv) => {
                const isOp = elv.status === 'Operativo';
                return (
                  <div
                    key={elv.id}
                    className={`px-3 py-1.5 rounded-lg border flex items-center gap-2.5 text-xs ${
                      isOp
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                        : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700'
                    }`}
                  >
                    <span className="font-mono font-extrabold text-slate-900 dark:text-white">
                      {elv.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                        isOp
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {elv.status}
                    </span>

                    {(role === 'prefectura' || role === 'administrador') && (
                      <button
                        type="button"
                        onClick={() => onToggleElevatorStatus(elv.id)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${
                          isOp
                            ? 'bg-slate-900 hover:bg-black text-amber-300'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        <Power className="w-3 h-3" />
                        <span>
                          {isOp ? 'Poner en Mantenimiento' : 'Reactivar'}
                        </span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {activeMaintenanceElevators.length > 0 && (
          <div
            className={`mt-3 p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
              activeMaintenanceElevators.length === activeElevators.length
                ? 'bg-red-50 dark:bg-red-950/50 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              {activeMaintenanceElevators.length === activeElevators.length
                ? 'Elevador fuera de servicio por mantenimiento. Utiliza las escaleras principales.'
                : `Aviso: ${activeMaintenanceElevators
                    .map((e) => e.label)
                    .join(', ')} en mantenimiento. El elevador restante continúa activo.`}
            </span>
          </div>
        )}
      </div>

      {/* 3. Floor Picker + Mapa de pisos del edificio # */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        
        {/* Left: Vertical Floor Selector */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
              <span>Pisos Edif. {activeBuilding.code}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {selectedBlock.code}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {availableFloors.map((floorNum) => {
              const roomsOnFloor = buildingRooms.filter((r) => r.floor === floorNum);
              const freeOnFloor = roomsOnFloor.filter(
                (r) => r.hourlySchedule[selectedBlock.code]?.status === 'Libre'
              ).length;
              const isSelected = floorNum === selectedFloor;

              return (
                <button
                  key={floorNum}
                  type="button"
                  onClick={() => setSelectedFloor(floorNum)}
                  className={`w-full px-3 py-2.5 rounded-lg border text-left transition-all flex items-center justify-between gap-2 min-w-0 ${
                    isSelected
                      ? 'bg-red-700 border-red-800 text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-red-400'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-extrabold block truncate">
                      {getFloorTitle(activeBuilding.code, floorNum)}
                    </span>
                    <span
                      className={`text-[10px] block ${
                        isSelected ? 'text-amber-200' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {roomsOnFloor.length} esp.
                    </span>
                  </div>

                  <span
                    className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-sm shrink-0 ${
                      isSelected
                        ? 'bg-black/30 text-amber-300'
                        : freeOnFloor > 0
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {freeOnFloor} lib.
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Mapa de pisos del edificio # */}
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600 dark:text-amber-400 shrink-0" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Mapa de pisos del edificio {activeBuilding.code} ·{' '}
                {getFloorTitle(activeBuilding.code, selectedFloor)}
              </h3>
            </div>

            {/* Symbology Only */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" /> Libre
              </span>
              <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-red-600" /> Ocupado
              </span>
              <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" /> Reservado / Punto de reunión
              </span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-500" /> Oficina / Mantenimiento
              </span>
            </div>
          </div>

          {/* Floor Corridor Strip */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0b0f19] border-2 border-dashed border-slate-300 dark:border-slate-700 space-y-3 overflow-x-auto">
            <div className="min-w-[680px] space-y-3">
              {/* Top Row */}
              <div className="flex items-stretch gap-2">
                {blueprint.topRow.map((cell, idx) => renderBlueprintCell(cell, idx))}
              </div>

              {/* Bottom Corridor Row */}
              <div className="flex items-stretch gap-2 pt-1">
                {blueprint.corridorSegments.map((seg, idx) => {
                  if (seg.type === 'elevators') {
                    return (
                      <div
                        key={`cor-${idx}`}
                        className="px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-2.5 shrink-0"
                      >
                        <ArrowUpDown className="w-4 h-4 text-red-600 dark:text-amber-400" />
                        <div className="flex items-center gap-1.5">
                          {activeElevators.map((elv) => (
                            <span
                              key={elv.id}
                              className={`px-2 py-0.5 rounded-sm font-mono text-xs font-extrabold ${
                                elv.status === 'Operativo'
                                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-amber-200 text-amber-950 dark:bg-amber-900 dark:text-amber-200'
                              }`}
                            >
                              {elv.label}: {elv.status === 'Operativo' ? 'OK' : 'Mantenimiento'}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if (seg.type === 'plaza') {
                    const plazaRoom = seg.roomCode
                      ? buildingRooms.find((r) => r.code === seg.roomCode)
                      : undefined;

                    if (plazaRoom) {
                      return (
                        <button
                          key={`cor-${idx}`}
                          type="button"
                          onClick={() => onSelectClassroom(plazaRoom)}
                          className="px-4 py-2.5 rounded-xl border-2 border-amber-400 dark:border-amber-700 bg-amber-50/95 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                        >
                          <Flag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>{seg.label}</span>
                        </button>
                      );
                    }

                    return (
                      <div
                        key={`cor-${idx}`}
                        className="px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/90 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 font-bold text-xs flex items-center justify-center shrink-0"
                      >
                        {seg.label}
                      </div>
                    );
                  }

                  if (seg.type === 'note') {
                    return (
                      <div
                        key={`cor-${idx}`}
                        className="px-4 py-2.5 rounded-xl border border-red-300 dark:border-red-800 bg-red-50/80 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-semibold text-xs flex items-center justify-center flex-1"
                      >
                        {seg.label}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`cor-${idx}`}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 font-mono font-semibold text-xs flex items-center justify-center tracking-wide"
                    >
                      {seg.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

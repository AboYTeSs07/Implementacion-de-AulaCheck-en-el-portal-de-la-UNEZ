import React from 'react';
import {
  Classroom,
  NightBlockDefinition,
  AulaCheckRole,
  ClassroomStatus,
} from '../../types/portal';
import {
  Radio,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Users,
  Thermometer,
  Activity,
  ShieldCheck,
} from 'lucide-react';

interface SensorsSimulationViewProps {
  classrooms: Classroom[];
  selectedBlock: NightBlockDefinition;
  role: AulaCheckRole;
  onSimulateSensorSweep: () => void;
  onToggleRoomPresence: (classroomId: string) => void;
  onConfirmFreeFromSensor: (classroomId: string) => void;
  onSelectClassroom: (classroom: Classroom) => void;
}

export const SensorsSimulationView: React.FC<SensorsSimulationViewProps> = ({
  classrooms,
  selectedBlock,
  role,
  onSimulateSensorSweep,
  onToggleRoomPresence,
  onConfirmFreeFromSensor,
  onSelectClassroom,
}) => {
  // Filter academic classrooms (exclude non-classroom admin offices where occupancy sensors don't decide class availability)
  const monitoredRooms = classrooms.filter(
    (r) => r.hourlySchedule[selectedBlock.code]?.status !== 'Administrativo'
  );

  // Detect discrepancies between scheduled/portal state and simulated physical sensor reading
  const discrepancies = monitoredRooms.filter((room) => {
    const portalStatus = room.hourlySchedule[selectedBlock.code]?.status || 'Libre';
    if (portalStatus === 'Ocupado' && !room.sensor.motionDetected) return true;
    if (portalStatus === 'Libre' && room.sensor.motionDetected) return true;
    return false;
  });

  const emptyLowFloorRooms = monitoredRooms.filter(
    (room) => room.floor <= 2 && !room.sensor.motionDetected
  );

  return (
    <div className="space-y-4">
      {/* Future Automation Explanation Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#1f0b10] to-black text-white rounded-xl p-5 border border-red-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Proyección Futura · Lectura Automática por Sensores</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Simulador de Detección Física de Presencia en Salones
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Como parte de la evolución planteada para AulaCheck, los sensores detectan movimiento y conteo aproximado de personas en cada salón para compararlo con el horario del bloque <strong>{selectedBlock.label}</strong> y avisar cuando un grupo sale antes de tiempo.
          </p>
        </div>

        <button
          type="button"
          onClick={onSimulateSensorSweep}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-xl border border-red-600 shadow-xs transition-colors shrink-0 whitespace-nowrap"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Simular Nueva Lectura de Sensores</span>
        </button>
      </div>

      {/* Sensor Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            Salones Monitoreados (Simulación)
          </span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1 block">
            {monitoredRooms.length} espacios activos
          </span>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            discrepancies.length > 0
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700'
              : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
            Diferencias Horario vs. Sensor
          </span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1 block">
            {discrepancies.length} alerta(s)
          </span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
            Vacíos en Pisos Bajos (P1–P2)
          </span>
          <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums mt-1 block">
            {emptyLowFloorRooms.length} detectados vacíos
          </span>
        </div>
      </div>

      {/* Discrepancy Alerts Panel */}
      {discrepancies.length > 0 && (
        <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Alertas de Disponibilidad Detectadas por Sensor</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {discrepancies.map((room) => {
              const portalStatus = room.hourlySchedule[selectedBlock.code]?.status || 'Libre';
              const isEarlyRelease =
                portalStatus === 'Ocupado' && !room.sensor.motionDetected;

              return (
                <div
                  key={room.id}
                  className="bg-white dark:bg-[#111827] rounded-lg border border-amber-300 dark:border-amber-700 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-slate-900 dark:text-white">
                        {room.code}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        · Edif. {room.buildingCode} · {room.floorLabel}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {isEarlyRelease
                        ? `El horario marca Ocupado en ${selectedBlock.code}, pero el sensor detecta 0 personas (posible salida anticipada).`
                        : `El portal marca Libre en ${selectedBlock.code}, pero el sensor detecta ${room.sensor.estimatedPeople} personas dentro.`}
                    </p>
                  </div>

                  {isEarlyRelease && (role === 'prefectura' || role === 'administrador') ? (
                    <button
                      type="button"
                      onClick={() => onConfirmFreeFromSensor(room.id)}
                      className="px-3 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors shrink-0 whitespace-nowrap"
                    >
                      Liberar en AulaCheck
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectClassroom(room)}
                      className="px-3 py-1.5 text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg transition-colors shrink-0 whitespace-nowrap"
                    >
                      Revisar Salón
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Live Sensor Telemetry Table */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-600 dark:text-amber-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Lectura Simulada por Salón ({selectedBlock.label})
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Usa «Alternar Presencia» para probar cómo reacciona AulaCheck cuando un grupo entra o sale
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-4">Salón / Ubicación</th>
                <th className="py-2.5 px-4">Estado en Portal</th>
                <th className="py-2.5 px-4">Sensor de Presencia</th>
                <th className="py-2.5 px-4">Coincidencia</th>
                <th className="py-2.5 px-4 text-right">Prueba Interactiva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {monitoredRooms.slice(0, 18).map((room) => {
                const portalStatus: ClassroomStatus =
                  room.hourlySchedule[selectedBlock.code]?.status || 'Libre';
                const hasMismatch =
                  (portalStatus === 'Ocupado' && !room.sensor.motionDetected) ||
                  (portalStatus === 'Libre' && room.sensor.motionDetected);

                return (
                  <tr
                    key={room.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td
                      className="py-3 px-4 cursor-pointer"
                      onClick={() => onSelectClassroom(room)}
                    >
                      <span className="font-mono font-bold text-slate-900 dark:text-white block">
                        {room.code} · {room.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Edificio {room.buildingCode} · {room.floorLabel}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {portalStatus}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1 font-bold ${
                            room.sensor.motionDetected
                              ? 'text-red-700 dark:text-red-400'
                              : 'text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          {room.sensor.estimatedPeople} personas
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 inline-flex items-center gap-0.5">
                          <Thermometer className="w-3 h-3" />
                          {room.sensor.temperatureC}°C
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {hasMismatch ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Diferencia detectada</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Coincide</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleRoomPresence(room.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-md transition-colors whitespace-nowrap"
                        >
                          Alternar Presencia
                        </button>
                        {hasMismatch &&
                          portalStatus === 'Ocupado' &&
                          !room.sensor.motionDetected && (
                            <button
                              type="button"
                              onClick={() => onConfirmFreeFromSensor(room.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-md transition-colors whitespace-nowrap"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Confirmar Libre</span>
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

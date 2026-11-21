import React, { useState } from 'react';
import {
  Classroom,
  AulaCheckRole,
  ClassroomStatus,
  NightBlockDefinition,
} from '../../types/portal';
import { NIGHT_BLOCKS } from '../../data/mockData';
import {
  X,
  Building2,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Wrench,
  ShieldCheck,
  Footprints,
  CalendarPlus,
  Laptop,
  Briefcase,
  Radio,
  AlertTriangle,
} from 'lucide-react';

interface ClassroomDetailModalProps {
  classroom: Classroom | null;
  selectedBlock: NightBlockDefinition;
  simulatedClock: string; // "HH:MM", e.g. "17:35"
  role: AulaCheckRole;
  onClose: () => void;
  onUpdateBlockStatus: (
    classroomId: string,
    blockCode: string,
    newStatus: ClassroomStatus,
    observation: string
  ) => void;
  onSubmitTeacherRequest: (params: {
    classroom: Classroom;
    blockCode: string;
    actionType: 'Reservar' | 'Liberar';
    professorName: string;
    reason: string;
    minutesBeforeClass: number;
    meetsTwentyMinRule: boolean;
  }) => void;
}

function parseClockMinutes(clock: string): number {
  const [h, m] = clock.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export const ClassroomDetailModal: React.FC<ClassroomDetailModalProps> = ({
  classroom,
  selectedBlock,
  simulatedClock,
  role,
  onClose,
  onUpdateBlockStatus,
  onSubmitTeacherRequest,
}) => {
  if (!classroom) return null;

  const [targetBlockCode, setTargetBlockCode] = useState<string>(selectedBlock.code);
  const targetBlock =
    NIGHT_BLOCKS.find((b) => b.code === targetBlockCode) || NIGHT_BLOCKS[0];

  const currentSession = classroom.hourlySchedule[targetBlockCode] || {
    blockCode: targetBlockCode,
    status: 'Libre' as ClassroomStatus,
  };

  const [newStatus, setNewStatus] = useState<ClassroomStatus>(currentSession.status);
  const [observation, setObservation] = useState<string>(
    classroom.prefecturaObservation || ''
  );
  const [reason, setReason] = useState<string>(
    currentSession.status === 'Libre'
      ? 'Asesoría o reposición de clase'
      : 'Grupo concluyó actividad anticipadamente'
  );
  const [professorName, setProfessorName] = useState<string>(
    '469. Nallely Suarez Melquiadez'
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const isAdminSpace = currentSession.status === 'Administrativo';

  // Evaluate 20-minute anticipation rule for Docente
  const currentMinutes = parseClockMinutes(simulatedClock);
  const minutesBeforeClass = targetBlock.startMinutesFromMidnight - currentMinutes;
  const meetsTwentyMinRule = minutesBeforeClass >= 20;

  const handleSelectBlockRow = (blockCode: string) => {
    setTargetBlockCode(blockCode);
    const slot = classroom.hourlySchedule[blockCode];
    if (slot) {
      setNewStatus(slot.status);
      setReason(
        slot.status === 'Libre'
          ? 'Asesoría o reposición de clase'
          : 'Grupo concluyó actividad anticipadamente'
      );
    }
    setFeedbackMsg('');
  };

  const handleSavePrefectura = () => {
    onUpdateBlockStatus(classroom.id, targetBlockCode, newStatus, observation);
    setFeedbackMsg(
      `Rondín confirmado: ${classroom.code} marcado como "${newStatus}" en bloque ${targetBlockCode} (${targetBlock.startTime} hrs).`
    );
  };

  const handleTeacherAction = (actionType: 'Reservar' | 'Liberar') => {
    if (!meetsTwentyMinRule) {
      setFeedbackMsg(
        `Solicitud bloqueada por regla de 20 minutos: faltan ${minutesBeforeClass} min para ${targetBlockCode} (${targetBlock.startTime}).`
      );
      return;
    }

    onSubmitTeacherRequest({
      classroom,
      blockCode: targetBlockCode,
      actionType,
      professorName,
      reason,
      minutesBeforeClass,
      meetsTwentyMinRule,
    });

    setFeedbackMsg(
      `Solicitud de "${actionType}" enviada a Prefectura para su aprobación en tiempo real (cumple regla: ${minutesBeforeClass} min antes).`
    );
  };

  const getStatusBadge = (status: ClassroomStatus) => {
    switch (status) {
      case 'Libre':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-sm border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" />
            <span>Libre</span>
          </span>
        );
      case 'Ocupado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-950/70 px-2 py-0.5 rounded-sm border border-red-300 dark:border-red-800">
            <XCircle className="w-3 h-3" />
            <span>Ocupado</span>
          </span>
        );
      case 'Reservado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3" />
            <span>Reservado</span>
          </span>
        );
      case 'Mantenimiento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-300 dark:border-slate-700">
            <Wrench className="w-3 h-3" />
            <span>Mantenimiento</span>
          </span>
        );
      case 'Administrativo':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-300 dark:border-slate-700">
            <Briefcase className="w-3 h-3" />
            <span>Área / Oficina</span>
          </span>
        );
    }
  };

  const renderSlotStatusBadge = (slot: Classroom['hourlySchedule'][string]) => {
    if (slot.status === 'Administrativo' && classroom.serviceScheduleLabel) {
      return (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-sm border ${
            slot.isOpenService
              ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800'
              : 'text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
          }`}
        >
          <Clock className="w-3 h-3" />
          <span>{slot.isOpenService ? 'Abierto' : 'Cerrado'}</span>
        </span>
      );
    }
    return getStatusBadge(slot.status);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Cerrar detalle de aula"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="font-extrabold text-white bg-red-700 px-2.5 py-0.5 rounded-sm">
              {classroom.code}
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-semibold">
              {classroom.floorLabel}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 dark:text-slate-300">{classroom.type}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 dark:text-slate-300 inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {classroom.capacity > 0 ? `Capacidad ${classroom.capacity}` : 'Área Común'}
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2 pr-8 flex items-center gap-2 flex-wrap">
            <span>
              {classroom.name} · {classroom.building}
            </span>
            {classroom.isMeetingPoint && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-amber-600 text-white">
                Punto de reunión
              </span>
            )}
            {classroom.serviceScheduleLabel && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {classroom.serviceScheduleLabel}
              </span>
            )}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <Footprints className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{classroom.accessNote}</span>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Equipment, Prefectura & Sensor Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-red-600 dark:text-amber-400" />
                <span>Equipamiento</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {classroom.equipment.join(' · ')}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-600 dark:text-amber-400" />
                <span>Confirmación Prefectura</span>
              </div>
              <p className="text-slate-700 dark:text-slate-200 font-semibold">
                {classroom.lastVerifiedBy} · {classroom.lastVerifiedAt}
              </p>
              {classroom.prefecturaObservation && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {classroom.prefecturaObservation}
                </p>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-red-600 dark:text-amber-400" />
                <span>Sensor de Ocupación (Sim.)</span>
              </div>
              <p className="text-slate-700 dark:text-slate-200 font-mono font-bold">
                {classroom.sensor.motionDetected
                  ? `${classroom.sensor.estimatedPeople} personas detectadas`
                  : 'Sin movimiento (0 personas)'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                ID: {classroom.sensor.sensorId} · {classroom.sensor.temperatureC}°C
              </p>
            </div>
          </div>

          {/* Prefectura / Administrador Live Update Control */}
          {(role === 'prefectura' || role === 'administrador') && !isAdminSpace && (
            <div className="p-4 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900 space-y-3">
              <h3 className="text-xs font-bold text-red-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  Panel de Rondín ({role === 'administrador' ? 'Administrador' : 'Prefectura'}) · Bloque {targetBlock.label}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Estado verificado en sitio:
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ClassroomStatus)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold"
                  >
                    <option value="Libre">Libre (Disponible)</option>
                    <option value="Ocupado">Ocupado (Clase en curso)</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Observación del rondín:
                  </label>
                  <input
                    type="text"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Ej. Grupo salió temprano, proyector OK..."
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  {feedbackMsg}
                </span>
                <button
                  type="button"
                  onClick={handleSavePrefectura}
                  className="px-4 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors shrink-0"
                >
                  Confirmar Estado en Bitácora
                </button>
              </div>
            </div>
          )}

          {/* Docente Request Control (20-min anticipation rule + Prefectura approval) */}
          {role === 'docente' && !isAdminSpace && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xs font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarPlus className="w-4 h-4" />
                  <span>
                    Solicitud Docente ({targetBlock.label}) · Reloj actual: {simulatedClock} hrs
                  </span>
                </h3>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-sm ${
                    meetsTwentyMinRule
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                  }`}
                >
                  {meetsTwentyMinRule
                    ? `Cumple regla (${minutesBeforeClass} min antes)`
                    : `Fuera de regla (${minutesBeforeClass} min)`}
                </span>
              </div>

              {!meetsTwentyMinRule && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-xs text-red-900 dark:text-red-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                  <span>
                    Por reglamento, un docente debe solicitar reservar o liberar con al menos <strong>20 minutos de anticipación</strong> antes de que inicie la hora clase ({targetBlock.startTime} hrs). Ajusta el «Reloj Simulado» arriba (ej. 17:30) para probar solicitudes válidas.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Motivo / Actividad:
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Docente Solicitante:
                  </label>
                  <input
                    type="text"
                    value={professorName}
                    onChange={(e) => setProfessorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  {feedbackMsg || 'Requiere aprobación de Prefectura en tiempo real.'}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {currentSession.status === 'Libre' ? (
                    <button
                      type="button"
                      disabled={!meetsTwentyMinRule}
                      onClick={() => handleTeacherAction('Reservar')}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      Solicitar Reservar Salón
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!meetsTwentyMinRule}
                      onClick={() => handleTeacherAction('Liberar')}
                      className="px-4 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      Solicitar Liberar Salón
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Nightly Blocks Breakdown Table (N1..N6) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Horario Nocturno por Bloque (N1 – N6 · 18:00 a 21:50 hrs)</span>
              </h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Haz clic en un bloque para seleccionarlo
              </span>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-2 px-3 w-36">Bloque</th>
                    <th className="py-2 px-3 w-36">Estado</th>
                    <th className="py-2 px-3">Asignatura / Motivo</th>
                    <th className="py-2 px-3 hidden sm:table-cell">Docente / Grupo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {NIGHT_BLOCKS.map((blk) => {
                    const slot = classroom.hourlySchedule[blk.code] || {
                      blockCode: blk.code,
                      status: 'Libre' as ClassroomStatus,
                    };
                    const isSelectedRow = blk.code === targetBlockCode;

                    return (
                      <tr
                        key={blk.code}
                        onClick={() => handleSelectBlockRow(blk.code)}
                        className={`cursor-pointer transition-colors ${
                          isSelectedRow
                            ? 'bg-red-50/70 dark:bg-red-950/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                          {blk.label}
                        </td>
                        <td className="py-2.5 px-3">{renderSlotStatusBadge(slot)}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-800 dark:text-slate-200">
                          {slot.status === 'Libre'
                            ? 'Espacio disponible'
                            : slot.subjectName || slot.note || 'Uso programado'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                          {slot.professor
                            ? `${slot.professor}${slot.group ? ` · ${slot.group}` : ''}`
                            : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{classroom.building}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Classroom,
  PrefecturaLogEntry,
  AulaCheckRole,
  ClassroomStatus,
  NightBlockDefinition,
  TeacherRoomRequest,
  ElevatorUnit,
} from '../../types/portal';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Wrench,
  ArrowRight,
  ClipboardCheck,
  Briefcase,
  BellRing,
  Check,
  X,
  ArrowUpDown,
  Power,
} from 'lucide-react';

interface PrefecturaLogViewProps {
  classrooms: Classroom[];
  elevators: ElevatorUnit[];
  logs: PrefecturaLogEntry[];
  teacherRequests: TeacherRoomRequest[];
  selectedBlock: NightBlockDefinition;
  role: AulaCheckRole;
  onUpdateClassroomStatus: (
    classroomId: string,
    blockCode: string,
    newStatus: ClassroomStatus,
    observation: string
  ) => void;
  onToggleElevatorStatus: (elevatorId: string) => void;
  onReviewTeacherRequest: (
    requestId: string,
    decision: 'Aprobada' | 'Rechazada'
  ) => void;
}

export const PrefecturaLogView: React.FC<PrefecturaLogViewProps> = ({
  classrooms,
  elevators,
  logs,
  teacherRequests,
  selectedBlock,
  role,
  onUpdateClassroomStatus,
  onToggleElevatorStatus,
  onReviewTeacherRequest,
}) => {
  const academicRooms = classrooms.filter(
    (c) => c.hourlySchedule[selectedBlock.code]?.status !== 'Administrativo'
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    academicRooms[0]?.id || ''
  );
  const [selectedStatus, setSelectedStatus] = useState<ClassroomStatus>('Libre');
  const [observation, setObservation] = useState<string>('');
  const [savedToast, setSavedToast] = useState<string>('');

  const pendingRequests = teacherRequests.filter(
    (req) => req.approvalStatus === 'Pendiente'
  );

  const handleSubmitRound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomId) return;
    onUpdateClassroomStatus(
      selectedRoomId,
      selectedBlock.code,
      selectedStatus,
      observation || 'Rondín físico verificado sin novedades.'
    );
    const room = classrooms.find((c) => c.id === selectedRoomId);
    setSavedToast(
      `Confirmación registrada para ${room?.code} (${selectedStatus}) en bloque ${selectedBlock.label}.`
    );
    setObservation('');
    setTimeout(() => setSavedToast(''), 3500);
  };

  const renderStatusLabel = (status: ClassroomStatus) => {
    switch (status) {
      case 'Libre':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.5 rounded-sm">
            <CheckCircle2 className="w-3 h-3" />
            <span>Libre</span>
          </span>
        );
      case 'Ocupado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-800 dark:text-red-300 bg-red-100 dark:bg-red-950/70 px-2 py-0.5 rounded-sm">
            <XCircle className="w-3 h-3" />
            <span>Ocupado</span>
          </span>
        );
      case 'Reservado':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-sm">
            <Clock className="w-3 h-3" />
            <span>Reservado</span>
          </span>
        );
      case 'Mantenimiento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
            <Wrench className="w-3 h-3" />
            <span>Mantenimiento</span>
          </span>
        );
      case 'Administrativo':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
            <Briefcase className="w-3 h-3" />
            <span>Administrativo</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Teacher Requests Awaiting Prefectura Approval */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-amber-300 dark:border-amber-800/70 p-5 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Solicitudes de Docentes (Aprobación de Prefectura en Tiempo Real)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Los docentes pueden solicitar reservar o liberar un salón siempre que cumplan con los <strong>20 minutos de anticipación</strong> y Prefectura apruebe el cambio aquí.
              </p>
            </div>
          </div>

          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
            {pendingRequests.length} pendientes
          </span>
        </div>

        <div className="space-y-2.5">
          {teacherRequests.map((req) => (
            <div
              key={req.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-bold px-2 py-0.5 rounded-sm ${
                      req.actionType === 'Reservar'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {req.actionType} salón {req.classroomCode}
                  </span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                    Bloque {req.blockCode} · {req.floorLabel}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    · Solicitado {req.minutesBeforeClass} min antes ({req.requestedAtTime})
                  </span>
                </div>

                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                  {req.professorName} — <span className="font-normal">{req.reason}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {req.approvalStatus === 'Pendiente' ? (
                  role === 'prefectura' || role === 'administrador' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onReviewTeacherRequest(req.id, 'Aprobada')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Aprobar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onReviewTeacherRequest(req.id, 'Rechazada')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 hover:bg-red-200 dark:bg-red-950 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Rechazar</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                      Esperando aprobación (cambia rol a Prefectura)
                    </span>
                  )
                ) : (
                  <span
                    className={`font-bold px-2.5 py-1 rounded-md text-[11px] ${
                      req.approvalStatus === 'Aprobada'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}
                  >
                    {req.approvalStatus}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1.5. Control de Elevadores (E1 y E2 · Edificios 800 y 700) */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-red-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700">
              <ArrowUpDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Control de Elevadores en Tiempo Real (E1 y E2)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Reporta si algún elevador de los Edificios 800 o 700 entra en mantenimiento. El aviso se refleja al instante en el Plano del Piso.
              </p>
            </div>
          </div>

          {role !== 'prefectura' && role !== 'administrador' && (
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-lg">
              Solo Prefectura o Administrador pueden encender o poner en mantenimiento los elevadores.
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {elevators.map((elv) => {
            const isOp = elv.status === 'Operativo';
            return (
              <div
                key={elv.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 ${
                  isOp
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      Edificio {elv.buildingCode}
                    </span>
                    <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white">
                      Elevador {elv.label}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                      isOp
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {elv.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {elv.note}
                </p>

                <button
                  type="button"
                  disabled={role !== 'prefectura' && role !== 'administrador'}
                  onClick={() => onToggleElevatorStatus(elv.id)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    role !== 'prefectura' && role !== 'administrador'
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : isOp
                      ? 'bg-slate-900 hover:bg-black text-amber-300'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>
                    {isOp ? 'Marcar en Mantenimiento' : 'Reactivar a Operativo'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Operational Prefectura Physical Round Form */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-amber-400 border border-red-200 dark:border-red-900">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Registro de Rondín Físico · Prefectura
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Actualiza y confirma el estado real de los salones en edificios 800, 700 y 900 para el bloque <strong>{selectedBlock.label}</strong>.
              </p>
            </div>
          </div>

          {role !== 'prefectura' && role !== 'administrador' && (
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-lg">
              Cambia el rol a «Prefectura» o «Administrador» en la barra superior de AulaCheck para registrar rondines o aprobar solicitudes.
            </span>
          )}
        </div>

        {(role === 'prefectura' || role === 'administrador') && (
          <form
            onSubmit={handleSubmitRound}
            className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-3 items-end text-xs"
          >
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Salón ({selectedBlock.code}):
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              >
                {academicRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.code} · Edif. {room.buildingCode} · {room.floorLabel}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estado Confirmado:
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ClassroomStatus)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
              >
                <option value="Libre">Libre</option>
                <option value="Ocupado">Ocupado</option>
                <option value="Reservado">Reservado</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Observación en sitio:
              </label>
              <input
                type="text"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ej. Grupo salió temprano, aula disponible..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors shadow-2xs"
              >
                Confirmar Rondín
              </button>
            </div>
          </form>
        )}

        {savedToast && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            {savedToast}
          </div>
        )}
      </div>

      {/* 3. Audit Log Table */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-600 dark:text-amber-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Bitácora Reciente de Verificaciones en Campus
            </h4>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            {logs.length} registros
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-4">Hora / Registro</th>
                <th className="py-2.5 px-4">Espacio</th>
                <th className="py-2.5 px-4">Cambio de Estado</th>
                <th className="py-2.5 px-4">Observación</th>
                <th className="py-2.5 px-4">Verificado por</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                >
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    <div>{log.timestamp}</div>
                    <div className="text-[10px] text-slate-400">
                      Bloque {log.blockChecked}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-900 dark:text-white block">
                      {log.classroomCode}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {log.floorLabel} · {log.building}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      {renderStatusLabel(log.previousStatus)}
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      {renderStatusLabel(log.newStatus)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 max-w-xs">
                    {log.observation}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {log.verifiedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

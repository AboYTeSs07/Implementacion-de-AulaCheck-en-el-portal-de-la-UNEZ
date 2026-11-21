import React from 'react';
import {
  CheckSquare,
  Download,
  CheckCircle2,
  CreditCard,
  Receipt,
  ShieldCheck,
  Monitor,
  Clock,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';
import { StudentProfile } from '../types/portal';
import { mockGrades, mockPayments } from '../data/mockData';

interface InlinePanelProps {
  student: StudentProfile;
  onCollapse: () => void;
}

export const CalificacionesPanel: React.FC<InlinePanelProps> = ({
  student,
  onCollapse,
}) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      <div className="p-5 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Mis Calificaciones · Periodo {student.period}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulta de evaluaciones parciales y promedio ponderado
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCollapse}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Ocultar</span>
        </button>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
            <span className="text-xs text-amber-950 dark:text-amber-300 font-bold block">
              Promedio Acumulado Histórico
            </span>
            <span className="text-2xl font-bold font-mono text-amber-900 dark:text-amber-400 block mt-1">
              {student.cumulativeAverage.toFixed(2)}
            </span>
            <span className="text-[11px] text-amber-800 dark:text-amber-300 mt-1 block">
              Mantiene derecho a beca por mérito académico
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold block">
              Promedio del Periodo Actual
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block mt-1">
              {student.periodAverage.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              6 materias cursadas en curso regular
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold block">
              Avance de Créditos
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block mt-1">
              {student.earnedCredits} / {student.totalCredits}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              80.0% del plan de estudios completado
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Desglose por Asignatura
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Escala de 0 a 100 · Mínima aprobatoria: 70
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Clave</th>
                  <th className="py-2.5 px-3">Materia</th>
                  <th className="py-2.5 px-2 text-center">P1</th>
                  <th className="py-2.5 px-2 text-center">P2</th>
                  <th className="py-2.5 px-2 text-center">P3</th>
                  <th className="py-2.5 px-2 text-center">Final</th>
                  <th className="py-2.5 px-2 text-center">Faltas</th>
                  <th className="py-2.5 px-3 text-center">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockGrades.map((g) => (
                  <tr
                    key={g.code}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                      {g.code}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                      {g.name}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-slate-700 dark:text-slate-300">
                      {g.p1}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-slate-700 dark:text-slate-300">
                      {g.p2}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-slate-700 dark:text-slate-300">
                      {g.p3}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-red-700 dark:text-amber-400">
                      {g.final.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-slate-500 dark:text-slate-400">
                      {g.absences}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                        <CheckCircle2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>{g.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() =>
              alert('Descarga de Kárdex Oficial en PDF generada exitosamente.')
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Kárdex Completo (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const PagosPanel: React.FC<InlinePanelProps> = ({
  student,
  onCollapse,
}) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      <div className="p-5 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Estado de Cuenta y Conceptos por Pagar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tesorería y Administración Financiera Universitaria
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCollapse}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Ocultar</span>
        </button>
      </div>

      <div className="p-5 space-y-5">
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-950 dark:text-amber-300 block">
              Total Pendiente de Pago
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
              ${student.debtAmount.toFixed(2)} MXN
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-900 dark:text-amber-300 font-semibold mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Al corriente · Sin adeudos registrados en el sistema</span>
            </div>
          </div>

          <span className="bg-[#d32f2f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs w-fit">
            Pendiente por pagar $0
          </span>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
            Recibos Pagados del Ciclo Actual
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {mockPayments.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-snug">
                      {p.concept}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-mono">Folio: {p.folio}</span>
                      <span>·</span>
                      <span>Pagado: {p.paidDate}</span>
                      <span>·</span>
                      <span>{p.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold font-mono text-slate-900 dark:text-white block">
                    ${p.amount.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full inline-block mt-1 border border-amber-300 dark:border-amber-800">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() =>
              alert('Generando Carta Oficial de No Adeudo Financiero (PDF)...')
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Descargar Carta de No Adeudo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ReinscripcionesPanelProps extends InlinePanelProps {
  onGoToSchedule: () => void;
}

export const ReinscripcionesPanel: React.FC<ReinscripcionesPanelProps> = ({
  student,
  onCollapse,
  onGoToSchedule,
}) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      <div className="p-5 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Módulo de Reinscripciones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proceso de asignación de turnos y selección de materias
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCollapse}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Ocultar</span>
        </button>
      </div>

      <div className="p-5 space-y-5">
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-950 dark:text-amber-300 uppercase tracking-wider block">
              Turno y Cita de Inscripción Asignada
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {student.reinscriptionDate}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Turno asignado por orden de promedio general ({student.cumulativeAverage.toFixed(2)} pts) dentro del percentil superior (Top 5%).
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
            Estatus de Requisitos para el Periodo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Pago de cuota semestral y seguro escolar</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">
                Validado
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Encuesta de evaluación docente al 100%</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">
                Completada
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dictamen de salud y carnet médico universitario</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">
                Vigente
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Prerrequisitos seriados acreditados</span>
              </div>
              <span className="font-bold text-amber-900 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-sm border border-amber-300 dark:border-amber-800">
                100% Acreditados
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div>
            <span className="block font-medium">Capacidad de carga académica:</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Hasta 46 créditos autorizados · Alumno Regular
            </span>
          </div>

          <button
            type="button"
            onClick={onGoToSchedule}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors shadow-2xs"
          >
            <span>Abrir AulaCheck / Mi Horario</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

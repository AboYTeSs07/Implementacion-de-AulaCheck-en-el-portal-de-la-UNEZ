import React, { useState } from 'react';
import { CheckSquare, Download, CheckCircle2, ChevronUp } from 'lucide-react';
import { StudentProfile } from '../../types/portal';
import { mockGrades } from '../../data/mockData';

interface CalificacionesPanelProps {
  student: StudentProfile;
  onHide: () => void;
}

export const CalificacionesPanel: React.FC<CalificacionesPanelProps> = ({
  student,
  onHide,
}) => {
  const [downloadNotice, setDownloadNotice] = useState<string>('');

  const handleDownloadKardex = () => {
    setDownloadNotice('Kárdex Oficial en PDF listo para descarga (Periodo ' + student.period + ').');
    setTimeout(() => setDownloadNotice(''), 3500);
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      {/* Panel Header */}
      <div className="p-5 bg-slate-50/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Mis Calificaciones · Periodo {student.period}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulta desplegable de evaluaciones parciales y promedio ponderado
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onHide}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
        >
          <ChevronUp className="w-4 h-4 text-red-600 dark:text-amber-400" />
          <span>Ocultar Calificaciones</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
            <span className="text-xs text-amber-950 dark:text-amber-300 font-bold block">
              Promedio Acumulado Histórico
            </span>
            <span className="text-2xl font-bold font-mono text-amber-900 dark:text-amber-400 block mt-1 tabular-nums">
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
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block mt-1 tabular-nums">
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
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white block mt-1 tabular-nums">
              {student.earnedCredits} / {student.totalCredits}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              80% del plan de estudios completado
            </span>
          </div>
        </div>

        {/* Grades Table */}
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

        {/* Action row */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleDownloadKardex}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Kárdex Completo (PDF)</span>
          </button>

          {downloadNotice && (
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {downloadNotice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

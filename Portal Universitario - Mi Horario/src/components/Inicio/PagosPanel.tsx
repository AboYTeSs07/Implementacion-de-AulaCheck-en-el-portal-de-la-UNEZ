import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Receipt,
  ShieldCheck,
  ChevronUp,
} from 'lucide-react';
import { StudentProfile } from '../../types/portal';
import { mockPayments } from '../../data/mockData';

interface PagosPanelProps {
  student: StudentProfile;
  onHide: () => void;
}

export const PagosPanel: React.FC<PagosPanelProps> = ({ student, onHide }) => {
  const [notice, setNotice] = useState<string>('');

  const handleDownloadLetter = () => {
    setNotice('Carta Oficial de No Adeudo Financiero generada correctamente.');
    setTimeout(() => setNotice(''), 3500);
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 bg-slate-50/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
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
          onClick={onHide}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
        >
          <ChevronUp className="w-4 h-4 text-red-600 dark:text-amber-400" />
          <span>Ocultar Pagos</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Balance card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-950 dark:text-amber-300 block">
              Total Pendiente de Pago
            </span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
              ${student.debtAmount.toFixed(2)} MXN
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-900 dark:text-amber-300 font-semibold mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Al corriente · Sin adeudos registrados en el sistema</span>
            </div>
          </div>

          <span className="bg-[#d32f2f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs w-fit">
            Pendiente por pagar ${student.debtAmount.toFixed(0)}
          </span>
        </div>

        {/* Paid Concepts List */}
        <div>
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
            Recibos Pagados del Ciclo Actual
          </h3>

          <div className="space-y-2.5">
            {mockPayments.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-snug">
                      {p.concept}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
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

        {/* Action row */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleDownloadLetter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Descargar Carta de No Adeudo</span>
          </button>

          {notice && (
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {notice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Bell } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  const notifications = [
    {
      id: '1',
      title: 'Validación de Horario Oficial Enero - Junio 2026',
      desc: 'Tu horario escolar ha quedado validado con 42 créditos inscritos. Puedes imprimir tu comprobante oficial en el módulo de Horarios.',
      date: 'Hoy, 09:15 hrs',
      type: 'info',
      read: false,
    },
    {
      id: '2',
      title: 'Acceso a Laboratorio de GPUs y Cómputo Especializado',
      desc: 'Las credenciales de acceso para el Lab T-4 y Lab de IA están habilitadas con tu cuenta institucional de alumno.',
      date: 'Ayer, 16:40 hrs',
      type: 'success',
      read: false,
    },
    {
      id: '3',
      title: 'Periodo de Ajustes, Altas y Bajas',
      desc: 'El periodo de ajustes estará disponible del 16 al 20 de Enero. Utiliza el Simulador de Horario para validar posibles traslapes antes de solicitar cambios.',
      date: '08 de Enero, 11:00 hrs',
      type: 'alert',
      read: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Avisos y Notificaciones Escolares
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border text-xs transition-colors ${
                !n.read
                  ? 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-slate-900 dark:text-white leading-snug">
                  {n.title}
                </h4>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-amber-400 shrink-0 mt-1"></span>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {n.desc}
              </p>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-2">
                {n.date}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

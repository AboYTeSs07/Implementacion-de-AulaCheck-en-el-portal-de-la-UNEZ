import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Award, Shield, FileText } from 'lucide-react';
import { StudentProfile } from '../../types/portal';

interface DatosAlumnoModalProps {
  student: StudentProfile;
  onClose: () => void;
}

export const DatosAlumnoModal: React.FC<DatosAlumnoModalProps> = ({
  student,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Ficha General del Alumno
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Información personal, académica y de control escolar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Main Info Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Nombre Completo</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">{student.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Matrícula</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white block mt-0.5">{student.matricula}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Carrera / Programa</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">{student.program}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Grado y Grupo</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">{student.currentSemester}° Semestre · Grupo {student.group}</span>
            </div>
          </div>

          {/* Academic Status Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <span className="text-[10px] text-slate-500 block">Estatus Escolar</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 block">{student.status}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <span className="text-[10px] text-slate-500 block">Condición</span>
              <span className="font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{student.regularStatus}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <span className="text-[10px] text-slate-500 block">Promedio</span>
              <span className="font-bold font-mono text-red-700 dark:text-amber-400 text-xs mt-0.5 block">{student.cumulativeAverage.toFixed(2)}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <span className="text-[10px] text-slate-500 block">Créditos</span>
              <span className="font-bold font-mono text-slate-900 dark:text-white text-xs mt-0.5 block">{student.earnedCredits} / {student.totalCredits}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Datos de Contacto y Afiliación
            </h3>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Correo Institucional: <strong>cristian.verastegui@unez.edu.mx</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Número de Seguridad Social (IMSS): <strong>48190284920</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Campus: <strong>{student.campus}</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 rounded-lg transition-colors"
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  );
};

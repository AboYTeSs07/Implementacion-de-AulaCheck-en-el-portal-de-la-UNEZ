import React from 'react';
import { Newspaper, Calendar, Bell, ExternalLink, ArrowRight } from 'lucide-react';

export const NoticiasSection: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Apertura del periodo de reinscripciones ciclo Septiembre-Diciembre',
      summary: 'Revisa tu cita de inscripción y valida que tu estatus se encuentre Habilitado para seleccionar grupo en el portal.',
      date: '10 de Noviembre 2026',
      tag: 'Aviso Escolar',
    },
    {
      id: 2,
      title: 'Convocatoria de Becas de Excelencia Académica y Mérito Deportivo',
      summary: 'Alumnos con promedio acumulado superior a 90.00 pueden solicitar el formato oficial en ventanilla de Becas.',
      date: '05 de Noviembre 2026',
      tag: 'Becas',
    },
    {
      id: 3,
      title: 'Taller de Certificación en Cloud Computing y Ciberseguridad',
      summary: 'Registro abierto para estudiantes de 6° a 9° semestre de ISC. Sesiones sabatinas en Laboratorios del Edificio T.',
      date: '28 de Octubre 2026',
      tag: 'Eventos Académicos',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Noticias
        </h2>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Comunidad Universitaria UNEZ
        </span>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-600 transition-all flex flex-col justify-between space-y-2 group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-red-700 dark:text-amber-400 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded-sm">
                    {item.tag}
                  </span>
                  <span className="text-slate-400 font-mono">{item.date}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-2 group-hover:text-red-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-red-700 dark:text-amber-400 font-semibold cursor-pointer">
                <span>Leer comunicado</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

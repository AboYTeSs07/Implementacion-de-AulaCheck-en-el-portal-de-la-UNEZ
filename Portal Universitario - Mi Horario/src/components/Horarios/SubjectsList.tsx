import React from 'react';
import { Subject } from '../../types/portal';
import {
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface SubjectsListProps {
  subjects: Subject[];
  searchTerm: string;
  onSelectCourse: (subject: Subject) => void;
}

export const SubjectsList: React.FC<SubjectsListProps> = ({
  subjects,
  searchTerm,
  onSelectCourse,
}) => {
  const filteredSubjects = subjects.filter((sub) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      sub.name.toLowerCase().includes(term) ||
      sub.code.toLowerCase().includes(term) ||
      sub.nrc.includes(term) ||
      sub.professor.name.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            {/* Top Bar of Course Card */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                      {sub.code}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      NRC: {sub.nrc}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Grupo: <strong className="text-slate-800 dark:text-slate-200">{sub.group}</strong>
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-900">
                      {sub.credits} créditos
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectCourse(sub)}
                    className="text-base font-bold text-slate-900 dark:text-white mt-2 hover:text-red-700 dark:hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                  >
                    {sub.name}
                  </h3>
                </div>
              </div>

              {/* Schedule Slots Badges */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Horarios y Salones:
                </span>
                <div className="space-y-1">
                  {sub.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-lg p-2 text-slate-700 dark:text-slate-200"
                    >
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        <span>{slot.day}</span>
                        <span className="font-mono text-slate-500 dark:text-slate-400">
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-medium">{slot.classroom}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px]">({slot.modality})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professor Info */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-800 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xs shadow-2xs">
                    {sub.professor.name.split(' ')[0][0]}
                    {sub.professor.name.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {sub.professor.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate max-w-[200px]">
                      {sub.professor.office}
                    </span>
                  </div>
                </div>

                <a
                  href={`mailto:${sub.professor.email}`}
                  className="p-1.5 text-slate-400 hover:text-red-700 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title={`Enviar correo a ${sub.professor.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bottom Card Actions & Attendance */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Asistencia:</span>
                <span className="font-bold text-slate-900 dark:text-amber-400 font-mono">
                  {sub.attendancePercentage}%
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="flex items-center gap-2">
                {sub.virtualClassUrl && (
                  <a
                    href={sub.virtualClassUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 hover:text-red-700 dark:hover:text-amber-400 font-medium px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>Aula Virtual</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={() => onSelectCourse(sub)}
                  className="text-xs font-bold text-red-700 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-2.5 py-1 rounded-md transition-colors border border-red-200 dark:border-red-900/60"
                >
                  Ver Ficha Completa
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

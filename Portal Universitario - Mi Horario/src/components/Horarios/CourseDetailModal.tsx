import React, { useState } from 'react';
import { Subject, TimeSlot } from '../../types/portal';
import {
  X,
  BookOpen,
  MapPin,
  Clock,
  User,
  Mail,
  ExternalLink,
  Award,
  FileText,
  Save,
} from 'lucide-react';

interface CourseDetailModalProps {
  subject: Subject | null;
  selectedSlot?: TimeSlot;
  onClose: () => void;
  onSaveNotes?: (subjectId: string, notes: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  subject,
  selectedSlot,
  onClose,
  onSaveNotes,
}) => {
  if (!subject) return null;

  const [notes, setNotes] = useState(subject.notes || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    if (onSaveNotes) {
      onSaveNotes(subject.id, notes);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with subject color banner */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-sm">
              {subject.code}
            </span>
            <span className="text-slate-500 dark:text-slate-400">NRC: {subject.nrc}</span>
            <span className="text-slate-500 dark:text-slate-400">Grupo: {subject.group}</span>
            <span className="font-bold text-red-900 bg-red-100 dark:bg-red-950 dark:text-red-300 px-2 py-0.5 rounded-full border border-red-300 dark:border-red-800">
              {subject.credits} créditos
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2 pr-8 leading-snug">
            {subject.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Semestre {subject.semester}° · Plan de Estudios ISC-2020
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Scheduled Sessions */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Horarios y Espacios Asignados</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {subject.slots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs ${
                    selectedSlot?.day === slot.day && selectedSlot?.startTime === slot.startTime
                      ? 'bg-red-50/80 dark:bg-red-950/40 border-red-300 dark:border-red-800 ring-1 ring-red-300 dark:ring-red-800'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-100 mb-1">
                    <span>{slot.day}</span>
                    <span className="font-mono text-red-700 dark:text-amber-400">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{slot.classroom}</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {slot.building} · Modalidad {slot.modality}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professor Section */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Información del Catedrático</span>
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {subject.professor.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {subject.professor.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span>Cubículo: <strong className="text-slate-800 dark:text-slate-200">{subject.professor.office}</strong></span>
                  <span>·</span>
                  <span>Evaluación docente: <strong className="text-amber-600 dark:text-amber-400">★ {subject.professor.rating} / 5.0</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${subject.professor.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-amber-400 bg-white dark:bg-slate-800 border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Enviar Correo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Syllabus Topics */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Unidades Temáticas del Curso</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {subject.syllabusTopics.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50/60 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">
                    0{idx + 1}.
                  </span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evaluation Criteria */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Criterios de Evaluación</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {subject.evaluationCriteria.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-amber-400 block">
                    {item.percentage}%
                  </span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-0.5 leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Student Study Notes */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Mis Apuntes / Recordatorios Personales</span>
            </h3>
            <div className="space-y-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Añade notas sobre proyectos, lecturas recomendadas o tareas..."
                rows={3}
                className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-red-500 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {savedSuccess ? '✓ Guardado exitosamente' : 'Notas guardadas en tu sesión'}
                </span>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 rounded-lg transition-colors shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Notas</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Asistencia acumulada: <strong className="text-slate-900 dark:text-amber-400">{subject.attendancePercentage}%</strong>
          </div>

          <div className="flex items-center gap-2">
            {subject.virtualClassUrl && (
              <a
                href={subject.virtualClassUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-700 rounded-lg transition-colors"
              >
                <span>Acceder al Aula Virtual</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

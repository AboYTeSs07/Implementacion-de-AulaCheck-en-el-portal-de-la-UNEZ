import React from 'react';
import { Subject, StudentProfile } from '../../types/portal';
import { X, Printer, GraduationCap, QrCode } from 'lucide-react';

interface PrintScheduleModalProps {
  student: StudentProfile;
  subjects: Subject[];
  onClose: () => void;
}

export const PrintScheduleModal: React.FC<PrintScheduleModalProps> = ({
  student,
  subjects,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const totalCredits = subjects.reduce((acc, s) => acc + s.credits, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls (No print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold">
              Vista previa para impresión · Comprobante Oficial de Horario UNEZ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-amber-300 bg-red-700 hover:bg-red-600 rounded-lg transition-colors shadow-xs border border-red-800"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar como PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Cerrar vista previa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-8 sm:p-10 space-y-6 bg-white text-slate-900 max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Institutional Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-red-800 text-amber-400 flex items-center justify-center font-bold text-2xl shadow-xs border border-red-900">
                <GraduationCap className="w-9 h-9" />
              </div>
              <div>
                <h1 className="text-base font-extrabold uppercase tracking-tight text-slate-900">
                  UNIVERSIDAD EMILIANO ZAPATA (UNEZ)
                </h1>
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {student.address}
                </h2>
                <p className="text-[11px] text-slate-600 font-medium">
                  Comprobante Oficial de Horario ISC 7-N · Vigencia {student.period}
                </p>
              </div>
            </div>

            <div className="text-right text-xs font-mono">
              <span className="font-bold block text-slate-900">FOLIO: UNEZ-2026-131121</span>
              <span className="text-slate-500 block text-[10px]">Grupo: ISC 7-N · Nocturno</span>
              <span className="text-red-700 font-bold block text-[10px]">ESTATUS: {student.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Student Identification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Nombre del Alumno</span>
              <span className="font-bold text-slate-900 block">{student.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Matrícula / ID</span>
              <span className="font-bold font-mono text-slate-900 block">{student.matricula}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Programa Académico</span>
              <span className="font-bold text-slate-900 block">{student.program}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Grado / Turno</span>
              <span className="font-bold text-slate-900 block">{student.currentSemester}° Tetramestre · Nocturno</span>
            </div>
          </div>

          {/* Enrolled Courses Table */}
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-slate-200">Clave</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Nombre de la Asignatura</th>
                    <th className="py-2.5 px-2 text-center border-r border-slate-200">Gpo</th>
                    <th className="py-2.5 px-2 text-center border-r border-slate-200">Créd</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Bloques y Días</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Salón</th>
                    <th className="py-2.5 px-3">Docente Titular</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {subjects.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700 border-r border-slate-200">
                        {sub.code}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-900 border-r border-slate-200">
                        {sub.name}
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono border-r border-slate-200">
                        {sub.group}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold font-mono border-r border-slate-200">
                        {sub.credits}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600 border-r border-slate-200">
                        {sub.slots.map((s) => `${s.day.slice(0, 3)} ${s.blockCode} (${s.startTime}-${s.endTime})`).join(' / ')}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-700 font-medium border-r border-slate-200">
                        {sub.slots.map((s) => s.classroom).filter((v, i, a) => a.indexOf(v) === i).join(', ')}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-600">
                        {sub.professor.teacherNumber ? `${sub.professor.teacherNumber}. ` : ''}{sub.professor.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={3} className="py-2.5 px-3 text-right">
                      Total de Asignaturas: {subjects.length}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-emerald-800">
                      {totalCredits}
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 text-right text-slate-600">
                      Edificio 700 · Turno Nocturno 18:00 - 21:50 hrs
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Institutional Stamp & Barcode Area */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-xs">
            <div className="text-center space-y-12">
              <div className="border-b border-slate-400 w-3/4 mx-auto" />
              <div>
                <span className="font-bold block text-slate-800">{student.name}</span>
                <span className="text-[10px] text-slate-500 block">Firma del Alumno</span>
              </div>
            </div>

            <div className="text-center space-y-2 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-700 mx-auto flex items-center justify-center text-emerald-800 font-bold text-[9px]">
                UNEZ
              </div>
              <span className="font-bold text-[11px] text-slate-800 block">
                Control Escolar · Edificio 800
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block">
                VALIDADO ELECTRÓNICAMENTE
              </span>
            </div>

            <div className="flex items-center justify-end gap-3">
              <div className="p-2 border border-slate-200 rounded-lg bg-white">
                <QrCode className="w-16 h-16 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500 max-w-[120px]">
                Escanea para validar autenticidad de la inscripción en el portal UNEZ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

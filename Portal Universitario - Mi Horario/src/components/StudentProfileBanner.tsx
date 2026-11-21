import React, { useState } from 'react';
import { StudentProfile } from '../types/portal';
import { Camera, ChevronDown, ChevronUp } from 'lucide-react';

interface StudentProfileBannerProps {
  student: StudentProfile;
  onOpenReinscription: () => void;
  onOpenGrades: () => void;
  onChangePhoto?: () => void;
}

export const StudentProfileBanner: React.FC<StudentProfileBannerProps> = ({
  student,
  onOpenReinscription,
  onOpenGrades,
  onChangePhoto,
}) => {
  const [showAllPeriods, setShowAllPeriods] = useState<boolean>(false);

  const displayedPeriods = showAllPeriods
    ? student.academicHistory
    : student.academicHistory.slice(0, 2);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 md:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
      
      {/* Top Badges Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Blue Student Name Badge */}
          <div className="bg-[#0288d1] dark:bg-[#0284c7] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs uppercase tracking-tight">
            {student.name}
          </div>

          {/* Darker Blue Matricula Badge */}
          <div className="bg-[#0277bd] dark:bg-[#0369a1] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs font-mono">
            Matrícula N. {student.matricula}
          </div>
        </div>

        {/* Mustard Yellow Habilitado Badge on Right */}
        <div className="bg-[#b58900] dark:bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-sm shadow-2xs">
          {student.status}
        </div>
      </div>

      {/* Main Profile Grid: Photo | Periods Table | Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[160px_1fr_auto] gap-5 items-start">
        
        {/* 1. Student Photo Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="relative w-36 h-44 rounded-md overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-xs">
            {/* Displaying real student photo directly extracted from the screenshot */}
            <div
              className="w-full h-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${student.avatarUrl})`,
                backgroundPosition: '19.5% 26%',
                backgroundSize: '820%',
              }}
              role="img"
              aria-label={`Fotografía oficial de ${student.name}`}
            />
          </div>

          <button
            onClick={onChangePhoto}
            className="text-xs text-[#0288d1] dark:text-sky-400 hover:underline font-medium flex items-center gap-1"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Cambiar foto</span>
          </button>
        </div>

        {/* 2. Academic Periods Table Box */}
        <div className="space-y-2">
          <div className="border border-slate-300 dark:border-slate-700 rounded-sm overflow-hidden text-xs divide-y divide-slate-300 dark:divide-slate-700 bg-white dark:bg-[#0d121f]">
            {displayedPeriods.map((period, index) => (
              <div
                key={index}
                className="p-3 space-y-1.5 text-slate-800 dark:text-slate-200"
              >
                {/* Carrera */}
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-tight">
                  <span className="text-slate-600 dark:text-slate-400 font-normal">Carrera</span>
                  <span className="w-4 h-4 bg-black dark:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center rounded-xs shrink-0">
                    N
                  </span>
                  <span className="truncate">{period.carrera}</span>
                </div>

                {/* Ciclo */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Ciclo</span>
                  <span className="w-4 h-4 bg-black dark:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center rounded-xs shrink-0">
                    C
                  </span>
                  <span className="font-mono">{period.ciclo}</span>
                </div>

                {/* Periodo */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Periodo</span>
                  <span className="w-4 h-4 bg-black dark:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center rounded-xs shrink-0">
                    P
                  </span>
                  <span>{period.periodo}</span>
                </div>

                {/* Grado */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Grado</span>
                  <span className="font-mono font-bold">{period.grado}</span>
                </div>

                {/* Grupo */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Grupo</span>
                  <span className="w-4 h-4 bg-black dark:bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center rounded-xs shrink-0">
                    G
                  </span>
                  <span className="font-mono font-bold">{period.grupo}</span>
                </div>

                {/* Estado */}
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-slate-600 dark:text-slate-400">Estado</span>
                  <span className="bg-[#b58900] dark:bg-amber-600 text-white text-[11px] font-bold px-2 py-0.2 rounded-xs">
                    {period.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Button below: Ver más periodos */}
          <button
            onClick={() => setShowAllPeriods((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-700 transition-colors"
          >
            <span>{showAllPeriods ? 'Ocultar periodos anteriores' : 'Ver más periodos'}</span>
            {showAllPeriods ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>

        {/* 3. Action Buttons Column (Tangerine Orange) */}
        <div className="flex flex-col gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenReinscription}
            className="w-full sm:w-48 px-4 py-2.5 bg-[#f57c00] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-bold text-xs rounded-md shadow-xs transition-colors text-center"
          >
            Ficha de reinscripción
          </button>

          <button
            onClick={onOpenGrades}
            className="w-full sm:w-48 px-4 py-2.5 bg-[#f57c00] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-bold text-xs rounded-md shadow-xs transition-colors text-center"
          >
            Boleta de calificaciones
          </button>
        </div>

      </div>

    </div>
  );
};

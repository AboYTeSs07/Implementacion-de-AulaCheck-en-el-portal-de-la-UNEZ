import React from 'react';
import { Menu, Bell, Calendar, Sun, Moon } from 'lucide-react';
import { StudentProfile } from '../types/portal';

interface NavbarProps {
  student: StudentProfile;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  onOpenNotifications: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  selectedPeriod,
  onPeriodChange,
  onOpenNotifications,
  isDarkMode,
  onToggleTheme,
  onOpenMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Left: Mobile Sidebar Trigger & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileSidebar}
              className="p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden"
              aria-label="Abrir menú lateral"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight uppercase">
                Universidad Emiliano Zapata
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 ml-2">
                · Portal del Alumno · Ciclo {student.cycle}
              </span>
            </div>
          </div>

          {/* Right: Period Selector, Theme Switcher, Notifications */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Period Selector */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-[#c8102e]" />
              <span className="text-slate-500 dark:text-slate-400">Periodo:</span>
              <select
                aria-label="Ciclo Escolar"
                value={selectedPeriod}
                onChange={(e) => onPeriodChange(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-pointer"
              >
                <option value="Septiembre-Diciembre" className="dark:bg-slate-900">Septiembre-Diciembre (Vigente)</option>
                <option value="Mayo-Agosto" className="dark:bg-slate-900">Mayo-Agosto (Anterior)</option>
                <option value="Enero-Abril" className="dark:bg-slate-900">Enero-Abril (Histórico)</option>
              </select>
            </div>

            {/* Theme Toggle Button (Blanco / Negro - Light / Dark) */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs"
              title={isDarkMode ? 'Cambiar a Modo Blanco' : 'Cambiar a Modo Negro'}
              aria-label="Cambiar tema visual"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Modo Blanco</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden sm:inline">Modo Negro</span>
                </>
              )}
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Notificaciones escolares"
              aria-label="Notificaciones escolares"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

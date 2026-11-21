import React from 'react';
import {
  Home,
  User,
  CreditCard,
  Tag,
  Heart,
  X,
  ChevronDown,
  BookOpen,
  Atom,
  Settings,
  Star,
} from 'lucide-react';

export type SidebarNavOption = 'inicio' | 'datos-alumno' | 'pagos' | 'tickets' | 'servicio-social' | 'desconexion';

interface SidebarProps {
  activeNav: SidebarNavOption;
  onSelectNav: (nav: SidebarNavOption) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#c8102e] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static shrink-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          
          {/* University Crest Card (White background square as in screenshot) */}
          <div className="bg-white rounded-xl p-3 shadow-md border border-red-900/20 text-center select-none">
            <h2 className="text-xs font-black tracking-tight text-[#b91c1c] uppercase leading-tight">
              Universidad
            </h2>
            <h3 className="text-sm font-extrabold tracking-tight text-[#b91c1c] uppercase leading-tight">
              Emiliano Zapata
            </h3>

            {/* Crest Illustration Container */}
            <div className="my-2 mx-auto w-16 h-16 rounded-md border-2 border-black overflow-hidden grid grid-cols-2 grid-rows-2 bg-white relative shadow-xs">
              {/* Top Left: Book */}
              <div className="bg-white flex items-center justify-center border-r border-b border-black">
                <BookOpen className="w-5 h-5 text-black stroke-[2.2]" />
              </div>
              {/* Top Right: Yellow Star on Red */}
              <div className="bg-[#b91c1c] flex items-center justify-center border-b border-black">
                <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
              {/* Bottom Left: Science Atom on Black */}
              <div className="bg-black flex items-center justify-center border-r border-black">
                <Atom className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              {/* Bottom Right: Cogwheel / Technology */}
              <div className="bg-white flex items-center justify-center">
                <Settings className="w-5 h-5 text-black stroke-[2.2]" />
              </div>
            </div>

            {/* Slogan Banner */}
            <div className="bg-[#b91c1c] text-white text-[9px] font-bold py-0.5 px-2 rounded-xs tracking-wider uppercase">
              ser culto para ser libre
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Navegación del portal">
            
            {/* 1. Inicio (Active state has white background and red text/icon) */}
            <button
              onClick={() => {
                onSelectNav('inicio');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-l-full text-xs font-bold transition-all ${
                activeNav === 'inicio'
                  ? 'bg-white dark:bg-[#111827] text-[#c8102e] shadow-sm ml-2'
                  : 'text-white/90 hover:bg-red-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 stroke-[2.2]" />
                <span>Inicio</span>
              </div>
            </button>

            {/* 2. Datos alumno */}
            <button
              onClick={() => {
                onSelectNav('datos-alumno');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeNav === 'datos-alumno'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-white/90 hover:bg-red-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 stroke-[2]" />
                <span>Datos alumno</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/70" />
            </button>

            {/* 3. Pagos */}
            <button
              onClick={() => {
                onSelectNav('pagos');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeNav === 'pagos'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-white/90 hover:bg-red-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 stroke-[2]" />
                <span>Pagos</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/70" />
            </button>

            {/* 4. Tickets */}
            <button
              onClick={() => {
                onSelectNav('tickets');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeNav === 'tickets'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-white/90 hover:bg-red-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 stroke-[2]" />
                <span>Tickets</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white/70" />
            </button>

            {/* 5. Servicio Social */}
            <button
              onClick={() => {
                onSelectNav('servicio-social');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeNav === 'servicio-social'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-white/90 hover:bg-red-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 stroke-[2]" />
                <span>Servicio Social</span>
              </div>
            </button>

            {/* 6. Desconexión */}
            <button
              onClick={() => {
                onSelectNav('desconexion');
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeNav === 'desconexion'
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-white/90 hover:bg-red-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <X className="w-4 h-4 stroke-[2]" />
                <span>Desconexión</span>
              </div>
            </button>

          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-red-850/50 text-[10px] text-white/70 text-center">
          <span>Portal Institucional v2.4</span>
        </div>
      </aside>
    </>
  );
};

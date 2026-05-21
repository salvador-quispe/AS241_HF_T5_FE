import { NavLink } from "react-router-dom";
import AppIcon from "../ui/AppIcon";
import {
  UserCircleIcon,
  ArrowRight01Icon,
  BarChartHorizontalIcon,
  StudentIcon,
  Briefcase01Icon,
} from "../../constants/icons";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const NAV_ITEMS = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: BarChartHorizontalIcon,
    description: "Métricas y rendimiento",
  },
  {
    path: "/talento",
    label: "Talento",
    icon: StudentIcon,
    description: "Habilidades y brechas",
  },
  {
    path: "/habilidades-profesionales",
    label: "Habil. Profesionales",
    icon: Briefcase01Icon,
    description: "Blandas y técnicas",
  },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <aside 
      className={`h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 relative z-50 ${
        isCollapsed ? "w-[76px]" : "w-[250px]"
      }`}
    >
      {/* BOTÓN TOGGLE - Rediseñado de forma Ultra-Premium */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-7 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:border-[#003F87] hover:text-[#003F87] transition-all duration-300 z-50 cursor-pointer"
        aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
      >
        <AppIcon 
          icon={ArrowRight01Icon} 
          size={12} 
          className={`text-gray-400 group-hover:text-[#003F87] transition-transform duration-300 ${isCollapsed ? "" : "rotate-180"}`} 
        />
      </button>

      {/* 1. BRANDING - Moderno, Limpio y Minimalista */}
      <div className={`h-20 flex items-center px-5 border-b border-gray-100/80 ${isCollapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-[#003F87] to-[#0a52a3] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-blue-900/10">
           <div className="flex gap-0.5 items-end">
              <div className="w-1.5 h-3.5 bg-[#FDC003] rounded-full" />
              <div className="w-1.5 h-5 bg-white rounded-full animate-[pulse_2s_infinite_1s]" />
           </div>
        </div>
        {!isCollapsed && (
          <div className="ml-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <h1 className="text-base xl:text-lg font-bold tracking-tight text-[#003F87] leading-none">
              Talent<span className="text-[#FDC003]">Data</span>
            </h1>
            <p className="text-[9px] xl:text-[10px] font-bold text-gray-500 uppercase mt-1 tracking-wide whitespace-nowrap">Habilidades Profesionales</p>
          </div>
        )}
      </div>

      {/* 2. NAVEGACIÓN - Estructura Premium SaaS */}
      <div className="flex-1 px-3 py-4 flex flex-col">
        <nav className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-300 relative group
                ${isActive 
                  ? "bg-[#003F87]/6 text-[#003F87] font-bold animate-in fade-in duration-300" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }
                ${isCollapsed ? "justify-center px-0" : ""}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Indicador Activo Lateral */}
                  {isActive && !isCollapsed && (
                    <span className="absolute left-0 top-1/4 h-1/2 w-1 bg-[#003F87] rounded-r-full" />
                  )}
                  
                  {/* Icono */}
                  <AppIcon 
                    icon={item.icon} 
                    size={20} 
                    className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                      isActive ? "text-[#003F87]" : "text-gray-400 group-hover:text-gray-700"
                    }`} 
                  />
                  
                  {/* Texto */}
                  {!isCollapsed && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300 min-w-0">
                      <span className="text-sm xl:text-[15px] font-semibold tracking-tight leading-none">{item.label}</span>
                      <span className={`text-xs mt-1 font-medium ${
                        isActive ? "text-[#003F87]/80" : "text-gray-400 group-hover:text-gray-500"
                      }`}>{item.description}</span>
                    </div>
                  )}

                  {/* Tooltip en modo colapsado */}
                  {isCollapsed && (
                    <div className="absolute left-16 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 3. PERFIL ABAJO - Estilo Badge de Cuenta Premium */}
      <div className="p-3.5 border-t border-gray-100/80 bg-gray-50/30">
        <div className={`flex items-center gap-3 p-1.5 rounded-xl transition-all duration-300 hover:bg-gray-50 ${isCollapsed ? "justify-center p-0" : ""}`}>
          <div className="relative shrink-0">
            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-white border border-gray-100/80 flex items-center justify-center shadow-sm">
              <AppIcon icon={UserCircleIcon} size={22} className="text-[#003F87]" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-[0_0_6px_rgba(16,185,129,0.3)] animate-[pulse_2s_infinite]" />
          </div>
          
          {!isCollapsed && (
            <div className="min-w-0 flex-1 animate-in fade-in slide-in-from-left-2 duration-300">
              <p className="text-sm xl:text-[14px] font-bold text-gray-900 truncate leading-none">Carlos Smith</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
import AppIcon, { type AppIconDefinition } from "../components/ui/AppIcon";
import {
  StudentIcon,
  AnalyticsUpIcon,
  BrainIcon,
  ChartHistogramIcon,
  ArrowRight01Icon,
} from "../constants/icons";

// --- Types ---
interface KpiCard {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: AppIconDefinition;
  accent: string;
}

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  initials: string;
}

// --- Mock data ---
const KPI_CARDS: KpiCard[] = [
  {
    label: "Talentos Registrados",
    value: "1,284",
    delta: "+8.4% este mes",
    positive: true,
    icon: StudentIcon,
    accent: "#003F87",
  },
  {
    label: "Rendimiento Promedio",
    value: "87.3%",
    delta: "+2.1% vs anterior",
    positive: true,
    icon: AnalyticsUpIcon,
    accent: "#003F87",
  },
  {
    label: "Perfiles Analizados",
    value: "342",
    delta: "-3.2% esta semana",
    positive: false,
    icon: BrainIcon,
    accent: "#003F87",
  },
  {
    label: "Reportes Generados",
    value: "56",
    delta: "+12% este mes",
    positive: true,
    icon: ChartHistogramIcon,
    accent: "#003F87",
  },
];

const ACTIVITY: ActivityItem[] = [
  { id: 1, user: "Ana Torres", action: "Perfil actualizado en Talento Estudiantil", time: "Hace 5 min", initials: "AT" },
  { id: 2, user: "Carlos Smith", action: "Generó reporte mensual de rendimiento", time: "Hace 22 min", initials: "CS" },
  { id: 3, user: "Dario Ruiz", action: "Agregó 12 nuevos registros al sistema", time: "Hace 1 h", initials: "DR" },
  { id: 4, user: "Lucía Herrera", action: "Exportó datos del módulo Talento", time: "Hace 3 h", initials: "LH" },
  { id: 5, user: "Sistema", action: "Sincronización automática completada", time: "Hace 6 h", initials: "SI" },
];

const BAR_DATA = [
  { label: "Ene", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 52 },
  { label: "Abr", value: 90 },
  { label: "May", value: 84 },
  { label: "Jun", value: 70 },
  { label: "Jul", value: 95 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col xl:h-[calc(100vh-145px)] xl:overflow-hidden gap-6 animate-in fade-in duration-700">
      
      {/* 1. KPI CARDS - Diseño Compacto y Moderno */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 shrink-0">
        {KPI_CARDS.map((card) => (
          <div
            key={card.label}
            className="group relative bg-white rounded-2xl p-5 xl:p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3 xl:mb-2">
              <div 
                className="w-10 h-10 xl:w-11 xl:h-11 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: `${card.accent}10` }}
              >
                <AppIcon icon={card.icon} size={22} className="text-[#003F87]" />
              </div>
              <span className={`text-[10px] xl:text-xs font-bold px-2 py-0.5 rounded-lg ${
                card.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}>
                {card.delta}
              </span>
            </div>
            <p className="text-3xl xl:text-4xl font-extrabold text-gray-900 tracking-tight">{card.value}</p>
            <p className="text-xs xl:text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">{card.label}</p>
          </div>
        ))}
      </div>

      {/* 2. FILA PRINCIPAL: Gráfico y Actividad */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:flex-1 xl:min-h-0">
        
        {/* GRÁFICO DE RENDIMIENTO */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col xl:h-full xl:min-h-0">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h3 className="text-lg xl:text-xl font-bold text-gray-800 tracking-tight">Rendimiento Mensual</h3>
              <p className="text-sm text-gray-500 mt-0.5">Análisis comparativo de progreso institucional</p>
            </div>
            <select className="text-xs xl:text-sm font-bold border-none bg-gray-50 rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#003F87]/20">
              <option>Año 2024</option>
              <option>Año 2023</option>
            </select>
          </div>

          <div className="flex-1 min-h-0 flex items-end gap-3 xl:gap-4 px-2 h-64 xl:h-full">
            {BAR_DATA.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 xl:gap-3 group h-full justify-end min-h-0">
                <div className="relative w-full flex-1 flex flex-col items-center justify-end min-h-0">
                  {/* Tooltip on hover */}
                  <span className="absolute -top-8 bg-[#003F87] text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    {bar.value}%
                  </span>
                  {/* Barra */}
                  <div 
                    className="w-full max-w-[36px] xl:max-w-[40px] rounded-t-xl transition-all duration-500 bg-gray-100 group-hover:bg-[#003F87] shadow-sm"
                    style={{ height: `${bar.value}%` }}
                  >
                    {/* Indicador de Máximo */}
                    {bar.value === Math.max(...BAR_DATA.map(b => b.value)) && (
                      <div className="absolute top-0 w-full max-w-[36px] xl:max-w-[40px] h-1.5 bg-[#FDC003] rounded-t-xl" />
                    )}
                  </div>
                </div>
                <span className="text-xs xl:text-sm font-semibold text-gray-500 uppercase tracking-tighter shrink-0">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVIDAD RECIENTE */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col xl:h-full xl:min-h-0">
          <div className="flex items-center justify-between mb-4 xl:mb-6 shrink-0">
            <h3 className="text-lg xl:text-xl font-bold text-gray-800 tracking-tight">Actividad</h3>
            <button className="text-xs xl:text-sm font-bold text-[#003F87] hover:underline flex items-center gap-1">
              HISTORIAL <AppIcon icon={ArrowRight01Icon} size={12} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 min-h-0 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-center gap-3 group shrink-0 py-0.5">
                <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:border-[#FDC003] transition-colors">
                  <span className="text-xs font-black text-[#003F87]">{item.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm xl:text-[15px] font-bold text-gray-800 leading-none">{item.user}</p>
                  <p className="text-xs xl:text-sm text-gray-500 mt-1.5 truncate font-medium">{item.action}</p>
                </div>
                <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
          
          <button className="mt-4 w-full py-2.5 bg-gray-50 text-gray-600 hover:text-gray-900 text-xs xl:text-sm font-bold rounded-xl border border-dashed border-gray-200 hover:bg-gray-100 transition-colors uppercase tracking-wider shrink-0 cursor-pointer">
            Cargar más registros
          </button>
        </div>
      </div>

      {/* 3. MÓDULOS DEL SISTEMA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6 shrink-0">
        {[
          { title: "Módulo Talento", desc: "Gestión avanzada de perfiles.", status: "Activo", color: "emerald" },
          { title: "Módulo Reportes", desc: "Informes PDF y Excel.", status: "Desarrollo", color: "yellow" },
          { title: "Módulo IA", desc: "Predicción de habilidades.", status: "Próximamente", color: "gray" },
        ].map((mod) => (
          <div key={mod.title} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2.5 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm xl:text-base text-gray-800">{mod.title}</h4>
              <span className={`text-[10px] xl:text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-${mod.color}-50 text-${mod.color}-600`}>
                {mod.status}
              </span>
            </div>
            <p className="text-xs xl:text-sm text-gray-500 font-medium leading-relaxed">{mod.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

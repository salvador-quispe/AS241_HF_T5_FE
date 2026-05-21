import { useState, useEffect } from "react";
import api from "../api/axios";
import AppIcon from "../components/ui/AppIcon";
import {
  BrainIcon,
  StudentIcon,
  AnalyticsUpIcon,
  ChartHistogramIcon,
  Notification03Icon,
  Settings02Icon,
  Briefcase01Icon,
} from "../constants/icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface KpiData {
  total_estudiantes: number;
  promedio_general: number;
  satisfaccion_institucion_pct: number;
  interes_formacion_pct: number;
}

interface HabilidadPromedio {
  habilidad: string;
  promedio: number;
  nivel: string;
}

interface CategorizacionHabilidad {
  categoria: string;
  cantidad_estudiantes: number;
  porcentaje: number;
}

interface SatisfaccionDetalle {
  respuesta: string;
  cantidad: number;
  porcentaje: number;
}

interface DashboardData {
  indicadores_kpi: KpiData;
  promedios_habilidades: HabilidadPromedio[];
  habilidades_a_mejorar: CategorizacionHabilidad[];
  satisfaccion_institucion: SatisfaccionDetalle[];
  interes_formacion: SatisfaccionDetalle[];
  last_updated: string;
  analisis_insights: string;
}

export default function HabilidadesProfesionalesPage() {
  const [activeTab, setActiveTab] = useState<"blandas" | "tecnicas">("blandas");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async (force = false) => {
    try {
      if (force) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const endpoint = force 
        ? "/api/habilidades-blandas/dashboard?force_refresh=true"
        : "/api/habilidades-blandas/dashboard";
      
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err: any) {
      console.error("Error loading dashboard data", err);
      setError(
        "No se pudo conectar con el servidor. Por favor, verifica que el backend de FastAPI esté corriendo en el puerto 8000."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (activeTab === "blandas") {
      fetchDashboardData();
    }
  }, [activeTab]);

  const handleReload = async () => {
    try {
      setRefreshing(true);
      setError(null);
      await api.post("/api/habilidades-blandas/reload");
      await fetchDashboardData(false);
    } catch (err: any) {
      console.error("Error reloading cache", err);
      setError("Error al forzar la recarga de la caché. Reintentando...");
      fetchDashboardData(false);
    }
  };

  // Chart Color Palettes
  const COLORS = ["#003F87", "#0a52a3", "#FDC003", "#e6ad02", "#10B981", "#6EE7B7", "#6B7280"];

  return (
    <div className="flex flex-col gap-6 p-1 animate-in fade-in duration-700">
      
      {/* HEADER SECTION & TABS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100/80 shadow-sm shrink-0">
        <div>
          <h2 className="text-xl xl:text-2xl font-black text-gray-800 tracking-tight flex items-center gap-2">
            <AppIcon icon={Briefcase01Icon} className="text-[#003F87]" size={26} />
            Módulo Habilidades Profesionales
          </h2>
          <p className="text-xs xl:text-sm text-gray-500 font-semibold mt-1">
            Gestión y análisis de competencias blandas (Likert, satisfacción) y técnicas para el desarrollo profesional.
          </p>
        </div>
        
        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit shrink-0">
          <button
            onClick={() => setActiveTab("blandas")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs xl:text-sm transition-all cursor-pointer ${
              activeTab === "blandas"
                ? "bg-[#003F87] text-white shadow-sm"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <AppIcon icon={BrainIcon} size={16} />
            Habilidades Blandas
          </button>

          <button
            onClick={() => setActiveTab("tecnicas")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs xl:text-sm transition-all cursor-pointer ${
              activeTab === "tecnicas"
                ? "bg-[#003F87] text-white shadow-sm"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <AppIcon icon={Briefcase01Icon} size={16} />
            Habilidades Técnicas
          </button>
        </div>
      </div>

      {/* TAB CONTENT: HABILIDADES BLANDAS */}
      {activeTab === "blandas" && (
        <>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
              <div className="w-12 h-12 border-4 border-[#003F87] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 font-semibold animate-pulse">Cargando métricas de Habilidades Blandas...</p>
            </div>
          ) : error || !data ? (
            <div className="flex flex-col items-center justify-center h-[50vh] px-4 text-center gap-5">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-inner">
                <AppIcon icon={Notification03Icon} size={32} />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-gray-800">Error de Conexión</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{error}</p>
              </div>
              <button
                onClick={() => fetchDashboardData(false)}
                className="px-6 py-2.5 bg-[#003F87] hover:bg-[#0a52a3] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-900/10 cursor-pointer"
              >
                Reintentar Conexión
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-in fade-in duration-500">
              
              {/* UTILS & SYNCHRONIZATION BAR */}
              <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-gray-100">
                <span className="text-[10px] xl:text-xs text-gray-400 font-bold">
                  Última sincronización del Sheet: {data.last_updated}
                </span>
                <button
                  disabled={refreshing}
                  onClick={handleReload}
                  className={`flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50`}
                >
                  <AppIcon icon={Settings02Icon} size={14} className={refreshing ? "animate-spin" : ""} />
                  {refreshing ? "Actualizando..." : "Sincronizar Datos"}
                </button>
              </div>

              {/* KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                      <AppIcon icon={StudentIcon} size={20} className="text-[#003F87]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600">
                      Activo
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {data.indicadores_kpi.total_estudiantes}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                    Total Alumnos
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                      <AppIcon icon={AnalyticsUpIcon} size={20} className="text-[#003F87]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#FDC003]/10 text-[#e6ad02]">
                      Likert 1-5
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {data.indicadores_kpi.promedio_general.toFixed(2)}
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                    Promedio General
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                      <AppIcon icon={ChartHistogramIcon} size={20} className="text-[#003F87]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600">
                      Satisfacción
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {data.indicadores_kpi.satisfaccion_institucion_pct.toFixed(1)}%
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                    Preparación Institucional
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
                      <AppIcon icon={BrainIcon} size={20} className="text-[#003F87]" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-600">
                      Talleres
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {data.indicadores_kpi.interes_formacion_pct.toFixed(1)}%
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                    Interés en Formación
                  </p>
                </div>
              </div>

              {/* GRAPHS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Graph 1: Valoration Averages */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col min-h-[360px]">
                  <div className="mb-4">
                    <h3 className="text-base xl:text-lg font-bold text-gray-800 tracking-tight">Valoración de Habilidades</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Nivel de importancia asignado por cada competencia blanda</p>
                  </div>
                  <div className="flex-1 min-h-0 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={data.promedios_habilidades} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 5]} />
                        <YAxis dataKey="habilidad" type="category" width={140} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                        <Tooltip formatter={(value: any) => [`${value} / 5.0`, 'Promedio']} />
                        <Bar dataKey="promedio" radius={[0, 8, 8, 0]} barSize={16}>
                          {data.promedios_habilidades.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.promedio >= 4.5 ? "#003F87" : entry.promedio >= 4.0 ? "#0a52a3" : "#FDC003"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Graph 2: Satisfaction & Interest Detail */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between min-h-[360px]">
                  <div>
                    <h3 className="text-base xl:text-lg font-bold text-gray-800 tracking-tight">Percepción Institucional</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Talleres adicionales y preparación percibida</p>
                  </div>
                  
                  <div className="flex flex-col gap-6 py-2">
                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                        <span>¿Institución preparó adecuadamente?</span>
                        <span className="text-[#003F87]">{data.indicadores_kpi.satisfaccion_institucion_pct.toFixed(1)}% Sí</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#003F87] to-[#0a52a3] rounded-full" 
                          style={{ width: `${data.indicadores_kpi.satisfaccion_institucion_pct}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs font-bold text-gray-700 mb-2">
                        <span>¿Desea más capacitación?</span>
                        <span className="text-[#10B981]">{data.indicadores_kpi.interes_formacion_pct.toFixed(1)}% Sí</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#10B981] rounded-full" 
                          style={{ width: `${data.indicadores_kpi.interes_formacion_pct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                      El <strong>{data.indicadores_kpi.interes_formacion_pct.toFixed(1)}%</strong> de alumnos solicita más programas extracurriculares enfocados en liderazgo y comunicación.
                    </p>
                  </div>
                </div>

                {/* Graph 3: Skills to Improve */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-base xl:text-lg font-bold text-gray-800 tracking-tight">Habilidades Críticas a Mejorar</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Clasificación semántica de las respuestas de texto abierto</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex flex-col gap-2.5">
                      {data.habilidades_a_mejorar.map((item, index) => (
                        <div key={item.categoria} className="flex flex-col gap-1 p-2 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-all">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-gray-700 truncate max-w-[80%]">{item.categoria}</span>
                            <span className="font-bold text-[#003F87]">{item.porcentaje.toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${item.porcentaje}%`, 
                                backgroundColor: COLORS[index % COLORS.length] 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-56 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data.habilidades_a_mejorar}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="cantidad_estudiantes"
                            nameKey="categoria"
                          >
                            {data.habilidades_a_mejorar.map((item) => (
                              <Cell key={`cell-${item.categoria}`} fill={COLORS[data.habilidades_a_mejorar.indexOf(item) % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => [`${value} respuestas`, 'Frecuencia']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* INSIGHTS */}
              <div className="bg-gradient-to-r from-[#003F87] to-[#0a52a3] text-white p-5 rounded-2xl shadow-lg shrink-0">
                <div className="flex items-center gap-2 mb-2.5">
                  <AppIcon icon={BrainIcon} size={20} className="text-[#FDC003]" />
                  <h4 className="font-extrabold text-base tracking-tight">Insights Estratégicos</h4>
                </div>
                <p className="text-xs xl:text-sm leading-relaxed text-white/95 font-medium">
                  {data.analisis_insights}
                </p>
              </div>

            </div>
          )}
        </>
      )}

      {/* TAB CONTENT: HABILIDADES TÉCNICAS (PLACEHOLDER FOR CLASSMATE) */}
      {activeTab === "tecnicas" && (
        <div className="bg-white p-10 rounded-2xl border border-gray-100/80 shadow-sm text-center flex flex-col items-center justify-center min-h-[50vh] gap-6 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center border border-dashed border-gray-300">
            <AppIcon icon={Briefcase01Icon} size={40} className="text-gray-400" />
          </div>
          
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-gray-800">Espacio Reservado para Habilidades Técnicas</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Esta sección está preparada para albergar los análisis y gráficos interactivos referentes a las competencias duras (tecnologías, lenguajes, frameworks y bases de datos).
            </p>
          </div>

          {/* Simple Mock Structure to visualize the future layout */}
          <div className="w-full max-w-lg grid grid-cols-3 gap-4 border border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50/50 mt-2">
            <div className="h-20 bg-white rounded-xl border border-gray-100 flex flex-col justify-center items-center p-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase">React / Frontend</span>
              <span className="text-lg font-black text-gray-400 mt-1">--%</span>
            </div>
            <div className="h-20 bg-white rounded-xl border border-gray-100 flex flex-col justify-center items-center p-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase">SQL / Databases</span>
              <span className="text-lg font-black text-gray-400 mt-1">--%</span>
            </div>
            <div className="h-20 bg-white rounded-xl border border-gray-100 flex flex-col justify-center items-center p-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Backend / Python</span>
              <span className="text-lg font-black text-gray-400 mt-1">--%</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

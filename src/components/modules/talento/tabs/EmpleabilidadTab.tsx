import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

import type { EmpleabilidadDashboard } from "../types";

interface EmpleabilidadTabProps {
  data: EmpleabilidadDashboard | null;
  isLoading: boolean;
}

const BLUE = "#003F87";
const YELLOW = "#FDC003";
const LIGHT_BLUE = "#4B7BB5";
const DARK_YELLOW = "#B98700";
const COLORS = [BLUE, YELLOW, LIGHT_BLUE, DARK_YELLOW];

function pct(value = 0) {
  return `${Number(value).toFixed(1)}%`;
}

function sc(value = 0) {
  return Number(value).toFixed(2);
}

function LoadingState() {
  return (
    <div className="grid h-full grid-cols-4 gap-3 p-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-lg border border-dashed border-gray-200 bg-white/50 px-6 py-10 text-center">
        <p className="text-sm font-semibold text-gray-400">Sin datos de empleabilidad para mostrar.</p>
      </div>
    </div>
  );
}

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col rounded-lg border border-gray-100 bg-white shadow-sm ${className}`}>
      <div className="border-b border-gray-50 px-4 py-2">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="flex min-h-0 flex-1 px-4 pb-3 pt-2">{children}</div>
    </div>
  );
}

function KpiStrip({ data }: { data: EmpleabilidadDashboard }) {
  const items = [
    { value: sc(data.indicador_general_empleabilidad.promedio_general), label: "Indicador general", accent: "text-[#003F87]" },
    { value: sc(data.nivel_preparacion_mercado.promedio), label: "Prep. mercado", accent: "text-[#003F87]" },
    { value: sc(data.preparacion_institucional.promedio), label: "Prep. institucional", accent: "text-[#003F87]" },
    { value: pct(data.estudiantes_listos_mercado.porcentaje), label: "Listos mercado", accent: "text-emerald-700" },
    { value: pct(data.estudiantes_insuficiente_preparacion.porcentaje), label: "Prep. insuficiente", accent: "text-[#B98700]" },
    { value: pct(data.practicas_preprofesionales.porcentaje_con_practicas), label: "Con practicas", accent: "text-[#003F87]" },
  ];
  return (
    <div className="flex shrink-0 items-stretch gap-2">
      {items.map((kpi) => (
        <div key={kpi.label} className="flex flex-1 items-center gap-2 rounded-lg border border-gray-100 bg-white px-4 py-3 shadow-sm">
          <div className="leading-tight">
            <p className={`text-lg font-bold ${kpi.accent}`}>{kpi.value}</p>
            <p className="text-xs font-medium text-gray-400">{kpi.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DistBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-600">{label}</span>
      <div className="h-3.5 w-24 overflow-hidden rounded-full bg-gray-50">
        <div className="h-full rounded-full" style={{ width: `${Math.max((value / max) * 100, 4)}%`, backgroundColor: color }} />
      </div>
      <span className="w-6 text-right text-sm font-bold text-gray-700">{value}</span>
    </div>
  );
}

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-3 py-1.5">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Anterior
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold transition-colors ${
              page === i + 1 ? "bg-[#003F87] text-white" : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= total}
        className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Siguiente →
      </button>
    </div>
  );
}

function validateData(data: EmpleabilidadDashboard) {
  const warnings: string[] = [];
  const totalPrepM = Object.values(data.nivel_preparacion_mercado.distribucion).reduce((s, v) => s + v, 0);
  const totalPrepI = Object.values(data.preparacion_institucional.distribucion).reduce((s, v) => s + v, 0);
  if (totalPrepM !== totalPrepI) warnings.push(`Distribuciones inconsistentes: prep_mercado=${totalPrepM} prep_inst=${totalPrepI}`);
  if (data.dificultad_conseguir_trabajo.items.length === 0) warnings.push("dificultad_conseguir_trabajo vacio");
  if (data.ranking_habilidades_valoradas.items.length === 0) warnings.push("ranking_habilidades_valoradas vacio");
  if (data.ranking_habilidades_debiles.items.length === 0) warnings.push("ranking_habilidades_debiles vacio");
  if (data.comparacion_carrera.items.length === 0) warnings.push("comparacion_carrera vacio");
  if (data.comparacion_semestre.items.length === 0) warnings.push("comparacion_semestre vacio");
  const renderedFields = [
    "indicador_general_empleabilidad", "nivel_preparacion_mercado", "preparacion_institucional",
    "estudiantes_listos_mercado", "estudiantes_insuficiente_preparacion", "practicas_preprofesionales",
    "dificultad_conseguir_trabajo", "interes_formacion", "importancia_comunicacion",
    "importancia_trabajo_equipo", "importancia_resolucion_problemas", "importancia_adaptabilidad",
    "importancia_organizacion_tiempo", "importancia_centro_evaluacion", "ranking_habilidades_valoradas",
    "ranking_habilidades_debiles", "comparacion_carrera", "comparacion_semestre",
  ];
  const allFields = Object.keys(data);
  const missing = allFields.filter(f => !renderedFields.includes(f));
  if (missing.length > 0) warnings.push(`Campos del JSON no renderizados: ${missing.join(", ")}`);
  if (warnings.length > 0) console.warn("[EmpleabilidadTab] Data validation:", warnings);
  else console.log("[EmpleabilidadTab] All data validated OK");
}

export default function EmpleabilidadTab({ data, isLoading }: EmpleabilidadTabProps) {
  const [page, setPage] = useState(1);
  const totalPages = 2;

  useEffect(() => { if (data) validateData(data); }, [data]);

  if (isLoading) return <LoadingState />;
  if (!data) return <EmptyState />;

  const difficultyData = data.dificultad_conseguir_trabajo.items.map((item) => ({
    label: item.dificultad,
    value: item.porcentaje,
  }));
  const practicesData = [
    { name: "Con practicas", value: data.practicas_preprofesionales.con_practicas },
    { name: "Sin practicas", value: data.practicas_preprofesionales.sin_practicas },
  ];
  const valuedData = data.ranking_habilidades_valoradas.items.map((item) => ({ label: item.habilidad, value: item.promedio }));
  const weakData = data.ranking_habilidades_debiles.items.map((item) => ({ label: item.habilidad, value: item.promedio }));
  const careerData = data.comparacion_carrera.items.map((item) => ({ name: item.carrera, value: item.promedio }));
  const semesterData = data.comparacion_semestre.items.map((item) => ({ name: String(item.semestre), value: item.promedio }));
  const prepMercadoDist = Object.entries(data.nivel_preparacion_mercado.distribucion).map(([name, value]) => ({ name, value: Number(value) }));
  const prepInstDist = Object.entries(data.preparacion_institucional.distribucion).map(([name, value]) => ({ name, value: Number(value) }));

  const importancia = [
    { label: "Comunicacion", value: data.importancia_comunicacion.promedio },
    { label: "Trabajo equipo", value: data.importancia_trabajo_equipo.promedio },
    { label: "Resol. problemas", value: data.importancia_resolucion_problemas.promedio },
    { label: "Adaptabilidad", value: data.importancia_adaptabilidad.promedio },
    { label: "Organizacion", value: data.importancia_organizacion_tiempo.promedio },
    { label: "Centro evaluac.", value: data.importancia_centro_evaluacion.promedio },
  ];
  const impMax = Math.max(...importancia.map((d) => d.value), 1);

  const difficultyMax = Math.max(...difficultyData.map((d) => d.value), 1);
  const prepMercadoMax = Math.max(...prepMercadoDist.map((d) => d.value), 1);
  const prepInstMax = Math.max(...prepInstDist.map((d) => d.value), 1);
  const careerMax = Math.max(...careerData.map((d) => d.value), 1);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-1">
        <KpiStrip data={data} />

        {page === 1 && (
          <div className="grid flex-1 grid-cols-12 grid-rows-2 gap-2.5">
          <Section title="Dificultad para conseguir trabajo" className="col-span-4">
            <div className="flex w-full flex-col justify-center gap-1">
              {difficultyData.map((item) => (
                <div key={item.label} className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-2">
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-50">
                    <div className="h-full rounded-full" style={{ width: `${(item.value / difficultyMax) * 100}%`, backgroundColor: YELLOW }} />
                  </div>
                  <span className="w-20 text-right text-xs font-semibold text-gray-700">{item.label} {item.value.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Practicas preprofesionales" className="col-span-2">
            <div className="relative flex h-full w-full items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={practicesData} dataKey="value" nameKey="name" innerRadius={36} outerRadius={52} paddingAngle={2} strokeWidth={0}>
                    {practicesData.map((entry, i) => (<Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="none" />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-900">{pct(data.practicas_preprofesionales.porcentaje_con_practicas)}</span>
                <span className="text-xs font-semibold text-gray-400">con pract.</span>
              </div>
            </div>
          </Section>

          <Section title="Interes en formacion complementaria" className="col-span-3">
            <div className="flex w-full items-center justify-center">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#003F87]">{data.interes_formacion.si}</p>
                  <p className="text-xs font-medium text-gray-500">Interesados</p>
                  <p className="text-base font-bold text-gray-900">{pct(data.interes_formacion.porcentaje_interes)}</p>
                </div>
                <div className="h-14 w-px bg-gray-100" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-400">{data.interes_formacion.no}</p>
                  <p className="text-xs font-medium text-gray-500">No interesados</p>
                  <p className="text-base font-bold text-gray-400">{pct(100 - data.interes_formacion.porcentaje_interes)}</p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Importancia de competencias" className="col-span-3">
            <div className="flex w-full flex-col justify-center gap-1">
              {importancia.map((imp) => (
                <div key={imp.label} className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-2">
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-50">
                    <div className="h-full rounded-full" style={{ width: `${(imp.value / impMax) * 100}%`, backgroundColor: BLUE }} />
                  </div>
                  <span className="w-28 text-right text-xs font-semibold text-gray-600">{imp.label} {imp.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Habilidades mas valoradas" className="col-span-3">
            <div className="flex h-full w-full flex-col justify-between">
              {valuedData.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-4 text-center text-xs font-bold ${i < 3 ? "text-[#003F87]" : "text-gray-300"}`}>{i + 1}</span>
                  <span className="flex-1 truncate text-xs font-medium text-gray-700">{item.label}</span>
                  <span className="text-xs font-bold text-[#003F87]">{item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Habilidades mas debiles" className="col-span-3">
            <div className="flex h-full w-full flex-col justify-between">
              {weakData.map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-4 text-center text-xs font-bold ${i < 3 ? "text-[#B98700]" : "text-gray-300"}`}>{i + 1}</span>
                  <span className="flex-1 truncate text-xs font-medium text-gray-700">{item.label}</span>
                  <span className="text-xs font-bold text-[#B98700]">{item.value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Prep. mercado laboral" className="col-span-3">
            <div className="flex w-full flex-col justify-center gap-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-bold text-[#003F87]">{sc(data.nivel_preparacion_mercado.promedio)}</span>
                <span className="text-xs font-medium text-gray-400">Promedio</span>
              </div>
              {prepMercadoDist.map((d) => <DistBar key={d.name} label={d.name} value={d.value} max={prepMercadoMax} color={BLUE} />)}
            </div>
          </Section>

          <Section title="Prep. institucional" className="col-span-3">
            <div className="flex w-full flex-col justify-center gap-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-bold text-[#003F87]">{sc(data.preparacion_institucional.promedio)}</span>
                <span className="text-xs font-medium text-gray-400">Promedio</span>
              </div>
              {prepInstDist.map((d) => <DistBar key={d.name} label={d.name} value={d.value} max={prepInstMax} color={YELLOW} />)}
            </div>
          </Section>
        </div>
      )}

      {page === 2 && (
        <div className="grid grid-cols-12 gap-2.5">
          <Section title="Comparacion por carrera" className="col-span-6">
            {careerData.length === 1 ? (
              <div className="flex h-64 w-full flex-col items-center justify-center gap-2">
                <div className="rounded-full bg-[#003F87]/10 p-6">
                  <p className="text-3xl font-bold text-[#003F87]">{careerData[0].value.toFixed(2)}</p>
                </div>
                <p className="text-sm font-medium text-gray-600">{careerData[0].name}</p>
                <p className="text-xs text-gray-400">Una sola carrera — sin datos para comparar</p>
              </div>
            ) : (
            <div className="flex h-64 w-full items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={careerData} margin={{ top: 10, bottom: 20, left: 0, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} angle={-15} textAnchor="end" height={50} />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="value" fill={BLUE} radius={[6, 6, 0, 0]} maxBarSize={80} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            )}
          </Section>

          <Section title="Indicador y nivel" className="col-span-6">
            <div className="flex h-64 w-full items-center justify-center gap-16">
              <div className="text-center">
                <p className="text-5xl font-bold text-[#003F87]">{sc(data.indicador_general_empleabilidad.promedio_general)}</p>
                <p className="text-sm font-medium text-gray-500">Promedio general</p>
              </div>
              <div className="h-20 w-px bg-gray-100" />
              <div className="text-center">
                <p className="text-4xl font-bold text-[#B98700]">{data.indicador_general_empleabilidad.nivel}</p>
                <p className="text-sm font-medium text-gray-500">Nivel actual</p>
              </div>
            </div>
          </Section>

          <Section title="Comparacion por semestre" className="col-span-12">
            <div className="flex h-64 w-full items-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={semesterData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="empSemGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BLUE} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke={BLUE} strokeWidth={3} fill="url(#empSemGrad)" dot={{ fill: BLUE, r: 6, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 8 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>
      )}
      </div>
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}

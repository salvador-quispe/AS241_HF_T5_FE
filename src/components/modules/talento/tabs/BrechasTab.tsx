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
  RadialBarChart,
  RadialBar,
  CartesianGrid,
} from "recharts";

import type { BrechasDashboard } from "../types";

interface BrechasTabProps {
  data: BrechasDashboard | null;
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

function cleanLabel(label: string): string {
  return label.replace(/[)\]]+$/, "").trim();
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
        <p className="text-sm font-semibold text-gray-400">Sin datos de brechas para mostrar.</p>
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

function KpiStrip({ data }: { data: BrechasDashboard }) {
  const items = [
    { value: sc(data.nivel_conocimientos_tecnicos.promedio), label: "Conoc. tecnico", accent: "text-[#003F87]" },
    { value: sc(data.nivel_dominio_digital.promedio), label: "Dom. digital", accent: "text-[#003F87]" },
    { value: pct(data.formacion_digital.porcentaje_con_formacion), label: "Form. digital", accent: "text-[#B98700]" },
    { value: `${data.brecha_tecnica_promedio.minimo}-${data.brecha_tecnica_promedio.maximo}`, label: "Brecha tecnica", accent: "text-gray-500" },
    { value: `${data.brecha_digital_promedio.minimo}-${data.brecha_digital_promedio.maximo}`, label: "Brecha digital", accent: "text-gray-500" },
    { value: pct(data.uso_herramientas_carrera.porcentaje_uso_frecuente), label: "Uso frecuente", accent: "text-[#003F87]" },
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
    <div className="flex items-center gap-2.5">
      <span className="w-6 text-right text-sm font-semibold text-gray-500">{label}</span>
      <div className="h-3.5 flex-1 overflow-hidden rounded-full bg-gray-50">
        <div className="h-full rounded-full" style={{ width: `${Math.max((value / max) * 100, 4)}%`, backgroundColor: color }} />
      </div>
      <span className="w-7 text-right text-sm font-bold text-gray-700">{value}</span>
    </div>
  );
}

function AlertCard({ value, label, subtitle }: { value: string; label: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-200">
        <span className="text-sm font-bold text-amber-700">!</span>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold text-amber-800">{value}</p>
        <p className="text-xs font-medium text-amber-600">{label}</p>
        <p className="text-xs text-amber-500">{subtitle}</p>
      </div>
    </div>
  );
}

function SplitBar({ a, b, labelA, labelB, colorA = BLUE, colorB = "#E5E7EB" }: { a: number; b: number; labelA: string; labelB: string; colorA?: string; colorB?: string }) {
  const total = a + b || 1;
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="flex h-8 w-full overflow-hidden rounded-full bg-gray-50">
        <div className="flex items-center justify-center text-xs font-bold text-white" style={{ width: `${(a / total) * 100}%`, backgroundColor: colorA, minWidth: 44 }}>{a}</div>
        <div className="flex items-center justify-center text-xs font-semibold text-gray-500" style={{ width: `${(b / total) * 100}%`, backgroundColor: colorB, minWidth: 44 }}>{b}</div>
      </div>
      <div className="flex justify-between text-xs font-medium text-gray-400">
        <span>{labelA} ({pct((a / total) * 100)})</span>
        <span>{labelB} ({pct((b / total) * 100)})</span>
      </div>
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

function validateData(data: BrechasDashboard) {
  const warnings: string[] = [];
  const totalTec = Object.values(data.nivel_conocimientos_tecnicos.distribucion).reduce((s, v) => s + v, 0);
  const totalDig = Object.values(data.nivel_dominio_digital.distribucion).reduce((s, v) => s + v, 0);
  const totalPrep = Object.values(data.preparacion_laboral.distribucion).reduce((s, v) => s + v, 0);
  const totalFreq = Object.values(data.frecuencia_uso_digital.frecuencia).reduce((s, v) => s + v, 0);
  const totalUso = Object.values(data.uso_herramientas_carrera.distribucion).reduce((s, v) => s + v, 0);
  const totals = [totalTec, totalDig, totalPrep, totalFreq, totalUso];
  if (new Set(totals).size > 1) warnings.push(`Distribuciones inconsistentes: tec=${totalTec} dig=${totalDig} prep=${totalPrep} freq=${totalFreq} uso=${totalUso}`);
  const frecVal = Object.entries(data.uso_herramientas_carrera.distribucion).find(([k]) => k.toLowerCase().includes("frecuente"))?.[1] || 0;
  const siempreVal = Object.entries(data.uso_herramientas_carrera.distribucion).find(([k]) => k.toLowerCase().includes("siempre"))?.[1] || 0;
  const calcPct = totalUso > 0 ? ((frecVal + siempreVal) / totalUso) * 100 : 0;
  if (Math.abs(calcPct - data.uso_herramientas_carrera.porcentaje_uso_frecuente) > 1) warnings.push(`uso_frecuente ${data.uso_herramientas_carrera.porcentaje_uso_frecuente}% vs calculado ${calcPct.toFixed(1)}%`);
  if (data.herramientas_mas_usadas.items.length === 0) warnings.push("herramientas_mas_usadas vacio");
  if (data.habilidades_mejorar.items.length === 0) warnings.push("habilidades_mejorar vacio");
  if (data.comparacion_carrera.items.length === 0) warnings.push("comparacion_carrera vacio");
  if (data.comparacion_semestre.items.length === 0) warnings.push("comparacion_semestre vacio");
  if (data.comparacion_edad.items.length === 0) warnings.push("comparacion_edad vacio");
  if (warnings.length > 0) console.warn("[BrechasTab] Data validation:", warnings);
}

export default function BrechasTab({ data, isLoading }: BrechasTabProps) {
  const [page, setPage] = useState(1);
  const totalPages = 2;

  useEffect(() => { if (data) validateData(data); }, [data]);

  if (isLoading) return <LoadingState />;
  if (!data) return <EmptyState />;

  const tecDist = Object.entries(data.nivel_conocimientos_tecnicos.distribucion).map(([k, v]) => ({ label: `N${k}`, value: Number(v) }));
  const digDist = Object.entries(data.nivel_dominio_digital.distribucion).map(([k, v]) => ({ label: `N${k}`, value: Number(v) }));
  const tecMax = Math.max(...tecDist.map((d) => d.value), 1);
  const digMax = Math.max(...digDist.map((d) => d.value), 1);
  const prepDist = Object.entries(data.preparacion_laboral.distribucion).map(([k, v]) => ({ name: `N${k}`, value: Number(v) }));
  const frequencyData = Object.entries(data.frecuencia_uso_digital.frecuencia).map(([label, value]) => ({ label, value: Number(value) }));
  const toolsData = data.herramientas_mas_usadas.items.map((item) => ({ label: cleanLabel(item.herramienta), value: item.conteo }));
  const skillsData = data.habilidades_mejorar.items.map((item) => ({ label: item.habilidad, value: item.conteo }));
  const usageDist = Object.entries(data.uso_herramientas_carrera.distribucion).map(([k, v]) => ({ name: k.charAt(0).toUpperCase() + k.slice(1), value: v }));
  const softSkills = [
    { label: "Comunicacion", value: data.brecha_habilidades_blandas.promedio_comunicacion },
    { label: "Trabajo equipo", value: data.brecha_habilidades_blandas.promedio_trabajo_equipo },
    { label: "Resol. problemas", value: data.brecha_habilidades_blandas.promedio_resolucion_problemas },
    { label: "Adaptabilidad", value: data.brecha_habilidades_blandas.promedio_adaptabilidad },
    { label: "Organizacion", value: data.brecha_habilidades_blandas.promedio_organizacion },
  ];
  const careerData = data.comparacion_carrera.items.map((item) => ({ name: item.carrera, value: item.promedio }));
  const semesterData = data.comparacion_semestre.items.map((item) => ({ name: String(item.semestre), value: item.promedio }));
  const ageData = data.comparacion_edad.items.map((item) => ({ name: item.grupo_edad, value: item.promedio }));
  const freqTotal = frequencyData.reduce((s, d) => s + d.value, 0);
  const usageTotal = usageDist.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-1">
        <KpiStrip data={data} />

        {page === 1 && (
        <div className="grid flex-1 grid-cols-12 grid-rows-2 gap-2.5">
          <Section title="Distribucion de conocimientos" className="col-span-5">
            <div className="flex w-full flex-col gap-3">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-gray-500">Conocimiento tecnico &mdash; Prom. {sc(data.nivel_conocimientos_tecnicos.promedio)}</p>
                <div className="space-y-1">
                  {tecDist.map((d) => <DistBar key={d.label} label={d.label} value={d.value} max={tecMax} color={BLUE} />)}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-gray-500">Dominio digital &mdash; Prom. {sc(data.nivel_dominio_digital.promedio)}</p>
                <div className="space-y-1">
                  {digDist.map((d) => <DistBar key={d.label} label={d.label} value={d.value} max={digMax} color={YELLOW} />)}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Formacion y alertas" className="col-span-3">
            <div className="flex w-full flex-col gap-3">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-gray-500">Formacion digital</p>
                <SplitBar a={data.formacion_digital.con_formacion} b={data.formacion_digital.sin_formacion} labelA="Con formacion" labelB="Sin formacion" colorA={BLUE} colorB={DARK_YELLOW} />
              </div>
              <AlertCard
                value={pct(data.estudiantes_sin_formacion_digital.porcentaje)}
                label="Sin formacion digital"
                subtitle={`${data.estudiantes_sin_formacion_digital.cantidad} estudiantes`}
              />
              <AlertCard
                value={pct(data.estudiantes_bajo_dominio_tecnologico.porcentaje)}
                label="Bajo dominio tecnologico"
                subtitle={`${data.estudiantes_bajo_dominio_tecnologico.cantidad} estudiantes`}
              />
            </div>
          </Section>

          <Section title="Preparacion laboral" className="col-span-4">
            <div className="flex w-full flex-col gap-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#003F87]">{sc(data.preparacion_laboral.promedio)}</span>
                <span className="text-xs font-medium text-gray-400">Promedio general</span>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prepDist} margin={{ top: 6, bottom: 0, left: 0, right: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="value" fill={BLUE} radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Section>

          <Section title="Habilidades a mejorar" className="col-span-4">
            <div className="flex h-full w-full flex-col justify-between">
              {skillsData.map((item) => {
                const max = Math.max(...skillsData.map((d) => d.value), 1);
                return (
                  <div key={item.label} className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-2">
                    <span className="truncate text-xs font-medium text-gray-600">{item.label}</span>
                    <div className="h-2.5 overflow-hidden rounded-full bg-gray-50">
                      <div className="h-full rounded-full" style={{ width: `${(item.value / max) * 100}%`, backgroundColor: BLUE }} />
                    </div>
                    <span className="text-right text-xs font-semibold text-gray-700">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title="Herramientas mas usadas" className="col-span-5">
            <div className="flex h-full w-full flex-col justify-between">
              {toolsData.map((item, i) => {
                const topValue = toolsData[0]?.value ?? 1;
                return (
                  <div key={item.label} className="group relative grid min-w-0 grid-cols-[16px_1fr_auto] items-center gap-1.5">
                    <span className={`text-center text-xs font-bold ${i < 3 ? "text-[#003F87]" : "text-gray-300"}`}>{i + 1}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-700">{item.label || "(sin nombre)"}</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-50">
                        <div className="h-full rounded-full" style={{ width: `${Math.max((item.value / topValue) * 100, 4)}%`, backgroundColor: i < 3 ? BLUE : LIGHT_BLUE }} />
                      </div>
                    </div>
                    <span className="w-6 text-right text-xs font-bold text-gray-700">{item.value}</span>
                    {item.label.length > 25 && (
                      <div className="pointer-events-none absolute left-0 top-full z-10 hidden rounded-md border border-gray-200 bg-white px-2 py-1 text-xs shadow-md group-hover:block">
                        {item.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title="Frecuencia de uso" className="col-span-3">
            <div className="flex w-full flex-col justify-center gap-2.5">
              <div className="flex h-7 w-full overflow-hidden rounded-full bg-gray-50">
                {frequencyData.map((item, i) => (
                  <div key={item.label} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${(item.value / freqTotal) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {frequencyData.map((item, i) => (
                  <span key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    {item.label} {item.value}
                  </span>
                ))}
              </div>
            </div>
          </Section>
        </div>
      )}

      {page === 2 && (
        <div className="grid grid-cols-12 gap-2.5">
          <Section title="Uso de herramientas por carrera" className="col-span-4">
            <div className="relative flex h-64 w-full items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={usageDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} strokeWidth={0}>
                    {usageDist.map((entry, i) => (<Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="none" />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-gray-900">{usageDist.reduce((s, d) => s + d.value, 0)}</span>
                <span className="text-xs text-gray-400">total respuestas</span>
              </div>
            </div>
          </Section>

          <Section title="Habilidades blandas" className="col-span-4">
            <div className="flex h-64 w-full flex-col justify-center gap-3">
              {softSkills.map((s) => {
                const pctVal = (s.value / 5) * 100;
                const c = pctVal > 60 ? BLUE : pctVal > 40 ? YELLOW : DARK_YELLOW;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="w-28 truncate text-sm font-medium text-gray-600">{s.label}</span>
                    <div className="flex-1">
                      <div className="h-4 overflow-hidden rounded-full bg-gray-50">
                        <div className="h-full rounded-full" style={{ width: `${pctVal}%`, backgroundColor: c }} />
                      </div>
                    </div>
                    <span className="w-12 text-right text-sm font-bold text-gray-700">{s.value.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section title="Comparacion por carrera" className="col-span-4">
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

          <Section title="Comparacion por semestre" className="col-span-6">
            <div className="flex h-64 w-full items-center">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={semesterData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="semGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BLUE} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={BLUE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} interval={0} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke={BLUE} strokeWidth={3} fill="url(#semGrad)" dot={{ fill: BLUE, r: 5, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="Comparacion por edad" className="col-span-6">
            <div className="flex h-64 w-full items-center">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 10, bottom: 0, left: 0, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={80}>
                    {ageData.map((entry, i) => (<Cell key={entry.name} fill={COLORS[i % COLORS.length]} />))}
                  </Bar>
                </BarChart>
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

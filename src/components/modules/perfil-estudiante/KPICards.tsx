// src/components/modules/perfil-estudiante/KPICards.tsx

import { KPIMetrics, TasaRetencion } from '../../../types/perfilEstudiante';
import { StudentIcon, AnalyticsUpIcon, BrainIcon, ChartHistogramIcon } from '../../../constants/icons';
import AppIcon from '../../ui/AppIcon';

interface KPICardsProps {
  kpi: KPIMetrics;
  retencion: TasaRetencion;
}

export default function KPICards({ kpi, retencion }: KPICardsProps) {
  const cards = [
    {
      label: "TOTAL ESTUDIANTES",
      value: kpi.total_estudiantes.toLocaleString(),
      delta: `+${kpi.porcentaje_crecimiento}% vs ciclo anterior`,
      positive: true,
      icon: StudentIcon,
      accent: "#003F87",
    },
    {
      label: "EDAD PROMEDIO",
      value: `${kpi.edad_promedio}`,
      delta: `Rango: ${kpi.edad_minima} - ${kpi.edad_maxima} años`,
      positive: true,
      icon: AnalyticsUpIcon,
      accent: "#003F87",
    },
    {
      label: "EN RIESGO ACADÉMICO",
      value: kpi.estudiantes_riesgo.toString(),
      delta: `${((kpi.estudiantes_riesgo / kpi.total_estudiantes) * 100).toFixed(1)}% del total`,
      positive: false,
      icon: BrainIcon,
      accent: "#003F87",
    },
    {
      label: "TASA DE RETENCIÓN",
      value: `${retencion.tasa_actual}%`,
      delta: `Meta: ${retencion.meta_institucional}%`,
      positive: retencion.cumple_meta,
      icon: ChartHistogramIcon,
      accent: "#003F87",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div 
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `${card.accent}10` }}
            >
              <AppIcon icon={card.icon} size={22} className="text-[#003F87]" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
              card.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
            }`}>
              {card.delta}
            </span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{card.value}</p>
          <p className="text-xs font-semibold text-gray-500 mt-2 uppercase tracking-wider">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

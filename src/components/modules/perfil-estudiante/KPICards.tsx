// src/components/modules/perfil-estudiante/KPICards.tsx

import { KPIMetrics } from '../../../types/perfilEstudiante';
import { StudentIcon, AnalyticsUpIcon, BrainIcon, ChartHistogramIcon } from '../../../constants/icons';
import AppIcon from '../../ui/AppIcon';

interface KPICardsProps {
  kpi: KPIMetrics;
}

export default function KPICards({ kpi }: KPICardsProps) {
  const porcentajeRiesgo = kpi.total_estudiantes > 0
    ? ((kpi.estudiantes_riesgo / kpi.total_estudiantes) * 100).toFixed(1)
    : '0.0';

  const cards = [
    {
      label: 'TOTAL ESTUDIANTES',
      value: kpi.total_estudiantes.toLocaleString(),
      delta: 'Encuestados',
      positive: true,
      icon: StudentIcon,
      accent: '#003F87',
    },
    {
      label: 'EDAD PROMEDIO',
      value: `${kpi.edad_promedio}`,
      delta: `Rango: ${kpi.edad_minima} - ${kpi.edad_maxima} anos`,
      positive: true,
      icon: AnalyticsUpIcon,
      accent: '#003F87',
    },
    {
      label: 'EN RIESGO ACADEMICO',
      value: kpi.estudiantes_riesgo.toString(),
      delta: `${porcentajeRiesgo}% del total`,
      positive: false,
      icon: BrainIcon,
      accent: '#003F87',
    },
    {
      label: 'LOGRO INSTITUCIONAL',
      value: `${kpi.logro_institucional}%`,
      delta: 'Preparacion adecuada',
      positive: kpi.logro_institucional >= 70,
      icon: ChartHistogramIcon,
      accent: '#003F87',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3 gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${card.accent}10` }}
            >
              <AppIcon icon={card.icon} size={22} className="text-[#003F87]" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg text-right ${
              card.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
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

import type { HerramientaOfimatica } from '../../../types/digitalSkills'

interface HerramientasChartProps {
  herramientas: HerramientaOfimatica[]
}

export default function HerramientasChart({ herramientas }: HerramientasChartProps) {
  // Filtrar solo herramientas de Ofimática y las más usadas
  const herramientasOfimaticas = herramientas
    .filter(h => h.categoria === 'Ofimática' || h.porcentaje_dominio > 50)
    .slice(0, 4)

  const getBarColor = (porcentaje: number) => {
    if (porcentaje >= 80) return 'bg-[#003F87]'
    if (porcentaje >= 60) return 'bg-blue-500'
    return 'bg-[#FDC003]'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">
        Dominio de Herramientas Ofimáticas
      </h3>
      
      <div className="space-y-5">
        {herramientasOfimaticas.map((herramienta, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-700">
                {herramienta.herramienta}
              </span>
              <span className="text-xs font-bold text-gray-900">
                {Math.round(herramienta.porcentaje_dominio)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${getBarColor(herramienta.porcentaje_dominio)}`}
                style={{ width: `${herramienta.porcentaje_dominio}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

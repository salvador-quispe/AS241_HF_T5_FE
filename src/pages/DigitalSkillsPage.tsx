import { useDigitalSkills } from '../hooks/useDigitalSkills'
import KPICard from '../components/modules/digitalSkills/KPICard'
import HerramientasChart from '../components/modules/digitalSkills/HerramientasChart'
import PlataformasTable from '../components/modules/digitalSkills/PlataformasTable'
import EstudiantesTable from '../components/modules/digitalSkills/EstudiantesTable'
import ConclusionesSection from '../components/modules/digitalSkills/ConclusionesSection'

export default function DigitalSkillsPage() {
  const { data, loading, error } = useDigitalSkills()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#003F87] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-gray-600">Cargando datos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
          <h3 className="text-lg font-bold text-red-900 mb-2">Error al cargar datos</h3>
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm font-semibold text-gray-600">No hay datos disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header con título y botón de exportar */}
      <div className="flex justify-between items-center">
        <div>
          {/* <h1 className="text-2xl font-bold text-gray-900">MÓDULO 3: HABILIDADES DIGITALES</h1>
          <p className="text-sm text-gray-500 mt-1">Análisis de competencias tecnológicas</p> */}
        </div>
        <button className="px-4 py-2 bg-[#003F87] text-white rounded-lg text-sm font-semibold hover:bg-[#002855] transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          EXPORTAR DATOS
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Dominio Promedio"
          value={`${data.indicadores_kpi.dominio_promedio}/5.0`}
          subtitle="Nivel general de competencia"
        />
        <KPICard
          title="Capacitación Completada"
          value={`${Math.round(data.indicadores_kpi.capacitacion_completada)}%`}
          subtitle="Estudiantes con formación certificada"
        />
        <KPICard
          title="Uso Diario Promedio"
          value={`${data.indicadores_kpi.uso_diario_promedio} hrs`}
          subtitle="Exposición a herramientas digitales"
        />
        <KPICard
          title="Alertas de Nivel Bajo"
          value={`${data.indicadores_kpi.alertas_nivel_bajo < 10 ? '0' : ''}${data.indicadores_kpi.alertas_nivel_bajo}`}
          subtitle="Requieren formación inmediata"
          variant="warning"
        />
      </div>

      {/* Herramientas y Plataformas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <HerramientasChart herramientas={data.herramientas_ofimaticas} />
        <PlataformasTable plataformas={data.plataformas_lenguajes} />
      </div>

      {/* Tabla de Estudiantes */}
      <EstudiantesTable estudiantes={data.estudiantes_habilidades} />

      {/* Conclusiones y Acciones */}
      <ConclusionesSection
        conclusiones={data.conclusiones_modulo}
        acciones={data.acciones_recomendadas}
        proximaEvaluacion={data.proxima_evaluacion}
      />

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
        © 2024 Centro Vidal Guardia - Sistema de Gestión de Competencias Digitales
        <span className="mx-2">•</span>
        Manual de Usuario
        <span className="mx-2">•</span>
        Soporte Técnico
      </div>
    </div>
  )
}

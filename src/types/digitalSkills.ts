// ─── Digital Skills Types ─────────────────────────────────────────────────────

export interface KPIMetrics {
  dominio_promedio: number
  capacitacion_completada: number
  uso_diario_promedio: number
  alertas_nivel_bajo: number
  total_estudiantes: number
}

export interface HerramientaOfimatica {
  herramienta: string
  categoria: string
  porcentaje_dominio: number
  nivel_promedio: number
  estudiantes_usan: number
}

export interface PlataformaLenguaje {
  categoria: string
  dominio: number
  capacitacion: string
  nivel_texto: string
  estudiantes: number
}

export interface EstudianteHabilidades {
  expediente: string
  estudiante: string
  ofimatica: number
  programacion: number
  frecuencia_hrs: number
  estado: string
}

export interface DashboardHabilidadesDigitales {
  indicadores_kpi: KPIMetrics
  herramientas_ofimaticas: HerramientaOfimatica[]
  plataformas_lenguajes: PlataformaLenguaje[]
  estudiantes_habilidades: EstudianteHabilidades[]
  conclusiones_modulo: string
  acciones_recomendadas: string[]
  proxima_evaluacion: string
}

import axios from 'axios'
import type {
  DashboardHabilidadesDigitales,
  KPIMetrics,
  HerramientaOfimatica,
  PlataformaLenguaje,
  EstudianteHabilidades,
} from '../types/digitalSkills'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const digitalSkillsApi = axios.create({
  baseURL: `${API_BASE_URL}/api/habilidades-digitales`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const digitalSkillsService = {
  // Dashboard completo
  getDashboard: async (): Promise<DashboardHabilidadesDigitales> => {
    const { data } = await digitalSkillsApi.get<DashboardHabilidadesDigitales>('/dashboard')
    return data
  },

  // KPI Metrics
  getKPI: async (): Promise<KPIMetrics> => {
    const { data } = await digitalSkillsApi.get<KPIMetrics>('/kpi')
    return data
  },

  // Herramientas Ofimáticas
  getHerramientasOfimaticas: async (): Promise<HerramientaOfimatica[]> => {
    const { data } = await digitalSkillsApi.get<HerramientaOfimatica[]>('/herramientas-ofimaticas')
    return data
  },

  // Plataformas y Lenguajes
  getPlataformasLenguajes: async (): Promise<PlataformaLenguaje[]> => {
    const { data } = await digitalSkillsApi.get<PlataformaLenguaje[]>('/plataformas-lenguajes')
    return data
  },

  // Estudiantes
  getEstudiantes: async (limit: number = 10): Promise<EstudianteHabilidades[]> => {
    const { data } = await digitalSkillsApi.get<EstudianteHabilidades[]>(`/estudiantes?limit=${limit}`)
    return data
  },

  // Conclusiones
  getConclusiones: async (): Promise<string> => {
    const { data } = await digitalSkillsApi.get<string>('/conclusiones')
    return data
  },

  // Acciones Recomendadas
  getAccionesRecomendadas: async (): Promise<string[]> => {
    const { data } = await digitalSkillsApi.get<string[]>('/acciones-recomendadas')
    return data
  },

  // Próxima Evaluación
  getProximaEvaluacion: async (): Promise<string> => {
    const { data } = await digitalSkillsApi.get<string>('/proxima-evaluacion')
    return data
  },
}

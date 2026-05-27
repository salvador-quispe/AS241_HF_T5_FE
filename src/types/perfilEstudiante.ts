// src/types/perfilEstudiante.ts

export interface KPIMetrics {
  total_estudiantes: number;
  edad_promedio: number;
  edad_minima: number;
  edad_maxima: number;
  estudiantes_riesgo: number;
  logro_institucional: number;
}

export interface PreparacionLaboral {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  student_count: number;
  percentage: number;
}

export interface DistribucionDistrito {
  distrito: string;
  cantidad_estudiantes: number;
  porcentaje_participacion: number;
}

export interface DistribucionSemestre {
  semestre: string;
  cantidad_estudiantes: number;
  porcentaje: number;
}

export interface DistribucionEdad {
  rango_edad: string;
  cantidad_estudiantes: number;
  porcentaje: number;
}

export interface RiesgoPorSemestre {
  semestre: string;
  total_estudiantes: number;
  estudiantes_riesgo: number;
  porcentaje_riesgo: number;
}

export interface DashboardPerfilEstudiante {
  indicadores_kpi: KPIMetrics;
  job_readiness_distribution: PreparacionLaboral[];
  distribucion_distritos: DistribucionDistrito[];
  distribucion_semestres: DistribucionSemestre[];
  distribucion_edades: DistribucionEdad[];
  riesgo_por_semestre: RiesgoPorSemestre[];
  analisis_insights: string;
}

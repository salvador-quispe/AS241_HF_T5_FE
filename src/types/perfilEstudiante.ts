// src/types/perfilEstudiante.ts

export interface KPIMetrics {
  total_estudiantes: number;
  porcentaje_crecimiento: number;
  edad_promedio: number;
  edad_minima: number;
  edad_maxima: number;
  estudiantes_riesgo: number;
  meta_institucional: number;
  logro_institucional: number;
}

export interface DistribucionGenero {
  hombres: number;
  mujeres: number;
  porcentaje_hombres: number;
  porcentaje_mujeres: number;
}

export interface DistribucionCarrera {
  carrera: string;
  hombres: number;
  mujeres: number;
  total: number;
  porcentaje: number;
}

export interface DistribucionDistrito {
  distrito: string;
  provincia: string;
  cantidad_estudiantes: number;
  porcentaje_participacion: number;
}

export interface DistribucionSemestre {
  semestre: number;
  cantidad_estudiantes: number;
  porcentaje: number;
}

export interface DistribucionEdad {
  rango_edad: string;
  cantidad_estudiantes: number;
  porcentaje: number;
}

export interface RiesgoPorSemestre {
  semestre: number;
  total_estudiantes: number;
  estudiantes_riesgo: number;
  porcentaje_riesgo: number;
}

export interface TasaRetencion {
  tasa_actual: number;
  meta_institucional: number;
  cumple_meta: boolean;
  diferencia: number;
}

export interface DashboardPerfilEstudiante {
  indicadores_kpi: KPIMetrics;
  distribucion_genero: DistribucionGenero;
  distribucion_carreras: DistribucionCarrera[];
  distribucion_distritos: DistribucionDistrito[];
  distribucion_semestres: DistribucionSemestre[];
  distribucion_edades: DistribucionEdad[];
  riesgo_por_semestre: RiesgoPorSemestre[];
  analisis_insights: string;
}

export interface DistributionMetric {
  promedio: number;
  distribucion: Record<string, number>;
}

export interface BrechasDashboard {
  nivel_conocimientos_tecnicos: DistributionMetric;
  nivel_dominio_digital: DistributionMetric;
  frecuencia_uso_digital: {
    frecuencia: Record<string, number>;
  };
  formacion_digital: {
    con_formacion: number;
    sin_formacion: number;
    porcentaje_con_formacion: number;
  };
  herramientas_mas_usadas: {
    items: Array<{ herramienta: string; conteo: number }>;
  };
  preparacion_laboral: DistributionMetric;
  habilidades_mejorar: {
    items: Array<{ habilidad: string; conteo: number }>;
  };
  brecha_tecnica_promedio: {
    promedio: number;
    maximo: number;
    minimo: number;
  };
  brecha_digital_promedio: {
    promedio: number;
    maximo: number;
    minimo: number;
  };
  brecha_habilidades_blandas: {
    promedio_comunicacion: number;
    promedio_trabajo_equipo: number;
    promedio_resolucion_problemas: number;
    promedio_adaptabilidad: number;
    promedio_organizacion: number;
  };
  estudiantes_sin_formacion_digital: {
    cantidad: number;
    porcentaje: number;
  };
  estudiantes_bajo_dominio_tecnologico: {
    cantidad: number;
    porcentaje: number;
  };
  uso_herramientas_carrera: {
    porcentaje_uso_frecuente: number;
    distribucion: Record<string, number>;
  };
  comparacion_carrera: {
    items: Array<{ carrera: string; promedio: number }>;
  };
  comparacion_semestre: {
    items: Array<{ semestre: string | number; promedio: number }>;
  };
  comparacion_edad: {
    items: Array<{ grupo_edad: string; promedio: number }>;
  };
}

export interface EmpleabilidadDashboard {
  nivel_preparacion_mercado: DistributionMetric;
  preparacion_institucional: DistributionMetric;
  dificultad_conseguir_trabajo: {
    items: Array<{ dificultad: string; conteo: number; porcentaje: number }>;
  };
  practicas_preprofesionales: {
    con_practicas: number;
    sin_practicas: number;
    porcentaje_con_practicas: number;
  };
  interes_formacion: {
    si: number;
    no: number;
    porcentaje_interes: number;
  };
  importancia_comunicacion: DistributionMetric;
  importancia_trabajo_equipo: DistributionMetric;
  importancia_resolucion_problemas: DistributionMetric;
  importancia_adaptabilidad: DistributionMetric;
  importancia_organizacion_tiempo: DistributionMetric;
  importancia_centro_evaluacion: DistributionMetric;
  comparacion_carrera: {
    items: Array<{ carrera: string; promedio: number }>;
  };
  comparacion_semestre: {
    items: Array<{ semestre: string | number; promedio: number }>;
  };
  ranking_habilidades_valoradas: {
    items: Array<{ habilidad: string; promedio: number }>;
  };
  ranking_habilidades_debiles: {
    items: Array<{ habilidad: string; promedio: number }>;
  };
  indicador_general_empleabilidad: {
    promedio_general: number;
    nivel: string;
  };
  estudiantes_listos_mercado: {
    cantidad: number;
    porcentaje: number;
  };
  estudiantes_insuficiente_preparacion: {
    cantidad: number;
    porcentaje: number;
  };
}

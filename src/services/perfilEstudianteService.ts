// src/services/perfilEstudianteService.ts

import api from '../api/axios';
import { DashboardPerfilEstudiante, KPIMetrics, TasaRetencion } from '../types/perfilEstudiante';

const BASE_URL = '/api/perfil-estudiante';

export const perfilEstudianteService = {
  // Obtener dashboard completo
  getDashboard: async (): Promise<DashboardPerfilEstudiante> => {
    const response = await api.get(`${BASE_URL}/dashboard`);
    return response.data;
  },

  // Obtener solo KPIs
  getKPIs: async (): Promise<KPIMetrics> => {
    const response = await api.get(`${BASE_URL}/kpi`);
    return response.data;
  },

  // Obtener distribución por género
  getGenero: async () => {
    const response = await api.get(`${BASE_URL}/genero`);
    return response.data;
  },

  // Obtener distribución por carreras
  getCarreras: async () => {
    const response = await api.get(`${BASE_URL}/carreras`);
    return response.data;
  },

  // Obtener distribución por distritos
  getDistritos: async () => {
    const response = await api.get(`${BASE_URL}/distritos`);
    return response.data;
  },

  // Obtener distribución por semestres
  getSemestres: async () => {
    const response = await api.get(`${BASE_URL}/semestres`);
    return response.data;
  },

  // Obtener distribución por edades
  getEdades: async () => {
    const response = await api.get(`${BASE_URL}/edades`);
    return response.data;
  },

  // Obtener riesgo por semestre
  getRiesgo: async () => {
    const response = await api.get(`${BASE_URL}/riesgo`);
    return response.data;
  },

  // Obtener insights
  getInsights: async (): Promise<string> => {
    const response = await api.get(`${BASE_URL}/insights`);
    return response.data;
  },

  // Obtener tasa de retención
  getTasaRetencion: async (): Promise<TasaRetencion> => {
    const response = await api.get(`${BASE_URL}/tasa-retencion`);
    return response.data;
  }
};

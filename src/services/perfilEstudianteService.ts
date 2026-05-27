// src/services/perfilEstudianteService.ts

import api from '../api/axios';
import { DashboardPerfilEstudiante, KPIMetrics, PreparacionLaboral } from '../types/perfilEstudiante';

const BASE_URL = '/api/perfil-estudiante';

export const perfilEstudianteService = {
  getDashboard: async (): Promise<DashboardPerfilEstudiante> => {
    const response = await api.get(`${BASE_URL}/dashboard`);
    return response.data;
  },

  getKPIs: async (): Promise<KPIMetrics> => {
    const response = await api.get(`${BASE_URL}/kpi`);
    return response.data;
  },

  getPreparacionLaboral: async (): Promise<PreparacionLaboral[]> => {
    const response = await api.get(`${BASE_URL}/job-readiness-distribution`);
    return response.data;
  },

  getDistritos: async () => {
    const response = await api.get(`${BASE_URL}/distritos`);
    return response.data;
  },

  getSemestres: async () => {
    const response = await api.get(`${BASE_URL}/semestres`);
    return response.data;
  },

  getEdades: async () => {
    const response = await api.get(`${BASE_URL}/edades`);
    return response.data;
  },

  getRiesgo: async () => {
    const response = await api.get(`${BASE_URL}/riesgo`);
    return response.data;
  },

  getInsights: async (): Promise<string> => {
    const response = await api.get(`${BASE_URL}/insights`);
    return response.data;
  },
};

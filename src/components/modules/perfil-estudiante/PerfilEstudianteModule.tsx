// src/components/modules/perfil-estudiante/PerfilEstudianteModule.tsx

import { useEffect, useState } from 'react';
import { perfilEstudianteService } from '../../../services/perfilEstudianteService';
import { DashboardPerfilEstudiante } from '../../../types/perfilEstudiante';
import KPICards from './KPICards';
import PreparacionLaboralChart from './PreparacionLaboralChart';
import DistritoTable from './DistritoTable';
import SemestreChart from './SemestreChart';
import EdadChart from './EdadChart';
import RiesgoTable from './RiesgoTable';
import InsightsCard from './InsightsCard';

export default function PerfilEstudianteModule() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardPerfilEstudiante | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboard = await perfilEstudianteService.getDashboard();
        setData(dashboard);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Verifica que el backend este corriendo en el puerto 8000');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#003F87] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando datos del perfil estudiantil...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600">{error || 'Error al cargar los datos'}</p>
        <p className="text-sm text-gray-500 mt-2">
          Asegurate que el backend este corriendo en http://localhost:8000
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <KPICards kpi={data.indicadores_kpi} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PreparacionLaboralChart preparacion={data.job_readiness_distribution} />
        <DistritoTable distritos={data.distribucion_distritos} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SemestreChart semestres={data.distribucion_semestres} />
        <EdadChart edades={data.distribucion_edades} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RiesgoTable riesgo={data.riesgo_por_semestre} />
      </div>

      <InsightsCard insights={data.analisis_insights} />
    </div>
  );
}

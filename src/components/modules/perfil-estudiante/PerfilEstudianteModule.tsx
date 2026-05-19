// src/components/modules/perfil-estudiante/PerfilEstudianteModule.tsx

import { useEffect, useState } from 'react';
import { perfilEstudianteService } from '../../../services/perfilEstudianteService';
import { DashboardPerfilEstudiante, TasaRetencion } from '../../../types/perfilEstudiante';
import KPICards from './KPICards';
import GeneroDistribution from './GeneroDistribution';
import CarreraTable from './CarreraTable';
import DistritoTable from './DistritoTable';
import SemestreChart from './SemestreChart';
import EdadChart from './EdadChart';
import RiesgoTable from './RiesgoTable';
import InsightsCard from './InsightsCard';

export default function PerfilEstudianteModule() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardPerfilEstudiante | null>(null);
  const [retencion, setRetencion] = useState<TasaRetencion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashboard, tasaRetencion] = await Promise.all([
          perfilEstudianteService.getDashboard(),
          perfilEstudianteService.getTasaRetencion(),
        ]);
        setData(dashboard);
        setRetencion(tasaRetencion);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos. Verifica que el backend esté corriendo en el puerto 8000');
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

  if (error || !data || !retencion) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600">{error || 'Error al cargar los datos'}</p>
        <p className="text-sm text-gray-500 mt-2">
          Asegúrate que el backend esté corriendo en http://localhost:8000
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* KPIs */}
      <KPICards kpi={data.indicadores_kpi} retencion={retencion} />

      {/* Fila 1: Género y Carreras */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneroDistribution genero={data.distribucion_genero} />
        <CarreraTable carreras={data.distribucion_carreras} />
      </div>

      {/* Fila 2: Distritos y Semestres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DistritoTable distritos={data.distribucion_distritos} />
        <SemestreChart semestres={data.distribucion_semestres} />
      </div>

      {/* Fila 3: Edades y Riesgo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EdadChart edades={data.distribucion_edades} />
        <RiesgoTable riesgo={data.riesgo_por_semestre} />
      </div>

      {/* Insights */}
      <InsightsCard insights={data.analisis_insights} />
    </div>
  );
}

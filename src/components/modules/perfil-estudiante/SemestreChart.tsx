// src/components/modules/perfil-estudiante/SemestreChart.tsx

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DistribucionSemestre } from '../../../types/perfilEstudiante';

interface Props {
  semestres: DistribucionSemestre[];
}

export default function SemestreChart({ semestres }: Props) {
  const data = semestres.map(s => ({
    semestre: s.semestre,
    estudiantes: s.cantidad_estudiantes,
    porcentaje: s.porcentaje,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Ciclo Académico</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="semestre" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} estudiantes`} />
            <Bar dataKey="estudiantes" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#003F87' : '#FDC003'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

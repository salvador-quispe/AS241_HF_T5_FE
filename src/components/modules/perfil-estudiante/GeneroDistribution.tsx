// src/components/modules/perfil-estudiante/GeneroDistribution.tsx

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DistribucionGenero } from '../../../types/perfilEstudiante';

interface Props {
  genero: DistribucionGenero;
}

export default function GeneroDistribution({ genero }: Props) {
  const data = [
    { name: 'Hombres', value: genero.hombres, porcentaje: genero.porcentaje_hombres, color: '#003F87' },
    { name: 'Mujeres', value: genero.mujeres, porcentaje: genero.porcentaje_mujeres, color: '#FDC003' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución por Género</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, porcentaje }) => `${name}: ${porcentaje}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} estudiantes`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

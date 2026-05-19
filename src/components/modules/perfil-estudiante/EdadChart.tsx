// src/components/modules/perfil-estudiante/EdadChart.tsx

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DistribucionEdad } from '../../../types/perfilEstudiante';

interface Props {
  edades: DistribucionEdad[];
}

const COLORS = ['#003F87', '#FDC003', '#10b981', '#f59e0b', '#ef4444'];

export default function EdadChart({ edades }: Props) {
  const data = edades.map(e => ({
    name: e.rango_edad,
    value: e.cantidad_estudiantes,
    porcentaje: e.porcentaje,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución por Edad</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              label={({ name, porcentaje }) => `${name}: ${porcentaje}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} estudiantes`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">
        El rango 21-22 años muestra un decrecimiento significativo.
      </p>
    </div>
  );
}

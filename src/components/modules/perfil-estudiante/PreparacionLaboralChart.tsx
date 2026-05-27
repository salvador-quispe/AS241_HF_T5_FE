// src/components/modules/perfil-estudiante/PreparacionLaboralChart.tsx

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PreparacionLaboral } from '../../../types/perfilEstudiante';

interface Props {
  preparacion: PreparacionLaboral[];
}

const LABELS: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
};

const COLORS: Record<string, string> = {
  LOW: '#ef4444',
  MEDIUM: '#FDC003',
  HIGH: '#003F87',
};

export default function PreparacionLaboralChart({ preparacion }: Props) {
  const data = preparacion.map((item) => ({
    name: LABELS[item.level] ?? item.level,
    value: item.student_count,
    porcentaje: item.percentage,
    color: COLORS[item.level] ?? '#10b981',
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Preparacion Laboral</h3>
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

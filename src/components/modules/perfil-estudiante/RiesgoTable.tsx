// src/components/modules/perfil-estudiante/RiesgoTable.tsx

import { RiesgoPorSemestre } from '../../../types/perfilEstudiante';

interface Props {
  riesgo: RiesgoPorSemestre[];
}

export default function RiesgoTable({ riesgo }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Riesgo Académico por Semestre</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-600">SEMESTRE</th>
              <th className="text-center py-3 font-semibold text-gray-600">TOTAL</th>
              <th className="text-center py-3 font-semibold text-gray-600">EN RIESGO</th>
              <th className="text-center py-3 font-semibold text-gray-600">% RIESGO</th>
            </tr>
          </thead>
          <tbody>
            {riesgo.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{item.semestre}° Semestre</td>
                <td className="text-center py-3 text-gray-600">{item.total_estudiantes}</td>
                <td className="text-center py-3">
                  <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold">
                    {item.estudiantes_riesgo}
                  </span>
                </td>
                <td className="text-center py-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${item.porcentaje_riesgo}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold">{item.porcentaje_riesgo}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

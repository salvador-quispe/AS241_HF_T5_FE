// src/components/modules/perfil-estudiante/CarreraTable.tsx

import { DistribucionCarrera } from '../../../types/perfilEstudiante';

interface Props {
  carreras: DistribucionCarrera[];
}

export default function CarreraTable({ carreras }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Distribución por Carrera</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-600">CARRERA</th>
              <th className="text-center py-3 font-semibold text-gray-600">HOMBRES</th>
              <th className="text-center py-3 font-semibold text-gray-600">MUJERES</th>
              <th className="text-center py-3 font-semibold text-gray-600">TOTAL</th>
              <th className="text-center py-3 font-semibold text-gray-600">%</th>
            </tr>
          </thead>
          <tbody>
            {carreras.map((carrera, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{carrera.carrera}</td>
                <td className="text-center py-3 text-gray-600">{carrera.hombres}</td>
                <td className="text-center py-3 text-gray-600">{carrera.mujeres}</td>
                <td className="text-center py-3 font-semibold text-gray-800">{carrera.total}</td>
                <td className="text-center py-3 text-gray-600">{carrera.porcentaje}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

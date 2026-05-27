// src/components/modules/perfil-estudiante/DistritoTable.tsx

import { DistribucionDistrito } from '../../../types/perfilEstudiante';

interface Props {
  distritos: DistribucionDistrito[];
}

export default function DistritoTable({ distritos }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Distritos de Procedencia</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-600">DISTRITO</th>
              <th className="text-center py-3 font-semibold text-gray-600">N. ESTUDIANTES</th>
              <th className="text-center py-3 font-semibold text-gray-600">PARTICIPACION</th>
            </tr>
          </thead>
          <tbody>
            {distritos.map((distrito, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{distrito.distrito}</td>
                <td className="text-center py-3 text-gray-600">{distrito.cantidad_estudiantes}</td>
                <td className="text-center py-3">
                  <span className="px-2 py-1 bg-blue-50 text-[#003F87] rounded-lg text-xs font-bold">
                    {distrito.porcentaje_participacion}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Mostrando principales {distritos.length} distritos.
      </p>
    </div>
  );
}

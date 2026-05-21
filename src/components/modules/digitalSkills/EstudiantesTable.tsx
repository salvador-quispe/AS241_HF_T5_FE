import { useState } from 'react'
import type { EstudianteHabilidades } from '../../../types/digitalSkills'

interface EstudiantesTableProps {
  estudiantes: EstudianteHabilidades[]
}

export default function EstudiantesTable({ estudiantes }: EstudiantesTableProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedEstudiantes = showAll ? estudiantes : estudiantes.slice(0, 4)

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      'EXCELENTE': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'COMPETENTE': { bg: 'bg-green-100', text: 'text-green-700' },
      'REGULAR': { bg: 'bg-gray-100', text: 'text-gray-700' },
      'EN FORMACIÓN': { bg: 'bg-amber-100', text: 'text-amber-700' },
    }

    const badge = badges[estado] || badges['REGULAR']

    return (
      <span className={`px-2 py-1 text-[10px] font-bold rounded ${badge.bg} ${badge.text}`}>
        {estado}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Desglose de Habilidades por Estudiante
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            FILTROS
          </button>
          <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            IMPRIMIR
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wide pb-3 px-2">
                Expediente
              </th>
              <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wide pb-3 px-2">
                Estudiante
              </th>
              <th className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide pb-3 px-2">
                Ofimática
              </th>
              <th className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide pb-3 px-2">
                Programación
              </th>
              <th className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide pb-3 px-2">
                Frecuencia (hrs)
              </th>
              <th className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide pb-3 px-2">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedEstudiantes.map((estudiante, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 text-xs font-semibold text-gray-600">
                  {estudiante.expediente}
                </td>
                <td className="py-4 px-2 text-sm font-semibold text-gray-900">
                  {estudiante.estudiante}
                </td>
                <td className="py-4 px-2 text-center text-sm font-bold text-gray-900">
                  {estudiante.ofimatica}
                </td>
                <td className="py-4 px-2 text-center text-sm font-bold text-gray-900">
                  {estudiante.programacion}
                </td>
                <td className="py-4 px-2 text-center text-sm font-bold text-gray-900">
                  {estudiante.frecuencia_hrs}
                </td>
                <td className="py-4 px-2 text-center">
                  {getEstadoBadge(estudiante.estado)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {estudiantes.length > 4 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-[#003F87] hover:text-[#002855] uppercase tracking-wide"
          >
            {showAll ? '▲ VER MENOS' : `▼ VER TODOS LOS REGISTROS (${estudiantes.length})`}
          </button>
        </div>
      )}
    </div>
  )
}

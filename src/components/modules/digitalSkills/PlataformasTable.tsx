import type { PlataformaLenguaje } from '../../../types/digitalSkills'

interface PlataformasTableProps {
  plataformas: PlataformaLenguaje[]
}

export default function PlataformasTable({ plataformas }: PlataformasTableProps) {
  const getDominioBlocks = (dominio: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-sm ${
          i < dominio ? 'bg-[#003F87]' : 'bg-gray-200'
        }`}
      />
    ))
  }

  const getCapacitacionBadge = (capacitacion: string) => {
    if (capacitacion === 'Si') {
      return (
        <span className="px-2 py-1 text-[10px] font-bold bg-green-100 text-green-700 rounded">
          SI
        </span>
      )
    }
    return (
      <span className="px-2 py-1 text-[10px] font-bold bg-amber-100 text-amber-700 rounded">
        NO
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">
        Plataformas y Lenguajes
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-bold text-gray-600 uppercase tracking-wide pb-3">
                Categoría
              </th>
              <th className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide pb-3">
                Dominio (1-5)
              </th>
              <th className="text-center text-xs font-bold text-gray-600 uppercase tracking-wide pb-3">
                Capacitación
              </th>
            </tr>
          </thead>
          <tbody>
            {plataformas.map((plataforma, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="py-4 text-sm font-semibold text-gray-700">
                  {plataforma.categoria}
                </td>
                <td className="py-4">
                  <div className="flex gap-1 justify-center">
                    {getDominioBlocks(plataforma.dominio)}
                  </div>
                </td>
                <td className="py-4 text-center">
                  {getCapacitacionBadge(plataforma.capacitacion)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface ConclusionesProps {
  conclusiones: string
  acciones: string[]
  proximaEvaluacion: string
}

export default function ConclusionesSection({ conclusiones, acciones, proximaEvaluacion }: ConclusionesProps) {
  return (
    <div className="bg-gradient-to-br from-[#003F87] to-[#002855] rounded-xl p-8 text-white">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Conclusiones */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-90">
            Conclusiones del Módulo
          </h3>
          <p className="text-sm leading-relaxed opacity-95">
            {conclusiones}
          </p>
        </div>

        {/* Acciones Recomendadas */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-90">
            Acciones Recomendadas
          </h3>
          <ul className="space-y-2">
            {acciones.map((accion, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-[#FDC003] mt-1">•</span>
                <span className="opacity-95">{accion}</span>
              </li>
            ))}
          </ul>

          {/* Próxima Evaluación */}
          <div className="mt-6 inline-flex items-center gap-3 bg-[#FDC003] text-gray-900 px-4 py-2.5 rounded-lg">
            <span className="text-xs font-bold uppercase tracking-wide">
              Próxima Evaluación
            </span>
            <span className="text-sm font-bold">
              {proximaEvaluacion}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

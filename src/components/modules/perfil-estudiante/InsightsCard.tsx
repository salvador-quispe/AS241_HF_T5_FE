// src/components/modules/perfil-estudiante/InsightsCard.tsx

import { LightBulbIcon } from '@heroicons/react/24/outline';

interface Props {
  insights: string;
}

export default function InsightsCard({ insights }: Props) {
  return (
    <div className="bg-gradient-to-r from-[#003F87]/5 to-[#FDC003]/5 rounded-2xl border border-[#003F87]/10 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#003F87]/10 flex items-center justify-center shrink-0">
          <LightBulbIcon className="w-5 h-5 text-[#003F87]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Análisis de Caracterización</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{insights}</p>
          <button className="mt-4 px-4 py-2 bg-[#003F87] text-white text-sm font-bold rounded-xl hover:bg-[#002c5f] transition-colors">
            Generar Plan de Acción
          </button>
        </div>
      </div>
    </div>
  );
}

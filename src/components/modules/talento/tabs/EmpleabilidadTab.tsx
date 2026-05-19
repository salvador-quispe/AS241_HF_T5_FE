// src/components/modules/talento/tabs/EmpleabilidadTab.tsx

import StatCard from "../../../ui/StatCard";

export default function EmpleabilidadTab() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <StatCard
        title="Preparación Laboral"
        value="74%"
      />

      <StatCard
        title="Prácticas Preprofesionales"
        value="58%"
      />

      <StatCard
        title="Listos para el Mercado"
        value="69%"
      />

      <StatCard
        title="Preparación Insuficiente"
        value="31%"
      />
    </div>
  );
}
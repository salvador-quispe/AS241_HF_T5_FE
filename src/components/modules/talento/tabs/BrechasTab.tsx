// src/components/modules/talento/tabs/BrechasTab.tsx

import StatCard from "../../../ui/StatCard";

export default function BrechasTab() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <StatCard
        title="Brecha Técnica Promedio"
        value="67%"
      />

      <StatCard
        title="Brecha Digital"
        value="52%"
      />

      <StatCard
        title="Bajo Dominio Tecnológico"
        value="41%"
      />

      <StatCard
        title="Sin Formación Digital"
        value="24%"
      />
    </div>
  );
}
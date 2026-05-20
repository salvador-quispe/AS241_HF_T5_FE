// src/pages/TalentPage.tsx

import ContentLayout from "../components/layout/ContentLayout";
import TalentModule from "../components/modules/talento/TalentModule";

export default function TalentPage() {
  return (
    <ContentLayout
      title="Brechas y Empleabilidad"
      subtitle="Indicadores institucionales de habilidades y preparación laboral"
    >
      <TalentModule />
    </ContentLayout>
  );
}
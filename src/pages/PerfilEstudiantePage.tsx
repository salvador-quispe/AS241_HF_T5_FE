// src/pages/PerfilEstudiantePage.tsx

import ContentLayout from '../components/layout/ContentLayout';
import PerfilEstudianteModule from '../components/modules/perfil-estudiante/PerfilEstudianteModule';

export default function PerfilEstudiantePage() {
  return (
    <ContentLayout
      title="Perfil del Estudiante"
      subtitle="Análisis demográfico y académico - Ciclo 2024-I"
    >
      <PerfilEstudianteModule />
    </ContentLayout>
  );
}

// src/components/layout/MainLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  // Mapa de títulos según la ruta
  const routeTitles: Record<string, { t: string; s: string }> = {
    "/dashboard": { t: "Dashboard Principal", s: "Resumen de métricas y rendimiento" },
    "/talento": { t: "Talento Estudiantil", s: "Gestión de perfiles profesionales" },
    // Añade más rutas aquí
  };

  const currentInfo = routeTitles[location.pathname] || { t: "TalentData", s: "Habilidades Profesionales" };

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden text-gray-900">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={currentInfo.t} subtitle={currentInfo.s} />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const talentTab = searchParams.get("tab") ?? "brechas";

  const routeTitles: Record<string, { t: string; s: string }> = {
    "/dashboard": { t: "Talento Estudiantil", s: "Gestion de perfiles profesionales" },
    "/talento":
      talentTab === "empleabilidad"
        ? { t: "Empleabilidad Estudiantil", s: "Preparacion e insercion laboral" }
        : { t: "Brechas Profesionales", s: "Analisis de habilidades tecnicas y digitales" },
  };

  const currentInfo = routeTitles[location.pathname] || { t: "TalentData", s: "Habilidades Profesionales" };

  return (
    <div className="flex h-screen bg-gray-50/50 overflow-hidden text-gray-900">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={currentInfo.t} subtitle={currentInfo.s} />
        <main className="h-[calc(100vh-5rem)] min-h-0 overflow-hidden p-2 xl:p-2.5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

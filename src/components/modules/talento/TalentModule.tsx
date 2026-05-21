import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../../api/axios";

import BrechasTab from "./tabs/BrechasTab";
import EmpleabilidadTab from "./tabs/EmpleabilidadTab";
import type { BrechasDashboard, EmpleabilidadDashboard } from "./types";

export default function TalentModule() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "empleabilidad" ? "empleabilidad" : "brechas";
  const [brechas, setBrechas] = useState<BrechasDashboard | null>(null);
  const [empleabilidad, setEmpleabilidad] = useState<EmpleabilidadDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboards() {
      try {
        setIsLoading(true);
        setError(null);

        const [brechasResponse, empleabilidadResponse] = await Promise.all([
          api.get<BrechasDashboard>("/brechas/dashboard"),
          api.get<EmpleabilidadDashboard>("/empleabilidad/dashboard"),
        ]);

        if (!mounted) {
          return;
        }

        setBrechas(brechasResponse.data);
        setEmpleabilidad(empleabilidadResponse.data);
      } catch {
        if (mounted) {
          setError("No se pudieron cargar los indicadores del backend.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboards();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 animate-in fade-in duration-500">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-hidden">
        {activeTab === "brechas" ? (
          <BrechasTab data={brechas} isLoading={isLoading} />
        ) : (
          <EmpleabilidadTab data={empleabilidad} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

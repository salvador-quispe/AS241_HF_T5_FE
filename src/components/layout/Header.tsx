import { useLocation, useSearchParams } from "react-router-dom";

import {
  Notification03Icon,
  Settings02Icon,
} from "../../constants/icons";
import AppIcon from "../ui/AppIcon";
import Tabs from "../ui/Tabs";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title = "Panel", subtitle = "Plataforma" }: HeaderProps) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "empleabilidad" ? "empleabilidad" : "brechas";
  const showTalentTabs = location.pathname === "/talento";

  function setActiveTab(tab: string) {
    setSearchParams({ tab, page: "1" });
  }

  return (
    <header className="h-20 bg-white border-b border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] px-8 flex items-center justify-between gap-5 sticky top-0 z-40">
      <div className="flex min-w-0 flex-1 items-center gap-5 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="min-w-[230px]">
          <h2 className="text-xl font-black text-[#003F87] tracking-tighter leading-none uppercase">
            {title}
          </h2>
          <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
            {subtitle}
          </p>
        </div>

        {showTalentTabs && (
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>

      <div className="flex shrink-0 items-center gap-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <AppIcon icon={Notification03Icon} size={22} />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDC003] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FDC003]"></span>
            </span>
          </button>

          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
            <AppIcon icon={Settings02Icon} size={22} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-3 bg-emerald-50/50 px-4 py-2 rounded-xl border border-emerald-100">
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
            Online
          </span>
          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </div>
      </div>
    </header>
  );
}

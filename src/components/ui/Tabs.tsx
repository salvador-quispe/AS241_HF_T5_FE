// src/components/ui/Tabs.tsx

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({
  activeTab,
  setActiveTab,
}: TabsProps) {
  return (
    <div className="flex w-fit items-center gap-1 rounded-xl bg-gray-100 p-1">
      <button
        onClick={() => setActiveTab("brechas")}
        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all
        ${
          activeTab === "brechas"
            ? "bg-[#003F87] text-white"
            : "text-gray-600 hover:bg-white"
        }`}
      >
        Brechas
      </button>

      <button
        onClick={() => setActiveTab("empleabilidad")}
        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all
        ${
          activeTab === "empleabilidad"
            ? "bg-[#FDC003] text-[#003F87]"
            : "text-gray-600 hover:bg-white"
        }`}
      >
        Empleabilidad
      </button>
    </div>
  );
}

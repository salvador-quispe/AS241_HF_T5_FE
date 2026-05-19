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
    <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-2xl w-fit">
      <button
        onClick={() => setActiveTab("brechas")}
        className={`px-5 py-2 rounded-xl font-medium transition-all
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
        className={`px-5 py-2 rounded-xl font-medium transition-all
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
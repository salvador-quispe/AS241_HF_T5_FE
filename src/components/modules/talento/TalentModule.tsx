// src/components/modules/talento/TalentModule.tsx

import { useState } from "react";

import Tabs from "../../ui/Tabs";

import BrechasTab from "./tabs/BrechasTab";
import EmpleabilidadTab from "./tabs/EmpleabilidadTab";

export default function TalentModule() {
  const [activeTab, setActiveTab] = useState("brechas");

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "brechas" ? (
        <BrechasTab />
      ) : (
        <EmpleabilidadTab />
      )}
    </div>
  );
}
// src/routes/AppRoutes.tsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../pages/DashboardPage";
import TalentPage from "../pages/TalentPage";
import DigitalSkillsPage from "../pages/DigitalSkillsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Redirect raíz al dashboard */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/talento"
            element={<TalentPage />}
          />

          <Route
            path="/habilidades-digitales"
            element={<DigitalSkillsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
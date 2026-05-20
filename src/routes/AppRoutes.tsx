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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
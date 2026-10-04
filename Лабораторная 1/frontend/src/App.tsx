import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout.tsx";
import { AthletePage } from "./pages/AthletePage.tsx";
import { AthletesPage } from "./pages/AthletesPage.tsx";
import { AttendancePage } from "./pages/AttendancePage.tsx";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { DashboardPage } from "./pages/DashboardPage.tsx";
import { InjuriesPage } from "./pages/InjuriesPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { NutritionPage } from "./pages/NutritionPage.tsx";
import { PlanPage } from "./pages/PlanPage.tsx";
import { PlansPage } from "./pages/PlansPage.tsx";
import { ReportsPage } from "./pages/ReportsPage.tsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="athletes" element={<AthletesPage />} />
        <Route path="athletes/:athleteId" element={<AthletePage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="plans/:planId" element={<PlanPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="injuries" element={<InjuriesPage />} />
        <Route path="nutrition" element={<NutritionPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

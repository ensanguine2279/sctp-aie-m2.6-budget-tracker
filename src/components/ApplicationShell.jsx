import { useAuth } from "../contexts/AuthContextInstance";

import { BudgetTrackerProvider } from "../contexts/BudgetTrackerContext";

import Login from "./Login";
import DashboardLayout from "./DashboardLayout";

function ApplicationShell() {
  const { user } = useAuth();
  return user ? (
    <BudgetTrackerProvider>
      <DashboardLayout />
    </BudgetTrackerProvider>
  ) : (
    <Login />
  );
}

export default ApplicationShell;

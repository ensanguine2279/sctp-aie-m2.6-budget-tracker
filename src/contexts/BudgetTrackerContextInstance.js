import { useContext, createContext } from "react";

export const BudgetTrackerContext = createContext();

export function useBudgetTracker() {
  const ctx = useContext(BudgetTrackerContext);
  if (!ctx) {
    throw new Error(
      "useBudgetTracker must be used inside a BudgetTrackerProvider",
    );
  }
  return ctx;
}

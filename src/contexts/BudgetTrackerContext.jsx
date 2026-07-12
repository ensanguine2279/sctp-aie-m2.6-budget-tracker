import { useReducer } from "react";

import { INITIAL_BUDGET_STATE } from "../data";

import { BudgetTrackerContext } from "./BudgetTrackerContextInstance";

import { budgetTrackerReducer } from "../reducers/budgetTrackerReducer";

export function BudgetTrackerProvider({ children }) {
  const [state, dispatch] = useReducer(
    budgetTrackerReducer,
    INITIAL_BUDGET_STATE,
  );

  const { transactions } = state;

  const filteredTransactions = state.transactions.filter((tx) => {
    if (state.filter === "income") return tx.type === "income";
    if (state.filter === "expense") return tx.type === "expense";
    return true;
  });

  const addTransaction = (description, amount, type) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: { id: Date.now(), description, amount: Number(amount), type },
    });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const setFilter = (filterValue) => {
    dispatch({ type: "SET_FILTER", payload: filterValue });
  };

  return (
    <BudgetTrackerContext.Provider
      value={{
        transactions,
        filteredTransactions,
        addTransaction,
        deleteTransaction,
        setFilter,
      }}
    >
      {children}
    </BudgetTrackerContext.Provider>
  );
}

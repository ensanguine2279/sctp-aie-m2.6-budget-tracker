import { useReducer, useEffect } from "react";

import { SEED_TRANSACTIONS } from "../data";

import { BudgetTrackerContext } from "./BudgetTrackerContextInstance";

import { budgetTrackerReducer } from "../reducers/budgetTrackerReducer";

export function BudgetTrackerProvider({ children }) {
  const [state, dispatch] = useReducer(budgetTrackerReducer, null, () => {
    try {
      const persistedTransactions = localStorage.getItem(
        "budget_tracker_transactions",
      );
      return {
        filter: "all",
        transactions: persistedTransactions
          ? JSON.parse(persistedTransactions)
          : SEED_TRANSACTIONS,
      };
    } catch (error) {
      console.error("Failed to parse persisted transactions:", error);
      return { filter: "all", transactions: SEED_TRANSACTIONS };
    }
  });

  const { transactions } = state;

  useEffect(() => {
    localStorage.setItem(
      "budget_tracker_transactions",
      JSON.stringify(state.transactions),
    );
  }, [state.transactions]);

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

  const updateTransaction = (transaction) => {
    dispatch({ type: "UPDATE_TRANSACTION", payload: transaction });
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
        updateTransaction,
        setFilter,
      }}
    >
      {children}
    </BudgetTrackerContext.Provider>
  );
}

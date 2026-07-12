export function budgetTrackerReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (tx) => tx.id !== action.payload,
        ),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      throw new Error(`Unhandled action matrix mapping: ${action.type}`);
  }
}

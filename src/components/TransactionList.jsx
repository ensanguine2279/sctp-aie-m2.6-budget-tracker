import { useAuth } from "../contexts/AuthContextInstance";
import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import TransactionRow from "./TransactionRow";

import { Typography, Paper, Divider, Stack } from "@mui/material";

function TransactionList() {
  const { filteredTransactions, deleteTransaction } = useBudgetTracker();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  if (filteredTransactions.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          py: 6,
          textAlign: "center",
          borderStyle: "dashed",
          bgcolor: "transparent",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          No transactions available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{ border: "1px solid", borderColor: "grey.200", overflow: "hidden" }}
    >
      <Stack divider={<Divider />}>
        {filteredTransactions.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} isAdmin={isAdmin} />
        ))}
      </Stack>
    </Paper>
  );
}

export default TransactionList;

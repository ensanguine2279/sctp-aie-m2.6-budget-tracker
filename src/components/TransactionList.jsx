import { useAuth } from "../contexts/AuthContextInstance";
import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

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
          <Box
            key={tx.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 2,
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {tx.description}
              </Typography>
              <Box>
                <Chip
                  label={tx.type}
                  size="small"
                  color={tx.type === "income" ? "success" : "default"}
                  variant="soft"
                  sx={{
                    fontSize: "9px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    height: 18,
                  }}
                />
              </Box>
            </Stack>
            <Stack
              spacing={2}
              sx={{ flexDirection: "row", alignItems: "center" }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: tx.type === "income" ? "success.main" : "error.main",
                }}
              >
                {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
              </Typography>
              {isAdmin && (
                <IconButton
                  size="small"
                  onClick={() => deleteTransaction(tx.id)}
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.200",
                    p: 0.5,
                    "&:hover": {
                      color: "error.main",
                      borderColor: "error.light",
                    },
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export default TransactionList;

import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import { Card, Typography, CardContent, Stack } from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Summary() {
  const { transactions } = useBudgetTracker();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  return (
    <Stack
      sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2, width: "100%" }}
    >
      <Card
        sx={{
          flex: 1,
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Stack
            spacing={1}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              color: "text.secondary",
              mb: 1,
            }}
          >
            <AccountBalanceWalletIcon fontSize="small" />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, textTransform: "uppercase" }}
            >
              Balance
            </Typography>
          </Stack>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: balance >= 0 ? "success.main" : "error.main",
            }}
          >
            ${balance.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          flex: 1,
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Stack
            spacing={1}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              color: "success.main",
              mb: 1,
            }}
          >
            <ArrowUpwardIcon fontSize="small" />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Income
            </Typography>
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ${income.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          flex: 1,
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Stack
            spacing={1}
            sx={{
              flexDirection: "row",
              alignItems: "center",
              color: "error.main",
              mb: 1,
            }}
          >
            <ArrowDownwardIcon fontSize="small" />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Expenses
            </Typography>
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ${expenses.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default Summary;

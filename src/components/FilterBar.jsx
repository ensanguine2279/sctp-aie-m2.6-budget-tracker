import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

function FilterBar() {
  const { filter, setFilter } = useBudgetTracker();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "grey.200",
        pb: 1.5,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Transaction Registry
      </Typography>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newVal) => newVal && setFilter(newVal)}
        size="small"
        sx={{
          bgcolor: "grey.100",
          p: 0.5,
          borderRadius: 2,
          "& .MuiToggleButton-root": { border: "none", px: 2, py: 0.5 },
        }}
      >
        <ToggleButton
          value="all"
          sx={{ textTransform: "none", fontSize: "0.75rem", fontWeight: 600 }}
        >
          All
        </ToggleButton>
        <ToggleButton
          value="income"
          sx={{ textTransform: "none", fontSize: "0.75rem", fontWeight: 600 }}
        >
          Income
        </ToggleButton>
        <ToggleButton
          value="expense"
          sx={{ textTransform: "none", fontSize: "0.75rem", fontWeight: 600 }}
        >
          Expense
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default FilterBar;

import { useState } from "react";

import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import {
  Box,
  Typography,
  TextField,
  FormControl,
  Chip,
  Stack,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

function TransactionRow({ tx, isAdmin }) {
  const { deleteTransaction, updateTransaction } = useBudgetTracker();
  const [isEditing, setIsEditing] = useState(false);

  // Local form states populated dynamically when editing starts
  const [editDesc, setEditDesc] = useState(tx.description);
  const [editAmount, setEditAmount] = useState(tx.amount);
  const [editType, setEditType] = useState(tx.type);

  const handleSave = (e) => {
    e.preventDefault();
    if (!editDesc.trim() || !editAmount || Number(editAmount) <= 0) return;

    updateTransaction({
      id: tx.id,
      description: editDesc.trim(),
      amount: Number(editAmount),
      type: editType,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset local fields back to original data and close form
    setEditDesc(tx.description);
    setEditAmount(tx.amount);
    setEditType(tx.type);
    setIsEditing(false);
  };

  // --- RENDER MODE: INLINE EDITING FORM ---
  if (isEditing) {
    return (
      <Box
        component="form"
        onSubmit={handleSave}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr 1fr auto" },
          gap: 2,
          alignItems: "center",
          px: 3,
          py: 2,
          bgcolor: "grey.50",
        }}
      >
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          required
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <TextField
          label="Amount ($)"
          type="number"
          variant="outlined"
          size="small"
          required
          slotProps={{ htmlInput: { min: "0.01", step: "any" } }}
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
        />
        <FormControl size="small" fullWidth>
          <Select
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
          <IconButton
            type="submit"
            color="success"
            size="small"
            sx={{ border: "1px solid", borderColor: "success.light" }}
          >
            <CheckIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onClick={handleCancel}
            color="error"
            size="small"
            sx={{ border: "1px solid", borderColor: "error.light" }}
          >
            <ClearIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Box>
    );
  }

  // --- RENDER MODE: STANDARD DISPLAY ---
  return (
    <Box
      onClick={() => isAdmin && setIsEditing(true)} // Clicking row triggers inline form (Admin only)
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        cursor: isAdmin ? "pointer" : "default",
        transition: "background-color 0.2s",
        "&:hover": { bgcolor: isAdmin ? "grey.50" : "transparent" },
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
            sx={{
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              height: 18,
            }}
          />
        </Box>
      </Stack>
      <Stack spacing={2} sx={{ flexDirection: "row", alignItems: "center" }}>
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
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event from opening the edit row form
              deleteTransaction(tx.id);
            }}
            sx={{
              border: "1px solid",
              borderColor: "grey.200",
              p: 0.5,
              "&:hover": { color: "error.main", borderColor: "error.light" },
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}

export default TransactionRow;

import { useState } from "react";

import { useBudgetTracker } from "../contexts/BudgetTrackerContextInstance";

import {
  Box,
  Typography,
  Card,
  Button,
  CardContent,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

function AddTransactionForm() {
  const { addTransaction } = useBudgetTracker();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || Number(amount) <= 0) return;

    addTransaction(description.trim(), amount, type);
    setDescription("");
    setAmount("");
    setType("income");
  };

  return (
    <Card
      sx={{ border: "1px solid", borderColor: "grey.200", boxShadow: "none" }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2.5 }}>
          Add Transaction
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr 1fr" },
            gap: 2,
            alignItems: "end",
          }}
        >
          <TextField
            label="Description"
            variant="outlined"
            size="small"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Amount ($)"
            type="number"
            variant="outlined"
            size="small"
            required
            slotProps={{
              htmlInput: { min: "0.01", step: "any" },
            }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ gridColumn: { xs: "1", sm: "span 4" }, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disableElevation
              sx={{ py: 1, textTransform: "none", fontWeight: 700 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AddTransactionForm;

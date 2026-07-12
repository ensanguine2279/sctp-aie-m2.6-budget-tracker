import { useAuth } from "../contexts/AuthContextInstance";

import Header from "./Header";
import Summary from "./Summary";
import FilterBar from "./FilterBar";
import TransactionList from "./TransactionList";
import AddTransactionForm from "./AddTransactionForm";

import { Box, Container, Stack } from "@mui/material";

function DashboardLayout() {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#fafafa",
        pb: 8,
      }}
    >
      <Header />
      <Container
        maxWidth="md"
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Summary />
        <Stack spacing={2}>
          <FilterBar />
          <TransactionList />
        </Stack>
        {user?.role === "admin" && <AddTransactionForm />}
      </Container>
    </Box>
  );
}

export default DashboardLayout;

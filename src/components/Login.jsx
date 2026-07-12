import { useState } from "react";

import { useAuth } from "../contexts/AuthContextInstance";

import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!login(username, password)) {
      setError("Invalid credentials. Try admin/password or viewer/password.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 2,
          border: "1px solid",
          borderColor: "grey.200",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, letterSpacing: "-0.02em" }}
          >
            Sign in to workspace
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Enter mock runtime credentials to process allocation logs.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography
                variant="caption"
                color="error"
                sx={{ fontWeight: 500 }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disableElevation
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Authenticate Session
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

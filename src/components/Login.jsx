import { useState } from "react";

import { useAuth } from "../contexts/AuthContextInstance";

import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!login(username, password, rememberMe)) {
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
            Enter username and password
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, userSelect: "none" }}
                >
                  Remember me
                </Typography>
              }
              sx={{ mt: -1, mb: 0.5 }}
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
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;

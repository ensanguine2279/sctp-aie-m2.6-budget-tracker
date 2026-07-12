// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // Modern vibrant blue
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0f172a", // Slate 900
    },
    background: {
      default: "#f8fafc", // Slate 50 background
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    button: {
      textTransform: "none", // Prevents default aggressive ALL-CAPS text
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8, // Overrides the standard roundness to a cleaner look
  },
  components: {
    // Inject global default options into individual elements
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flattens buttons for a modern aesthetic
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e2e8f0", // Injects modern borders instead of heavy shadows
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;

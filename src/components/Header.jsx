import { useAuth } from "../contexts/AuthContextInstance";

import { Box, Typography, AppBar, Button, Toolbar, Stack } from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const { user, logout } = useAuth();
  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "grey.200",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 960,
          width: "100%",
          mx: "auto",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            Budget Tracker
          </Typography>
        </Box>
        <Stack spacing={3} sx={{ flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              color="primary"
              sx={{ fontWeight: 700, textTransform: "uppercase" }}
            >
              {user.role} Dashboard
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{ textTransform: "none" }}
          >
            Log Out
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

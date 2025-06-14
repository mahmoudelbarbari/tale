import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import logoImage from "@/assets/images/tale-logo.jpg";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useTheme, Box, Stack, IconButton, Button } from "@mui/material";
import { Link } from "react-router";
import LoginPopover from "./LoginPopover";
import { useState, useEffect } from "react";
import SignupDialog from "./SignupDialog";

function NavBar({ setMode }) {
  const theme = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogin = (user) => {
    setUser({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
    });
  };

  const handleSignup = (user) => setUser(user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      component="nav"
      sx={{
        borderBottom: `0.2px solid ${theme.palette.border.bottom}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar variant="regular">
          <Avatar alt="tale logo" src={logoImage} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Tale
          </Typography>
          <Box flexGrow={1} />
          <Stack direction={"row"}>
            {theme.palette.mode === "light" ? (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "currentMode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                }}
                color="inherit"
              >
                <LightModeOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  localStorage.setItem(
                    "currentMode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                  );
                }}
                color="inherit"
              >
                <DarkModeOutlinedIcon />
              </IconButton>
            )}

            {user ? (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    px: 1,
                    py: 1,
                    mx: 1,
                    border: `1px solid ${theme.palette.border.main}`,
                  }}
                >
                  {user.displayName || user.email}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mx: 1 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LoginPopover onLogin={handleLogin}>Login</LoginPopover>
                <SignupDialog onSignup={handleSignup}>Sign Up</SignupDialog>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

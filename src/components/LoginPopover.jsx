import React, { useState } from "react";
import {
  Dialog,
  Button,
  Box,
  TextField,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import heroImg from "@/assets/images/hero.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase";

export default function LoginPopover({ onLogin }) {
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth(app);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        })
      );
      if (onLogin) onLogin(user);
      handleClose();
    } catch (err) {
      console.error("Login error:", err);

      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/user-disabled":
          setError("Account disabled");
          break;
        case "auth/user-not-found":
          setError("Account not found");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button sx={{ mx: 1 }} onClick={handleOpen}>
        {"Login"}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <Box sx={{ p: { xs: 1, sm: 4 } }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0}
            alignItems="stretch"
            justifyContent="center"
            sx={{ minHeight: { sm: 400 }, height: { sm: 400 } }}
            component="form"
            onSubmit={handleLogin}
          >
            <Box
              component="img"
              src={heroImg}
              alt="Hero"
              sx={{
                width: { xs: "100%", sm: "50%" },
                height: { xs: 200, sm: 400 },
                objectFit: "cover",
                borderRadius: 2,
                display: "block",
              }}
            />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 0, sm: 4 },
                py: { xs: 2, sm: 0 },
              }}
            >
              <TextField
                label="Email"
                type="email"
                fullWidth
                color="#888"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                color="#888"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 5, p: 1.2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}

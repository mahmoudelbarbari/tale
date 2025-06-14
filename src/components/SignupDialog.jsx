import { useState } from "react";
import {
  Dialog,
  Button,
  Box,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestoreDb } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import heroImg from "@/assets/images/hero.png";

export default function SignupDialog({ onSignup }) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await setDoc(doc(firestoreDb, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
      });
      await auth.currentUser.reload();

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userCredential.user.email,
          displayName: name,
          uid: userCredential.user.uid,
        })
      );

      setTimeout(() => {
        if (onSignup) {
          onSignup({
            email: userCredential.user.email,
            displayName: name,
            uid: userCredential.user.uid,
          });
        }
      }, 3000);

      setSnackbarMessage("User created successfully");
      setAlertSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      let message = "Signup failed. Please try again.";
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            message = "Email already in use";
            break;
          case "auth/invalid-email":
            message = "Invalid email address";
            break;
          case "auth/weak-password":
            message = "Password should be at least 6 characters";
            break;
          case "auth/operation-not-allowed":
            message = "Email/password sign-in not enabled";
            break;
          default:
            message = `${error.code}`;
        }
      }
      setSnackbarMessage(message);
      setAlertSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" sx={{ mx: 1 }} onClick={handleOpen}>
        {"Sign up"}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <Box sx={{ p: { xs: 1, sm: 4 } }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={0}
              alignItems="stretch"
              justifyContent="center"
              sx={{ minHeight: { sm: 400 }, height: { sm: 400 } }}
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
                  label="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  color="#888"
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  color="#888"
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  color="#888"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  fullWidth
                  sx={{ mt: 5, p: 1.2 }}
                >
                  {loading ? "Creating Account..." : `Continue `}
                  <ArrowRightAltIcon sx={{ mx: 1 }} />
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Dialog>
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={alertSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
